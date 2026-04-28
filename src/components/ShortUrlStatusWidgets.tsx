import { useMemo } from 'react';
import { Activity, Clock, MousePointerClick, TrendingUp } from 'lucide-react';
import type { ShortUrlRecord } from '../lib/types';
import { getPlatform } from '../lib/shortUrl';

interface Props {
  links: ShortUrlRecord[];
}

const STATUS_COLORS = {
  active: { color: '#10B981', bg: 'from-emerald-500 to-emerald-400', label: 'ใช้งาน' },
  disabled: { color: '#9CA3AF', bg: 'from-gray-400 to-gray-300', label: 'ปิดใช้งาน' },
  expired: { color: '#EF4444', bg: 'from-red-500 to-red-400', label: 'หมดอายุ' },
} as const;

export default function ShortUrlStatusWidgets({ links }: Props) {
  const statusCounts = useMemo(() => {
    let active = 0, disabled = 0, expired = 0;
    const now = Date.now();
    for (const l of links) {
      const isExpired = !!l.expiresAt && new Date(l.expiresAt).getTime() < now;
      if (isExpired) expired += 1;
      else if (l.enabled === false) disabled += 1;
      else active += 1;
    }
    return { active, disabled, expired };
  }, [links]);

  const avgPerPlatform = useMemo(() => {
    const map = new Map<string, { links: number; clicks: number }>();
    for (const l of links) {
      const id = l.platform || 'other';
      const cur = map.get(id) || { links: 0, clicks: 0 };
      cur.links += 1;
      cur.clicks += l.clicks || 0;
      map.set(id, cur);
    }
    return Array.from(map.entries())
      .map(([id, v]) => ({
        id,
        def: getPlatform(id),
        avg: v.links > 0 ? v.clicks / v.links : 0,
        ...v,
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 4);
  }, [links]);

  const totalLinks = links.length;
  const maxStatus = Math.max(1, statusCounts.active, statusCounts.disabled, statusCounts.expired);

  if (totalLinks === 0) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* ─── Status Breakdown (vertical bars) ─── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
            <Activity size={16} className="text-blue-500" /> สถานะลิงก์
          </h3>
          <span className="text-[11px] text-gray-400">{totalLinks} ลิงก์</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-5">แยกตามสถานะการใช้งาน</p>

        <div className="flex items-end gap-4 sm:gap-6 h-36 px-2">
          {(['active', 'disabled', 'expired'] as const).map((key) => {
            const meta = STATUS_COLORS[key];
            const count = statusCounts[key];
            const pct = (count / maxStatus) * 100;
            return (
              <div key={key} className="flex-1 flex flex-col items-center gap-2">
                <span
                  className="text-base font-bold tabular-nums"
                  style={{ color: count > 0 ? meta.color : '#D1D5DB' }}
                >
                  {count}
                </span>
                <div className="w-full max-w-[64px] h-full flex items-end">
                  <div
                    className={`w-full rounded-t-lg bg-gradient-to-t ${meta.bg} transition-all`}
                    style={{
                      height: count > 0 ? `${Math.max(pct, 8)}%` : '4px',
                      opacity: count > 0 ? 1 : 0.2,
                    }}
                  />
                </div>
                <span className="text-[11px] font-medium text-gray-600">{meta.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Average clicks per platform (KPI cards) ─── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-500" /> ค่าเฉลี่ยคลิก/ลิงก์
          </h3>
          <span className="text-[11px] text-gray-400">Top {avgPerPlatform.length}</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-5">ประสิทธิภาพต่อลิงก์ของแต่ละแพลตฟอร์ม</p>

        {avgPerPlatform.length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-400">ยังไม่มีข้อมูล</div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {avgPerPlatform.map((p) => (
              <div
                key={p.id}
                className="rounded-xl p-3 border-l-4"
                style={{ backgroundColor: `${p.def.color}0a`, borderColor: p.def.color }}
              >
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-2xl font-bold tabular-nums" style={{ color: p.def.color }}>
                    {p.avg.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-gray-500">คลิก/ลิงก์</span>
                </div>
                <p className="text-[11px] font-medium text-gray-700 truncate">{p.def.label}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                  <span className="flex items-center gap-0.5"><MousePointerClick size={9} /> {p.clicks}</span>
                  <span>·</span>
                  <span>{p.links} ลิงก์</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trailing tip if all averages are 0 */}
        {avgPerPlatform.every((p) => p.avg === 0) && avgPerPlatform.length > 0 && (
          <p className="text-[10px] text-gray-400 italic text-center mt-4 flex items-center justify-center gap-1">
            <Clock size={10} /> รอข้อมูลคลิกเข้ามา จะแสดงค่าเฉลี่ยทันที
          </p>
        )}
      </div>
    </div>
  );
}
