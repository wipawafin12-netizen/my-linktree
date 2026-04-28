import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  BarChart3, Globe2, Smartphone, Monitor, Tablet, Calendar,
} from 'lucide-react';
import pb from '../lib/pb';
import type { ShortUrlClickRecord } from '../lib/types';

type RangeId = '7d' | '30d' | '90d' | 'all';

const RANGES: { id: RangeId; label: string; titleSuffix: string }[] = [
  { id: '7d', label: '7 วัน', titleSuffix: '7 วันล่าสุด' },
  { id: '30d', label: '30 วัน', titleSuffix: '30 วันล่าสุด' },
  { id: '90d', label: '90 วัน', titleSuffix: '90 วันล่าสุด' },
  { id: 'all', label: 'ทั้งหมด', titleSuffix: 'ทั้งหมด' },
];

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
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

function formatDateTimeTH(iso: string) {
  try {
    return new Date(iso).toLocaleString('th-TH', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

interface Bucket {
  label: string;
  date: string;
  count: number;
}

function computeBuckets(clicks: ShortUrlClickRecord[], range: RangeId): Bucket[] {
  const now = new Date();

  if (range === '7d' || range === '30d') {
    const days = range === '7d' ? 7 : 30;
    const buckets: Bucket[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStart = startOfDay(d).getTime();
      const dayEnd = dayStart + 86400000;
      const count = clicks.filter((c) => {
        const t = new Date(c.created).getTime();
        return t >= dayStart && t < dayEnd;
      }).length;
      buckets.push({
        label: range === '7d'
          ? d.toLocaleDateString('th-TH', { weekday: 'short' })
          : d.getDate().toString(),
        date: d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        count,
      });
    }
    return buckets;
  }

  if (range === '90d') {
    const buckets: Bucket[] = [];
    for (let i = 12; i >= 0; i--) {
      const end = new Date(now);
      end.setDate(end.getDate() - i * 7);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      const startMs = startOfDay(start).getTime();
      const endMs = startOfDay(end).getTime() + 86400000;
      const count = clicks.filter((c) => {
        const t = new Date(c.created).getTime();
        return t >= startMs && t < endMs;
      }).length;
      buckets.push({
        label: end.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        date: `${start.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}`,
        count,
      });
    }
    return buckets;
  }

  // all-time → monthly buckets
  if (clicks.length === 0) {
    return [{
      label: now.toLocaleDateString('th-TH', { month: 'short' }),
      date: now.toLocaleDateString('th-TH', { month: 'short', year: '2-digit' }),
      count: 0,
    }];
  }
  const earliest = new Date(Math.min(...clicks.map((c) => new Date(c.created).getTime())));
  const months = (now.getFullYear() - earliest.getFullYear()) * 12 + (now.getMonth() - earliest.getMonth()) + 1;
  const buckets: Bucket[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1).getTime();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1).getTime();
    const count = clicks.filter((c) => {
      const t = new Date(c.created).getTime();
      return t >= monthStart && t < monthEnd;
    }).length;
    buckets.push({
      label: new Date(monthStart).toLocaleDateString('th-TH', { month: 'short' }),
      date: new Date(monthStart).toLocaleDateString('th-TH', { month: 'short', year: '2-digit' }),
      count,
    });
  }
  return buckets;
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
              <span className="text-gray-400 tabular-nums w-9 text-right">
                {total > 0 ? Math.round((v / total) * 100) : 0}%
              </span>
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
  const [range, setRange] = useState<RangeId>('7d');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await pb.collection('short_url_clicks').getFullList<ShortUrlClickRecord>({
          filter: `shortUrl="${urlId}"`,
          sort: '-created',
          batch: 1000,
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

  const filteredClicks = useMemo(() => {
    if (!clicks) return [];
    if (range === 'all') return clicks;
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const cutoff = startOfDay(new Date()).getTime() - (days - 1) * 86400000;
    return clicks.filter((c) => new Date(c.created).getTime() >= cutoff);
  }, [clicks, range]);

  const buckets = useMemo(() => computeBuckets(filteredClicks, range), [filteredClicks, range]);
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));

  const referrers = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of filteredClicks) {
      const host = c.referrer ? getHostFromUrl(c.referrer) : 'Direct';
      map.set(host, (map.get(host) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [filteredClicks]);

  const devices = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of filteredClicks) map.set(c.device || 'unknown', (map.get(c.device || 'unknown') || 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [filteredClicks]);

  const browsers = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of filteredClicks) map.set(c.browser || 'unknown', (map.get(c.browser || 'unknown') || 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [filteredClicks]);

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

  const total = filteredClicks.length;
  const totalAll = clicks.length;
  const currentRange = RANGES.find((r) => r.id === range)!;
  const minWidth = range === '30d' ? 480 : range === '90d' ? 420 : 0;

  return (
    <div className="mt-3 space-y-4">
      {/* Range selector */}
      <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1 flex-wrap">
          <Calendar size={13} className="text-gray-400 ml-1 mr-1.5" />
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-colors ${
                range === r.id
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-100'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/60'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-gray-500">
          <span className="font-semibold text-gray-900 tabular-nums">{total}</span>
          {range !== 'all' && (
            <span className="text-gray-400"> / {totalAll} คลิก</span>
          )}
          {range === 'all' && <span className="text-gray-400"> คลิกรวม</span>}
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={14} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-600">คลิก{currentRange.titleSuffix}</p>
        </div>
        {total === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400">
            ไม่มีคลิกในช่วงนี้
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2">
            <div
              className="flex items-end gap-1 h-28"
              style={{ minWidth: minWidth ? `${minWidth}px` : 'auto' }}
            >
              {buckets.map((b, i) => {
                const showLabel =
                  range === '7d' ||
                  range === 'all' ||
                  (range === '30d' && (i % 5 === 0 || i === buckets.length - 1)) ||
                  (range === '90d' && (i % 2 === 0 || i === buckets.length - 1));
                const heightPct = (b.count / maxCount) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-[10px]">
                    <div className="text-[10px] font-semibold text-gray-500 tabular-nums h-3">
                      {b.count > 0 ? b.count : ''}
                    </div>
                    <div
                      className="w-full bg-gradient-to-t from-orange-400 to-orange-300 rounded-t min-h-[2px] transition-all"
                      style={{ height: `${heightPct}%` }}
                      title={`${b.date}: ${b.count} คลิก`}
                    />
                    <div
                      className={`text-[9px] sm:text-[10px] text-gray-400 truncate max-w-full ${
                        showLabel ? '' : 'invisible'
                      }`}
                    >
                      {b.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Referrers + Devices + Browsers */}
      <div className="grid md:grid-cols-3 gap-3">
        <StatList title="Top Referrers" icon={<Globe2 size={12} />} items={referrers} total={total} />
        <StatList title="อุปกรณ์" icon={<Smartphone size={12} />} items={devices} total={total} renderIcon={(k) => deviceIcon(k, 12)} />
        <StatList title="เบราว์เซอร์" icon={<Monitor size={12} />} items={browsers} total={total} />
      </div>

      {/* Recent clicks */}
      {total > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-600 mb-2.5">
            คลิกล่าสุด ({Math.min(20, total)} จาก {total})
          </p>
          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {filteredClicks.slice(0, 20).map((c) => (
              <div key={c.id} className="flex items-center gap-2 text-[11px] text-gray-500 py-1 border-b border-gray-100 last:border-0">
                <span className="text-gray-400 shrink-0">{formatDateTimeTH(c.created)}</span>
                <span className="flex items-center gap-1 text-gray-400">{deviceIcon(c.device, 10)} {c.device}</span>
                <span className="text-gray-400">· {c.browser}</span>
                {c.referrer && <span className="truncate text-gray-400">· {getHostFromUrl(c.referrer)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
