import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import {
  Instagram, Music2, Twitter, Youtube, Search, Star,
  TrendingUp, Sparkles, ChevronLeft, ChevronRight, Rocket,
  X, Eye, ArrowRight, Layers, Filter,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Data ────────────────────────────────────────────────────────
const categories = [
  'All', 'แฟชั่น', 'สุขภาพและฟิตเนส', 'อินฟลูเอนเซอร์และครีเอเตอร์', 'การตลาด',
  'เพลง', 'ธุรกิจขนาดเล็ก', 'โซเชียลมีเดีย', 'กีฬา', 'Telegram', 'Whatsapp',
  'อาหารและเครื่องดื่ม', 'เทคโนโลยี', 'ศิลปะและการออกแบบ', 'การศึกษา',
];

const categoryIcons: Record<string, string> = {
  'All': '✦',
  'แฟชั่น': '👗',
  'สุขภาพและฟิตเนส': '💪',
  'อินฟลูเอนเซอร์และครีเอเตอร์': '⭐',
  'การตลาด': '📈',
  'เพลง': '🎵',
  'ธุรกิจขนาดเล็ก': '🏪',
  'โซเชียลมีเดีย': '📱',
  'กีฬา': '⚡',
  'Telegram': '✈️',
  'Whatsapp': '💬',
  'อาหารและเครื่องดื่ม': '🍽️',
  'เทคโนโลยี': '💻',
  'ศิลปะและการออกแบบ': '🎨',
  'การศึกษา': '📚',
};

const templates = [
  {
    name: 'Hydra Juice',
    bio: 'Your daily dose of vitamin C',
    category: 'อาหารและเครื่องดื่ม',
    bgImage: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80',
    overlay: 'from-[#3d4a32]/90 to-[#3d4a32]/70',
    avatarBg: '#3d5a1e',
    avatarText: 'Hydra',
    links: ['Our drinks', 'Find us', 'Wellbeings', 'Our latest Podcast'],
    linkStyle: 'bg-[#c8c3b4]/80 text-[#3d3d3d]',
    textColor: 'text-white',
    bioColor: 'text-white/70',
    tag: 'Popular',
    accent: '#7cb342',
  },
  {
    name: 'Katy Delma',
    bio: 'An innovative solar design practice that brings solar energy into daily life.',
    category: 'อินฟลูเอนเซอร์และครีเอเตอร์',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    overlay: 'from-[#1a6b6b]/85 to-[#2a8a8a]/60',
    avatarBg: '#2a8a8a',
    links: ['Travel Blog', 'Travel Tips', 'Hiking Equipment', 'Camera Equipment'],
    linkStyle: 'bg-white/90 text-gray-800',
    textColor: 'text-white',
    bioColor: 'text-white/80',
    accent: '#2a8a8a',
  },
  {
    name: 'Matthew Hugh',
    bio: 'Aspiring skater with a taste for cooking.',
    category: 'กีฬา',
    bgImage: 'https://images.unsplash.com/photo-1564296786785-89c8a7b12bfc?w=400&q=80',
    overlay: 'from-[#3a2a1a]/90 to-[#5a4a3a]/70',
    avatarBg: '#8a6a4a',
    links: ['Youtube Channel', 'Tiktok Account', 'Instagram'],
    linkStyle: 'bg-[#e8a87c]/80 text-[#3d2b1f]',
    textColor: 'text-white',
    bioColor: 'text-white/70',
    accent: '#e8a87c',
  },
  {
    name: 'Luna Studio',
    bio: 'Creative photography & visual storytelling.',
    category: 'ศิลปะและการออกแบบ',
    bgImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    overlay: 'from-[#0f3460]/90 to-[#1a1a2e]/80',
    avatarBg: '#e94560',
    avatarText: 'LS',
    links: ['Portfolio', 'Book a Session', 'Prints Shop', 'Behind the Lens'],
    linkStyle: 'bg-white/15 text-white border border-white/20',
    textColor: 'text-white',
    bioColor: 'text-white/60',
    tag: 'Trending',
    accent: '#e94560',
  },
  {
    name: 'Bella Rose',
    bio: 'Beauty blogger & makeup artist based in LA.',
    category: 'แฟชั่น',
    bgImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    overlay: 'from-[#f48fb1]/80 to-[#fce4ec]/60',
    avatarBg: '#e91e63',
    links: ['My Tutorials', 'Shop My Looks', 'Collabs', 'Book Me'],
    linkStyle: 'bg-white/90 text-[#880e4f]',
    textColor: 'text-[#880e4f]',
    bioColor: 'text-[#ad1457]',
    tag: 'Popular',
    accent: '#e91e63',
  },
  {
    name: 'FitCore',
    bio: 'Personal trainer & nutrition coach.',
    category: 'สุขภาพและฟิตเนส',
    bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    overlay: 'from-black/90 to-black/75',
    avatarBg: '#ff6b00',
    avatarText: 'FC',
    links: ['Training Plans', 'Meal Prep Guide', 'Join Community', 'Free Ebook'],
    linkStyle: 'bg-[#ff6b00] text-white',
    textColor: 'text-white',
    bioColor: 'text-gray-400',
    accent: '#ff6b00',
  },
  {
    name: 'Sakura Cafe',
    bio: 'Artisan coffee & Japanese pastries in NYC.',
    category: 'อาหารและเครื่องดื่ม',
    bgImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    overlay: 'from-[#ffe0e6]/85 to-[#fff5f5]/70',
    avatarBg: '#d4a0a0',
    avatarText: '桜',
    links: ['Our Menu', 'Order Online', 'Catering', 'Gift Cards'],
    linkStyle: 'bg-[#d4a0a0]/25 text-[#8b5e5e] border border-[#d4a0a0]/40',
    textColor: 'text-[#5e3a3a]',
    bioColor: 'text-[#8b5e5e]',
    tag: 'New',
    accent: '#d4a0a0',
  },
  {
    name: 'DJ Nexus',
    bio: 'Electronic music producer & live performer.',
    category: 'เพลง',
    bgImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80',
    overlay: 'from-[#1a0a3e]/92 to-[#0d0221]/80',
    avatarBg: '#7b2ff7',
    avatarText: 'NX',
    links: ['Spotify', 'Soundcloud', 'Upcoming Shows', 'Merch Store'],
    linkStyle: 'bg-[#7b2ff7]/25 text-white border border-[#7b2ff7]/40',
    textColor: 'text-white',
    bioColor: 'text-purple-300/70',
    tag: 'Trending',
    accent: '#7b2ff7',
  },
  {
    name: 'GreenLeaf',
    bio: 'Sustainable living tips & eco-friendly products.',
    category: 'ธุรกิจขนาดเล็ก',
    bgImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    overlay: 'from-[#c8e6c9]/85 to-[#e8f5e9]/70',
    avatarBg: '#2e7d32',
    avatarText: '🌿',
    links: ['Eco Blog', 'Shop Green', 'Carbon Calculator', 'Community'],
    linkStyle: 'bg-white/80 text-[#2e7d32]',
    textColor: 'text-[#1b5e20]',
    bioColor: 'text-[#388e3c]',
    accent: '#2e7d32',
  },
  {
    name: 'Alex Chen',
    bio: 'Full-stack developer & open source contributor.',
    category: 'เทคโนโลยี',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    overlay: 'from-[#0f172a]/93 to-[#1e293b]/85',
    avatarBg: '#38bdf8',
    avatarText: 'AC',
    links: ['GitHub', 'Dev Blog', 'Resume', 'Side Projects'],
    linkStyle: 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30',
    textColor: 'text-white',
    bioColor: 'text-slate-400',
    tag: 'Popular',
    accent: '#38bdf8',
  },
  {
    name: 'Nomad Tales',
    bio: 'Traveling the world one city at a time.',
    category: 'อินฟลูเอนเซอร์และครีเอเตอร์',
    bgImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
    overlay: 'from-[#c44b2b]/80 to-[#ff9a56]/60',
    avatarBg: '#fff3e0',
    avatarText: '✈️',
    links: ['Travel Guides', 'Photo Diary', 'Gear List', 'Podcast'],
    linkStyle: 'bg-white/90 text-[#bf360c]',
    textColor: 'text-white',
    bioColor: 'text-white/80',
    accent: '#ff6d00',
  },
  {
    name: 'Mia Waves',
    bio: 'Surf instructor & ocean conservation advocate.',
    category: 'กีฬา',
    bgImage: 'https://images.unsplash.com/photo-1502680390548-bdbac40f7154?w=400&q=80',
    overlay: 'from-[#006994]/80 to-[#48c9b0]/55',
    avatarBg: '#fff',
    avatarText: '🏄',
    links: ['Book Lessons', 'Surf Report', 'Ocean Cleanup', 'Shop'],
    linkStyle: 'bg-white/25 text-white border border-white/30',
    textColor: 'text-white',
    bioColor: 'text-white/70',
    tag: 'New',
    accent: '#48c9b0',
  },
  {
    name: 'Velvet Records',
    bio: 'Independent record label. New sounds, bold artists.',
    category: 'เพลง',
    bgImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    overlay: 'from-[#4a0000]/92 to-[#800000]/78',
    avatarBg: '#ff1744',
    avatarText: 'VR',
    links: ['New Releases', 'Artist Roster', 'Submit Demo', 'Events'],
    linkStyle: 'bg-[#ff1744]/20 text-[#ff8a80] border border-[#ff1744]/30',
    textColor: 'text-white',
    bioColor: 'text-red-300/60',
    accent: '#ff1744',
  },
  {
    name: 'StyleHaus',
    bio: 'Curated fashion picks & outfit inspiration.',
    category: 'แฟชั่น',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
    overlay: 'from-[#e8ddd4]/88 to-[#f5f0eb]/75',
    avatarBg: '#8d6e63',
    avatarText: 'SH',
    links: ['Shop Now', 'Lookbook', 'Style Quiz', 'New Arrivals'],
    linkStyle: 'bg-[#8d6e63]/15 text-[#5d4037] border border-[#8d6e63]/20',
    textColor: 'text-[#3e2723]',
    bioColor: 'text-[#6d4c41]',
    tag: 'Trending',
    accent: '#8d6e63',
  },
  {
    name: 'Mindful Maya',
    bio: 'Yoga teacher & meditation guide. Breathe, move, grow.',
    category: 'สุขภาพและฟิตเนส',
    bgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
    overlay: 'from-[#e6d5b8]/85 to-[#fdf6e3]/70',
    avatarBg: '#a1887f',
    avatarText: '🧘',
    links: ['Class Schedule', 'Online Courses', 'Retreat Info', 'Free Resources'],
    linkStyle: 'bg-[#a1887f]/15 text-[#5d4037] border border-[#a1887f]/25',
    textColor: 'text-[#4e342e]',
    bioColor: 'text-[#795548]',
    accent: '#a1887f',
  },
  {
    name: 'ByteBot',
    bio: 'AI tools & automation for your workflow.',
    category: 'เทคโนโลยี',
    bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
    overlay: 'from-[#0a192f]/93 to-[#1d3557]/82',
    avatarBg: '#64ffda',
    avatarText: 'BB',
    links: ['Try Free', 'Documentation', 'API Access', 'Changelog'],
    linkStyle: 'bg-[#64ffda]/12 text-[#64ffda] border border-[#64ffda]/20',
    textColor: 'text-white',
    bioColor: 'text-[#8892b0]',
    tag: 'New',
    accent: '#64ffda',
  },
  {
    name: 'Neon Nights',
    bio: 'Event promoter & nightlife curator in Miami.',
    category: 'โซเชียลมีเดีย',
    bgImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    overlay: 'from-[#24243e]/88 to-[#0f0c29]/75',
    avatarBg: '#ff00ff',
    avatarText: 'NN',
    links: ['Upcoming Events', 'VIP Tables', 'Guest List', 'Gallery'],
    linkStyle: 'bg-[#ff00ff]/15 text-white border border-[#ff00ff]/30',
    textColor: 'text-white',
    bioColor: 'text-purple-200/60',
    accent: '#ff00ff',
  },
  {
    name: 'Chef Marco',
    bio: 'Italian chef sharing family recipes & kitchen secrets.',
    category: 'อาหารและเครื่องดื่ม',
    bgImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80',
    overlay: 'from-[#4a1c1c]/88 to-[#6b2d2d]/72',
    avatarBg: '#ffb74d',
    avatarText: '👨‍🍳',
    links: ['Recipes', 'Cooking Classes', 'My Cookbook', 'Kitchen Tools'],
    linkStyle: 'bg-[#ffb74d]/20 text-[#ffe0b2] border border-[#ffb74d]/30',
    textColor: 'text-white',
    bioColor: 'text-orange-200/70',
    accent: '#ffb74d',
  },
  {
    name: 'EduSpark',
    bio: 'Online tutoring & study resources for students.',
    category: 'การศึกษา',
    bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
    overlay: 'from-[#1a237e]/90 to-[#3949ab]/78',
    avatarBg: '#ffd740',
    avatarText: '📚',
    links: ['Courses', 'Study Guides', 'Tutoring', 'Community'],
    linkStyle: 'bg-white/15 text-white border border-white/20',
    textColor: 'text-white',
    bioColor: 'text-blue-200/70',
    accent: '#ffd740',
  },
  {
    name: 'Pixel Art Co.',
    bio: 'Digital art studio & NFT collection.',
    category: 'ศิลปะและการออกแบบ',
    bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    overlay: 'from-[#212121]/90 to-[#424242]/78',
    avatarBg: '#76ff03',
    avatarText: 'PX',
    links: ['Gallery', 'Mint NFT', 'Commission', 'Discord'],
    linkStyle: 'bg-[#76ff03]/12 text-[#76ff03] border border-[#76ff03]/25',
    textColor: 'text-white',
    bioColor: 'text-gray-400',
    accent: '#76ff03',
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
    accent: '#0088cc',
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
    accent: '#25d366',
  },
  {
    name: 'AdPro',
    bio: 'Digital marketing agency & growth strategies.',
    category: 'การตลาด',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    overlay: 'from-[#ff6f00]/85 to-[#ffa000]/68',
    avatarBg: '#fff',
    avatarText: 'AP',
    links: ['Services', 'Case Studies', 'Book a Call', 'Free Audit'],
    linkStyle: 'bg-white/90 text-[#e65100]',
    textColor: 'text-white',
    bioColor: 'text-orange-100/80',
    accent: '#ff6f00',
  },
];

const tagConfig: Record<string, { icon: typeof Star; bg: string; text: string; glow: string }> = {
  Popular: { icon: Star, bg: 'bg-gradient-to-r from-amber-400 to-yellow-400', text: 'text-amber-900', glow: 'shadow-amber-400/30' },
  Trending: { icon: TrendingUp, bg: 'bg-gradient-to-r from-rose-500 to-pink-500', text: 'text-white', glow: 'shadow-rose-500/30' },
  New: { icon: Sparkles, bg: 'bg-gradient-to-r from-emerald-400 to-teal-500', text: 'text-white', glow: 'shadow-emerald-400/30' },
};

// ─── Template Card ───────────────────────────────────────────────
function TemplateCard({
  t, index, onUse, onPreview,
}: {
  t: typeof templates[0]; index: number; onUse: () => void; onPreview: () => void;
}) {
  const tag = t.tag ? tagConfig[t.tag] : null;
  const TagIcon = tag?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-[20px] overflow-hidden shadow-md hover:shadow-2xl cursor-pointer group transition-all duration-500 hover:-translate-y-2 relative"
      style={{ aspectRatio: '3/4.5' }}
    >
      {/* Tag Badge */}
      {tag && TagIcon && (
        <div className={`absolute top-3 right-3 z-20 ${tag.bg} ${tag.text} px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg ${tag.glow}`}>
          <TagIcon size={11} />
          <span className="text-[10px] font-bold tracking-wide">{t.tag}</span>
        </div>
      )}

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={t.bgImage}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${t.overlay}`} />
        {/* Accent glow at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
          style={{ backgroundColor: t.accent }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-5 pt-8 pb-5">
        {/* Avatar */}
        <div className="flex justify-center mb-3">
          <div
            className="w-[68px] h-[68px] rounded-full flex items-center justify-center ring-[3px] ring-white/25 group-hover:ring-white/50 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:scale-105"
            style={{ backgroundColor: t.avatarBg }}
          >
            {t.avatarText ? (
              <span className="text-white text-sm font-semibold italic drop-shadow-sm">{t.avatarText}</span>
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10" />
            )}
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-auto">
          <h4 className={`text-[15px] font-bold drop-shadow-sm ${t.textColor} leading-tight`}>{t.name}</h4>
          <p className={`text-[11px] mt-1.5 leading-relaxed ${t.bioColor} line-clamp-2 px-1`}>{t.bio}</p>
        </div>

        {/* Links */}
        <div className="w-full space-y-[6px] mb-3">
          {t.links.slice(0, 3).map((link) => (
            <div
              key={link}
              className={`w-full py-[7px] rounded-lg text-[11px] font-medium text-center backdrop-blur-md ${t.linkStyle} transition-transform duration-300`}
            >
              {link}
            </div>
          ))}
          {t.links.length > 3 && (
            <div className={`text-center text-[10px] font-medium ${t.bioColor} mt-1`}>
              +{t.links.length - 3} more
            </div>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 opacity-40 group-hover:opacity-60 transition-opacity">
          <Music2 size={12} className={t.textColor} />
          <Youtube size={12} className={t.textColor} />
          <Twitter size={12} className={t.textColor} />
          <Instagram size={12} className={t.textColor} />
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 transition-all duration-400 flex flex-col items-center justify-end pb-5 px-4 gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-white/30 flex items-center justify-center gap-1.5 border border-white/20"
        >
          <Eye size={13} /> ตัวอย่าง
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onUse(); }}
          className="w-full py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-100 shadow-lg hover:shadow-xl hover:bg-gray-50 flex items-center justify-center gap-1.5"
        >
          <Rocket size={13} /> ใช้เทมเพลตนี้
        </button>
      </div>
    </motion.div>
  );
}

// ─── Preview Modal ───────────────────────────────────────────────
function PreviewModal({
  template, onClose, onUse,
}: {
  template: typeof templates[0]; onClose: () => void; onUse: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Preview Content */}
        <div className="relative overflow-y-auto max-h-[85vh]">
          {/* Background */}
          <div className="relative w-full" style={{ minHeight: '480px' }}>
            <img
              src={template.bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${template.overlay}`} />

            {/* Content */}
            <div className="relative z-10 px-8 pt-12 pb-8 flex flex-col items-center text-center">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center ring-4 ring-white/25 shadow-2xl mb-5"
                style={{ backgroundColor: template.avatarBg }}
              >
                {template.avatarText ? (
                  <span className="text-white text-xl font-semibold italic">{template.avatarText}</span>
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10" />
                )}
              </div>

              <h3 className={`text-2xl font-bold ${template.textColor} drop-shadow-md`}>{template.name}</h3>
              <p className={`text-sm mt-2 ${template.bioColor} max-w-xs leading-relaxed`}>{template.bio}</p>

              {/* Links */}
              <div className="w-full max-w-xs mt-6 space-y-2.5">
                {template.links.map((link) => (
                  <div
                    key={link}
                    className={`w-full py-3 rounded-xl text-sm font-medium text-center backdrop-blur-md ${template.linkStyle} transition-transform hover:scale-[1.02]`}
                  >
                    {link}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-4 mt-6 opacity-50">
                <Music2 size={16} className={template.textColor} />
                <Youtube size={16} className={template.textColor} />
                <Twitter size={16} className={template.textColor} />
                <Instagram size={16} className={template.textColor} />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bg-white px-6 py-5 flex items-center justify-between border-t border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-900">{template.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{template.category}</p>
            </div>
            <button
              onClick={onUse}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200"
            >
              <Rocket size={15} />
              ใช้เทมเพลตนี้
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Featured Carousel ───────────────────────────────────────────
function FeaturedCarousel({
  items, onUse, onPreview,
}: {
  items: typeof templates;
  onUse: (t: typeof templates[0]) => void;
  onPreview: (t: typeof templates[0]) => void;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.7;
      carouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:bg-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:bg-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
          >
            {/* Featured card: wider with side info */}
            <div className="rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 group cursor-pointer relative"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Tag */}
              {t.tag && tagConfig[t.tag] && (() => {
                const tc = tagConfig[t.tag!];
                const TIcon = tc.icon;
                return (
                  <div className={`absolute top-3 right-3 z-20 ${tc.bg} ${tc.text} px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg ${tc.glow}`}>
                    <TIcon size={12} />
                    <span className="text-[11px] font-bold">{t.tag}</span>
                  </div>
                );
              })()}

              {/* BG */}
              <div className="absolute inset-0">
                <img src={t.bgImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-b ${t.overlay}`} />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center ring-[3px] ring-white/30 shadow-2xl mb-4"
                  style={{ backgroundColor: t.avatarBg }}
                >
                  {t.avatarText ? (
                    <span className="text-white text-base font-semibold italic">{t.avatarText}</span>
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10" />
                  )}
                </div>
                <h4 className={`text-lg font-bold ${t.textColor} drop-shadow-md`}>{t.name}</h4>
                <p className={`text-xs mt-1.5 ${t.bioColor} max-w-[220px] leading-relaxed`}>{t.bio}</p>
                <div className="w-full max-w-[220px] mt-5 space-y-2">
                  {t.links.slice(0, 3).map((link) => (
                    <div key={link} className={`w-full py-2 rounded-lg text-[11px] font-medium text-center backdrop-blur-md ${t.linkStyle}`}>
                      {link}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover */}
              <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 transition-all duration-400 flex flex-col items-center justify-end pb-5 px-5 gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onPreview(t); }}
                  className="w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-white/30 flex items-center justify-center gap-1.5 border border-white/20"
                >
                  <Eye size={13} /> ตัวอย่าง
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onUse(t); }}
                  className="w-full py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-100 shadow-lg hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  <Rocket size={13} /> ใช้เทมเพลตนี้
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function TemplatesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = templates.filter((t) => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredTemplates = templates.filter((t) => t.tag);

  const handleUse = (t: typeof templates[0]) => {
    navigate('/create', { state: { template: t } });
  };

  const scrollCategories = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 sm:pb-20">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 relative"
        >
          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200/30 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-200/20 rounded-full blur-[60px]" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 border border-violet-100 rounded-full text-violet-600 text-xs font-medium mb-6"
            >
              <Layers size={13} />
              {templates.length}+ เทมเพลต
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
              ค้นหา
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
                เทมเพลตที่ใช่
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              เลือกจากเทมเพลตที่ออกแบบมาอย่างสวยงาม
              และปรับแต่งให้เข้ากับแบรนด์ของคุณได้ในไม่กี่วินาที
            </p>
          </div>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mb-6 sm:mb-10"
        >
          <div className="relative group">
            <Search size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              type="text"
              placeholder="ค้นหาตามชื่อ หมวดหมู่ หรือคำสำคัญ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="relative mb-8 sm:mb-12"
        >
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden mb-3 flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 w-full justify-center"
          >
            <Filter size={15} />
            {activeCategory === 'All' ? 'กรองตามหมวดหมู่' : activeCategory}
            {activeCategory !== 'All' && (
              <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            )}
          </button>

          {/* Desktop: always show. Mobile: toggle */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block relative`}>
            {/* Scroll arrows */}
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-md lg:hidden"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-md lg:hidden"
            >
              <ChevronRight size={16} />
            </button>

            <div
              ref={scrollRef}
              className="flex lg:flex-wrap lg:justify-center gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-10 lg:px-0 pb-2 lg:pb-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((cat, i) => {
                const count = cat === 'All' ? templates.length : templates.filter(t => t.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 + i * 0.02 }}
                    onClick={() => { setActiveCategory(cat); setShowMobileFilters(false); }}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/10'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm">{categoryIcons[cat]}</span>
                    {cat}
                    <span className={`text-[11px] ${isActive ? 'text-gray-400' : 'text-gray-400'} ml-0.5`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Featured Section ── */}
        {activeCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-14"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                  <Star size={15} className="text-white fill-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">เทมเพลตแนะนำ</h2>
                  <p className="text-xs text-gray-400">คัดเลือกเทมเพลตยอดนิยมและมาแรง</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">{featuredTemplates.length} เทมเพลต</div>
            </div>

            <FeaturedCarousel
              items={featuredTemplates}
              onUse={handleUse}
              onPreview={(t) => setPreviewTemplate(t)}
            />
          </motion.div>
        )}

        {/* ── Results header ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">
              {activeCategory === 'All' ? 'เทมเพลตทั้งหมด' : activeCategory}
            </h2>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
              {filtered.length}
            </span>
          </div>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 cursor-pointer"
            >
              <X size={14} /> ล้าง
            </button>
          )}
        </div>

        {/* ── Template Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5"
          >
            {filtered.map((t, i) => (
              <TemplateCard
                key={t.name}
                t={t}
                index={i}
                onUse={() => handleUse(t)}
                onPreview={() => setPreviewTemplate(t)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Search size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-900 text-xl font-bold">ไม่พบเทมเพลต</p>
            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
              ไม่พบเทมเพลตที่ตรงกับการค้นหาของคุณ ลองใช้คำค้นหาอื่นหรือดูเทมเพลตทั้งหมด
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-6 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 cursor-pointer"
            >
              ดูเทมเพลตทั้งหมด
            </button>
          </motion.div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24"
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[28px] px-8 sm:px-12 py-16 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/10 rounded-full blur-[80px]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            <div className="relative z-10 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-white/10">
                <Rocket size={28} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                หาไม่เจอสิ่งที่ต้องการ?
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                เริ่มต้นจากศูนย์และสร้างหน้าเพจเฉพาะตัวของคุณด้วยตัวแก้ไขที่ทรงพลัง
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={() => navigate('/create')}
                  className="group flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg cursor-pointer"
                >
                  สร้างจากศูนย์
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all border border-white/10 cursor-pointer"
                >
                  กลับขึ้นด้านบน
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Preview Modal ── */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onUse={() => { handleUse(previewTemplate); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
