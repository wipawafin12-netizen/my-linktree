import React, { useState, useEffect } from 'react';
import {
  Instagram, Youtube, Twitter, Music2, Facebook, Twitch, Github, Globe,
  AtSign, Mail, Send, Phone, User, ExternalLink,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import pb, { getFileUrl } from '../lib/pb';

// Same themes as CreatePage
const themes = [
  { id: 'minimal', bg: 'bg-white', card: 'bg-gray-100', cardBorder: '', text: 'text-gray-900', subtext: 'text-gray-500' },
  { id: 'dark', bg: 'bg-[#1a1a2e]', card: 'bg-white/10', cardBorder: 'border border-white/5', text: 'text-white', subtext: 'text-white/50' },
  { id: 'ocean', bg: 'bg-gradient-to-b from-[#667eea] to-[#764ba2]', card: 'bg-white/20', cardBorder: '', text: 'text-white', subtext: 'text-white/60' },
  { id: 'sunset', bg: 'bg-gradient-to-b from-[#f093fb] to-[#f5576c]', card: 'bg-white/25', cardBorder: '', text: 'text-white', subtext: 'text-white/60' },
  { id: 'forest', bg: 'bg-gradient-to-b from-[#11998e] to-[#38ef7d]', card: 'bg-white/20', cardBorder: '', text: 'text-white', subtext: 'text-white/60' },
  { id: 'midnight', bg: 'bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]', card: 'bg-white/10', cardBorder: 'border border-white/5', text: 'text-white', subtext: 'text-white/40' },
  { id: 'warm', bg: 'bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]', card: 'bg-white/60', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600' },
  { id: 'sky', bg: 'bg-gradient-to-b from-[#a1c4fd] to-[#c2e9fb]', card: 'bg-white/50', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600' },
  { id: 'rose', bg: 'bg-gradient-to-b from-[#fecfef] to-[#ff9a9e]', card: 'bg-white/50', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600' },
  { id: 'neon', bg: 'bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e]', card: 'bg-[#39ff14]/10', cardBorder: 'border border-[#39ff14]/20', text: 'text-[#39ff14]', subtext: 'text-[#39ff14]/50' },
  { id: 'lavender', bg: 'bg-gradient-to-b from-[#e6e6fa] to-[#d8bfd8]', card: 'bg-white/50', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600' },
  { id: 'cherry', bg: 'bg-gradient-to-b from-[#900020] to-[#5c0015]', card: 'bg-white/15', cardBorder: 'border border-white/10', text: 'text-white', subtext: 'text-white/50' },
  { id: 'cyber', bg: 'bg-gradient-to-b from-[#0a0a2a] to-[#1b003b]', card: 'bg-[#00f0ff]/10', cardBorder: 'border border-[#00f0ff]/15', text: 'text-[#00f0ff]', subtext: 'text-[#00f0ff]/40' },
  { id: 'nature', bg: 'bg-gradient-to-b from-[#f5f0e1] to-[#d4c5a9]', card: 'bg-white/60', cardBorder: '', text: 'text-[#3e3a2e]', subtext: 'text-[#3e3a2e]/60' },
  { id: 'cream', bg: 'bg-gradient-to-b from-[#fffdd0] to-[#fdf5e6]', card: 'bg-white/70', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-500' },
  { id: 'aurora', bg: 'bg-gradient-to-b from-[#0b0b2a] via-[#1a3a4a] to-[#0d3b2e]', card: 'bg-white/10', cardBorder: 'border border-white/5', text: 'text-white', subtext: 'text-white/40' },
  { id: 'pastel', bg: 'bg-gradient-to-b from-[#fef0f5] to-[#fef9e7]', card: 'bg-white/80', cardBorder: 'border border-pink-100', text: 'text-gray-800', subtext: 'text-gray-500' },
];

const buttonStyles: Record<string, string> = {
  rounded: 'rounded-full',
  soft: 'rounded-xl',
  sharp: 'rounded-md',
  'outline-round': 'rounded-full border-2',
  shadow: 'rounded-xl shadow-md',
};

const fontClasses: Record<string, string> = {
  inter: 'font-sans', poppins: 'font-poppins', 'dm-sans': 'font-dm-sans',
  outfit: 'font-outfit', 'space-grotesk': 'font-space-grotesk', nunito: 'font-nunito',
  quicksand: 'font-quicksand', comfortaa: 'font-comfortaa', rubik: 'font-rubik',
  montserrat: 'font-montserrat', raleway: 'font-raleway', oswald: 'font-oswald',
  bebas: 'font-bebas', playfair: 'font-playfair', lora: 'font-lora',
  merriweather: 'font-merriweather', crimson: 'font-crimson', 'source-serif': 'font-source-serif',
  jetbrains: 'font-jetbrains', 'fira-code': 'font-fira-code', 'space-mono': 'font-space-mono',
  caveat: 'font-caveat', dancing: 'font-dancing', pacifico: 'font-pacifico', satisfy: 'font-satisfy',
};

const bgPatterns: Record<string, React.CSSProperties> = {
  gingham: {
    backgroundImage: `repeating-linear-gradient(0deg, rgba(200,150,200,0.12) 0px, rgba(200,150,200,0.12) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(200,150,200,0.12) 0px, rgba(200,150,200,0.12) 1px, transparent 1px, transparent 20px)`,
    backgroundSize: '20px 20px',
  },
  dots: {
    backgroundImage: `radial-gradient(circle, rgba(180,140,200,0.18) 1.5px, transparent 1.5px)`,
    backgroundSize: '16px 16px',
  },
  stripes: {
    backgroundImage: `repeating-linear-gradient(135deg, rgba(200,150,200,0.1) 0px, rgba(200,150,200,0.1) 2px, transparent 2px, transparent 12px)`,
  },
  confetti: {
    backgroundImage: `radial-gradient(circle, rgba(252,196,204,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(200,180,240,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(180,230,200,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(255,240,170,0.3) 2px, transparent 2px)`,
    backgroundSize: '40px 40px, 50px 50px, 35px 45px, 45px 35px',
    backgroundPosition: '0 0, 20px 15px, 10px 30px, 35px 5px',
  },
  diamond: {
    backgroundImage: `repeating-linear-gradient(45deg, rgba(180,160,210,0.1) 0px, rgba(180,160,210,0.1) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, rgba(180,160,210,0.1) 0px, rgba(180,160,210,0.1) 1px, transparent 1px, transparent 16px)`,
    backgroundSize: '22px 22px',
  },
  zigzag: {
    backgroundImage: `linear-gradient(135deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(225deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(315deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(45deg, rgba(200,150,180,0.12) 25%, transparent 25%)`,
    backgroundSize: '20px 10px',
    backgroundPosition: '0 0, 10px 0, 10px -5px, 0 5px',
  },
  waves: {
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(160,180,220,0.12) 14px, rgba(160,180,220,0.12) 16px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(160,180,220,0.06) 30px, rgba(160,180,220,0.06) 32px)`,
  },
  hearts: {
    backgroundImage: `radial-gradient(circle, rgba(240,140,160,0.2) 3px, transparent 3px), radial-gradient(circle, rgba(240,140,160,0.12) 2px, transparent 2px)`,
    backgroundSize: '30px 30px, 30px 30px',
    backgroundPosition: '0 0, 15px 15px',
  },
};

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  instagram: Instagram, youtube: Youtube, twitter: Twitter, tiktok: Music2,
  facebook: Facebook, twitch: Twitch, github: Github, website: Globe,
  linkedin: AtSign, email: Mail, telegram: Send, whatsapp: Phone,
};

interface LinkItem {
  id: string; title: string; url: string; enabled: boolean; color?: string;
}

export default function PreviewPage() {
  const { username } = useParams<{ username: string }>();
  const [pbPageId, setPbPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!username);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState<{
    displayName: string; bio: string; avatar: string;
    selectedTheme: string; selectedButton: string; selectedFont: string;
    customTextColor: string; customBgColor: string; customBgSecondary: string;
    links: LinkItem[]; activeSocials: string[]; socialUrls: Record<string, string>;
    selectedPattern: string;
    patternGlow?: boolean;
    bgImage?: string;
  } | null>(null);

  // Helper: load profile from localStorage
  const loadLocal = (name: string) => {
    try {
      const raw = localStorage.getItem('openbio_preview');
      if (raw) {
        const d = JSON.parse(raw);
        if (d.displayName === name || !d.displayName) return d;
      }
    } catch { /* ignore */ }
    return null;
  };

  useEffect(() => {
    if (username) {
      const abortController = new AbortController();
      setLoading(true);
      setNotFound(false);
      (async () => {
        // Try localStorage first (instant, always available)
        const localData = loadLocal(username);

        // Then try PocketBase
        try {
          let pages = await pb.collection('pages').getList(1, 1, {
            filter: `displayName = "${username}"`,
            requestKey: null,
          });

          if (pages.items.length === 0) {
            try {
              const users = await pb.collection('users').getList(1, 1, {
                filter: `name = "${username}"`,
                requestKey: null,
              });
              if (users.items.length > 0) {
                pages = await pb.collection('pages').getList(1, 1, {
                  filter: `user = "${users.items[0].id}"`,
                  requestKey: null,
                });
              }
            } catch { /* ignore */ }
          }

          if (abortController.signal.aborted) return;

          if (pages.items.length === 0) {
            if (localData) { setData(localData); setLoading(false); return; }
            setNotFound(true);
            setLoading(false);
            return;
          }

          const p = pages.items[0];
          setPbPageId(p.id);

          const linksResult = await pb.collection('links').getFullList({
            filter: `page = "${p.id}"`,
            sort: 'order',
            requestKey: null,
          });

          setData({
            displayName: p.displayName || '',
            bio: p.bio || '',
            avatar: p.avatar ? getFileUrl(p, p.avatar) : '',
            selectedTheme: p.selectedTheme || 'minimal',
            selectedButton: p.selectedButton || 'rounded',
            selectedFont: p.selectedFont || 'inter',
            customTextColor: p.customTextColor || '',
            customBgColor: p.customBgColor || '#6366f1',
            customBgSecondary: p.customBgSecondary || '#4f46e5',
            links: linksResult.map((l: any) => ({
              id: l.id, title: l.title, url: l.url,
              enabled: l.enabled, color: l.color || '',
            })),
            activeSocials: p.activeSocials || [],
            socialUrls: p.socialUrls || {},
            selectedPattern: p.selectedPattern || 'none',
            patternGlow: !!p.patternGlow,
            bgImage: localData?.bgImage || '',
          });

          pb.collection('analytics').create({
            page: p.id, type: 'view',
          }, { requestKey: null }).catch(() => {});
        } catch {
          // PocketBase unavailable — use localStorage silently
          if (abortController.signal.aborted) return;
          if (localData) { setData(localData); }
          else { setNotFound(true); }
        } finally {
          if (!abortController.signal.aborted) setLoading(false);
        }
      })();
      return () => { abortController.abort(); };
    } else {
      // /preview route → read from localStorage
      const raw = localStorage.getItem('openbio_preview');
      if (raw) setData(JSON.parse(raw));

      // Track page view in localStorage
      try {
        const analyticsRaw = localStorage.getItem('openbio_analytics');
        const analytics = analyticsRaw
          ? JSON.parse(analyticsRaw)
          : { pageViews: 0, linkClicks: [], viewHistory: [] };
        analytics.pageViews = (analytics.pageViews || 0) + 1;
        if (!analytics.viewHistory) analytics.viewHistory = [];
        analytics.viewHistory.push(new Date().toISOString());
        localStorage.setItem('openbio_analytics', JSON.stringify(analytics));
      } catch { /* ignore */ }

      // Listen for storage changes (from CreatePage)
      const handler = () => {
        const updated = localStorage.getItem('openbio_preview');
        if (updated) setData(JSON.parse(updated));
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
          <p className="text-gray-500 text-lg mb-2">ไม่พบหน้านี้</p>
          <p className="text-gray-400 text-sm mb-6">ลิงก์ <span className="font-medium text-gray-600">/{username}</span> ยังไม่มีในระบบ</p>
          <a href="/" className="text-violet-500 hover:text-violet-700 text-sm font-medium underline">กลับหน้าหลัก</a>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">No preview data found. Go to <a href="/create" className="text-violet-500 underline">Create</a> first.</p>
      </div>
    );
  }

  const {
    displayName = '', bio = '', avatar = '',
    selectedTheme = 'minimal', selectedButton = 'rounded', selectedFont = 'inter',
    customTextColor = '', customBgColor = '#6366f1', customBgSecondary = '#4f46e5',
    links = [], activeSocials = [], socialUrls = {}, selectedPattern = 'none',
    patternGlow = false, bgImage = '',
  } = data;

  const isCustom = selectedTheme === 'custom';
  const theme = themes.find(t => t.id === selectedTheme) || themes[0];
  const btnCls = buttonStyles[selectedButton] || 'rounded-full';
  const fontCls = fontClasses[selectedFont] || 'font-sans';

  const light = isCustom
    ? (() => { const hex = customBgColor.replace('#', ''); const r = parseInt(hex.substring(0, 2), 16); const g = parseInt(hex.substring(2, 4), 16); const b = parseInt(hex.substring(4, 6), 16); return (r * 299 + g * 587 + b * 114) / 1000 > 128; })()
    : true;

  const customBgStyle = isCustom ? { background: `linear-gradient(to bottom, ${customBgColor}, ${customBgSecondary})` } : undefined;
  const customCardStyle = isCustom ? {
    backgroundColor: light ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)',
    border: light ? 'none' : '1px solid rgba(255,255,255,0.08)',
  } : undefined;
  const autoTextColor = isCustom ? (light ? '#1f2937' : '#ffffff') : undefined;
  const resolvedTextColor = customTextColor || autoTextColor;

  const enabledLinks = links.filter(l => l.title && l.enabled);

  const trackLinkClick = (link: LinkItem) => {
    // Track to PocketBase if viewing a public page
    if (pbPageId) {
      pb.collection('analytics').create({
        page: pbPageId, type: 'click',
        linkId: link.id, linkTitle: link.title, linkUrl: link.url,
      }).catch(() => {});
    }
    // Also track to localStorage
    try {
      const analyticsRaw = localStorage.getItem('openbio_analytics');
      const analytics = analyticsRaw
        ? JSON.parse(analyticsRaw)
        : { pageViews: 0, linkClicks: [], viewHistory: [] };
      if (!analytics.linkClicks) analytics.linkClicks = [];
      analytics.linkClicks.push({
        linkId: link.id,
        linkTitle: link.title,
        linkUrl: link.url,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('openbio_analytics', JSON.stringify(analytics));
    } catch { /* ignore */ }
  };

  const patternStyle = selectedPattern && selectedPattern !== 'none' ? bgPatterns[selectedPattern] : undefined;

  return (
    <div
      className={`min-h-screen flex flex-col items-center relative ${!isCustom ? theme.bg : ''} ${fontCls}`}
      style={customBgStyle}
    >
      {patternGlow && (
        <style>{`
          @keyframes glowColorShift {
            0%, 100% { background-color: rgba(168,85,247,0.8); }
            25% { background-color: rgba(236,72,153,0.8); }
            50% { background-color: rgba(59,130,246,0.8); }
            75% { background-color: rgba(52,211,153,0.8); }
          }
          @keyframes glowMove {
            0%, 100% { transform: translate(0%, 0%) scale(1); }
            25% { transform: translate(10%, 8%) scale(1.1); }
            50% { transform: translate(-5%, 12%) scale(1.05); }
            75% { transform: translate(-8%, -5%) scale(1.12); }
          }
        `}</style>
      )}
      {/* Background image from template */}
      {bgImage && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div
            className="absolute inset-0 z-0"
            style={{ background: `linear-gradient(to bottom, ${customBgColor}E6, ${customBgSecondary}B3)` }}
          />
        </>
      )}
      {/* Pattern overlay */}
      {patternStyle && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={patternStyle}
        />
      )}
      {/* Glow overlay */}
      {patternGlow && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: '75%',
              height: '55%',
              top: '20%',
              left: '12%',
              animation: 'glowColorShift 8s ease-in-out infinite, glowMove 6s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Profile */}
      <div className="pt-14 pb-4 flex flex-col items-center px-6 w-full max-w-md relative z-[1]">
        <div className="w-20 h-20 rounded-full bg-gray-300/20 flex items-center justify-center mb-3 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User size={28} className={`${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-25`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined} />
          )}
        </div>
        <h1
          className={`font-bold text-xl ${!resolvedTextColor && !isCustom ? theme.text : ''}`}
          style={resolvedTextColor ? { color: resolvedTextColor } : undefined}
        >
          {displayName || 'username'}
        </h1>
        {bio && (
          <p
            className={`text-sm mt-1 text-center ${!resolvedTextColor && !isCustom ? theme.subtext : ''}`}
            style={resolvedTextColor ? { color: resolvedTextColor, opacity: 0.6 } : undefined}
          >
            {bio}
          </p>
        )}
      </div>

      {/* Social icons */}
      {activeSocials.length > 0 && (
        <div className="flex items-center justify-center gap-3 pb-5 relative z-[1]">
          {activeSocials.map((id) => {
            const Icon = socialIcons[id];
            if (!Icon) return null;
            const url = socialUrls[id];
            const Wrapper = url ? 'a' : 'div';
            return (
              <Wrapper
                key={id}
                {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`w-9 h-9 rounded-full ${!isCustom ? theme.card : ''} flex items-center justify-center ${url ? 'hover:opacity-80 transition-opacity cursor-pointer' : ''}`}
                style={customCardStyle}
              >
                <Icon size={16} className={`${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-50`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined} />
              </Wrapper>
            );
          })}
        </div>
      )}

      {/* Links */}
      <div className="px-5 pb-10 space-y-3 w-full max-w-md relative z-[1]">
        {enabledLinks.length === 0 && (
          <div className={`text-center py-10 ${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-20`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined}>
            <ExternalLink size={24} className="mx-auto mb-2" />
            <p className="text-sm">No links yet</p>
          </div>
        )}
        {enabledLinks.map((link) => (
          <a
            key={link.id}
            href={link.url || '#'}
            target={link.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={() => trackLinkClick(link)}
            className={`block ${!link.color && !isCustom ? `${theme.card} ${theme.cardBorder}` : ''} ${btnCls} px-5 py-3.5 text-center hover:scale-[1.02] transition-transform`}
            style={link.color
              ? { backgroundColor: link.color, border: '1px solid rgba(0,0,0,0.06)' }
              : isCustom ? customCardStyle : undefined
            }
          >
            <span
              className={`text-sm font-medium ${!link.color && !resolvedTextColor && !isCustom ? theme.text : ''}`}
              style={resolvedTextColor ? { color: resolvedTextColor } : link.color ? { color: '#374151' } : undefined}
            >
              {link.title}
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pb-6 relative z-[1]">
        <a href="/" className="text-xs opacity-30 hover:opacity-50 transition-opacity" style={resolvedTextColor ? { color: resolvedTextColor } : undefined}>
          LinkCenter
        </a>
      </div>
    </div>
  );
}
