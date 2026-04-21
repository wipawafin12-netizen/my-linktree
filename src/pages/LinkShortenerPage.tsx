import { useEffect, useMemo, useState, useCallback } from 'react';
import type { ReactNode, FormEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Scissors, Link2, Copy, CheckCircle2, ExternalLink, Trash2,
  BarChart3, QrCode, Power, PowerOff, X, Download, Lock,
  Calendar, TrendingUp, MousePointerClick, Globe2, Smartphone, Monitor, Tablet,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';
import pb, { isPocketBaseEnabled } from '../lib/pb';
import {
  generateUniqueSlug, slugExists, validateSlug, buildShortUrl,
} from '../lib/shortUrl';
import type { ShortUrlRecord, ShortUrlClickRecord } from '../lib/types';

function extractPbError(err: unknown): string {
  const anyErr = err as { response?: { message?: string; data?: Record<string, { message?: string }> } };
  const fieldErrors = anyErr?.response?.data;
  if (fieldErrors && typeof fieldErrors === 'object' && Object.keys(fieldErrors).length > 0) {
    const details = Object.entries(fieldErrors)
      .map(([field, info]) => `${field}: ${info?.message || 'invalid'}`)
      .join(', ');
    if (details) return details;
  }
  return anyErr?.response?.message || 'เกิดข้อผิดพลาด';
}

function formatDateTH(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      day: 'numeric', month: 'short', year: '2-digit',
    });
  } catch { return iso; }
}

function formatDateTimeTH(iso: string) {
  try {
    return new Date(iso).toLocaleString('th-TH', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

function getHostFromUrl(u: string): string {
  if (!u) return 'ไม่ระบุ';
  try { return new URL(u).hostname; } catch { return u; }
}

function deviceIcon(d: string, size = 14) {
  if (d === 'mobile') return <Smartphone size={size} />;
  if (d === 'tablet') return <Tablet size={size} />;
  return <Monitor size={size} />;
}

// ─── Stats panel ─────────────────────────────────────────────────
function StatsPanel({ urlId }: { urlId: string }) {
  const [clicks, setClicks] = useState<ShortUrlClickRecord[] | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await pb.collection('short_url_clicks').getFullList<ShortUrlClickRecord>({
          filter: `shortUrl="${urlId}"`,
          sort: '-created',
          batch: 500,
        });
        if (!cancelled) setClicks(list);
      } catch (e) {
        if (!cancelled) setErr(extractPbError(e));
      }
    })();
    return () => { cancelled = true; };
  }, [urlId]);

  const last7Days = useMemo(() => {
    if (!clicks) return [];
    const days: { label: string; date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      const count = clicks.filter(c => new Date(c.created).toDateString() === dateStr).length;
      days.push({
        label: d.toLocaleDateString('th-TH', { weekday: 'short' }),
        date: d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        count,
      });
    }
    return days;
  }, [clicks]);

  const maxCount = Math.max(1, ...last7Days.map(d => d.count));

  const referrers = useMemo(() => {
    if (!clicks) return [];
    const map = new Map<string, number>();
    for (const c of clicks) {
      const host = c.referrer ? getHostFromUrl(c.referrer) : 'Direct';
      map.set(host, (map.get(host) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [clicks]);

  const devices = useMemo(() => {
    if (!clicks) return [];
    const map = new Map<string, number>();
    for (const c of clicks) map.set(c.device || 'unknown', (map.get(c.device || 'unknown') || 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [clicks]);

  const browsers = useMemo(() => {
    if (!clicks) return [];
    const map = new Map<string, number>();
    for (const c of clicks) map.set(c.browser || 'unknown', (map.get(c.browser || 'unknown') || 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [clicks]);

  if (err) {
    return <div className="mt-3 p-4 bg-red-50 text-red-600 text-xs rounded-xl">{err}</div>;
  }

  if (!clicks) {
    return (
      <div className="mt-3 p-6 flex justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const total = clicks.length;

  if (total === 0) {
    return (
      <div className="mt-3 p-6 text-center bg-gray-50 rounded-xl text-xs text-gray-400">
        ยังไม่มีคลิก — แชร์ลิงก์นี้เพื่อเริ่มเก็บสถิติ
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-4">
      {/* 7-day bar chart */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={14} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-600">คลิก 7 วันล่าสุด</p>
        </div>
        <div className="flex items-end gap-1.5 h-24">
          {last7Days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-[10px] font-semibold text-gray-500">{d.count || ''}</div>
              <div
                className="w-full bg-gradient-to-t from-orange-400 to-orange-300 rounded-t min-h-[2px] transition-all"
                style={{ height: `${(d.count / maxCount) * 100}%` }}
              />
              <div className="text-[10px] text-gray-400">{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrers + Devices + Browsers */}
      <div className="grid md:grid-cols-3 gap-3">
        <StatList title="Top Referrers" icon={<Globe2 size={12} />} items={referrers} total={total} />
        <StatList title="อุปกรณ์" icon={<Smartphone size={12} />} items={devices} total={total} renderIcon={(k) => deviceIcon(k, 12)} />
        <StatList title="เบราว์เซอร์" icon={<Monitor size={12} />} items={browsers} total={total} />
      </div>

      {/* Recent clicks */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-600 mb-2.5">คลิกล่าสุด ({Math.min(20, total)} จาก {total})</p>
        <div className="space-y-1.5 max-h-56 overflow-y-auto">
          {clicks.slice(0, 20).map((c) => (
            <div key={c.id} className="flex items-center gap-2 text-[11px] text-gray-500 py-1 border-b border-gray-100 last:border-0">
              <span className="text-gray-400 shrink-0">{formatDateTimeTH(c.created)}</span>
              <span className="flex items-center gap-1 text-gray-400">{deviceIcon(c.device, 10)} {c.device}</span>
              <span className="text-gray-400">· {c.browser}</span>
              {c.referrer && <span className="truncate text-gray-400">· {getHostFromUrl(c.referrer)}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatList({
  title, icon, items, total, renderIcon,
}: {
  title: string; icon: ReactNode; items: [string, number][]; total: number;
  renderIcon?: (k: string) => ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-2.5 text-gray-400">
        {icon}<p className="text-xs font-semibold text-gray-600">{title}</p>
      </div>
      {items.length === 0 ? (
        <p className="text-[11px] text-gray-400">ไม่มีข้อมูล</p>
      ) : (
        <div className="space-y-1.5">
          {items.map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 text-[11px]">
              {renderIcon && <span className="text-gray-400">{renderIcon(k)}</span>}
              <span className="text-gray-600 flex-1 truncate">{k}</span>
              <span className="font-semibold text-gray-900">{v}</span>
              <span className="text-gray-400 tabular-nums w-9 text-right">{Math.round((v / total) * 100)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
  const [error, setError] = useState('');

  const [toast, setToast] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [qrFor, setQrFor] = useState<ShortUrlRecord | null>(null);

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
    } catch (e) {
      setError(extractPbError(e));
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

      const payload: Record<string, unknown> = {
        user: user.id,
        slug,
        originalUrl: url,
        title: title.trim(),
        enabled: true,
        clicks: 0,
      };
      if (expiresAt) payload.expiresAt = new Date(expiresAt).toISOString();

      await pb.collection('short_urls').create(payload);

      setOriginalUrl(''); setTitle(''); setCustomSlug(''); setExpiresAt('');
      showToast('ย่อลิงก์สำเร็จ!');
      await refresh();
    } catch (err) {
      setError(extractPbError(err));
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
    if (!confirm(`ลบลิงก์ /s/${rec.slug} และสถิติทั้งหมด?`)) return;
    try {
      await pb.collection('short_urls').delete(rec.id);
      setLinks(prev => prev.filter(l => l.id !== rec.id));
      showToast('ลบลิงก์แล้ว');
    } catch (e) {
      showToast(extractPbError(e));
    }
  };

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
              onChange={(e) => { setOriginalUrl(e.target.value); setError(''); }}
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
                <span className="pl-3 text-xs text-gray-400 whitespace-nowrap">/s/</span>
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
        <div className="grid grid-cols-3 gap-3 mb-6">
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

        {/* List */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            ลิงก์ของคุณ ({links.length})
          </h3>

          {listLoading ? (
            <div className="py-10 flex justify-center">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : links.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3">
                <Scissors size={24} className="text-orange-300" />
              </div>
              <p className="text-sm text-gray-500">ยังไม่มีลิงก์ที่ย่อ</p>
              <p className="text-xs text-gray-400 mt-1">สร้างลิงก์แรกของคุณด้านบน</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((rec) => {
                const shortUrl = buildShortUrl(rec.slug);
                const isExpired = !!rec.expiresAt && new Date(rec.expiresAt).getTime() < Date.now();
                const isExpanded = expandedId === rec.id;
                return (
                  <div key={rec.id} className="px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                        <Link2 size={16} className="text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {rec.title && <p className="text-xs font-semibold text-gray-700 truncate">{rec.title}</p>}
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline break-all">
                          {shortUrl}
                        </a>
                        <p className="text-[11px] text-gray-400 truncate">{rec.originalUrl}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
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
                    {isExpanded && <StatsPanel urlId={rec.id} />}
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
