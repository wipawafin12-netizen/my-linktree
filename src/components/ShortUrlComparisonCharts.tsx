import { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Minus } from 'lucide-react';
import type { ShortUrlClickRecord } from '../lib/types';
import { getPlatform } from '../lib/shortUrl';

interface Props {
  clicks: ShortUrlClickRecord[];
  platformMap: Map<string, string>;
  loading?: boolean;
}

const DAYS_RANGE = 14;
const TOP_N = 5;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function ShortUrlComparisonCharts({ clicks, platformMap, loading }: Props) {
  const [hoverDay, setHoverDay] = useState<number | null>(null);

  const enriched = useMemo(() => (
    clicks.map((c) => ({
      created: c.created,
      platform: platformMap.get(c.shortUrl) || 'other',
    }))
  ), [clicks, platformMap]);

  // ── Top platforms by total clicks (across all time available) ──
  const topPlatforms = useMemo(() => {
    const totals = new Map<string, number>();
    for (const c of enriched) totals.set(c.platform, (totals.get(c.platform) || 0) + 1);
    const sorted = Array.from(totals.entries()).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, TOP_N).map(([id]) => id);
    const otherTotal = sorted.slice(TOP_N).reduce((s, [, v]) => s + v, 0);
    return { ids: top, hasOther: otherTotal > 0, totals };
  }, [enriched]);

  // ── Data for line chart: clicks per platform per day (last DAYS_RANGE days) ──
  const lineData = useMemo(() => {
    const today = startOfDay(new Date());
    const days: { date: Date; key: string; label: string }[] = [];
    for (let i = DAYS_RANGE - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push({
        date: d,
        key: dateKey(d),
        label: d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
      });
    }

    const platformIds = [...topPlatforms.ids];
    if (topPlatforms.hasOther) platformIds.push('__other__');

    const series: Record<string, number[]> = {};
    for (const id of platformIds) series[id] = new Array(days.length).fill(0);

    for (const c of enriched) {
      const d = startOfDay(new Date(c.created));
      const idx = days.findIndex((x) => x.key === dateKey(d));
      if (idx === -1) continue;
      const seriesId = topPlatforms.ids.includes(c.platform) ? c.platform : (topPlatforms.hasOther ? '__other__' : null);
      if (!seriesId) continue;
      series[seriesId][idx] += 1;
    }

    let maxVal = 1;
    for (const id of platformIds) for (const v of series[id]) if (v > maxVal) maxVal = v;

    const totalsByDay = days.map((_, i) => platformIds.reduce((s, id) => s + series[id][i], 0));

    return { days, platformIds, series, maxVal, totalsByDay };
  }, [enriched, topPlatforms]);

  // ── Donut: share of total clicks per platform ──
  const donutData = useMemo(() => {
    const total = enriched.length;
    if (total === 0) return { total: 0, slices: [] as { id: string; label: string; color: string; value: number; pct: number }[] };
    const slices: { id: string; label: string; color: string; value: number; pct: number }[] = [];
    for (const id of topPlatforms.ids) {
      const v = topPlatforms.totals.get(id) || 0;
      const def = getPlatform(id);
      slices.push({ id, label: def.label, color: def.color, value: v, pct: (v / total) * 100 });
    }
    if (topPlatforms.hasOther) {
      let v = 0;
      for (const [id, count] of topPlatforms.totals.entries()) {
        if (!topPlatforms.ids.includes(id)) v += count;
      }
      slices.push({ id: '__other__', label: 'อื่นๆ', color: '#9CA3AF', value: v, pct: (v / total) * 100 });
    }
    return { total, slices };
  }, [enriched, topPlatforms]);

  // ── Week-over-week: this 7d vs prev 7d per platform ──
  const wowData = useMemo(() => {
    const today = startOfDay(new Date());
    const startThis = new Date(today); startThis.setDate(startThis.getDate() - 6);
    const startPrev = new Date(today); startPrev.setDate(startPrev.getDate() - 13);
    const endPrev = new Date(today); endPrev.setDate(endPrev.getDate() - 7); endPrev.setHours(23, 59, 59, 999);

    const counts = new Map<string, { thisWeek: number; prevWeek: number }>();
    for (const c of enriched) {
      const t = new Date(c.created).getTime();
      const p = c.platform;
      const cur = counts.get(p) || { thisWeek: 0, prevWeek: 0 };
      if (t >= startThis.getTime()) cur.thisWeek += 1;
      else if (t >= startPrev.getTime() && t <= endPrev.getTime()) cur.prevWeek += 1;
      counts.set(p, cur);
    }

    const totalThis = Array.from(counts.values()).reduce((s, v) => s + v.thisWeek, 0);
    const totalPrev = Array.from(counts.values()).reduce((s, v) => s + v.prevWeek, 0);

    const rows = Array.from(counts.entries())
      .map(([id, v]) => {
        const def = getPlatform(id);
        const change = v.prevWeek === 0
          ? (v.thisWeek > 0 ? Infinity : 0)
          : ((v.thisWeek - v.prevWeek) / v.prevWeek) * 100;
        return { id, def, ...v, change };
      })
      .filter((r) => r.thisWeek > 0 || r.prevWeek > 0)
      .sort((a, b) => b.thisWeek - a.thisWeek)
      .slice(0, TOP_N);

    const maxVal = Math.max(1, ...rows.flatMap((r) => [r.thisWeek, r.prevWeek]));
    return { rows, maxVal, totalThis, totalPrev };
  }, [enriched]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm flex justify-center">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (clicks.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center">
        <Activity size={32} className="text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">ยังไม่มีคลิกใน 14 วันที่ผ่านมา</p>
        <p className="text-[11px] text-gray-400 mt-1">เมื่อมีคนคลิกลิงก์ กราฟเปรียบเทียบจะแสดงที่นี่</p>
      </div>
    );
  }

  // ── Render line chart with SVG ──
  const W = 720, H = 220, PADL = 36, PADR = 16, PADT = 16, PADB = 28;
  const innerW = W - PADL - PADR;
  const innerH = H - PADT - PADB;
  const stepX = lineData.days.length > 1 ? innerW / (lineData.days.length - 1) : 0;
  const yScale = (v: number) => innerH - (v / lineData.maxVal) * innerH;

  // ── Donut geometry ──
  const DONUT_SIZE = 160;
  const DONUT_R = 70;
  const DONUT_STROKE = 22;
  const CIRC = 2 * Math.PI * DONUT_R;

  return (
    <div className="space-y-4">
      {/* ─── Multi-line: clicks per platform over 14 days ─── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Activity size={16} className="text-violet-500" /> เปรียบเทียบคลิกตามแพลตฟอร์ม
          </h2>
          <span className="text-[11px] text-gray-400">{DAYS_RANGE} วันล่าสุด</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-4">เส้นแต่ละสีคือแพลตฟอร์ม — สังเกต trend ขึ้น/ลงเทียบกัน</p>

        <div className="overflow-x-auto -mx-2 px-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[480px]" style={{ height: H }}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((p) => {
              const y = PADT + innerH * (1 - p);
              const v = Math.round(lineData.maxVal * p);
              return (
                <g key={p}>
                  <line x1={PADL} x2={PADL + innerW} y1={y} y2={y} stroke="#F3F4F6" strokeWidth={1} />
                  <text x={PADL - 6} y={y + 3} textAnchor="end" fontSize={10} fill="#9CA3AF">{v}</text>
                </g>
              );
            })}

            {/* Hover vertical line */}
            {hoverDay !== null && (
              <line
                x1={PADL + stepX * hoverDay} x2={PADL + stepX * hoverDay}
                y1={PADT} y2={PADT + innerH}
                stroke="#E5E7EB" strokeWidth={1} strokeDasharray="3 3"
              />
            )}

            {/* Lines */}
            {lineData.platformIds.map((id) => {
              const def = id === '__other__' ? { color: '#9CA3AF', label: 'อื่นๆ' } : getPlatform(id);
              const points = lineData.series[id].map((v, i) => `${PADL + stepX * i},${PADT + yScale(v)}`).join(' ');
              return (
                <g key={id}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={def.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {lineData.series[id].map((v, i) => (
                    <circle
                      key={i}
                      cx={PADL + stepX * i}
                      cy={PADT + yScale(v)}
                      r={hoverDay === i ? 4 : 2.5}
                      fill="#fff"
                      stroke={def.color}
                      strokeWidth={2}
                    />
                  ))}
                </g>
              );
            })}

            {/* X-axis labels (every 2 days to avoid crowding) */}
            {lineData.days.map((d, i) => (
              (i % 2 === 0 || i === lineData.days.length - 1) && (
                <text
                  key={i}
                  x={PADL + stepX * i}
                  y={H - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#9CA3AF"
                >
                  {d.label}
                </text>
              )
            ))}

            {/* Hover hit areas */}
            {lineData.days.map((_, i) => (
              <rect
                key={i}
                x={PADL + stepX * i - stepX / 2}
                y={PADT}
                width={stepX || 20}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHoverDay(i)}
                onMouseLeave={() => setHoverDay(null)}
                style={{ cursor: 'crosshair' }}
              />
            ))}

            {/* Tooltip */}
            {hoverDay !== null && (() => {
              const x = PADL + stepX * hoverDay;
              const isRight = x > PADL + innerW * 0.66;
              const tx = isRight ? x - 168 : x + 8;
              const items = lineData.platformIds
                .map((id) => ({ id, def: id === '__other__' ? { color: '#9CA3AF', label: 'อื่นๆ' } : getPlatform(id), v: lineData.series[id][hoverDay] }))
                .filter((it) => it.v > 0)
                .sort((a, b) => b.v - a.v);
              const total = lineData.totalsByDay[hoverDay];
              const tH = 22 + items.length * 14 + 6;
              return (
                <g>
                  <rect x={tx} y={PADT + 4} width={160} height={tH} rx={8} fill="#111827" opacity={0.95} />
                  <text x={tx + 10} y={PADT + 20} fontSize={11} fill="#fff" fontWeight={600}>
                    {lineData.days[hoverDay].label} · รวม {total}
                  </text>
                  {items.length === 0 ? (
                    <text x={tx + 10} y={PADT + 38} fontSize={10} fill="#9CA3AF">ไม่มีคลิก</text>
                  ) : (
                    items.map((it, i) => (
                      <g key={it.id}>
                        <circle cx={tx + 14} cy={PADT + 32 + i * 14} r={4} fill={it.def.color} />
                        <text x={tx + 22} y={PADT + 36 + i * 14} fontSize={10} fill="#E5E7EB">{it.def.label}</text>
                        <text x={tx + 150} y={PADT + 36 + i * 14} fontSize={10} fill="#fff" fontWeight={600} textAnchor="end">{it.v}</text>
                      </g>
                    ))
                  )}
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-gray-50">
          {lineData.platformIds.map((id) => {
            const def = id === '__other__' ? { color: '#9CA3AF', label: 'อื่นๆ' } : getPlatform(id);
            const total = lineData.series[id].reduce((s, v) => s + v, 0);
            return (
              <div key={id} className="flex items-center gap-1.5 text-[11px]">
                <span className="w-3 h-1 rounded" style={{ backgroundColor: def.color }} />
                <span className="text-gray-700">{def.label}</span>
                <span className="text-gray-400 tabular-nums">· {total}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Donut + Week-over-week side by side ─── */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Donut */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <PieChart size={16} className="text-pink-500" /> สัดส่วนคลิกตามแพลตฟอร์ม
          </h2>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="relative shrink-0" style={{ width: DONUT_SIZE, height: DONUT_SIZE }}>
              <svg viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`} className="w-full h-full -rotate-90">
                <circle
                  cx={DONUT_SIZE / 2} cy={DONUT_SIZE / 2} r={DONUT_R}
                  fill="none" stroke="#F3F4F6" strokeWidth={DONUT_STROKE}
                />
                {(() => {
                  let offset = 0;
                  return donutData.slices.map((s) => {
                    const len = (s.pct / 100) * CIRC;
                    const el = (
                      <circle
                        key={s.id}
                        cx={DONUT_SIZE / 2} cy={DONUT_SIZE / 2} r={DONUT_R}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={DONUT_STROKE}
                        strokeDasharray={`${len} ${CIRC - len}`}
                        strokeDashoffset={-offset}
                        strokeLinecap="butt"
                      />
                    );
                    offset += len;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 tabular-nums">{donutData.total}</span>
                <span className="text-[10px] text-gray-400">คลิกรวม</span>
              </div>
            </div>
            <div className="flex-1 min-w-[180px] space-y-1.5">
              {donutData.slices.map((s) => (
                <div key={s.id} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-700 flex-1 truncate">{s.label}</span>
                  <span className="text-gray-900 font-semibold tabular-nums">{s.value}</span>
                  <span className="text-gray-400 w-10 text-right tabular-nums">{s.pct.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Week-over-week */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 size={16} className="text-emerald-500" /> สัปดาห์นี้ vs สัปดาห์ก่อน
            </h2>
            {wowData.totalPrev > 0 && (() => {
              const change = ((wowData.totalThis - wowData.totalPrev) / wowData.totalPrev) * 100;
              const positive = change >= 0;
              return (
                <span className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full ${
                  positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                }`}>
                  {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {positive ? '+' : ''}{change.toFixed(0)}% รวม
                </span>
              );
            })()}
          </div>
          <p className="text-[11px] text-gray-400 mb-4">
            <span className="inline-flex items-center gap-1 mr-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> สัปดาห์นี้ ({wowData.totalThis})
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-gray-300" /> สัปดาห์ก่อน ({wowData.totalPrev})
            </span>
          </p>

          {wowData.rows.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-xs">ยังไม่มีคลิกใน 14 วันล่าสุด</div>
          ) : (
            <div className="space-y-3">
              {wowData.rows.map((r) => {
                const thisPct = (r.thisWeek / wowData.maxVal) * 100;
                const prevPct = (r.prevWeek / wowData.maxVal) * 100;
                const isInf = !isFinite(r.change);
                const isFlat = r.thisWeek === 0 && r.prevWeek === 0;
                const positive = r.change >= 0 && !isFlat;
                return (
                  <div key={r.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.def.color }} />
                        {r.def.label}
                      </div>
                      <div className={`text-[11px] font-semibold flex items-center gap-0.5 ${
                        isFlat ? 'text-gray-400' : positive ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        {isFlat ? <Minus size={10} /> : positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {isFlat ? '—' : isInf ? 'ใหม่' : `${positive ? '+' : ''}${r.change.toFixed(0)}%`}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-gray-50 rounded-sm overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-sm transition-all" style={{ width: `${thisPct}%` }} />
                        </div>
                        <span className="text-[11px] font-semibold text-gray-700 w-8 text-right tabular-nums">{r.thisWeek}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-gray-50 rounded-sm overflow-hidden">
                          <div className="h-full bg-gray-300 rounded-sm transition-all" style={{ width: `${prevPct}%` }} />
                        </div>
                        <span className="text-[11px] text-gray-400 w-8 text-right tabular-nums">{r.prevWeek}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
