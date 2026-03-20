import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye, MousePointerClick, Link2, TrendingUp, TrendingDown,
  ArrowLeft, ExternalLink, BarChart3, Clock, Copy, Check,
  QrCode, Share2, Sparkles, Activity, Percent, Users,
  Zap, ArrowUpRight, Trash2, RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import pb, { isPocketBaseEnabled } from '../lib/pb';


interface LinkClick {
  linkId: string;
  linkTitle: string;
  linkUrl: string;
  timestamp: string;
}

interface AnalyticsData {
  pageViews: number;
  linkClicks: LinkClick[];
  viewHistory: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────
function getAnalytics(): AnalyticsData {
  try {
    const raw = localStorage.getItem('openbio_analytics');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { pageViews: 0, linkClicks: [], viewHistory: [] };
}

function getClicksPerLink(clicks: LinkClick[]) {
  const map: Record<string, { title: string; url: string; count: number }> = {};
  clicks.forEach((c) => {
    if (!map[c.linkId]) {
      map[c.linkId] = { title: c.linkTitle, url: c.linkUrl, count: 0 };
    }
    map[c.linkId].count++;
  });
  return map;
}

function getCountForDate(items: { timestamp?: string }[] | string[], dateStr: string): number {
  return items.filter((item) => {
    const ts = typeof item === 'string' ? item : item.timestamp;
    return ts && new Date(ts).toDateString() === dateStr;
  }).length;
}

function getLast7DaysData(clicks: LinkClick[], views: string[]) {
  const days: { label: string; shortDate: string; clicks: number; views: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toDateString();
    days.push({
      label: d.toLocaleDateString('th-TH', { weekday: 'short' }),
      shortDate: d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
      clicks: getCountForDate(clicks, dateStr),
      views: getCountForDate(views, dateStr),
    });
  }
  return days;
}

function generateDemoData(): AnalyticsData {
  const linkTemplates = [
    { id: '1', title: 'Portfolio Website', url: 'https://portfolio.dev' },
    { id: '2', title: 'GitHub Profile', url: 'https://github.com/user' },
    { id: '3', title: 'Twitter / X', url: 'https://x.com/user' },
    { id: '4', title: 'YouTube Channel', url: 'https://youtube.com/@user' },
    { id: '5', title: 'Blog', url: 'https://blog.dev' },
    { id: '6', title: 'Discord Server', url: 'https://discord.gg/invite' },
  ];

  const clicks: LinkClick[] = [];
  const views: string[] = [];

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dailyViews = Math.floor(Math.random() * 40) + 10;
    for (let v = 0; v < dailyViews; v++) {
      const h = Math.floor(Math.random() * 24);
      const m = Math.floor(Math.random() * 60);
      const viewDate = new Date(date);
      viewDate.setHours(h, m, Math.floor(Math.random() * 60));
      views.push(viewDate.toISOString());
    }

    const dailyClicks = Math.floor(Math.random() * 15) + 3;
    for (let c = 0; c < dailyClicks; c++) {
      const link = linkTemplates[Math.floor(Math.random() * linkTemplates.length)];
      const h = Math.floor(Math.random() * 24);
      const m = Math.floor(Math.random() * 60);
      const clickDate = new Date(date);
      clickDate.setHours(h, m, Math.floor(Math.random() * 60));
      clicks.push({
        linkId: link.id,
        linkTitle: link.title,
        linkUrl: link.url,
        timestamp: clickDate.toISOString(),
      });
    }
  }

  return {
    pageViews: views.length,
    linkClicks: clicks,
    viewHistory: views,
  };
}

// ─── Stat Card ───────────────────────────────────────────────────
function StatCard({
  label, value, icon: Icon, color, bg, gradient, trend, delay,
}: {
  label: string; value: number; icon: typeof Eye;
  color: string; bg: string; gradient: string;
  trend?: number; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 24 }}
      className="relative group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />
      <div className="relative">
        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-3`}>
          <Icon size={20} className={color} />
        </div>
        <p className="text-2xl font-bold text-gray-900 tabular-nums">{value.toLocaleString()}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500">{label}</p>
          {trend !== undefined && trend !== 0 && (
            <div className={`flex items-center gap-0.5 text-[11px] font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


function ChartBar({
  day, maxVal, index,
}: {
  day: { label: string; shortDate: string; clicks: number; views: number };
  maxVal: number; index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const viewH = maxVal > 0 ? Math.max((day.views / maxVal) * 100, day.views > 0 ? 10 : 0) : 0;
  const clickH = maxVal > 0 ? Math.max((day.clicks / maxVal) * 100, day.clicks > 0 ? 10 : 0) : 0;

  return (
    <div
      className="flex-1 flex flex-col items-center gap-1 relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -top-16 bg-gray-900 text-white text-[11px] rounded-lg px-3 py-2 shadow-lg z-10 whitespace-nowrap pointer-events-none"
          >
            <p className="font-medium">{day.shortDate}</p>
            <p className="text-blue-300">{day.views} เข้าชม</p>
            <p className="text-purple-300">{day.clicks} คลิก</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex gap-1 items-end justify-center" style={{ height: '130px' }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${viewH}%` }}
          transition={{ duration: 0.6, delay: index * 0.06, ease: 'easeOut' }}
          className="w-full max-w-[16px] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md cursor-pointer hover:from-blue-600 hover:to-blue-500 transition-colors"
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${clickH}%` }}
          transition={{ duration: 0.6, delay: index * 0.06 + 0.1, ease: 'easeOut' }}
          className="w-full max-w-[16px] bg-gradient-to-t from-violet-500 to-purple-400 rounded-t-md cursor-pointer hover:from-violet-600 hover:to-purple-500 transition-colors"
        />
      </div>
      <span className="text-[11px] text-gray-400 mt-1 font-medium">{day.label}</span>
    </div>
  );
}

// ─── Main Dashboard Component ────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();
  const { isLoggedIn, username, user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({ pageViews: 0, linkClicks: [], viewHistory: [] });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'links'>('overview');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch analytics from PocketBase
    if (user?.id && isPocketBaseEnabled) {
      (async () => {
        try {
          const pages = await pb.collection('pages').getList(1, 1, {
            filter: `user = "${user.id}"`,
          });
          if (pages.items.length > 0) {
            const page = pages.items[0];
            const pageId = page.id;
            // Use displayName from PocketBase for consistent URL
            if (page.displayName) setDisplayName(page.displayName);
            const allAnalytics = await pb.collection('analytics').getFullList({
              filter: `page = "${pageId}"`,
              sort: '-created',
            });
            const views = allAnalytics.filter((a: any) => a.type === 'view');
            const clicks = allAnalytics.filter((a: any) => a.type === 'click');
            setAnalytics({
              pageViews: views.length,
              linkClicks: clicks.map((c: any) => ({
                linkId: c.linkId || '',
                linkTitle: c.linkTitle || '',
                linkUrl: c.linkUrl || '',
                timestamp: c.created,
              })),
              viewHistory: views.map((v: any) => v.created),
            });
          }
        } catch (err) {
          console.error('Failed to fetch analytics:', err);
          // Fallback to localStorage
          setAnalytics(getAnalytics());
        }
      })();
    } else {
      setAnalytics(getAnalytics());
    }
  }, [isLoggedIn, navigate, user?.id]);

  // ── Computed data ──
  const clicksPerLink = useMemo(() => getClicksPerLink(analytics.linkClicks), [analytics.linkClicks]);
  const totalClicks = analytics.linkClicks.length;
  const totalViews = analytics.pageViews;
  const ctr = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;

  const today = new Date().toDateString();
  const yesterday = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toDateString(); })();

  const clicksToday = getCountForDate(analytics.linkClicks, today);
  const viewsToday = getCountForDate(analytics.viewHistory, today);
  const clicksYesterday = getCountForDate(analytics.linkClicks, yesterday);
  const viewsYesterday = getCountForDate(analytics.viewHistory, yesterday);

  const viewsTrend = viewsYesterday > 0 ? Math.round(((viewsToday - viewsYesterday) / viewsYesterday) * 100) : 0;
  const clicksTrend = clicksYesterday > 0 ? Math.round(((clicksToday - clicksYesterday) / clicksYesterday) * 100) : 0;

  const last7Days = useMemo(() => getLast7DaysData(analytics.linkClicks, analytics.viewHistory), [analytics]);
  const maxBarValue = Math.max(...last7Days.map((d) => Math.max(d.clicks, d.views)), 1);

  const sortedLinks = (Object.entries(clicksPerLink) as [string, { title: string; url: string; count: number }][]).sort((a, b) => b[1].count - a[1].count);
  const recentClicks = [...analytics.linkClicks].reverse().slice(0, 15);

  const totalUniqueLinks = Object.keys(clicksPerLink).length;

  const hasData = totalViews > 0 || totalClicks > 0;

  const pageSlug = displayName || username || 'preview';

  // ── Actions ──
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  const handleCopyLink = async () => {
    const link = `${siteUrl}/${pageSlug}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateDemo = () => {
    const demo = generateDemoData();
    localStorage.setItem('openbio_analytics', JSON.stringify(demo));
    setAnalytics(demo);
  };

  const handleClearData = () => {
    localStorage.removeItem('openbio_analytics');
    setAnalytics({ pageViews: 0, linkClicks: [], viewHistory: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-200">
                {(username || 'U')[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">แดชบอร์ด</h1>
                <p className="text-gray-400 text-sm">
                  สวัสดี, <span className="text-gray-600 font-medium">{username || 'User'}</span> — นี่คือภาพรวมของคุณ
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded-xl hover:bg-violet-100 transition-colors"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
            </button>
            <button
              onClick={() => window.open(`/${pageSlug}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-sm shadow-violet-200"
            >
              <ExternalLink size={15} />
              ดูหน้าเพจ
            </button>
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={15} />
              แก้ไข
            </button>
          </div>
        </motion.div>

        {/* ── Empty State with Demo ── */}
        {!hasData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-5">
              <BarChart3 size={36} className="text-violet-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">ยังไม่มีข้อมูล Analytics</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              แชร์ลิงก์โปรไฟล์ของคุณเพื่อเริ่มเก็บข้อมูล หรือลองดูด้วยข้อมูลตัวอย่าง
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={handleGenerateDemo}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-md shadow-violet-200"
              >
                <Sparkles size={16} />
                ลองใช้ข้อมูลตัวอย่าง
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded-xl hover:bg-violet-100 transition-colors"
              >
                <Share2 size={16} />
                แชร์ลิงก์
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Stats Cards ── */}
        {hasData && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard label="ยอดเข้าชมทั้งหมด" value={totalViews} icon={Eye} color="text-blue-600" bg="bg-blue-50" gradient="bg-gradient-to-br from-blue-50/50 to-transparent" delay={0} />
              <StatCard label="ยอดคลิกทั้งหมด" value={totalClicks} icon={MousePointerClick} color="text-violet-600" bg="bg-violet-50" gradient="bg-gradient-to-br from-violet-50/50 to-transparent" delay={0.06} />
              <StatCard label="เข้าชมวันนี้" value={viewsToday} icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" gradient="bg-gradient-to-br from-emerald-50/50 to-transparent" trend={viewsTrend} delay={0.12} />
              <StatCard label="คลิกวันนี้" value={clicksToday} icon={Zap} color="text-amber-600" bg="bg-amber-50" gradient="bg-gradient-to-br from-amber-50/50 to-transparent" trend={clicksTrend} delay={0.18} />
              <StatCard label="CTR" value={ctr} icon={Percent} color="text-pink-600" bg="bg-pink-50" gradient="bg-gradient-to-br from-pink-50/50 to-transparent" delay={0.24} />
            </div>

            {/* ── Quick Stats Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm text-sm">
                <Link2 size={15} className="text-violet-500" />
                <span className="text-gray-500">ลิงก์ที่ใช้งาน</span>
                <span className="font-bold text-gray-900">{totalUniqueLinks}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm text-sm">
                <Activity size={15} className="text-blue-500" />
                <span className="text-gray-500">เข้าชมเฉลี่ย/วัน</span>
                <span className="font-bold text-gray-900">
                  {analytics.viewHistory.length > 0
                    ? Math.round(analytics.viewHistory.length / 7)
                    : 0}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm text-sm">
                <Users size={15} className="text-emerald-500" />
                <span className="text-gray-500">คลิกเฉลี่ย/วัน</span>
                <span className="font-bold text-gray-900">
                  {analytics.linkClicks.length > 0
                    ? Math.round(analytics.linkClicks.length / 7)
                    : 0}
                </span>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleGenerateDemo}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  title="โหลดข้อมูลตัวอย่าง"
                >
                  <RefreshCw size={13} />
                  ตัวอย่าง
                </button>
                <button
                  onClick={handleClearData}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-500 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                  title="ล้างข้อมูลทั้งหมด"
                >
                  <Trash2 size={13} />
                  ล้าง
                </button>
              </div>
            </motion.div>

            {/* ── Tabs ── */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
              {(['overview', 'links'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'overview' ? 'ภาพรวม' : 'ประสิทธิภาพลิงก์'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* ── Chart - Last 7 Days ── */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">7 วันล่าสุด</h2>
                        <p className="text-xs text-gray-400 mt-0.5">ภาพรวม Views และ Clicks</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-500 to-blue-400" />
                          <span className="text-gray-500">Views</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-violet-500 to-purple-400" />
                          <span className="text-gray-500">Clicks</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end gap-3 h-44">
                      {last7Days.map((day, i) => (
                        <ChartBar key={i} day={day} maxVal={maxBarValue} index={i} />
                      ))}
                    </div>

                    {/* Summary row */}
                    <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-50">
                      <div className="text-xs text-gray-400">
                        รวม 7 วัน:{' '}
                        <span className="font-semibold text-blue-600">
                          {last7Days.reduce((s, d) => s + d.views, 0)} เข้าชม
                        </span>
                        {' / '}
                        <span className="font-semibold text-violet-600">
                          {last7Days.reduce((s, d) => s + d.clicks, 0)} คลิก
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Recent Activity ── */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                      <Clock size={18} className="text-gray-400" />
                      <h2 className="text-base font-semibold text-gray-900">กิจกรรมล่าสุด</h2>
                      <span className="text-xs text-gray-400 ml-auto">{recentClicks.length} รายการล่าสุด</span>
                    </div>

                    {recentClicks.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Clock size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">ยังไม่มีกิจกรรม</p>
                        <p className="text-xs mt-1">เมื่อมีคนคลิกลิงก์ จะแสดงที่นี่แบบ Real-time</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                        {recentClicks.map((click, i) => {
                          const time = new Date(click.timestamp);
                          const timeStr = time.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
                          const dateStr = time.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
                          return (
                            <motion.div
                              key={`${click.timestamp}-${i}`}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/80 transition-colors group"
                            >
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                                <ArrowUpRight size={15} className="text-violet-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{click.linkTitle}</p>
                                <p className="text-[11px] text-gray-400 truncate">{click.linkUrl}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-[11px] font-medium text-gray-500">{timeStr}</p>
                                <p className="text-[10px] text-gray-400">{dateStr}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'links' && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* ── Link Performance ── */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                      <Link2 size={18} className="text-violet-500" />
                      <h2 className="text-base font-semibold text-gray-900">ประสิทธิภาพลิงก์</h2>
                      <span className="text-xs text-gray-400 ml-auto">{sortedLinks.length} ลิงก์ที่ติดตาม</span>
                    </div>

                    {sortedLinks.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <MousePointerClick size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">ยังไม่มีข้อมูลคลิก</p>
                        <p className="text-xs mt-1">แชร์ลิงก์ของคุณเพื่อเริ่มเก็บสถิติ!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Table header */}
                        <div className="grid grid-cols-12 gap-4 text-xs text-gray-400 font-medium px-1 pb-2 border-b border-gray-50">
                          <div className="col-span-1">#</div>
                          <div className="col-span-5">ลิงก์</div>
                          <div className="col-span-3">ประสิทธิภาพ</div>
                          <div className="col-span-2 text-right">คลิก</div>
                          <div className="col-span-1 text-right">%</div>
                        </div>

                        {sortedLinks.map(([id, data], i) => {
                          const pct = totalClicks > 0 ? (data.count / totalClicks) * 100 : 0;
                          const rankColors = [
                            'bg-gradient-to-r from-amber-400 to-yellow-400 text-white',
                            'bg-gradient-to-r from-gray-300 to-gray-400 text-white',
                            'bg-gradient-to-r from-orange-300 to-amber-400 text-white',
                          ];
                          return (
                            <motion.div
                              key={id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="grid grid-cols-12 gap-4 items-center px-1 py-2.5 rounded-xl hover:bg-gray-50/70 transition-colors group"
                            >
                              <div className="col-span-1">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                                  i < 3 ? rankColors[i] : 'bg-gray-100 text-gray-500'
                                }`}>
                                  {i + 1}
                                </div>
                              </div>
                              <div className="col-span-5 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{data.title}</p>
                                <p className="text-[11px] text-gray-400 truncate">{data.url}</p>
                              </div>
                              <div className="col-span-3">
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                                  />
                                </div>
                              </div>
                              <div className="col-span-2 text-right">
                                <span className="text-sm font-bold text-gray-900">{data.count}</span>
                              </div>
                              <div className="col-span-1 text-right">
                                <span className="text-xs font-medium text-gray-500">{pct.toFixed(1)}%</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Quick Links Footer ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <span className="text-xs text-gray-400 mr-1">ทางลัด:</span>
              <button
                onClick={() => navigate('/qr-code')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <QrCode size={13} /> QR Code
              </button>
              <button
                onClick={() => navigate('/link-shortener')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Link2 size={13} /> ย่อลิงก์
              </button>
              <button
                onClick={() => navigate('/admin/audience/contacts')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users size={13} /> ผู้ติดตาม
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Sparkles size={13} /> เทมเพลต
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
