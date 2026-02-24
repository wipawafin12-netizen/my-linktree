import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Search, Music, Video, ShoppingBag, TrendingUp, Star,
  ExternalLink, Sparkles, DollarSign, Users, ArrowRight,
  Headphones, Share2, MessageCircle, CreditCard, Gift,
  BarChart3, Zap, Globe, Podcast, Camera, ShoppingCart, Heart,
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Apps', icon: Sparkles },
  { id: 'content', label: 'Share Your Content', icon: Share2 },
  { id: 'money', label: 'Make & Collect Money', icon: DollarSign },
  { id: 'grow', label: 'Grow Your Following', icon: TrendingUp },
];

const apps = [
  // ── Share Your Content ──
  {
    name: 'Spotify',
    desc: 'Share tracks, albums, and playlists directly on your OpenBio.',
    category: 'content',
    icon: Headphones,
    color: '#1DB954',
    bgImage: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&q=80',
    tag: 'Popular',
    featured: true,
  },
  {
    name: 'YouTube',
    desc: 'Embed and showcase your latest videos for visitors to watch.',
    category: 'content',
    icon: Video,
    color: '#FF0000',
    bgImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&q=80',
    tag: 'Popular',
    featured: true,
  },
  {
    name: 'SoundCloud',
    desc: 'Stream your tracks right from your profile page.',
    category: 'content',
    icon: Music,
    color: '#FF5500',
    bgImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80',
  },
  {
    name: 'TikTok',
    desc: 'Feature your best TikTok videos on your OpenBio.',
    category: 'content',
    icon: Video,
    color: '#000000',
    bgImage: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&q=80',
    tag: 'Trending',
  },
  {
    name: 'Twitch',
    desc: 'Show your live stream status and embed your channel.',
    category: 'content',
    icon: Camera,
    color: '#9146FF',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80',
  },
  {
    name: 'Podcast Player',
    desc: 'Embed your latest podcast episodes for easy listening.',
    category: 'content',
    icon: Podcast,
    color: '#8B5CF6',
    bgImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&q=80',
  },
  {
    name: 'Instagram Feed',
    desc: 'Display your latest Instagram posts in a beautiful grid.',
    category: 'content',
    icon: Camera,
    color: '#E1306C',
    bgImage: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&q=80',
    tag: 'Popular',
  },
  {
    name: 'Pinterest Boards',
    desc: 'Showcase your curated Pinterest boards and pins.',
    category: 'content',
    icon: Heart,
    color: '#E60023',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
  },

  // ── Make & Collect Money ──
  {
    name: 'Shopify',
    desc: 'Sell products directly from your OpenBio profile.',
    category: 'money',
    icon: ShoppingBag,
    color: '#96BF48',
    bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    tag: 'Popular',
    featured: true,
  },
  {
    name: 'PayPal',
    desc: 'Accept tips, donations, and payments instantly.',
    category: 'money',
    icon: CreditCard,
    color: '#003087',
    bgImage: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400&q=80',
  },
  {
    name: 'GoFundMe',
    desc: 'Share your fundraising campaigns with supporters.',
    category: 'money',
    icon: Gift,
    color: '#00B964',
    bgImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80',
  },
  {
    name: 'Spring',
    desc: 'Sell custom merch — t-shirts, mugs, and more.',
    category: 'money',
    icon: ShoppingCart,
    color: '#FF6B6B',
    bgImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
  },
  {
    name: 'Ko-fi',
    desc: 'Let your fans support you with one-time donations.',
    category: 'money',
    icon: Heart,
    color: '#FF5E5B',
    bgImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  },
  {
    name: 'Gumroad',
    desc: 'Sell digital products, courses, and memberships.',
    category: 'money',
    icon: DollarSign,
    color: '#FF90E8',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    tag: 'New',
  },

  // ── Grow Your Following ──
  {
    name: 'Typeform',
    desc: 'Create beautiful surveys and collect feedback.',
    category: 'grow',
    icon: MessageCircle,
    color: '#262627',
    bgImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
  },
  {
    name: 'SMS Subscribers',
    desc: 'Collect phone numbers and grow your SMS list.',
    category: 'grow',
    icon: MessageCircle,
    color: '#10B981',
    bgImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&q=80',
    tag: 'New',
  },
  {
    name: 'Email Signup',
    desc: 'Build your mailing list with embedded signup forms.',
    category: 'grow',
    icon: Users,
    color: '#6366F1',
    bgImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80',
    tag: 'Popular',
    featured: true,
  },
  {
    name: 'Gleam',
    desc: 'Run giveaways and competitions to boost engagement.',
    category: 'grow',
    icon: Gift,
    color: '#1EAAF1',
    bgImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80',
  },
  {
    name: 'Analytics Pro',
    desc: 'Deep insights into your audience and link performance.',
    category: 'grow',
    icon: BarChart3,
    color: '#F59E0B',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  },
  {
    name: 'Zapier',
    desc: 'Automate workflows and connect 5,000+ apps.',
    category: 'grow',
    icon: Zap,
    color: '#FF4A00',
    bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
  },
  {
    name: 'Calendly',
    desc: 'Let visitors book meetings directly from your profile.',
    category: 'grow',
    icon: Globe,
    color: '#006BFF',
    bgImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80',
  },
  {
    name: 'Discord',
    desc: 'Invite fans to your Discord server with one click.',
    category: 'grow',
    icon: MessageCircle,
    color: '#5865F2',
    bgImage: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&q=80',
  },
];

const featuredApps = apps.filter((a) => a.featured);

function AppCard({ app, index }: { app: typeof apps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Image Strip */}
      <div className="h-24 relative overflow-hidden">
        <img src={app.bgImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
        {app.tag && (
          <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm ${
            app.tag === 'Popular' ? 'bg-yellow-400/90 text-yellow-900' :
            app.tag === 'Trending' ? 'bg-purple-500/90 text-white' :
            'bg-emerald-500/90 text-white'
          }`}>
            {app.tag}
          </span>
        )}
      </div>

      {/* Icon + Content */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 -mt-8 ring-4 ring-white shadow-md"
            style={{ backgroundColor: app.color }}
          >
            <app.icon size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-black">{app.name}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{app.desc}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Free</span>
          <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-900 flex items-center gap-1 transition-colors">
            Install <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedCard({ app, index }: { app: typeof apps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative min-w-[300px] h-[200px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <img src={app.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: app.color }}>
            <app.icon size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{app.name}</h3>
            <p className="text-xs text-white/70 mt-0.5">{app.desc}</p>
          </div>
        </div>
      </div>
      {app.tag && (
        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
          {app.tag}
        </span>
      )}
    </motion.div>
  );
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = apps.filter((app) => {
    const matchCat = activeCategory === 'all' || app.category === activeCategory;
    const matchSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = [
    { value: '30+', label: 'Link Apps' },
    { value: '70M+', label: 'Creators' },
    { value: 'Free', label: 'To Install' },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full mb-5">
            <Sparkles size={14} /> Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Supercharge your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">OpenBio</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Browse Link Apps and integrations to share content, make money, and grow your audience — all from your OpenBio.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mb-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-14"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star size={18} className="text-yellow-500" /> Featured Apps
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
            {featuredApps.map((app, i) => (
              <FeaturedCard key={app.name} app={app} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps and integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900'
              }`}
            >
              <cat.icon size={15} />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            {filtered.length} app{filtered.length !== 1 ? 's' : ''} available
            {activeCategory !== 'all' && (
              <span> in <strong>{categories.find(c => c.id === activeCategory)?.label}</strong></span>
            )}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((app, i) => (
            <AppCard key={app.name} app={app} index={i} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-gray-400 text-lg">No apps found</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 rounded-3xl overflow-hidden relative"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
          </div>
          <div className="relative z-10 p-10 sm:p-14 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Build your own Link App
              </h2>
              <p className="text-white/70 text-base max-w-lg">
                Partner with OpenBio and reach millions of creators. Build integrations that help creators share, sell, and grow.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              Become a partner <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
