import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  BarChart3, Globe2, Smartphone, Monitor, Tablet,
} from 'lucide-react';
import pb from '../lib/pb';
import type { ShortUrlClickRecord } from '../lib/types';

function getHostFromUrl(u: string): string {
  if (!u) return 'ไม่ระบุ';
  try { return new URL(u).hostname; } catch { return u; }
}

function deviceIcon(d: string, size = 14) {
  if (d === 'mobile') return <Smartphone size={size} />;
  if (d === 'tablet') return <Tablet size={size} />;
  return <Monitor size={size} />;
}

function formatDateTimeTH(iso: string) {
  try {
    return new Date(iso).toLocaleString('th-TH', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
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

export default function ShortUrlStats({ urlId }: { urlId: string }) {
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
        if (!cancelled) {
          const anyErr = e as { response?: { message?: string } };
          setErr(anyErr?.response?.message || 'โหลดสถิติไม่สำเร็จ');
        }
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

      <div className="grid md:grid-cols-3 gap-3">
        <StatList title="Top Referrers" icon={<Globe2 size={12} />} items={referrers} total={total} />
        <StatList title="อุปกรณ์" icon={<Smartphone size={12} />} items={devices} total={total} renderIcon={(k) => deviceIcon(k, 12)} />
        <StatList title="เบราว์เซอร์" icon={<Monitor size={12} />} items={browsers} total={total} />
      </div>

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
