import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Search, Music, Video, ShoppingBag, TrendingUp, Star,
  ExternalLink, Sparkles, DollarSign, Users, ArrowRight,
  Headphones, Share2, MessageCircle, CreditCard, Gift,
  BarChart3, Zap, Globe, Podcast, Camera, ShoppingCart, Heart,
  Grid3X3, ChevronRight, Download, Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  { id: 'all', label: 'All Apps', icon: Grid3X3 },
  { id: 'content', label: 'Share Content', icon: Share2 },
  { id: 'money', label: 'Make Money', icon: DollarSign },
  { id: 'grow', label: 'Grow Audience', icon: TrendingUp },
];

const apps = [
  { name: 'Spotify', desc: 'Share tracks, albums, and playlists directly on your OpenBio.', category: 'content', icon: Headphones, color: '#1DB954', tag: 'Popular', featured: true, installs: '2.4M' },
  { name: 'YouTube', desc: 'Embed and showcase your latest videos for visitors to watch.', category: 'content', icon: Video, color: '#FF0000', tag: 'Popular', featured: true, installs: '3.1M' },
  { name: 'SoundCloud', desc: 'Stream your tracks right from your profile page.', category: 'content', icon: Music, color: '#FF5500', installs: '890K' },
  { name: 'TikTok', desc: 'Feature your best TikTok videos on your OpenBio.', category: 'content', icon: Video, color: '#000000', tag: 'Trending', installs: '1.8M' },
  { name: 'Twitch', desc: 'Show your live stream status and embed your channel.', category: 'content', icon: Camera, color: '#9146FF', installs: '620K' },
  { name: 'Podcast Player', desc: 'Embed your latest podcast episodes for easy listening.', category: 'content', icon: Podcast, color: '#8B5CF6', installs: '340K' },
  { name: 'Instagram Feed', desc: 'Display your latest Instagram posts in a beautiful grid.', category: 'content', icon: Camera, color: '#E1306C', tag: 'Popular', installs: '2.8M' },
  { name: 'Pinterest Boards', desc: 'Showcase your curated Pinterest boards and pins.', category: 'content', icon: Heart, color: '#E60023', installs: '410K' },
  { name: 'Shopify', desc: 'Sell products directly from your OpenBio profile.', category: 'money', icon: ShoppingBag, color: '#96BF48', tag: 'Popular', featured: true, installs: '1.5M' },
  { name: 'PayPal', desc: 'Accept tips, donations, and payments instantly.', category: 'money', icon: CreditCard, color: '#003087', installs: '980K' },
  { name: 'GoFundMe', desc: 'Share your fundraising campaigns with supporters.', category: 'money', icon: Gift, color: '#00B964', installs: '230K' },
  { name: 'Spring', desc: 'Sell custom merch — t-shirts, mugs, and more.', category: 'money', icon: ShoppingCart, color: '#FF6B6B', installs: '560K' },
  { name: 'Ko-fi', desc: 'Let your fans support you with one-time donations.', category: 'money', icon: Heart, color: '#FF5E5B', installs: '710K' },
  { name: 'Gumroad', desc: 'Sell digital products, courses, and memberships.', category: 'money', icon: DollarSign, color: '#FF90E8', tag: 'New', installs: '440K' },
  { name: 'Typeform', desc: 'Create beautiful surveys and collect feedback.', category: 'grow', icon: MessageCircle, color: '#262627', installs: '520K' },
  { name: 'SMS Subscribers', desc: 'Collect phone numbers and grow your SMS list.', category: 'grow', icon: MessageCircle, color: '#10B981', tag: 'New', installs: '180K' },
  { name: 'Email Signup', desc: 'Build your mailing list with embedded signup forms.', category: 'grow', icon: Users, color: '#6366F1', tag: 'Popular', featured: true, installs: '1.9M' },
  { name: 'Gleam', desc: 'Run giveaways and competitions to boost engagement.', category: 'grow', icon: Gift, color: '#1EAAF1', installs: '290K' },
  { name: 'Analytics Pro', desc: 'Deep insights into your audience and link performance.', category: 'grow', icon: BarChart3, color: '#F59E0B', installs: '870K' },
  { name: 'Zapier', desc: 'Automate workflows and connect 5,000+ apps.', category: 'grow', icon: Zap, color: '#FF4A00', installs: '650K' },
  { name: 'Calendly', desc: 'Let visitors book meetings directly from your profile.', category: 'grow', icon: Globe, color: '#006BFF', installs: '730K' },
  { name: 'Discord', desc: 'Invite fans to your Discord server with one click.', category: 'grow', icon: MessageCircle, color: '#5865F2', installs: '1.1M' },
];

const featuredApps = apps.filter((a) => a.featured);
const editorsPickIds = ['Calendly', 'Ko-fi', 'TikTok', 'Analytics Pro'];
const editorsPicks = apps.filter((a) => editorsPickIds.includes(a.name));

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const { isLoggedIn } = useAuth();

  const filtered = apps.filter((app) => {
    const matchCat = activeCategory === 'all' || app.category === activeCategory;
    const matchSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleInstall = (name: string) => {
    setInstalledApps((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full mb-6 border border-white/10">
              <Sparkles size={14} className="text-yellow-400" /> 22+ integrations available
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-5 leading-tight">
              Discover apps for your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">OpenBio</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              Share content, make money, and grow your audience with powerful integrations.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/50 transition-all text-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <svg className="w-full -mb-1" viewBox="0 0 1440 60" fill="none">
          <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#fafaf9" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Featured Apps - Horizontal scroll */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 -mt-2"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Star size={20} className="text-yellow-500" /> Featured
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredApps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="group relative rounded-2xl p-5 border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-opacity group-hover:opacity-30" style={{ backgroundColor: app.color }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: app.color }}>
                      <app.icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{app.name}</h3>
                      <p className="text-[11px] text-gray-400">{app.installs} installs</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{app.desc}</p>
                  <button
                    onClick={() => toggleInstall(app.name)}
                    className={`w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      installedApps.includes(app.name)
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {installedApps.includes(app.name) ? 'Installed' : 'Add to OpenBio'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Editor's Picks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Sparkles size={20} className="text-purple-500" /> Editor's Picks
          </h2>
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 border border-purple-100/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {editorsPicks.map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: app.color }}>
                      <app.icon size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{app.name}</h4>
                      <p className="text-[11px] text-gray-400">{app.installs} installs</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{app.desc}</p>
                  <button
                    onClick={() => toggleInstall(app.name)}
                    className={`text-xs font-semibold transition-colors ${
                      installedApps.includes(app.name)
                        ? 'text-gray-400'
                        : 'text-purple-600 hover:text-purple-700'
                    }`}
                  >
                    {installedApps.includes(app.name) ? 'Installed' : '+ Add'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Category Tabs + All Apps */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Browse All</h2>
            <p className="text-sm text-gray-400">{filtered.length} app{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                <cat.icon size={15} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((app, i) => {
                const installed = installedApps.includes(app.name);
                return (
                  <motion.div
                    key={app.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: app.color }}
                      >
                        <app.icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-gray-900 truncate">{app.name}</h3>
                          {app.tag && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${
                              app.tag === 'Popular' ? 'bg-amber-100 text-amber-700' :
                              app.tag === 'Trending' ? 'bg-purple-100 text-purple-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {app.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{app.installs} installs</p>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{app.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Free</span>
                      <button
                        onClick={() => toggleInstall(app.name)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                          installed
                            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {installed ? (
                          <>Installed</>
                        ) : (
                          <><Plus size={14} /> Add</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty */}
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <Search size={40} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-1">No apps found</p>
              <p className="text-gray-300 text-sm mb-4">Try a different search or category</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 sm:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Build your own Link App
              </h2>
              <p className="text-white/50 text-base max-w-lg">
                Partner with OpenBio and reach millions of creators. Build integrations that help creators share, sell, and grow.
              </p>
            </div>
            <Link
              to={isLoggedIn ? '/create' : '/signup'}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              Become a partner <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
