import { useEffect, useMemo, useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Scissors, Link2, Copy, CheckCircle2, ExternalLink, Trash2,
  BarChart3, QrCode, Power, PowerOff, X, Download, Lock,
  Calendar, TrendingUp, MousePointerClick, Info,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';
import pb, { isPocketBaseEnabled } from '../lib/pb';
import {
  generateUniqueSlug, slugExists, validateSlug, buildShortUrl,
  PLATFORMS, getPlatform, detectPlatform, translateShortUrlError,
} from '../lib/shortUrl';
import type { ShortUrlRecord, ShortUrlClickRecord } from '../lib/types';
import ShortUrlStats from '../components/ShortUrlStats';
import PlatformBarChart from '../components/PlatformBarChart';

function extractPbError(err: unknown): string {
  return translateShortUrlError(err).message;
}

function formatDateTH(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      day: 'numeric', month: 'short', year: '2-digit',
    });
  } catch { return iso; }
}

// ─── QR modal ────────────────────────────────────────────────────
function QRModal({ url, slug, onClose }: { url: string; slug: string; onClose: () => void }) {
  const handleDownload = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#short-url-qr canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `short-url-${slug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">QR Code</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <div id="short-url-qr" className="bg-white p-4 rounded-xl border border-gray-100 mb-4">
          <QRCodeCanvas value={url} size={220} />
        </div>
        <p className="text-[11px] text-gray-500 mb-3 truncate">{url}</p>
        <button
          onClick={handleDownload}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2"
        >
          <Download size={14} /> ดาวน์โหลด PNG
        </button>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────
export default function LinkShortenerPage() {
  const { isLoggedIn, user } = useAuth();

  const [links, setLinks] = useState<ShortUrlRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  const [originalUrl, setOriginalUrl] = useState('');
  const [title, setTitle] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [platform, setPlatform] = useState('');
  const [platformTouched, setPlatformTouched] = useState(false);
  const [error, setError] = useState('');
  const [setupIssue, setSetupIssue] = useState(false);

  const [toast, setToast] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [qrFor, setQrFor] = useState<ShortUrlRecord | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');

  const [totalsLoading, setTotalsLoading] = useState(true);
  const [totals, setTotals] = useState({ clicks: 0, last7: 0 });

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const refresh = useCallback(async () => {
    if (!user?.id || !isPocketBaseEnabled) {
      setListLoading(false);
      return;
    }
    setListLoading(true);
    try {
      const list = await pb.collection('short_urls').getFullList<ShortUrlRecord>({
        filter: `user="${user.id}"`,
        sort: '-created',
      });
      setLinks(list);
      setSetupIssue(false);
    } catch (e) {
      const t = translateShortUrlError(e);
      setError(t.message);
      if (t.isSetupIssue) setSetupIssue(true);
    } finally {
      setListLoading(false);
    }
  }, [user?.id]);

  const refreshTotals = useCallback(async () => {
    if (!user?.id || !isPocketBaseEnabled) {
      setTotalsLoading(false);
      return;
    }
    setTotalsLoading(true);
    try {
      const sevenAgo = new Date();
      sevenAgo.setDate(sevenAgo.getDate() - 7);
      const iso = sevenAgo.toISOString().replace('T', ' ').slice(0, 19);
      const recent = await pb.collection('short_url_clicks').getList<ShortUrlClickRecord>(1, 1, {
        filter: `shortUrl.user="${user.id}" && created >= "${iso}"`,
        fields: 'id',
      });
      setTotals((prev) => ({ ...prev, last7: recent.totalItems }));
    } catch { /* ignore */ } finally {
      setTotalsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => { refreshTotals(); }, [refreshTotals, links.length]);

  useEffect(() => {
    setTotals((prev) => ({ ...prev, clicks: links.reduce((s, l) => s + (l.clicks || 0), 0) }));
  }, [links]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setError('');

    const url = originalUrl.trim();
    if (!url) { setError('กรุณาใส่ URL ที่ต้องการย่อ'); return; }
    try { new URL(url); } catch { setError('URL ไม่ถูกต้อง (เช่น https://example.com)'); return; }

    const wantSlug = customSlug.trim();
    if (wantSlug) {
      const invalid = validateSlug(wantSlug);
      if (invalid) { setError(invalid); return; }
    }

    setLoading(true);
    try {
      let slug = wantSlug;
      if (slug) {
        if (await slugExists(slug)) {
          setError(`Slug "${slug}" ถูกใช้ไปแล้ว กรุณาเลือกชื่ออื่น`);
          setLoading(false);
          return;
        }
      } else {
        slug = await generateUniqueSlug(6);
      }

      const resolvedPlatform = platform || detectPlatform(url);
      const payload: Record<string, unknown> = {
        user: user.id,
        slug,
        originalUrl: url,
        title: title.trim(),
        enabled: true,
        clicks: 0,
        platform: resolvedPlatform,
      };
      if (expiresAt) payload.expiresAt = new Date(expiresAt).toISOString();

      await pb.collection('short_urls').create(payload);

      setOriginalUrl(''); setTitle(''); setCustomSlug(''); setExpiresAt('');
      setPlatform(''); setPlatformTouched(false);
      showToast('ย่อลิงก์สำเร็จ!');
      await refresh();
    } catch (err) {
      const t = translateShortUrlError(err);
      setError(t.message);
      if (t.isSetupIssue) setSetupIssue(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (rec: ShortUrlRecord) => {
    const url = buildShortUrl(rec.slug);
    navigator.clipboard.writeText(url);
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 1800);
    showToast('คัดลอกลิงก์แล้ว!');
  };

  const handleToggle = async (rec: ShortUrlRecord) => {
    try {
      await pb.collection('short_urls').update(rec.id, { enabled: !rec.enabled });
      setLinks(prev => prev.map(l => l.id === rec.id ? { ...l, enabled: !rec.enabled } : l));
      showToast(rec.enabled ? 'ปิดการใช้งานลิงก์แล้ว' : 'เปิดใช้งานลิงก์แล้ว');
    } catch (e) {
      showToast(extractPbError(e));
    }
  };

  const handleDelete = async (rec: ShortUrlRecord) => {
    if (!confirm(`ลบลิงก์ /${rec.slug} และสถิติทั้งหมด?`)) return;
    try {
      // Delete dependent click records first (relation has no cascade)
      const clicks = await pb.collection('short_url_clicks').getFullList<{ id: string }>({
        filter: `shortUrl="${rec.id}"`,
        fields: 'id',
        batch: 500,
      });
      await Promise.all(
        clicks.map((c) =>
          pb.collection('short_url_clicks').delete(c.id).catch(() => undefined)
        )
      );
      await pb.collection('short_urls').delete(rec.id);
      setLinks(prev => prev.filter(l => l.id !== rec.id));
      showToast('ลบลิงก์แล้ว');
    } catch (e) {
      showToast(extractPbError(e));
    }
  };

  const platformBreakdown = useMemo(() => {
    const map = new Map<string, { links: number; clicks: number }>();
    for (const l of links) {
      const id = l.platform || 'other';
      const cur = map.get(id) || { links: 0, clicks: 0 };
      cur.links += 1;
      cur.clicks += l.clicks || 0;
      map.set(id, cur);
    }
    return Array.from(map.entries())
      .map(([id, v]) => ({ id, ...v, def: getPlatform(id) }))
      .sort((a, b) => b.clicks - a.clicks || b.links - a.links);
  }, [links]);

  const visibleLinks = useMemo(() => (
    filterPlatform === 'all'
      ? links
      : links.filter((l) => (l.platform || 'other') === filterPlatform)
  ), [links, filterPlatform]);

  // ─── Not logged in state ──────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <Scissors size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ตัวย่อลิงก์</h1>
          <p className="text-gray-500 mb-8 text-sm">สร้างลิงก์สั้น + ติดตามสถิติคลิก referrer อุปกรณ์ และเบราว์เซอร์</p>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <Lock size={20} className="text-orange-500" />
            </div>
            <p className="text-sm text-gray-600 mb-5">เข้าสู่ระบบเพื่อสร้างและติดตามลิงก์สั้นของคุณ</p>
            <RouterLink to="/login" className="inline-block w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors">
              เข้าสู่ระบบ
            </RouterLink>
            <RouterLink to="/signup" className="mt-2 inline-block w-full py-3 text-gray-600 hover:text-gray-900 text-sm font-medium">
              สมัครสมาชิก
            </RouterLink>
          </div>
        </div>
      </div>
    );
  }

  // ─── No PocketBase configured ────────────────────────────────
  if (!isPocketBaseEnabled) {
    return (
      <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-gray-500">ระบบยังไม่ได้ตั้งค่า backend (VITE_PB_URL)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Setup banner */}
        {setupIssue && (
          <div className="mb-5 p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start gap-3">
            <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-700">ระบบย่อลิงก์ยังไม่พร้อมใช้งาน</p>
              <p className="text-xs text-amber-600 mt-1 leading-relaxed">
                Collection <code className="font-mono bg-amber-100 px-1 rounded">short_urls</code> ยังไม่มีใน PocketBase
                — ผู้ดูแลกรุณาเข้าหน้า Admin ของ PocketBase แล้ว Import ไฟล์{' '}
                <code className="font-mono bg-amber-100 px-1 rounded">pocketbase-schema.json</code>{' '}
                ที่ Settings → Import collections
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <Scissors size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ตัวย่อลิงก์</h1>
          <p className="text-gray-500 text-sm">สร้างลิงก์สั้นของคุณเอง พร้อมสถิติแบบละเอียด</p>
        </div>

        {/* Create form */}
        <form onSubmit={handleCreate} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">URL ต้นฉบับ *</label>
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => {
                const v = e.target.value;
                setOriginalUrl(v);
                setError('');
                if (!platformTouched) {
                  try { new URL(v); setPlatform(detectPlatform(v)); }
                  catch { /* ignore — wait for valid URL */ }
                }
              }}
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
              disabled={loading}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">ชื่อ/โน้ต (ไม่บังคับ)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น แคมเปญ IG"
                maxLength={200}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Custom slug (ไม่บังคับ)</label>
              <div className="flex items-center rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-300 overflow-hidden">
                <span className="pl-3 text-xs text-gray-400 whitespace-nowrap">/</span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => { setCustomSlug(e.target.value); setError(''); }}
                  placeholder="my-link"
                  maxLength={32}
                  className="w-full px-2 py-2.5 text-sm focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                แพลตฟอร์ม{!platformTouched && originalUrl && <span className="ml-1 text-[10px] font-normal text-orange-500">· ตรวจจับอัตโนมัติ</span>}
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getPlatform(platform).color }}
                />
                <select
                  value={platform}
                  onChange={(e) => { setPlatform(e.target.value); setPlatformTouched(true); }}
                  className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 bg-white appearance-none"
                  disabled={loading}
                >
                  <option value="">— ตรวจจับจาก URL —</option>
                  {PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                <Calendar size={12} className="inline mr-1 -mt-0.5" /> วันหมดอายุ (ไม่บังคับ)
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
                disabled={loading}
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 -mt-1">{error}</p>}

          <button
            type="submit"
            disabled={loading || !originalUrl.trim()}
            className="w-full py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> กำลังย่อ...</>
            ) : <><Scissors size={14} /> ย่อลิงก์</>}
          </button>
        </form>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
              <Link2 size={12} /><p className="text-[10px] font-semibold uppercase">ลิงก์</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{links.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
              <MousePointerClick size={12} /><p className="text-[10px] font-semibold uppercase">คลิกรวม</p>
            </div>
            <p className="text-2xl font-bold text-orange-500">{totals.clicks}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
              <TrendingUp size={12} /><p className="text-[10px] font-semibold uppercase">7 วัน</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalsLoading ? '…' : totals.last7}
            </p>
          </div>
        </div>

        {/* Platform breakdown — vertical bar chart */}
        <div className="mb-6">
          <PlatformBarChart
            items={platformBreakdown}
            title="คลิกตามแพลตฟอร์ม"
            subtitle="แยกยอดคลิกแต่ละแพลตฟอร์มแบบเทียบกัน"
          />
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              ลิงก์ของคุณ ({visibleLinks.length}{filterPlatform !== 'all' && `/${links.length}`})
            </h3>
          </div>

          {/* Platform filter chips */}
          {platformBreakdown.length > 0 && (
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => setFilterPlatform('all')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors ${
                  filterPlatform === 'all'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                ทั้งหมด · {links.length}
              </button>
              {platformBreakdown.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setFilterPlatform(p.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors flex items-center gap-1.5 ${
                    filterPlatform === p.id
                      ? 'text-white border-transparent'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                  style={filterPlatform === p.id ? { backgroundColor: p.def.color } : undefined}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: filterPlatform === p.id ? '#fff' : p.def.color }}
                  />
                  {p.def.label} · {p.links}
                </button>
              ))}
            </div>
          )}

          {listLoading ? (
            <div className="py-10 flex justify-center">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : visibleLinks.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3">
                <Scissors size={24} className="text-orange-300" />
              </div>
              <p className="text-sm text-gray-500">
                {links.length === 0 ? 'ยังไม่มีลิงก์ที่ย่อ' : 'ไม่มีลิงก์ในแพลตฟอร์มนี้'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {links.length === 0 ? 'สร้างลิงก์แรกของคุณด้านบน' : 'ลองเลือกแพลตฟอร์มอื่น'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleLinks.map((rec) => {
                const shortUrl = buildShortUrl(rec.slug);
                const isExpired = !!rec.expiresAt && new Date(rec.expiresAt).getTime() < Date.now();
                const isExpanded = expandedId === rec.id;
                const platformDef = getPlatform(rec.platform);
                return (
                  <div key={rec.id} className="px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${platformDef.color}1a` }}
                        title={platformDef.label}
                      >
                        <Link2 size={16} style={{ color: platformDef.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {rec.title && <p className="text-xs font-semibold text-gray-700 truncate">{rec.title}</p>}
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline break-all">
                          {shortUrl}
                        </a>
                        <p className="text-[11px] text-gray-400 truncate">{rec.originalUrl}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1"
                            style={{ backgroundColor: `${platformDef.color}1a`, color: platformDef.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: platformDef.color }} />
                            {platformDef.label}
                          </span>
                          <span className="text-[10px] text-gray-400">{formatDateTH(rec.created)}</span>
                          <span className="text-[10px] text-orange-500 font-semibold">{rec.clicks || 0} คลิก</span>
                          {rec.enabled === false && (
                            <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">ปิดใช้งาน</span>
                          )}
                          {isExpired && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">หมดอายุ</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button onClick={() => handleCopy(rec)} title="คัดลอก" className={`p-2 rounded-lg transition-all ${copiedId === rec.id ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
                          {copiedId === rec.id ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                        </button>
                        <button onClick={() => setExpandedId(isExpanded ? null : rec.id)} title="ดูสถิติ" className={`p-2 rounded-lg transition-all ${isExpanded ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'}`}>
                          <BarChart3 size={15} />
                        </button>
                        <button onClick={() => setQrFor(rec)} title="QR Code" className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all">
                          <QrCode size={15} />
                        </button>
                        <a href={rec.originalUrl} target="_blank" rel="noopener noreferrer" title="เปิดต้นฉบับ" className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-all">
                          <ExternalLink size={15} />
                        </a>
                        <button onClick={() => handleToggle(rec)} title={rec.enabled === false ? 'เปิดใช้งาน' : 'ปิดใช้งาน'} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all">
                          {rec.enabled === false ? <PowerOff size={15} /> : <Power size={15} />}
                        </button>
                        <button onClick={() => handleDelete(rec)} title="ลบ" className="p-2 text-gray-300 hover:text-red-400 rounded-lg hover:bg-red-50 transition-all">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    {isExpanded && <ShortUrlStats urlId={rec.id} />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      {qrFor && <QRModal url={buildShortUrl(qrFor.slug)} slug={qrFor.slug} onClose={() => setQrFor(null)} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg z-[60]">
          {toast}
        </div>
      )}
    </div>
  );
}
