import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Eye, MousePointerClick, Link2, TrendingUp,
  ArrowLeft, ExternalLink, BarChart3, Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LinkClick {
  linkId: string;
  linkTitle: string;
  linkUrl: string;
  timestamp: string;
}

interface AnalyticsData {
  pageViews: number;
  linkClicks: LinkClick[];
  viewHistory: string[]; // ISO date strings
}

function getAnalytics(): AnalyticsData {
  const raw = localStorage.getItem('openbio_analytics');
  if (raw) return JSON.parse(raw);
  return { pageViews: 0, linkClicks: [], viewHistory: [] };
}

function getClicksPerLink(clicks: LinkClick[]): Record<string, { title: string; url: string; count: number }> {
  const map: Record<string, { title: string; url: string; count: number }> = {};
  clicks.forEach((c) => {
    if (!map[c.linkId]) {
      map[c.linkId] = { title: c.linkTitle, url: c.linkUrl, count: 0 };
    }
    map[c.linkId].count++;
  });
  return map;
}

function getClicksToday(clicks: LinkClick[]): number {
  const today = new Date().toDateString();
  return clicks.filter((c) => new Date(c.timestamp).toDateString() === today).length;
}

function getViewsToday(views: string[]): number {
  const today = new Date().toDateString();
  return views.filter((v) => new Date(v).toDateString() === today).length;
}

function getLast7DaysData(clicks: LinkClick[], views: string[]) {
  const days: { label: string; clicks: number; views: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toDateString();
    const shortLabel = d.toLocaleDateString('th-TH', { weekday: 'short' });
    days.push({
      label: shortLabel,
      clicks: clicks.filter((c) => new Date(c.timestamp).toDateString() === dateStr).length,
      views: views.filter((v) => new Date(v).toDateString() === dateStr).length,
    });
  }
  return days;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>(getAnalytics());

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const interval = setInterval(() => {
      setAnalytics(getAnalytics());
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoggedIn, navigate]);

  const clicksPerLink = getClicksPerLink(analytics.linkClicks);
  const totalClicks = analytics.linkClicks.length;
  const totalViews = analytics.pageViews;
  const clicksToday = getClicksToday(analytics.linkClicks);
  const viewsToday = getViewsToday(analytics.viewHistory);
  const last7Days = getLast7DaysData(analytics.linkClicks, analytics.viewHistory);
  const maxBarValue = Math.max(...last7Days.map((d) => d.clicks + d.views), 1);

  const sortedLinks = Object.entries(clicksPerLink).sort((a, b) => b[1].count - a[1].count);

  // Recent clicks (last 10)
  const recentClicks = [...analytics.linkClicks].reverse().slice(0, 10);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Analytics & Statistics</p>
          </div>
          <button
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Editor
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Clicks', value: totalClicks, icon: MousePointerClick, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Views Today', value: viewsToday, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Clicks Today', value: clicksToday, icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart - Last 7 Days */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8"
        >
          <h2 className="text-base font-semibold text-gray-900 mb-1">Last 7 Days</h2>
          <p className="text-xs text-gray-400 mb-6">Views and clicks overview</p>

          <div className="flex items-center gap-4 mb-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-blue-500" />
              <span className="text-gray-500">Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-purple-500" />
              <span className="text-gray-500">Clicks</span>
            </div>
          </div>

          <div className="flex items-end gap-2 h-40">
            {last7Days.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '120px', justifyContent: 'flex-end' }}>
                  <div
                    className="w-full max-w-[28px] bg-blue-500 rounded-t-md transition-all duration-500"
                    style={{ height: `${Math.max((day.views / maxBarValue) * 100, day.views > 0 ? 8 : 0)}%` }}
                    title={`${day.views} views`}
                  />
                  <div
                    className="w-full max-w-[28px] bg-purple-500 rounded-b-md transition-all duration-500"
                    style={{ height: `${Math.max((day.clicks / maxBarValue) * 100, day.clicks > 0 ? 8 : 0)}%` }}
                    title={`${day.clicks} clicks`}
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{day.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Per-Link Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Link2 size={18} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-900">Clicks per Link</h2>
            </div>

            {sortedLinks.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <MousePointerClick size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No clicks recorded yet</p>
                <p className="text-xs mt-1">Share your link to start tracking!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedLinks.map(([id, data]) => {
                  const pct = totalClicks > 0 ? (data.count / totalClicks) * 100 : 0;
                  return (
                    <div key={id} className="group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                          {data.title}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {data.count} <span className="text-xs text-gray-400 font-normal">clicks</span>
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-gray-400" />
              <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            </div>

            {recentClicks.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <Clock size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No activity yet</p>
                <p className="text-xs mt-1">Clicks will appear here in real-time</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
                {recentClicks.map((click, i) => {
                  const time = new Date(click.timestamp);
                  const timeStr = time.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
                  const dateStr = time.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <ExternalLink size={14} className="text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{click.linkTitle}</p>
                        <p className="text-[11px] text-gray-400 truncate">{click.linkUrl}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11px] text-gray-500">{timeStr}</p>
                        <p className="text-[10px] text-gray-400">{dateStr}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
