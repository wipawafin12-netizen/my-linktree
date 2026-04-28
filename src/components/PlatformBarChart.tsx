import { BarChart3 } from 'lucide-react';
import { getPlatform } from '../lib/shortUrl';

interface PlatformItem {
  id: string;
  links: number;
  clicks: number;
}

interface Props {
  items: PlatformItem[];
  title?: string;
  subtitle?: string;
  iconColor?: string;
  emptyHint?: string;
}

export default function PlatformBarChart({
  items,
  title = 'คลิกตามแพลตฟอร์ม',
  subtitle,
  iconColor = 'text-orange-500',
  emptyHint = 'ยังไม่มีคลิก — แชร์ลิงก์เพื่อเริ่มเก็บสถิติ',
}: Props) {
  if (items.length === 0) return null;

  const platforms = items
    .map((p) => ({ ...p, def: getPlatform(p.id) }))
    .sort((a, b) => b.clicks - a.clicks || b.links - a.links);

  const totalClicks = platforms.reduce((s, p) => s + p.clicks, 0);
  const totalLinks = platforms.reduce((s, p) => s + p.links, 0);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 size={16} className={iconColor} /> {title}
        </h3>
        <span className="text-[11px] text-gray-400">{platforms.length} แพลตฟอร์ม · {totalClicks} คลิก</span>
      </div>
      {subtitle && <p className="text-[11px] text-gray-400 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}

      <div className="space-y-3.5">
        {platforms.map((p) => {
          const clickPct = totalClicks > 0 ? (p.clicks / totalClicks) * 100 : 0;
          const linkPct = totalLinks > 0 ? (p.links / totalLinks) * 100 : 0;
          const displayPct = totalClicks > 0 ? clickPct : linkPct;
          return (
            <div key={p.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.def.color }} />
                  <span
                    className="text-xs sm:text-sm font-medium truncate"
                    style={{ color: p.def.color }}
                  >
                    {p.def.label}
                  </span>
                  <span className="text-[10px] text-gray-400 shrink-0">· {p.links} ลิงก์</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-gray-500 tabular-nums">{p.clicks} คลิก</span>
                  <span className="text-xs font-bold tabular-nums w-10 text-right" style={{ color: p.def.color }}>
                    {displayPct.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.max(displayPct, displayPct > 0 ? 2 : 0)}%`,
                    background: `linear-gradient(to right, ${p.def.color}cc, ${p.def.color})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {totalClicks === 0 && (
        <div className="mt-4 pt-3 border-t border-gray-50">
          <p className="text-[11px] text-gray-400 italic text-center">{emptyHint}</p>
          <p className="text-[10px] text-gray-300 text-center mt-0.5">% ด้านบนคำนวณจากจำนวนลิงก์ในแต่ละแพลตฟอร์ม</p>
        </div>
      )}
    </div>
  );
}
