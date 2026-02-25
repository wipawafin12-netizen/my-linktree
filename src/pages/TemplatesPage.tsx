import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { Instagram, Music2, Twitter, Youtube, Search, Star, TrendingUp, Sparkles, ChevronLeft, ChevronRight, Rocket, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'All', 'Fashion', 'Health and Fitness', 'Influencer and Creator', 'Marketing',
  'Music', 'Small Business', 'Social Media', 'Sports', 'Telegram', 'Whatsapp',
  'Food & Drink', 'Technology', 'Art & Design', 'Education',
];

const templates = [
  {
    name: 'Hydra Juice',
    bio: 'Your daily dose of vitamin C',
    category: 'Food & Drink',
    bgImage: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80',
    overlay: 'from-[#3d4a32]/90 to-[#3d4a32]/70',
    avatarBg: '#3d5a1e',
    avatarText: 'Hydra',
    links: ['Our drinks', 'Find us', 'Wellbeings', 'Our latest Podcast'],
    linkStyle: 'bg-[#c8c3b4]/80 text-[#3d3d3d]',
    textColor: 'text-white',
    bioColor: 'text-white/70',
    tag: 'Popular',
  },
  {
    name: 'Katy Delma',
    bio: 'An innovative solar design practice that brings solar energy into daily life.',
    category: 'Influencer and Creator',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    overlay: 'from-[#1a6b6b]/85 to-[#2a8a8a]/60',
    avatarBg: '#2a8a8a',
    links: ['Travel Blog', 'Travel Tips', 'Hiking Equipment', 'Camera Equipment'],
    linkStyle: 'bg-white/90 text-gray-800',
    textColor: 'text-white',
    bioColor: 'text-white/80',
  },
  {
    name: 'Matthew Hugh',
    bio: 'Aspiring skater with a taste for cooking.',
    category: 'Sports',
    bgImage: 'https://images.unsplash.com/photo-1564296786785-89c8a7b12bfc?w=400&q=80',
    overlay: 'from-[#3a2a1a]/90 to-[#5a4a3a]/70',
    avatarBg: '#8a6a4a',
    links: ['Youtube Channel', 'Tiktok Account', 'Instagram'],
    linkStyle: 'bg-[#e8a87c]/80 text-[#3d2b1f]',
    textColor: 'text-white',
    bioColor: 'text-white/70',
  },
  {
    name: 'Luna Studio',
    bio: 'Creative photography & visual storytelling.',
    category: 'Art & Design',
    bgImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    overlay: 'from-[#0f3460]/90 to-[#1a1a2e]/80',
    avatarBg: '#e94560',
    avatarText: 'LS',
    links: ['Portfolio', 'Book a Session', 'Prints Shop', 'Behind the Lens'],
    linkStyle: 'bg-white/15 text-white border border-white/20',
    textColor: 'text-white',
    bioColor: 'text-white/60',
    tag: 'Trending',
  },
  {
    name: 'Bella Rose',
    bio: 'Beauty blogger & makeup artist based in LA.',
    category: 'Fashion',
    bgImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    overlay: 'from-[#f48fb1]/80 to-[#fce4ec]/60',
    avatarBg: '#e91e63',
    links: ['My Tutorials', 'Shop My Looks', 'Collabs', 'Book Me'],
    linkStyle: 'bg-white/90 text-[#880e4f]',
    textColor: 'text-[#880e4f]',
    bioColor: 'text-[#ad1457]',
    tag: 'Popular',
  },
  {
    name: 'FitCore',
    bio: 'Personal trainer & nutrition coach.',
    category: 'Health and Fitness',
    bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    overlay: 'from-black/90 to-black/75',
    avatarBg: '#ff6b00',
    avatarText: 'FC',
    links: ['Training Plans', 'Meal Prep Guide', 'Join Community', 'Free Ebook'],
    linkStyle: 'bg-[#ff6b00] text-white',
    textColor: 'text-white',
    bioColor: 'text-gray-400',
  },
  {
    name: 'Sakura Cafe',
    bio: 'Artisan coffee & Japanese pastries in NYC.',
    category: 'Food & Drink',
    bgImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    overlay: 'from-[#ffe0e6]/85 to-[#fff5f5]/70',
    avatarBg: '#d4a0a0',
    avatarText: '桜',
    links: ['Our Menu', 'Order Online', 'Catering', 'Gift Cards'],
    linkStyle: 'bg-[#d4a0a0]/25 text-[#8b5e5e] border border-[#d4a0a0]/40',
    textColor: 'text-[#5e3a3a]',
    bioColor: 'text-[#8b5e5e]',
    tag: 'New',
  },
  {
    name: 'DJ Nexus',
    bio: 'Electronic music producer & live performer.',
    category: 'Music',
    bgImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80',
    overlay: 'from-[#1a0a3e]/92 to-[#0d0221]/80',
    avatarBg: '#7b2ff7',
    avatarText: 'NX',
    links: ['Spotify', 'Soundcloud', 'Upcoming Shows', 'Merch Store'],
    linkStyle: 'bg-[#7b2ff7]/25 text-white border border-[#7b2ff7]/40',
    textColor: 'text-white',
    bioColor: 'text-purple-300/70',
    tag: 'Trending',
  },
  {
    name: 'GreenLeaf',
    bio: 'Sustainable living tips & eco-friendly products.',
    category: 'Small Business',
    bgImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    overlay: 'from-[#c8e6c9]/85 to-[#e8f5e9]/70',
    avatarBg: '#2e7d32',
    avatarText: '🌿',
    links: ['Eco Blog', 'Shop Green', 'Carbon Calculator', 'Community'],
    linkStyle: 'bg-white/80 text-[#2e7d32]',
    textColor: 'text-[#1b5e20]',
    bioColor: 'text-[#388e3c]',
  },
  {
    name: 'Alex Chen',
    bio: 'Full-stack developer & open source contributor.',
    category: 'Technology',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    overlay: 'from-[#0f172a]/93 to-[#1e293b]/85',
    avatarBg: '#38bdf8',
    avatarText: 'AC',
    links: ['GitHub', 'Dev Blog', 'Resume', 'Side Projects'],
    linkStyle: 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30',
    textColor: 'text-white',
    bioColor: 'text-slate-400',
    tag: 'Popular',
  },
  {
    name: 'Nomad Tales',
    bio: 'Traveling the world one city at a time.',
    category: 'Influencer and Creator',
    bgImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
    overlay: 'from-[#c44b2b]/80 to-[#ff9a56]/60',
    avatarBg: '#fff3e0',
    avatarText: '✈️',
    links: ['Travel Guides', 'Photo Diary', 'Gear List', 'Podcast'],
    linkStyle: 'bg-white/90 text-[#bf360c]',
    textColor: 'text-white',
    bioColor: 'text-white/80',
  },
  {
    name: 'Mia Waves',
    bio: 'Surf instructor & ocean conservation advocate.',
    category: 'Sports',
    bgImage: 'https://images.unsplash.com/photo-1502680390548-bdbac40f7154?w=400&q=80',
    overlay: 'from-[#006994]/80 to-[#48c9b0]/55',
    avatarBg: '#fff',
    avatarText: '🏄',
    links: ['Book Lessons', 'Surf Report', 'Ocean Cleanup', 'Shop'],
    linkStyle: 'bg-white/25 text-white border border-white/30',
    textColor: 'text-white',
    bioColor: 'text-white/70',
    tag: 'New',
  },
  {
    name: 'Velvet Records',
    bio: 'Independent record label. New sounds, bold artists.',
    category: 'Music',
    bgImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    overlay: 'from-[#4a0000]/92 to-[#800000]/78',
    avatarBg: '#ff1744',
    avatarText: 'VR',
    links: ['New Releases', 'Artist Roster', 'Submit Demo', 'Events'],
    linkStyle: 'bg-[#ff1744]/20 text-[#ff8a80] border border-[#ff1744]/30',
    textColor: 'text-white',
    bioColor: 'text-red-300/60',
  },
  {
    name: 'StyleHaus',
    bio: 'Curated fashion picks & outfit inspiration.',
    category: 'Fashion',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
    overlay: 'from-[#e8ddd4]/88 to-[#f5f0eb]/75',
    avatarBg: '#8d6e63',
    avatarText: 'SH',
    links: ['Shop Now', 'Lookbook', 'Style Quiz', 'New Arrivals'],
    linkStyle: 'bg-[#8d6e63]/15 text-[#5d4037] border border-[#8d6e63]/20',
    textColor: 'text-[#3e2723]',
    bioColor: 'text-[#6d4c41]',
    tag: 'Trending',
  },
  {
    name: 'Mindful Maya',
    bio: 'Yoga teacher & meditation guide. Breathe, move, grow.',
    category: 'Health and Fitness',
    bgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
    overlay: 'from-[#e6d5b8]/85 to-[#fdf6e3]/70',
    avatarBg: '#a1887f',
    avatarText: '🧘',
    links: ['Class Schedule', 'Online Courses', 'Retreat Info', 'Free Resources'],
    linkStyle: 'bg-[#a1887f]/15 text-[#5d4037] border border-[#a1887f]/25',
    textColor: 'text-[#4e342e]',
    bioColor: 'text-[#795548]',
  },
  {
    name: 'ByteBot',
    bio: 'AI tools & automation for your workflow.',
    category: 'Technology',
    bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
    overlay: 'from-[#0a192f]/93 to-[#1d3557]/82',
    avatarBg: '#64ffda',
    avatarText: 'BB',
    links: ['Try Free', 'Documentation', 'API Access', 'Changelog'],
    linkStyle: 'bg-[#64ffda]/12 text-[#64ffda] border border-[#64ffda]/20',
    textColor: 'text-white',
    bioColor: 'text-[#8892b0]',
    tag: 'New',
  },
  {
    name: 'Neon Nights',
    bio: 'Event promoter & nightlife curator in Miami.',
    category: 'Social Media',
    bgImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    overlay: 'from-[#24243e]/88 to-[#0f0c29]/75',
    avatarBg: '#ff00ff',
    avatarText: 'NN',
    links: ['Upcoming Events', 'VIP Tables', 'Guest List', 'Gallery'],
    linkStyle: 'bg-[#ff00ff]/15 text-white border border-[#ff00ff]/30',
    textColor: 'text-white',
    bioColor: 'text-purple-200/60',
  },
  {
    name: 'Chef Marco',
    bio: 'Italian chef sharing family recipes & kitchen secrets.',
    category: 'Food & Drink',
    bgImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80',
    overlay: 'from-[#4a1c1c]/88 to-[#6b2d2d]/72',
    avatarBg: '#ffb74d',
    avatarText: '👨‍🍳',
    links: ['Recipes', 'Cooking Classes', 'My Cookbook', 'Kitchen Tools'],
    linkStyle: 'bg-[#ffb74d]/20 text-[#ffe0b2] border border-[#ffb74d]/30',
    textColor: 'text-white',
    bioColor: 'text-orange-200/70',
  },
  {
    name: 'EduSpark',
    bio: 'Online tutoring & study resources for students.',
    category: 'Education',
    bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
    overlay: 'from-[#1a237e]/90 to-[#3949ab]/78',
    avatarBg: '#ffd740',
    avatarText: '📚',
    links: ['Courses', 'Study Guides', 'Tutoring', 'Community'],
    linkStyle: 'bg-white/15 text-white border border-white/20',
    textColor: 'text-white',
    bioColor: 'text-blue-200/70',
  },
  {
    name: 'Pixel Art Co.',
    bio: 'Digital art studio & NFT collection.',
    category: 'Art & Design',
    bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    overlay: 'from-[#212121]/90 to-[#424242]/78',
    avatarBg: '#76ff03',
    avatarText: 'PX',
    links: ['Gallery', 'Mint NFT', 'Commission', 'Discord'],
    linkStyle: 'bg-[#76ff03]/12 text-[#76ff03] border border-[#76ff03]/25',
    textColor: 'text-white',
    bioColor: 'text-gray-400',
  },
  {
    name: 'Telegram Hub',
    bio: 'Curated Telegram channels & community groups.',
    category: 'Telegram',
    bgImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    overlay: 'from-[#006699]/90 to-[#0088cc]/75',
    avatarBg: '#fff',
    avatarText: '✈️',
    links: ['Join Channel', 'Group Chat', 'Bot Tools', 'Premium'],
    linkStyle: 'bg-white/20 text-white border border-white/25',
    textColor: 'text-white',
    bioColor: 'text-blue-100/70',
  },
  {
    name: 'WA Business',
    bio: 'WhatsApp catalog & customer support tools.',
    category: 'Whatsapp',
    bgImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80',
    overlay: 'from-[#075e54]/90 to-[#128c7e]/75',
    avatarBg: '#25d366',
    avatarText: 'WA',
    links: ['Chat Now', 'Product Catalog', 'Support', 'FAQ'],
    linkStyle: 'bg-[#25d366]/20 text-white border border-[#25d366]/30',
    textColor: 'text-white',
    bioColor: 'text-green-100/70',
  },
  {
    name: 'AdPro',
    bio: 'Digital marketing agency & growth strategies.',
    category: 'Marketing',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    overlay: 'from-[#ff6f00]/85 to-[#ffa000]/68',
    avatarBg: '#fff',
    avatarText: 'AP',
    links: ['Services', 'Case Studies', 'Book a Call', 'Free Audit'],
    linkStyle: 'bg-white/90 text-[#e65100]',
    textColor: 'text-white',
    bioColor: 'text-orange-100/80',
  },
];

const tagConfig: Record<string, { icon: typeof Star; bg: string; text: string }> = {
  Popular: { icon: Star, bg: 'bg-amber-400/90', text: 'text-amber-900' },
  Trending: { icon: TrendingUp, bg: 'bg-rose-500/90', text: 'text-white' },
  New: { icon: Sparkles, bg: 'bg-emerald-500/90', text: 'text-white' },
};

function TemplateCard({ t, index, onUse }: { t: typeof templates[0]; index: number; onUse: () => void }) {
  const tag = t.tag ? tagConfig[t.tag] : null;
  const TagIcon = tag?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 relative"
    >
      {/* Tag Badge */}
      {tag && TagIcon && (
        <div className={`absolute top-3 right-3 z-20 ${tag.bg} ${tag.text} backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
          <TagIcon size={11} />
          <span className="text-[10px] font-bold tracking-wide">{t.tag}</span>
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={t.bgImage}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${t.overlay}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pt-7 pb-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3 ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 shadow-lg group-hover:shadow-xl"
          style={{ backgroundColor: t.avatarBg }}
        >
          {t.avatarText ? (
            <span className="text-white text-sm font-semibold italic">{t.avatarText}</span>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-white/10" />
          )}
        </div>

        <h4 className={`text-base font-bold drop-shadow-sm ${t.textColor}`}>{t.name}</h4>
        <p className={`text-xs mt-1 leading-relaxed ${t.bioColor} px-2`}>{t.bio}</p>

        {/* Links */}
        <div className="w-full mt-4 space-y-2">
          {t.links.map((link) => (
            <div
              key={link}
              className={`w-full py-2 rounded-lg text-xs font-medium text-center backdrop-blur-sm ${t.linkStyle}`}
            >
              {link}
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2.5 mt-4 opacity-50">
          <Music2 size={13} className={t.textColor} />
          <Youtube size={13} className={t.textColor} />
          <Twitter size={13} className={t.textColor} />
          <Instagram size={13} className={t.textColor} />
        </div>
      </div>

      {/* Hover Overlay with Use Button */}
      <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-center pb-5 px-5">
        <button
          onClick={onUse}
          className="w-full py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50"
        >
          Use this template
        </button>
      </div>
    </motion.div>
  );
}

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = templates.filter((t) => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredTemplates = templates.filter((t) => t.tag === 'Popular');

  const scrollCategories = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">template</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Browse beautiful templates to kickstart your OpenBio. Customize any template to match your brand.
          </p>
        </motion.div>

        {/* Featured Section */}
        {activeCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-5">
              <Star size={18} className="text-amber-500 fill-amber-500" />
              <h2 className="text-lg font-bold text-gray-900">Popular templates</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {featuredTemplates.map((t, i) => (
                <TemplateCard
                  key={`featured-${t.name}`}
                  t={t}
                  index={i}
                  onUse={() => { navigate('/create', { state: { template: t } }); }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all shadow-sm"
            />
          </div>
        </motion.div>

        {/* Category Filter - Scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative mb-12"
        >
          {/* Scroll arrows for mobile */}
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm sm:hidden"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm sm:hidden"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={scrollRef}
            className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto scrollbar-hide px-8 sm:px-0 pb-2 sm:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat, i) => {
              const count = cat === 'All' ? templates.length : templates.filter(t => t.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + i * 0.02 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900'
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'text-gray-400' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Templates Count + Active Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            {filtered.length} template{filtered.length !== 1 ? 's' : ''} found
            {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
          </div>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-sm font-medium text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Templates Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
            {filtered.map((t, i) => (
              <TemplateCard
                key={t.name}
                t={t}
                index={i}
                onUse={() => { navigate('/create', { state: { template: t } }); }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-900 text-lg font-semibold">No templates found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-5 px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              View all templates
            </button>
          </motion.div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl px-8 py-14 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Rocket size={24} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Can't find what you need?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Start from scratch and build your own unique page with our powerful editor.
              </p>
              <button
                onClick={() => navigate('/create')}
                className="px-8 py-3 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
              >
                Create from scratch
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
