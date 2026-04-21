import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Trash2, GripVertical, ExternalLink, Image, Eye, EyeOff,
  Instagram, Youtube, Twitter, Music2, Globe, Github, Twitch, Facebook,
  User, Palette, Type, ChevronRight, ChevronDown, Settings, Sparkles,
  Share2, BarChart3, DollarSign, Users, TrendingUp, Calendar,
  MessageSquare, MessageCircle, Link2, Scissors, Lightbulb, Archive, FolderOpen,
  Check, Upload, Pencil, X, Search, Heart, Play, Phone, FileText,
  ShoppingBag, Grid3x3, Tag, ClipboardList, Download, Mail,
  Copy, CheckCircle2, Coins, Info, GraduationCap,
  MapPin, Headphones, Podcast, Camera, Gamepad2,
  Store, Rss, AtSign, Send, Radio, Tv, Newspaper,
  BookOpen, Coffee, Gift, Megaphone, Mic, Clapperboard, PenTool,
  Brush, Wallet, Bitcoin, Code2, Terminal, Rocket, Flame,
  Shirt, Crown, Anchor, Zap, Star, Music, Video, Sun, RotateCcw,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import pb, { getFileUrl, isPocketBaseEnabled } from '../lib/pb';


const sidebarMain = [
  { icon: Link2, label: 'OpenBio ของฉัน', id: 'links' },
  { icon: Users, label: 'ผู้ติดตาม', id: 'audience' },
];

const sidebarTools = [
  { icon: Scissors, label: 'ย่อลิงก์', id: 'shortener' },
  { icon: Code2, label: 'สร้าง Embed', id: 'embed-gen' },
];

const themes = [
  { id: 'minimal', label: 'Minimal', bg: 'bg-white', card: 'bg-gray-100', cardBorder: '', text: 'text-gray-900', subtext: 'text-gray-500', preview: '#ffffff' },
  { id: 'dark', label: 'Dark', bg: 'bg-[#1a1a2e]', card: 'bg-white/10', cardBorder: 'border border-white/5', text: 'text-white', subtext: 'text-white/50', preview: '#1a1a2e' },
  { id: 'ocean', label: 'Ocean', bg: 'bg-gradient-to-b from-[#667eea] to-[#764ba2]', card: 'bg-white/20', cardBorder: '', text: 'text-white', subtext: 'text-white/60', preview: '#667eea' },
  { id: 'sunset', label: 'Sunset', bg: 'bg-gradient-to-b from-[#f093fb] to-[#f5576c]', card: 'bg-white/25', cardBorder: '', text: 'text-white', subtext: 'text-white/60', preview: '#f093fb' },
  { id: 'forest', label: 'Forest', bg: 'bg-gradient-to-b from-[#11998e] to-[#38ef7d]', card: 'bg-white/20', cardBorder: '', text: 'text-white', subtext: 'text-white/60', preview: '#11998e' },
  { id: 'midnight', label: 'Midnight', bg: 'bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]', card: 'bg-white/10', cardBorder: 'border border-white/5', text: 'text-white', subtext: 'text-white/40', preview: '#302b63' },
  { id: 'warm', label: 'Warm', bg: 'bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]', card: 'bg-white/60', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600', preview: '#ffecd2' },
  { id: 'sky', label: 'Sky', bg: 'bg-gradient-to-b from-[#a1c4fd] to-[#c2e9fb]', card: 'bg-white/50', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600', preview: '#a1c4fd' },
  { id: 'rose', label: 'Rose', bg: 'bg-gradient-to-b from-[#fecfef] to-[#ff9a9e]', card: 'bg-white/50', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600', preview: '#fecfef' },
  { id: 'neon', label: 'Neon', bg: 'bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e]', card: 'bg-[#39ff14]/10', cardBorder: 'border border-[#39ff14]/20', text: 'text-[#39ff14]', subtext: 'text-[#39ff14]/50', preview: '#0d0d0d' },
  { id: 'lavender', label: 'Lavender', bg: 'bg-gradient-to-b from-[#e6e6fa] to-[#d8bfd8]', card: 'bg-white/50', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-600', preview: '#e6e6fa' },
  { id: 'cherry', label: 'Cherry', bg: 'bg-gradient-to-b from-[#900020] to-[#5c0015]', card: 'bg-white/15', cardBorder: 'border border-white/10', text: 'text-white', subtext: 'text-white/50', preview: '#900020' },
  { id: 'cyber', label: 'Cyber', bg: 'bg-gradient-to-b from-[#0a0a2a] to-[#1b003b]', card: 'bg-[#00f0ff]/10', cardBorder: 'border border-[#00f0ff]/15', text: 'text-[#00f0ff]', subtext: 'text-[#00f0ff]/40', preview: '#0a0a2a' },
  { id: 'nature', label: 'Nature', bg: 'bg-gradient-to-b from-[#f5f0e1] to-[#d4c5a9]', card: 'bg-white/60', cardBorder: '', text: 'text-[#3e3a2e]', subtext: 'text-[#3e3a2e]/60', preview: '#f5f0e1' },
  { id: 'cream', label: 'Cream', bg: 'bg-gradient-to-b from-[#fffdd0] to-[#fdf5e6]', card: 'bg-white/70', cardBorder: '', text: 'text-gray-800', subtext: 'text-gray-500', preview: '#fffdd0' },
  { id: 'aurora', label: 'Aurora', bg: 'bg-gradient-to-b from-[#0b0b2a] via-[#1a3a4a] to-[#0d3b2e]', card: 'bg-white/10', cardBorder: 'border border-white/5', text: 'text-white', subtext: 'text-white/40', preview: '#1a3a4a' },
  { id: 'pastel', label: 'Pastel', bg: 'bg-gradient-to-b from-[#fef0f5] to-[#fef9e7]', card: 'bg-white/80', cardBorder: 'border border-pink-100', text: 'text-gray-800', subtext: 'text-gray-500', preview: '#fef0f5' },
];

// ── Link color palette ──
const linkColors = [
  { id: 'default', label: 'Default', value: '' },
  { id: 'pink', label: 'Pink', value: '#fce4ec' },
  { id: 'purple', label: 'Purple', value: '#e8d5f5' },
  { id: 'mint', label: 'Mint', value: '#d5f5e3' },
  { id: 'yellow', label: 'Yellow', value: '#fff9c4' },
  { id: 'orange', label: 'Orange', value: '#ffe0b2' },
  { id: 'blue', label: 'Blue', value: '#dbeafe' },
  { id: 'peach', label: 'Peach', value: '#fde8d8' },
  // Dark colors
  { id: 'charcoal', label: 'Charcoal', value: '#1e1e1e' },
  { id: 'navy', label: 'Navy', value: '#1a1a40' },
  { id: 'dark-green', label: 'Forest', value: '#1b3a2d' },
  { id: 'dark-red', label: 'Wine', value: '#4a1c2e' },
  { id: 'dark-blue', label: 'Midnight', value: '#0f2744' },
  { id: 'dark-purple', label: 'Plum', value: '#2d1b4e' },
  { id: 'dark-brown', label: 'Espresso', value: '#3b2a1a' },
  { id: 'slate', label: 'Slate', value: '#2d3748' },
  { id: 'gunmetal', label: 'Gunmetal', value: '#2c3e50' },
  { id: 'black', label: 'Black', value: '#0a0a0a' },
];

// ── Text color palette ──
const textColorGroups = [
  { label: 'Dark', colors: [
    { id: 'black', label: 'Black', value: '#000000' },
    { id: 'charcoal', label: 'Charcoal', value: '#1f2937' },
    { id: 'gray', label: 'Gray', value: '#6b7280' },
    { id: 'navy', label: 'Navy', value: '#1e3a5f' },
    { id: 'dark-green', label: 'Forest', value: '#14532d' },
    { id: 'brown', label: 'Brown', value: '#5c3d2e' },
    { id: 'wine', label: 'Wine', value: '#6b2140' },
    { id: 'plum', label: 'Plum', value: '#4c1d95' },
  ]},
  { label: 'Light', colors: [
    { id: 'white', label: 'White', value: '#ffffff' },
    { id: 'cream', label: 'Cream', value: '#fef3c7' },
    { id: 'light-pink', label: 'Pink', value: '#fda4af' },
    { id: 'light-blue', label: 'Sky', value: '#93c5fd' },
    { id: 'light-green', label: 'Mint', value: '#86efac' },
    { id: 'gold', label: 'Gold', value: '#d97706' },
    { id: 'coral', label: 'Coral', value: '#f87171' },
    { id: 'teal', label: 'Teal', value: '#2dd4bf' },
  ]},
];

// ── Background patterns ──
const bgPatterns = [
  { id: 'none', label: 'None', style: {} as React.CSSProperties },
  {
    id: 'gingham', label: 'Gingham', style: {
      backgroundImage: `repeating-linear-gradient(0deg, rgba(200,150,200,0.12) 0px, rgba(200,150,200,0.12) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(200,150,200,0.12) 0px, rgba(200,150,200,0.12) 1px, transparent 1px, transparent 20px)`,
      backgroundSize: '20px 20px',
    } as React.CSSProperties
  },
  {
    id: 'dots', label: 'Dots', style: {
      backgroundImage: `radial-gradient(circle, rgba(180,140,200,0.18) 1.5px, transparent 1.5px)`,
      backgroundSize: '16px 16px',
    } as React.CSSProperties
  },
  {
    id: 'stripes', label: 'Stripes', style: {
      backgroundImage: `repeating-linear-gradient(135deg, rgba(200,150,200,0.1) 0px, rgba(200,150,200,0.1) 2px, transparent 2px, transparent 12px)`,
    } as React.CSSProperties
  },
  {
    id: 'confetti', label: 'Confetti', style: {
      backgroundImage: `radial-gradient(circle, rgba(252,196,204,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(200,180,240,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(180,230,200,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(255,240,170,0.3) 2px, transparent 2px)`,
      backgroundSize: '40px 40px, 50px 50px, 35px 45px, 45px 35px',
      backgroundPosition: '0 0, 20px 15px, 10px 30px, 35px 5px',
    } as React.CSSProperties
  },
  {
    id: 'diamond', label: 'Diamond', style: {
      backgroundImage: `repeating-linear-gradient(45deg, rgba(180,160,210,0.1) 0px, rgba(180,160,210,0.1) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, rgba(180,160,210,0.1) 0px, rgba(180,160,210,0.1) 1px, transparent 1px, transparent 16px)`,
      backgroundSize: '22px 22px',
    } as React.CSSProperties
  },
  {
    id: 'zigzag', label: 'Zigzag', style: {
      backgroundImage: `linear-gradient(135deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(225deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(315deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(45deg, rgba(200,150,180,0.12) 25%, transparent 25%)`,
      backgroundSize: '20px 10px',
      backgroundPosition: '0 0, 10px 0, 10px -5px, 0 5px',
    } as React.CSSProperties
  },
  {
    id: 'waves', label: 'Waves', style: {
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(160,180,220,0.12) 14px, rgba(160,180,220,0.12) 16px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(160,180,220,0.06) 30px, rgba(160,180,220,0.06) 32px)`,
    } as React.CSSProperties
  },
  {
    id: 'hearts', label: 'Hearts', style: {
      backgroundImage: `radial-gradient(circle, rgba(240,140,160,0.2) 3px, transparent 3px), radial-gradient(circle, rgba(240,140,160,0.12) 2px, transparent 2px)`,
      backgroundSize: '30px 30px, 30px 30px',
      backgroundPosition: '0 0, 15px 15px',
    } as React.CSSProperties
  },
  {
    id: 'stars', label: 'Stars', style: {
      backgroundImage: `radial-gradient(circle, rgba(220,180,100,0.2) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(220,180,100,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(220,180,100,0.25) 2px, transparent 2px)`,
      backgroundSize: '24px 24px, 36px 36px, 48px 48px',
      backgroundPosition: '0 0, 12px 18px, 6px 36px',
    } as React.CSSProperties
  },
  {
    id: 'grid', label: 'Grid', style: {
      backgroundImage: `linear-gradient(rgba(150,150,180,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,180,0.08) 1px, transparent 1px)`,
      backgroundSize: '12px 12px',
    } as React.CSSProperties
  },
  {
    id: 'honeycomb', label: 'Honeycomb', style: {
      backgroundImage: `radial-gradient(circle, transparent 7px, rgba(200,170,130,0.08) 7px, rgba(200,170,130,0.08) 8px, transparent 8px)`,
      backgroundSize: '20px 34px',
      backgroundPosition: '0 0, 10px 17px',
    } as React.CSSProperties
  },
  {
    id: 'bubbles', label: 'Bubbles', style: {
      backgroundImage: `radial-gradient(circle, rgba(160,200,230,0.15) 6px, transparent 6px), radial-gradient(circle, rgba(200,170,220,0.12) 4px, transparent 4px), radial-gradient(circle, rgba(180,220,180,0.1) 8px, transparent 8px)`,
      backgroundSize: '50px 50px, 38px 38px, 60px 60px',
      backgroundPosition: '0 0, 25px 20px, 10px 35px',
    } as React.CSSProperties
  },
];

// ── Pattern animations ──
const patternAnimations = [
  { id: 'none', label: 'None' },
  { id: 'scroll', label: 'Scroll' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'float', label: 'Float' },
  { id: 'shimmer', label: 'Shimmer' },
  { id: 'spin', label: 'Spin' },
];

const patternAnimKeyframes = `
@keyframes patternScroll {
  0% { background-position: 0 0; }
  100% { background-position: 200px 200px; }
}
@keyframes patternPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes patternFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
@keyframes patternShimmer {
  0% { opacity: 0.4; filter: brightness(1); }
  50% { opacity: 1; filter: brightness(1.3); }
  100% { opacity: 0.4; filter: brightness(1); }
}
@keyframes patternSpin {
  0% { transform: rotate(0deg) scale(1.5); }
  100% { transform: rotate(360deg) scale(1.5); }
}
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
`;

const getPatternAnimStyle = (animId: string): React.CSSProperties => {
  switch (animId) {
    case 'scroll': return { animation: 'patternScroll 20s linear infinite' };
    case 'pulse': return { animation: 'patternPulse 3s ease-in-out infinite' };
    case 'float': return { animation: 'patternFloat 6s ease-in-out infinite' };
    case 'shimmer': return { animation: 'patternShimmer 4s ease-in-out infinite' };
    case 'spin': return { animation: 'patternSpin 30s linear infinite' };
    default: return {};
  }
};

// ── URL → Embed converter ──
function urlToEmbedCode(url: string): string | null {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes('youtube.com') || u.hostname === 'youtu.be') {
      let videoId: string | null = null;
      if (u.hostname === 'youtu.be') videoId = u.pathname.slice(1).split('/')[0];
      else videoId = u.searchParams.get('v') || u.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]+)/)?.[1] || null;
      if (videoId) return `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    // Spotify
    const sp = url.match(/spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist|episode|show|artist)\/([a-zA-Z0-9]+)/);
    if (sp) {
      const h = sp[1] === 'track' ? 152 : 352;
      return `<iframe src="https://open.spotify.com/embed/${sp[1]}/${sp[2]}?utm_source=generator&theme=0" width="100%" height="${h}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    }
    // TikTok
    const tt = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (tt) return `<iframe src="https://www.tiktok.com/embed/v2/${tt[1]}" width="100%" height="580" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } catch { /* not a valid URL */ }
  return null;
}

const buttonStyles = [
  { id: 'rounded', label: 'Rounded', cls: 'rounded-full' },
  { id: 'soft', label: 'Soft', cls: 'rounded-xl' },
  { id: 'sharp', label: 'Sharp', cls: 'rounded-md' },
  { id: 'outline-round', label: 'Outline', cls: 'rounded-full border-2' },
  { id: 'shadow', label: 'Shadow', cls: 'rounded-xl shadow-md' },
];

const fontOptions = [
  // Sans-serif
  { id: 'inter', label: 'Inter', cls: 'font-sans', category: 'Sans-serif' },
  { id: 'poppins', label: 'Poppins', cls: 'font-poppins', category: 'Sans-serif' },
  { id: 'dm-sans', label: 'DM Sans', cls: 'font-dm-sans', category: 'Sans-serif' },
  { id: 'outfit', label: 'Outfit', cls: 'font-outfit', category: 'Sans-serif' },
  { id: 'space-grotesk', label: 'Space Grotesk', cls: 'font-space-grotesk', category: 'Sans-serif' },
  { id: 'nunito', label: 'Nunito', cls: 'font-nunito', category: 'Sans-serif' },
  { id: 'quicksand', label: 'Quicksand', cls: 'font-quicksand', category: 'Sans-serif' },
  { id: 'comfortaa', label: 'Comfortaa', cls: 'font-comfortaa', category: 'Sans-serif' },
  { id: 'rubik', label: 'Rubik', cls: 'font-rubik', category: 'Sans-serif' },
  { id: 'montserrat', label: 'Montserrat', cls: 'font-montserrat', category: 'Sans-serif' },
  { id: 'raleway', label: 'Raleway', cls: 'font-raleway', category: 'Sans-serif' },
  { id: 'oswald', label: 'Oswald', cls: 'font-oswald', category: 'Sans-serif' },
  { id: 'bebas', label: 'Bebas Neue', cls: 'font-bebas', category: 'Sans-serif' },
  // Serif
  { id: 'playfair', label: 'Playfair', cls: 'font-playfair', category: 'Serif' },
  { id: 'lora', label: 'Lora', cls: 'font-lora', category: 'Serif' },
  { id: 'merriweather', label: 'Merriweather', cls: 'font-merriweather', category: 'Serif' },
  { id: 'crimson', label: 'Crimson', cls: 'font-crimson', category: 'Serif' },
  { id: 'source-serif', label: 'Source Serif', cls: 'font-source-serif', category: 'Serif' },
  // Monospace
  { id: 'jetbrains', label: 'JetBrains', cls: 'font-jetbrains', category: 'Mono' },
  { id: 'fira-code', label: 'Fira Code', cls: 'font-fira-code', category: 'Mono' },
  { id: 'space-mono', label: 'Space Mono', cls: 'font-space-mono', category: 'Mono' },
  // Handwriting
  { id: 'caveat', label: 'Caveat', cls: 'font-caveat', category: 'Handwriting' },
  { id: 'dancing', label: 'Dancing', cls: 'font-dancing', category: 'Handwriting' },
  { id: 'pacifico', label: 'Pacifico', cls: 'font-pacifico', category: 'Handwriting' },
  { id: 'satisfy', label: 'Satisfy', cls: 'font-satisfy', category: 'Handwriting' },
];

// ── Social icons map ──
const socialPlatforms = [
  { id: 'instagram', icon: Instagram, label: 'Instagram' },
  { id: 'youtube', icon: Youtube, label: 'YouTube' },
  { id: 'twitter', icon: Twitter, label: 'Twitter' },
  { id: 'tiktok', icon: Music2, label: 'TikTok' },
  { id: 'facebook', icon: Facebook, label: 'Facebook' },
  { id: 'twitch', icon: Twitch, label: 'Twitch' },
  { id: 'github', icon: Github, label: 'GitHub' },
  { id: 'website', icon: Globe, label: 'Website' },
  { id: 'linkedin', icon: AtSign, label: 'LinkedIn' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'telegram', icon: Send, label: 'Telegram' },
  { id: 'whatsapp', icon: Phone, label: 'WhatsApp' },
  { id: 'line', icon: MessageCircle, label: 'Line' },
  { id: 'spotify', icon: Headphones, label: 'Spotify' },
  { id: 'soundcloud', icon: Music, label: 'SoundCloud' },
  { id: 'podcast', icon: Podcast, label: 'Podcast' },
  { id: 'pinterest', icon: MapPin, label: 'Pinterest' },
  { id: 'snapchat', icon: Camera, label: 'Snapchat' },
  { id: 'reddit', icon: MessageSquare, label: 'Reddit' },
  { id: 'discord', icon: Gamepad2, label: 'Discord' },
  { id: 'steam', icon: Flame, label: 'Steam' },
  { id: 'shopify', icon: Store, label: 'Shopify' },
  { id: 'etsy', icon: Shirt, label: 'Etsy' },
  { id: 'rss', icon: Rss, label: 'RSS' },
  { id: 'blog', icon: BookOpen, label: 'Blog' },
  { id: 'newsletter', icon: Newspaper, label: 'Newsletter' },
  { id: 'patreon', icon: Crown, label: 'Patreon' },
  { id: 'kofi', icon: Coffee, label: 'Ko-fi' },
  { id: 'donate', icon: Gift, label: 'Donate' },
  { id: 'video', icon: Video, label: 'Video' },
  { id: 'tv', icon: Tv, label: 'TV' },
  { id: 'radio', icon: Radio, label: 'Radio' },
  { id: 'mic', icon: Mic, label: 'Mic' },
  { id: 'film', icon: Clapperboard, label: 'Film' },
  { id: 'design', icon: PenTool, label: 'Design' },
  { id: 'art', icon: Brush, label: 'Art' },
  { id: 'wallet', icon: Wallet, label: 'Wallet' },
  { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
  { id: 'code', icon: Code2, label: 'Code' },
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
  { id: 'product', icon: Rocket, label: 'Product' },
  { id: 'promo', icon: Megaphone, label: 'Promo' },
  { id: 'anchor', icon: Anchor, label: 'Anchor' },
  { id: 'featured', icon: Star, label: 'Featured' },
  { id: 'flash', icon: Zap, label: 'Flash' },
];

// ── Add modal categories ──
const addCategories = [
  { id: 'suggested', icon: Sparkles, label: 'แนะนำ' },
  { id: 'projects', icon: Grid3x3, label: 'โปรเจกต์ & SDK' },
  { id: 'commerce', icon: ShoppingBag, label: 'พาณิชย์' },
  { id: 'social', icon: Heart, label: 'โซเชียล' },
  { id: 'media', icon: Play, label: 'สื่อ' },
  { id: 'contact', icon: Phone, label: 'ติดต่อ' },
  { id: 'events', icon: Calendar, label: 'กิจกรรม' },
  { id: 'text', icon: FileText, label: 'ข้อความ' },
];

const addQuickCards = [
  { icon: Grid3x3, label: 'คอลเลกชัน', color: '#7c3aed' },
  { icon: Link2, label: 'ลิงก์', color: '#7c3aed' },
  { icon: Tag, label: 'สินค้า', color: '#7c3aed' },
  { icon: ClipboardList, label: 'แบบฟอร์ม', color: '#7c3aed' },
];

const addSuggestedItems = [
  { icon: Download, label: 'แคตตาล็อก / แบบ', desc: 'แชร์แคตตาล็อก PDF หรือแบบ CAD อย่างปลอดภัย', category: 'projects', gradient: 'from-[#2563eb] to-[#3b82f6]' },
  { icon: ClipboardList, label: 'ขอใบเสนอราคา (RFQ)', desc: 'แบบฟอร์มขอใบเสนอราคาแบบมืออาชีพ', category: 'projects', gradient: 'from-[#059669] to-[#10b981]' },
  { icon: Grid3x3, label: 'ผลงานอ้างอิง', desc: 'แสดงผลงานโปรเจกต์ที่เสร็จสมบูรณ์', category: 'projects', gradient: 'from-[#4f46e5] to-[#6366f1]' },
  { icon: Tag, label: 'ข้อมูลวัสดุ', desc: 'ข้อมูลจำเพาะทางเทคนิคโดยละเอียด', category: 'projects', gradient: 'from-[#db2777] to-[#ec4899]' },
  { icon: Phone, label: 'นัดเยี่ยมชมไซต์', desc: 'นัดหมายที่ปรึกษาเข้าเยี่ยมชมไซต์', category: 'projects', gradient: 'from-[#d97706] to-[#f59e0b]' },
  { icon: Instagram, label: 'Instagram', desc: 'แชร์ Instagram, TikTok, YouTube และอื่น ๆ', category: 'social', gradient: 'from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
  { icon: Music2, label: 'TikTok', desc: 'แชร์ TikTok ของคุณบน OpenBio', category: 'social', gradient: 'from-[#69C9D0] to-[#EE1D52]' },
  { icon: Youtube, label: 'YouTube', desc: 'แชร์วิดีโอ YouTube บน OpenBio', category: 'media', gradient: 'from-[#FF0000] to-[#CC0000]' },
  { icon: Music2, label: 'Spotify', desc: 'แชร์เพลงล่าสุดหรือเพลงโปรด', category: 'media', gradient: 'from-[#1DB954] to-[#1ed760]' },
  { icon: Download, label: 'ดาวน์โหลดไฟล์', desc: 'อัปโหลดไฟล์เพื่อขายบน OpenBio', category: 'commerce', gradient: 'from-[#f97316] to-[#fb923c]' },
  { icon: Mail, label: 'สมัครอีเมล', desc: 'รวบรวมอีเมลจากผู้ติดตามของคุณ', category: 'contact', gradient: 'from-[#6366f1] to-[#818cf8]' },
  { icon: DollarSign, label: 'กระปุกทิป', desc: 'รับทิปจากผู้สนับสนุนของคุณ', category: 'commerce', gradient: 'from-[#eab308] to-[#facc15]' },
  { icon: ShoppingBag, label: 'ร้านค้า', desc: 'ขายสินค้าโดยตรงจาก OpenBio', category: 'commerce', gradient: 'from-[#ec4899] to-[#f472b6]' },
  { icon: Facebook, label: 'Facebook', desc: 'เชื่อมต่อโปรไฟล์หรือเพจ Facebook ของคุณ', category: 'social', gradient: 'from-[#1877F2] to-[#4299e1]' },
  { icon: Twitter, label: 'Twitter', desc: 'แชร์ทวีตและโปรไฟล์', category: 'social', gradient: 'from-[#1DA1F2] to-[#0d8bd9]' },
  { icon: MessageCircle, label: 'Line', desc: 'แชร์ LINE ID หรือ LINE Official Account ของคุณ', category: 'social', gradient: 'from-[#06C755] to-[#00B900]' },
  { icon: Phone, label: 'เบอร์โทรศัพท์', desc: 'ให้ผู้เข้าชมโทรหาคุณได้โดยตรง', category: 'contact', gradient: 'from-[#10b981] to-[#34d399]' },
  { icon: Mail, label: 'แบบฟอร์มติดต่อ', desc: 'รับข้อความจากผู้เข้าชมของคุณ', category: 'contact', gradient: 'from-[#8b5cf6] to-[#a78bfa]' },
  { icon: Calendar, label: 'กิจกรรม', desc: 'โปรโมตกิจกรรมที่กำลังจะมาถึง', category: 'events', gradient: 'from-[#f59e0b] to-[#fbbf24]' },
  { icon: Calendar, label: 'จองนัดหมาย', desc: 'ให้ผู้เข้าชมจองนัดหมายได้', category: 'events', gradient: 'from-[#6366f1] to-[#818cf8]' },
  { icon: Play, label: 'วิดีโอ', desc: 'ฝังวิดีโอ YouTube หรือ Vimeo', category: 'media', gradient: 'from-[#ef4444] to-[#f87171]' },
  { icon: Music2, label: 'Podcast', desc: 'แชร์ตอนพอดแคสต์ของคุณ', category: 'media', gradient: 'from-[#8b5cf6] to-[#c084fc]' },
  { icon: FileText, label: 'บล็อกข้อความ', desc: 'เพิ่มส่วนข้อความในหน้าเพจ', category: 'text', gradient: 'from-[#6b7280] to-[#9ca3af]' },
  { icon: FileText, label: 'หัวข้อ', desc: 'เพิ่มหัวข้อเพื่อจัดระเบียบลิงก์', category: 'text', gradient: 'from-[#374151] to-[#6b7280]' },
];

type LinkItem = { id: string; title: string; url: string; enabled: boolean; thumbnail?: string; clicks?: number; color?: string; embedCode?: string; linkImage?: string };

export default function CreatePage() {
  const { username, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pbPageId, setPbPageId] = useState<string | null>(null);
  const [pbPageRecord, setPbPageRecord] = useState<any>(null);
  const [pbLoaded, setPbLoaded] = useState(false);
  const [pendingTemplate] = useState(() => {
    const s = location.state as { template?: any } | null;
    return s?.template || null;
  });
  const [templateApplied, setTemplateApplied] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [displayName, setDisplayName] = useState(username || '');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarScale, setAvatarScale] = useState(1);
  const [avatarX, setAvatarX] = useState(0);
  const [avatarY, setAvatarY] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState('minimal');
  const [selectedButton, setSelectedButton] = useState('rounded');
  const [buttonAnimation, setButtonAnimation] = useState(true);
  const [btnAnimKey, setBtnAnimKey] = useState(0);
  const [selectedFont, setSelectedFont] = useState('inter');
  const [customTextColor, setCustomTextColor] = useState('');
  const [customBgColor, setCustomBgColor] = useState('#6366f1');
  const [customBgSecondary, setCustomBgSecondary] = useState('#4f46e5');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [activeSocials, setActiveSocials] = useState<string[]>([]);
  const [socialUrls, setSocialUrls] = useState<Record<string, string>>({});
  const [fontCategory, setFontCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('links');
  const [mainTab, setMainTab] = useState<'add' | 'settings'>('add');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalCategory, setAddModalCategory] = useState('suggested');
  const [addModalSearch, setAddModalSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [showSocialPicker, setShowSocialPicker] = useState(false);
  const [socialSearch, setSocialSearch] = useState('');
  const [toast, setToast] = useState('');
  const [showAvatarCrop, setShowAvatarCrop] = useState(false);
  const [prevAvatarCrop, setPrevAvatarCrop] = useState({ scale: 1, x: 0, y: 0, avatar: '' });
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const avatarCropRef = useRef<HTMLDivElement>(null);
  const avatarDragRef = useRef({ dragging: false, startX: 0, startY: 0, startAvatarX: 0, startAvatarY: 0 });
  const avatarPinchRef = useRef({ pinching: false, startDist: 0, startScale: 1 });
  const linkImageInputRef = useRef<HTMLInputElement>(null);
  const linkBannerInputRef = useRef<HTMLInputElement>(null);
  const productImagesInputRef = useRef<HTMLInputElement>(null);
  const [imageTargetLinkId, setImageTargetLinkId] = useState<string | null>(null);
  const [bannerTargetLinkId, setBannerTargetLinkId] = useState<string | null>(null);

  // Earn section
  const [tipJarEnabled, setTipJarEnabled] = useState(false);
  const [tipAmounts, setTipAmounts] = useState([3, 5, 10, 25]);
  const [earnProducts, setEarnProducts] = useState<{ id: string; name: string; price: string }[]>([]);
  const [memberships, setMemberships] = useState<{ id: string; title: string; price: string; period: string }[]>([]);

  const scrollToSubSection = (section: string, subId: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
    // Use a small timeout to allow the section to render/switch before scrolling
    setTimeout(() => {
      const el = document.getElementById(subId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Audience section
  const [subscribers, setSubscribers] = useState<{ email: string; date: string; id?: string }[]>([]);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
  const [emailFormTitle, setEmailFormTitle] = useState('สมัครรับจดหมายข่าว');
  const [showSubscribe, setShowSubscribe] = useState(false);

  // Tools section
  const [scheduledPosts, setScheduledPosts] = useState<{ id: string; text: string; platform: string; date: string; time: string }[]>([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('instagram');
  const [newPostDate, setNewPostDate] = useState('');
  const [newPostTime, setNewPostTime] = useState('');
  const [autoReplyMessage, setAutoReplyMessage] = useState('ขอบคุณที่ติดต่อมา! ดูลิงก์ทั้งหมดของฉันได้ที่ OpenBio');
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  const [autoReplyKeywords, setAutoReplyKeywords] = useState('link, links, website, url');
  const [shortenerInput, setShortenerInput] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState<{ original: string; short: string; clicks: number; createdAt: string }[]>(() => {
    try { const saved = localStorage.getItem('openbio_shortened_links'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [shortenerLoading, setShortenerLoading] = useState(false);
  const [shortenerError, setShortenerError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedSidebar, setExpandedSidebar] = useState<string | null>(null);
  const [sidebarUserMenu, setSidebarUserMenu] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [earnSubTab, setEarnSubTab] = useState<'overview' | 'earnings'>('overview');
  const [selectedPattern, setSelectedPattern] = useState('none');
  const [patternDropdownOpen, setPatternDropdownOpen] = useState(false);
  const [selectedPatternAnim, setSelectedPatternAnim] = useState('none');
  const [patternAnimDropdownOpen, setPatternAnimDropdownOpen] = useState(false);
  const [patternGlow, setPatternGlow] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [bgImage, setBgImage] = useState('');
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  // ── Helper: restore state from localStorage ──
  const loadFromLocalStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem('openbio_preview');
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (d.displayName) setDisplayName(d.displayName);
      if (d.bio) setBio(d.bio);
      if (d.avatar) setAvatar(d.avatar);
      if (d.avatarScale) setAvatarScale(d.avatarScale);
      if (d.avatarX !== undefined) setAvatarX(d.avatarX);
      if (d.avatarY !== undefined) setAvatarY(d.avatarY);
      if (d.productImages) setProductImages(d.productImages);
      if (d.selectedTheme) setSelectedTheme(d.selectedTheme);
      if (d.selectedButton) setSelectedButton(d.selectedButton);
      if (d.selectedFont) setSelectedFont(d.selectedFont);
      if (d.customTextColor) setCustomTextColor(d.customTextColor);
      if (d.customBgColor) setCustomBgColor(d.customBgColor);
      if (d.customBgSecondary) setCustomBgSecondary(d.customBgSecondary);
      if (d.selectedPattern) setSelectedPattern(d.selectedPattern);
      if (d.selectedPatternAnim) setSelectedPatternAnim(d.selectedPatternAnim);
      if (d.patternGlow !== undefined) setPatternGlow(d.patternGlow);
      if (d.activeSocials) setActiveSocials(d.activeSocials);
      if (d.socialUrls) setSocialUrls(d.socialUrls);
      if (d.links && d.links.length > 0) setLinks(d.links);
      if (d.bgImage !== undefined) setBgImage(d.bgImage);
      return true;
    } catch { return false; }
  }, []);

  // ── Load page data from PocketBase on mount (fallback to localStorage) ──
  useEffect(() => {
    if (!user?.id || !isPocketBaseEnabled) {
      if (!pendingTemplate) loadFromLocalStorage();
      setPbLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const pages = await pb.collection('pages').getList(1, 1, {
          filter: `user = "${user.id}"`,
        });
        if (cancelled) return;
        if (pages.items.length > 0) {
          const p = pages.items[0];
          setPbPageId(p.id);
          setPbPageRecord(p);

          // Skip restoring page data if a template is about to be applied
          if (!pendingTemplate) {
            setDisplayName(p.displayName || username || '');
            setBio(p.bio || '');
            if (p.avatar) setAvatar(getFileUrl(p, p.avatar));
            if (p.selectedTheme) setSelectedTheme(p.selectedTheme);
            if (p.selectedButton) setSelectedButton(p.selectedButton);
            if (p.selectedFont) setSelectedFont(p.selectedFont);
            if (p.customTextColor) setCustomTextColor(p.customTextColor);
            if (p.customBgColor) setCustomBgColor(p.customBgColor);
            if (p.customBgSecondary) setCustomBgSecondary(p.customBgSecondary);
            if (p.selectedPattern) setSelectedPattern(p.selectedPattern);
            if (p.selectedPatternAnim) setSelectedPatternAnim(p.selectedPatternAnim);
            setPatternGlow(!!p.patternGlow);
            setButtonAnimation(p.buttonAnimation !== false);
            if (p.activeSocials) setActiveSocials(p.activeSocials);
            if (p.socialUrls) setSocialUrls(p.socialUrls);

            // Restore bgImage from localStorage (not stored in PocketBase)
            try {
              const raw = localStorage.getItem('openbio_preview');
              if (raw) {
                const d = JSON.parse(raw);
                if (d.bgImage) setBgImage(d.bgImage);
              }
            } catch { /* ignore */ }

            // Load links
            const linksResult = await pb.collection('links').getFullList({
              filter: `page = "${p.id}"`,
              sort: 'order',
            });

            // Count clicks from analytics records
            let clickCounts: Record<string, number> = {};
            try {
              const clickRecords = await pb.collection('analytics').getFullList({
                filter: `page = "${p.id}" && type = "click"`,
              });
              clickRecords.forEach((r: any) => {
                if (r.linkId) {
                  clickCounts[r.linkId] = (clickCounts[r.linkId] || 0) + 1;
                }
              });
            } catch { /* ignore */ }

            if (!cancelled && linksResult.length > 0) {
              setLinks(linksResult.map((l: any) => ({
                id: l.id,
                title: l.title,
                url: l.url,
                enabled: l.enabled,
                thumbnail: l.thumbnail ? getFileUrl(l, l.thumbnail) : undefined,
                clicks: clickCounts[l.id] || 0,
                color: l.color || '',
                embedCode: l.embedCode || '',
                linkImage: l.linkImage || '',
              })));
            }

            // Load subscribe settings from page
            setShowSubscribe(!!p.showSubscribe);
            if (p.emailFormTitle) setEmailFormTitle(p.emailFormTitle);

            // Load subscribers
            try {
              const subscribersResult = await pb.collection('subscribers').getFullList({
                filter: `page = "${p.id}"`,
                sort: '-created',
              });
              if (!cancelled) {
                setSubscribers(subscribersResult.map((s: any) => ({
                  email: s.email,
                  date: s.created,
                  id: s.id,
                })));
              }
            } catch { /* subscribers collection might not exist yet */ }
          }
        } else {
          // No page in PocketBase yet — try creating one
          try {
            const newPage = await pb.collection('pages').create({
              user: user.id,
              displayName: username || '',
              selectedTheme: 'minimal',
              selectedButton: 'rounded',
              selectedFont: 'inter',
              customBgColor: '#6366f1',
              customBgSecondary: '#4f46e5',
              buttonAnimation: true,
              activeSocials: [],
              socialUrls: {},
            });
            if (!cancelled) {
              setPbPageId(newPage.id);
              setPbPageRecord(newPage);
            }
          } catch {
            // PocketBase collection might not exist — fall back to localStorage
            if (!cancelled && !pendingTemplate) loadFromLocalStorage();
          }
        }
      } catch {
        // PocketBase unavailable — silently fall back to localStorage
        if (!cancelled && !pendingTemplate) loadFromLocalStorage();
      } finally {
        if (!cancelled) setPbLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  // ── Debounced save page data to PocketBase ──
  const debouncedSavePage = useCallback((pageId: string, data: Record<string, any>) => {
    if (!isPocketBaseEnabled) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        await pb.collection('pages').update(pageId, data);
      } catch (err) {
        // PocketBase save failed silently
      }
    }, 1000);
  }, []);

  // ── Debounced sync links to PocketBase ──
  const debouncedSaveLinks = useCallback((pageId: string, currentLinks: typeof links) => {
    if (!isPocketBaseEnabled) return;
    if (linkSaveTimerRef.current) clearTimeout(linkSaveTimerRef.current);
    linkSaveTimerRef.current = setTimeout(async () => {
      try {
        // Get existing PB links
        const existing = await pb.collection('links').getFullList({
          filter: `page = "${pageId}"`,
        });
        const existingIds = new Set(existing.map((l: any) => l.id));
        const currentIds = new Set(currentLinks.map(l => l.id));

        // Delete removed links
        for (const ex of existing) {
          if (!currentIds.has(ex.id)) {
            await pb.collection('links').delete(ex.id);
          }
        }

        // Create or update links
        for (let i = 0; i < currentLinks.length; i++) {
          const link = currentLinks[i];
          if (!link.title && !link.url) continue; // skip empty drafts

          const data: any = {
            page: pageId,
            title: link.title || 'ไม่มีชื่อ',
            url: link.url || 'https://example.com',
            enabled: link.enabled,
            color: link.color || '',
            order: i,
            clicks: link.clicks || 0,
            embedCode: link.embedCode || '',
            linkImage: link.linkImage || '',
          };

          // Prepare FormData if there's a thumbnail file to upload
          let payload: any = data;
          if (link.thumbnailFile) {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
              formData.append(key, data[key]);
            });
            formData.append('thumbnail', link.thumbnailFile);
            payload = formData;
          }

          if (existingIds.has(link.id)) {
            const updated = await pb.collection('links').update(link.id, payload);
            // Update state with actual file URL
            if (link.thumbnailFile && updated.thumbnail) {
              setLinks(prev => prev.map(l =>
                l.id === link.id
                  ? {
                      ...l,
                      thumbnail: getFileUrl(updated, updated.thumbnail),
                      thumbnailFile: undefined
                    }
                  : l
              ));
            }
          } else {
            try {
              const created = await pb.collection('links').create(payload);
              // Update state with actual link ID and thumbnail URL
              setLinks(prev => prev.map(l =>
                l.id === link.id
                  ? {
                      ...l,
                      id: created.id,
                      thumbnail: link.thumbnailFile && created.thumbnail
                        ? getFileUrl(created, created.thumbnail)
                        : l.thumbnail,
                      thumbnailFile: undefined
                    }
                  : l
              ));
            } catch {
              // Skip if create fails (e.g., invalid URL)
            }
          }
        }
      } catch (err) {
        // PocketBase link sync failed silently
      }
    }, 1500);
  }, []);

  // Apply template data from TemplatesPage navigation (runs AFTER PB/localStorage load)
  useEffect(() => {
    if (!pbLoaded || !pendingTemplate || templateApplied) return;
    setTemplateApplied(true);

    const t = pendingTemplate;
    setDisplayName(t.name);
    setBio(t.bio);
    setLinks(
      t.links.map((title: string, i: number) => ({
        id: `tpl-${Date.now()}-${i}`,
        title,
        url: '',
        enabled: true,
        clicks: 0,
      }))
    );

    // Apply template background image & theme
    if (t.bgImage) {
      setBgImage(t.bgImage);
      setSelectedTheme('custom');

      // Extract colors from overlay (e.g. "from-[#3d4a32]/90 to-[#3d4a32]/70")
      const hexColors = (t.overlay || '').match(/#[0-9a-fA-F]{6}/g) || [];
      const primary = hexColors[0] || ((t.overlay || '').includes('black') ? '#000000' : '#333333');
      const secondary = hexColors[1] || primary;
      setCustomBgColor(primary);
      setCustomBgSecondary(secondary);

      // Extract text color from Tailwind class
      if (t.textColor) {
        const textHex = t.textColor.match(/#[0-9a-fA-F]{3,6}/)?.[0];
        if (textHex) {
          setCustomTextColor(textHex.length === 4
            ? `#${textHex[1]}${textHex[1]}${textHex[2]}${textHex[2]}${textHex[3]}${textHex[3]}`
            : textHex);
        } else if (t.textColor.includes('white')) {
          setCustomTextColor('#ffffff');
        } else if (t.textColor.includes('gray-900')) {
          setCustomTextColor('#111827');
        } else if (t.textColor.includes('gray-800')) {
          setCustomTextColor('#1f2937');
        }
      }
    }

    // Clear the state so refreshing doesn't re-apply
    window.history.replaceState({}, '');
  }, [pbLoaded, pendingTemplate, templateApplied]);

  const isLightColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b > 0.55;
  };

  const isCustom = selectedTheme === 'custom';
  const light = isLightColor(customBgColor);
  const customTheme = {
    id: 'custom', label: 'กำหนดเอง', preview: customBgColor,
    bg: '', card: '', cardBorder: '', text: '', subtext: '',
    bgStyle: { background: `linear-gradient(to bottom, ${customBgColor}, ${customBgSecondary})` } as React.CSSProperties,
    cardStyle: {
      backgroundColor: light ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)',
      border: light ? 'none' : '1px solid rgba(255,255,255,0.08)',
    } as React.CSSProperties,
    textColor: light ? '#1f2937' : '#ffffff',
    subtextColor: light ? '#6b7280' : 'rgba(255,255,255,0.5)',
  };

  const theme = isCustom ? customTheme : (themes.find((t) => t.id === selectedTheme) || themes[0]);
  const btnStyle = buttonStyles.find((b) => b.id === selectedButton) || buttonStyles[0];
  const fontStyle = fontOptions.find((f) => f.id === selectedFont) || fontOptions[0];
  // Resolve text color: user pick > theme auto
  const resolvedTextColor = customTextColor || (isCustom ? customTheme.textColor : undefined);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  // Persist shortened links to localStorage
  useEffect(() => {
    localStorage.setItem('openbio_shortened_links', JSON.stringify(shortenedLinks));
  }, [shortenedLinks]);

  // Shorten URL using is.gd API with fallback
  const handleShortenUrl = async () => {
    const url = shortenerInput.trim();
    if (!url) return;
    // Basic URL validation
    try { new URL(url); } catch {
      setShortenerError('กรุณาใส่ URL ที่ถูกต้อง (เช่น https://example.com)');
      return;
    }
    // Check for duplicates
    if (shortenedLinks.some(l => l.original === url)) {
      setShortenerError('URL นี้ถูกย่อไปแล้ว');
      return;
    }
    setShortenerLoading(true);
    setShortenerError('');
    try {
      const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.shorturl) {
        setShortenedLinks(prev => [{ original: url, short: data.shorturl, clicks: 0, createdAt: new Date().toISOString() }, ...prev]);
        setShortenerInput('');
        showToast('ย่อลิงก์สำเร็จ!');
      } else {
        throw new Error(data.errormessage || 'API error');
      }
    } catch {
      // Fallback: generate a local short code
      const rand = Math.random().toString(36).substring(2, 8);
      setShortenedLinks(prev => [{ original: url, short: `https://is.gd/${rand}`, clicks: 0, createdAt: new Date().toISOString() }, ...prev]);
      setShortenerInput('');
      showToast('ย่อลิงก์สำเร็จ! (offline mode)');
    } finally {
      setShortenerLoading(false);
    }
  };

  // Helper: resolve actual URL for a link (fallback to socialUrls if link URL is empty/placeholder)
  const resolveUrl = (link: LinkItem): string => {
    const url = link.url?.trim();
    if (url && url !== 'https://example.com') return url;
    const titleLower = (link.title || '').toLowerCase();
    for (const [key, socialUrl] of Object.entries(socialUrls)) {
      if (socialUrl && titleLower.includes(key)) return socialUrl;
    }
    return url || '';
  };

  const addLink = (title = '') => {
    setLinks([...links, { id: Date.now().toString(), title, url: '', enabled: true, clicks: 0 }]);
    setAddModalOpen(false);
    setAddModalSearch('');
  };
  const removeLink = (id: string) => setLinks(links.filter((l) => l.id !== id));
  const updateLink = (id: string, field: 'title' | 'url' | 'color' | 'embedCode' | 'linkImage', value: string) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };
  const toggleLink = (id: string) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));
  };
  const toggleSocial = (platform: string) => {
    setActiveSocials((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  // Avatar crop: drag-to-pan + pinch/wheel to zoom
  const clampPan = (_scale: number, x: number, y: number) => {
    const maxPan = 50;
    return {
      x: Math.max(-maxPan, Math.min(maxPan, x)),
      y: Math.max(-maxPan, Math.min(maxPan, y)),
    };
  };

  const handleAvatarDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if ('touches' in e && e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      avatarPinchRef.current = { pinching: true, startDist: Math.hypot(dx, dy), startScale: avatarScale };
      avatarDragRef.current.dragging = false;
      return;
    }
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    avatarDragRef.current = { dragging: true, startX: clientX, startY: clientY, startAvatarX: avatarX, startAvatarY: avatarY };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && (e as TouchEvent).touches.length === 2 && avatarPinchRef.current.pinching) {
        // Pinch move
        e.preventDefault();
        const t = e as TouchEvent;
        const dx = t.touches[0].clientX - t.touches[1].clientX;
        const dy = t.touches[0].clientY - t.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ratio = dist / avatarPinchRef.current.startDist;
        const next = Math.max(1, Math.min(3, avatarPinchRef.current.startScale * ratio));
        setAvatarScale(next);
        const clamped = clampPan(next, avatarX, avatarY);
        setAvatarX(clamped.x);
        setAvatarY(clamped.y);
        return;
      }
      if (!avatarDragRef.current.dragging) return;
      e.preventDefault();
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const container = avatarCropRef.current;
      const size = container ? container.offsetWidth : 128;
      const dx = clientX - avatarDragRef.current.startX;
      const dy = clientY - avatarDragRef.current.startY;
      const pctX = (dx / size) * 150;
      const pctY = (dy / size) * 150;
      const clamped = clampPan(avatarScale, avatarDragRef.current.startAvatarX + pctX, avatarDragRef.current.startAvatarY + pctY);
      setAvatarX(clamped.x);
      setAvatarY(clamped.y);
    };
    const handleEnd = () => {
      avatarDragRef.current.dragging = false;
      avatarPinchRef.current.pinching = false;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [avatarScale, avatarX, avatarY]);

  // Wheel zoom on avatar crop area (desktop)
  useEffect(() => {
    const el = avatarCropRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      setAvatarScale(prev => {
        const next = Math.max(1, Math.min(3, prev + delta));
        const clamped = clampPan(next, avatarX, avatarY);
        setAvatarX(clamped.x);
        setAvatarY(clamped.y);
        return next;
      });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [avatar, avatarX, avatarY]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Save previous state for cancel
      setPrevAvatarCrop({ scale: avatarScale, x: avatarX, y: avatarY, avatar });
      // Reset crop when uploading new image
      setAvatarScale(1);
      setAvatarX(0);
      setAvatarY(0);
      // Instant local preview + open crop modal
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
        setShowAvatarCrop(true);
      };
      reader.readAsDataURL(file);
      // Upload to PocketBase in background
      if (pbPageId) {
        const formData = new FormData();
        formData.append('avatar', file);
        pb.collection('pages').update(pbPageId, formData).then((updated) => {
          if (updated.avatar) {
            setPbPageRecord(updated);
            setAvatar(getFileUrl(updated, updated.avatar));
          }
        }).catch(() => {});
      }
    }
  };

  const handleLinkImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetLinkId = imageTargetLinkId;
    if (!file || !targetLinkId) return;

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      showToast('รูปภาพต้องมีขนาดไม่เกิน 2MB');
      setImageTargetLinkId(null);
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      showToast('รองรับเฉพาะรูปภาพ JPEG, PNG, GIF และ WebP');
      setImageTargetLinkId(null);
      return;
    }

    // Create preview URL for immediate display
    const previewUrl = URL.createObjectURL(file);

    // Update state with preview and mark as uploading
    setLinks(prev => prev.map((l) =>
      l.id === targetLinkId
        ? {
            ...l,
            thumbnail: previewUrl,
            thumbnailUploading: true
          }
        : l
    ));

    setImageTargetLinkId(null);

    // Upload to PocketBase immediately if link exists
    if (isPocketBaseEnabled && pbPageId) {
      try {
        // Find the link in PocketBase
        const existing = await pb.collection('links').getFullList({
          filter: `page = "${pbPageId}"`,
        });
        const pbLink = existing.find((l: any) => l.id === targetLinkId);

        if (pbLink) {
          // Update existing link with thumbnail
          const formData = new FormData();
          formData.append('thumbnail', file);

          const updated = await pb.collection('links').update(targetLinkId, formData);

          // Update state with PocketBase file URL
          setLinks(prev => prev.map(l =>
            l.id === targetLinkId
              ? {
                  ...l,
                  thumbnail: getFileUrl(updated, updated.thumbnail),
                  thumbnailUploading: false
                }
              : l
          ));

          showToast('อัปโหลดรูปขนาดย่อแล้ว!');
        } else {
          // Link doesn't exist in PocketBase yet - keep preview URL
          setLinks(prev => prev.map(l =>
            l.id === targetLinkId
              ? {
                  ...l,
                  thumbnailUploading: false,
                  thumbnailFile: file
                }
              : l
          ));
        }
      } catch (error) {
        console.error('Thumbnail upload failed:', error);
        setLinks(prev => prev.map(l =>
          l.id === targetLinkId
            ? {
                ...l,
                thumbnailUploading: false,
                thumbnailFile: file
              }
            : l
        ));
        showToast('อัปโหลดล้มเหลว จะลองใหม่เมื่อบันทึก');
      }
    } else {
      // PocketBase disabled - keep preview URL and file
      setLinks(prev => prev.map(l =>
        l.id === targetLinkId
          ? {
              ...l,
              thumbnailUploading: false,
              thumbnailFile: file
            }
          : l
      ));
    }
  };

  const handleLinkBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bannerTargetLinkId) return;
    if (file.size > 2 * 1024 * 1024) { showToast('รูปภาพต้องมีขนาดไม่เกิน 2MB'); setBannerTargetLinkId(null); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        updateLink(bannerTargetLinkId, 'linkImage', ev.target.result as string);
        showToast('เพิ่มรูปลิงก์แล้ว!');
      }
      setBannerTargetLinkId(null);
    };
    reader.readAsDataURL(file);
    if (linkBannerInputRef.current) linkBannerInputRef.current.value = '';
  };

  const handleProductImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      let loadedCount = 0;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            newImages.push(ev.target.result as string);
          }
          loadedCount++;

          // When all files are loaded, update state
          if (loadedCount === files.length) {
            setProductImages((prev) => [...prev, ...newImages]);
            showToast(`เพิ่มรูปสินค้า ${newImages.length} รูปแล้ว!`);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  const removeProductImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    showToast('ลบรูปสินค้าแล้ว');
  };

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const previewUrl = `${siteUrl}/${displayName || 'preview'}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl);
    } catch {
      // Fallback for non-HTTPS contexts
      const textarea = document.createElement('textarea');
      textarea.value = previewUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    showToast('คัดลอกลิงก์แล้ว!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenPreview = () => {
    navigate(`/${displayName || 'preview'}`);
  };

  const handleStartFresh = () => {
    if (!window.confirm('คุณแน่ใจหรือว่าต้องการเริ่มใหม่? ข้อมูลโปรไฟล์ทั้งหมดของคุณจะถูกล้าง')) {
      return;
    }

    // Clear all states
    setDisplayName('');
    setBio('');
    setAvatar('');
    setProductImages([]);
    setLinks([]);
    setActiveSocials([]);
    setSocialUrls({});
    setSelectedTheme('minimal');
    setSelectedButton('rounded');
    setSelectedFont('inter');
    setCustomTextColor('');
    setCustomBgColor('#6366f1');
    setCustomBgSecondary('#4f46e5');
    setSelectedPattern('none');
    setSelectedPatternAnim('none');
    setPatternGlow(false);
    setBgImage('');

    // Clear localStorage
    localStorage.removeItem('openbio_preview');

    showToast('เริ่มใหม่แล้ว! โปรไฟล์ของคุณถูกล้างแล้ว');
  };


  const handleFinishSetup = () => {
    if (!displayName) {
      showToast('เพิ่มชื่อของคุณเพื่อตั้งค่าให้เสร็จ');
      return;
    }
    if (links.length === 0) {
      setAddModalOpen(true);
      showToast('เพิ่มลิงก์อย่างน้อยหนึ่งลิงก์');
      return;
    }
    if (activeSocials.length === 0) {
      setMainTab('settings');
      showToast('เพิ่มไอคอนโซเชียลเพื่อตั้งค่าให้เสร็จ');
      return;
    }
    showToast('ตั้งค่าเสร็จสิ้น! OpenBio ของคุณพร้อมแล้ว');
  };

  // Show all links (enabled and disabled) - disabled links will have visual indicator
  const visibleLinks = links;

  // Compress avatar for localStorage (resize to small thumbnail)
  const [compressedAvatar, setCompressedAvatar] = useState('');
  useEffect(() => {
    if (!avatar || avatar.startsWith('http')) {
      // URL-based avatar (from PocketBase) — store the URL directly
      setCompressedAvatar(avatar);
      return;
    }
    // base64 avatar — compress with center-crop (square, like object-cover)
    const img = document.createElement('img');
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 300;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const min = Math.min(img.width, img.height);
          const sx = (img.width - min) / 2;
          const sy = (img.height - min) / 2;
          ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
          setCompressedAvatar(canvas.toDataURL('image/jpeg', 0.7));
        }
      } catch { setCompressedAvatar(''); }
    };
    img.src = avatar;
  }, [avatar]);

  // Save preview data to localStorage + debounced save to PocketBase
  useEffect(() => {
    // Don't overwrite localStorage until initial load is complete
    if (!pbLoaded) return;

    try {
      localStorage.setItem('openbio_preview', JSON.stringify({
        displayName, bio, avatar: compressedAvatar, avatarScale, avatarX, avatarY, selectedTheme, selectedButton, selectedFont,
        customTextColor, customBgColor, customBgSecondary,
        links, activeSocials, socialUrls, selectedPattern, selectedPatternAnim, patternGlow,
        bgImage, productImages,
      }));
    } catch { /* ignore quota errors */ }

    // Debounced save to PocketBase (includes displayName/bio for public URL to work)
    if (pbPageId && pbLoaded) {
      debouncedSavePage(pbPageId, {
        displayName, bio,
        selectedTheme, selectedButton, selectedFont,
        customTextColor, customBgColor, customBgSecondary,
        selectedPattern, selectedPatternAnim, patternGlow,
        buttonAnimation, activeSocials, socialUrls,
        showSubscribe, emailFormTitle,
      });
      debouncedSaveLinks(pbPageId, links);
    }
  }, [displayName, bio, compressedAvatar, avatarScale, avatarX, avatarY, selectedTheme, selectedButton, selectedFont,
      customTextColor, customBgColor, customBgSecondary,
      links, activeSocials, socialUrls, selectedPattern, selectedPatternAnim, patternGlow,
      pbPageId, pbLoaded, debouncedSavePage, debouncedSaveLinks, buttonAnimation, bgImage, productImages,
      showSubscribe, emailFormTitle]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      links.forEach(link => {
        if (link.thumbnail && link.thumbnail.startsWith('blob:')) {
          URL.revokeObjectURL(link.thumbnail);
        }
      });
    };
  }, [links]);

  // Manual save for Name/Bio
  const [profileSaving, setProfileSaving] = useState(false);
  const handleSaveProfile = async () => {
    setProfileSaving(true);
    try {
      if (pbPageId) {
        await pb.collection('pages').update(pbPageId, { displayName, bio });
      }
      // Also force localStorage save
      try {
        localStorage.setItem('openbio_preview', JSON.stringify({
          displayName, bio, avatar: compressedAvatar, avatarScale, avatarX, avatarY, selectedTheme, selectedButton, selectedFont,
          customTextColor, customBgColor, customBgSecondary,
          links, activeSocials, socialUrls, selectedPattern, selectedPatternAnim, patternGlow,
          bgImage, productImages,
        }));
      } catch { /* ignore quota errors */ }
      showToast('บันทึกโปรไฟล์แล้ว!');
    } catch {
      showToast('บันทึกโปรไฟล์ล้มเหลว');
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f8f7ff] pt-16 relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124,58,237,0.07) 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }}
    >
      <style>{patternAnimKeyframes}</style>
      {/* Background removed */}
      <div className="flex">

        {/* ══════ Sidebar ══════ */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/70 backdrop-blur-xl border-r border-white/40 pt-20 lg:pt-4 pb-6 flex flex-col transition-all duration-300 lg:translate-x-0 shadow-[4px_0_24px_-6px_rgba(124,58,237,0.08)] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* User info */}
          <div className="px-5 pb-4 mb-2 border-b border-[#e0e7ff]/50 relative">
            <button
              onClick={() => setSidebarUserMenu(!sidebarUserMenu)}
              className="w-full flex items-center gap-3 hover:bg-gradient-to-r hover:from-[#f5f3ff] hover:to-transparent rounded-xl p-2 -m-1 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-md">
                {avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} className="text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {displayName || 'username'}
                </p>
              </div>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${sidebarUserMenu ? 'rotate-180' : ''}`} />
            </button>
            {sidebarUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSidebarUserMenu(false)} />
                <div className="absolute left-3 right-3 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#e0e7ff] py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-[#e0e7ff]">
                    <p className="text-xs text-gray-400">linkc.ee/{displayName || 'username'}</p>
                  </div>
                  <button onClick={() => { handleCopyUrl(); setSidebarUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#f5f3ff]">
                    <Copy size={14} /> คัดลอกลิงก์ของฉัน
                  </button>
                  <button onClick={() => { setActiveSection('links'); setSidebarUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#f5f3ff]">
                    <Settings size={14} /> ตั้งค่าบัญชี
                  </button>
                  <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                    <X size={14} /> ออกจากระบบ
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Main nav */}
          <nav className="px-3 space-y-0.5">
            {sidebarMain.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                    if (item.id === 'earn' || item.id === 'audience') {
                      setExpandedSidebar(expandedSidebar === item.id ? null : item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${activeSection === item.id
                    ? 'bg-gradient-to-r from-[#ede9fe] to-[#f5f3ff]/50 text-[#6d28d9] font-medium shadow-sm border border-[#e0e7ff]/50'
                    : 'text-gray-500 hover:text-[#6d28d9] hover:bg-[#f5f3ff]/50 hover:translate-x-0.5'
                    }`}
                >
                  <item.icon size={18} className={activeSection === item.id ? 'text-[#7c3aed]' : ''} />
                  {item.label}
                  {(item.id === 'earn' || item.id === 'audience') && (
                    <ChevronDown size={14} className={`ml-auto text-[#a78bfa] transition-transform duration-200 ${expandedSidebar === item.id ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {/* Sub-menu for Earn */}
                {item.id === 'earn' && expandedSidebar === 'earn' && (
                  <div className="ml-8 mt-2 space-y-2 relative before:absolute before:left-[-15px] before:top-[-10px] before:bottom-3 before:w-[1.5px] before:bg-gray-100">
                    <button
                      onClick={() => { setEarnSubTab('overview'); scrollToSubSection('earn', 'revenue-overview'); }}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${earnSubTab === 'overview' ? 'bg-[#ede9fe] text-[#6d28d9]' : 'text-gray-500 hover:text-[#6d28d9] hover:bg-[#f5f3ff]'}`}
                    >
                      ภาพรวม
                    </button>
                    <button
                      onClick={() => { setEarnSubTab('earnings'); scrollToSubSection('earn', 'revenue-overview'); }}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-between ${earnSubTab === 'earnings' ? 'bg-[#ede9fe] text-[#6d28d9]' : 'text-gray-500 hover:text-[#6d28d9] hover:bg-[#f5f3ff]'}`}
                    >
                      <span>รายได้</span>
                      <span>US$0.00</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Tools section */}
          <div className="px-3 mt-6">
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">เครื่องมือ</p>
            <div className="space-y-0.5">
              {sidebarTools.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'embed-gen') { navigate('/embed-generator'); return; }
                    setActiveSection(item.id); setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${activeSection === item.id
                    ? 'bg-gradient-to-r from-[#ede9fe] to-[#f5f3ff]/50 text-[#6d28d9] font-medium shadow-sm border border-[#e0e7ff]/50'
                    : 'text-gray-500 hover:text-[#6d28d9] hover:bg-[#f5f3ff]/50 hover:translate-x-0.5'
                    }`}
                >
                  <item.icon size={18} className={activeSection === item.id ? 'text-[#7c3aed]' : ''} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Setup checklist */}
          <div className="mt-auto mx-3 p-4 bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] rounded-2xl border border-[#e0e7ff]/50 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e0e7ff" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#7c3aed" strokeWidth="3"
                    strokeDasharray={`${(links.length > 0 ? 33 : 0) + (displayName ? 33 : 0) + (activeSocials.length > 0 ? 34 : 0)} 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-600">
                  {(links.length > 0 ? 1 : 0) + (displayName ? 1 : 0) + (activeSocials.length > 0 ? 1 : 0)}/3
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">รายการตั้งค่าของคุณ</p>
                <p className="text-[11px] text-gray-400">
                  เสร็จแล้ว {(links.length > 0 ? 1 : 0) + (displayName ? 1 : 0) + (activeSocials.length > 0 ? 1 : 0)} จาก 3
                </p>
              </div>
            </div>
            <button
              onClick={handleFinishSetup}
              className="w-full py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white text-xs font-semibold rounded-xl hover:from-[#6d28d9] hover:to-[#8b5cf6] transition-all duration-200 hover:shadow-md hover:shadow-[#7c3aed]/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              ตั้งค่าเสร็จสิ้น
            </button>
          </div>
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ══════ Main Content ══════ */}
        <main className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-2xl border-b border-gray-100/60 px-4 sm:px-6 shadow-[0_1px_20px_-6px_rgba(124,58,237,0.08)]">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-[#6d28d9] rounded-lg hover:bg-[#f5f3ff] transition-colors"
                >
                  <GripVertical size={18} />
                </button>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#7c3aed] to-[#a78bfa]" />
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {activeSection === 'links' ? 'ลิงก์' : [...sidebarMain, ...sidebarTools].find(s => s.id === activeSection)?.label || 'ลิงก์'}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartFresh}
                  className="px-3.5 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-full border border-red-200/80 transition-all hover:text-red-600 hover:border-red-300"
                  title="ล้างข้อมูลทั้งหมดและเริ่มใหม่"
                >
                  โปรไฟล์ใหม่
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200/80 transition-all hover:text-[#6d28d9] hover:border-[#a78bfa]/30"
                >
                  <Share2 size={13} />
                  <span className="hidden sm:inline">แชร์</span>
                </button>
                <button
                  onClick={handleOpenPreview}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-full shadow-sm shadow-[#7c3aed]/20 hover:shadow-md hover:shadow-[#7c3aed]/30 transition-all hover:-translate-y-px"
                >
                  <Eye size={13} />
                  <span className="hidden sm:inline">ดูตัวอย่าง</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* ── Editor Area ── */}
            <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-6 text-gray-900">

              {/* Section content for non-links sections */}
              {activeSection !== 'links' && (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 mb-6"
                >
                  {/* ── Earn Section ── */}
                  {activeSection === 'earn' && (
                    <div id="revenue-overview" className="scroll-mt-24">

                      {/* === Overview Sub-tab === */}
                      {earnSubTab === 'overview' && (
                        <div>
                          {/* Page Title */}
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">สร้างรายได้</h1>

                          {/* Overview Tab */}
                          <div className="mb-8">
                            <div className="border-b border-gray-200">
                              <button className="px-1 pb-3 text-sm font-medium text-gray-500 border-b-2 border-gray-400">
                                ภาพรวม
                              </button>
                            </div>
                          </div>

                          {/* Info Notice */}
                          <div className="bg-[#fef9e7] rounded-2xl p-5 mb-8">
                            <p className="text-sm font-semibold text-[#856404] mb-1">การขายยังไม่เปิดให้บริการในประเทศของคุณ</p>
                            <p className="text-sm text-[#856404]/80">
                              ขณะนี้คุณสามารถเสนอผลิตภัณฑ์ดิจิทัลฟรีได้เท่านั้น <button className="underline font-semibold text-[#856404]">เรียนรู้เพิ่มเติม</button>
                            </p>
                          </div>

                          {/* Free digital products */}
                          <h2 className="text-lg font-bold text-gray-900 mb-5 px-2">ผลิตภัณฑ์ดิจิทัลฟรี</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {/* Courses */}
                            <button className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#e9d5ff] rounded-xl flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={22} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">คอร์สเรียน</p>
                                <p className="text-sm text-gray-500">แชร์ความเชี่ยวชาญของคุณด้วยคอร์สออนไลน์</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                            </button>

                            {/* Digital products */}
                            <button className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#fee2e2] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Download size={22} className="text-[#ef4444]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">ผลิตภัณฑ์ดิจิทัล</p>
                                <p className="text-sm text-gray-500">แชร์คอนเทนต์ที่ดาวน์โหลดได้</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                            </button>

                            {/* Bookings */}
                            <button className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3e8ff] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar size={22} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">การจอง</p>
                                <p className="text-sm text-gray-500">รับจองเซสชัน สายโทร หรือการโค้ช</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                            </button>
                          </div>

                          {/* Got Ideas Footer */}
                          <div className="flex items-center gap-4 pt-6">
                            <div className="w-11 h-11 bg-[#16bc51] rounded-full flex items-center justify-center text-white flex-shrink-0">
                              <Sparkles size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">มีไอเดียไหม?</p>
                              <p className="text-sm text-gray-500">เรารับฟังอยู่! <button className="underline font-semibold text-gray-900">แชร์ความคิดเห็น</button></p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* === Earnings Sub-tab === */}
                      {earnSubTab === 'earnings' && (
                        <div>
                          {/* Page Title */}
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">รายได้</h1>

                          {/* Balance Card */}
                          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                            <div className="flex items-center gap-1.5 mb-1 text-gray-500">
                              <span className="text-sm font-medium">ยอดคงเหลือ</span>
                              <Info size={14} className="text-gray-300" />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900">$0.00</h2>
                          </div>

                          {/* Start earning */}
                          <h2 className="text-xl font-bold text-gray-900 mb-6 px-1">เริ่มสร้างรายได้บน OpenBio</h2>
                          <div className="space-y-6 mb-12">
                            {/* Offer your time */}
                            <button className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3f3f1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar size={20} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">เสนอเวลาของคุณ</p>
                                <p className="text-sm text-gray-500">รับจองเซสชัน สายโทร หรือการโค้ช</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </button>

                            {/* Sell digital products */}
                            <button className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3f3f1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <ShoppingBag size={20} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">ขายผลิตภัณฑ์ดิจิทัล</p>
                                <p className="text-sm text-gray-500">แชร์คู่มือ เพลง เทมเพลต และอื่น ๆ</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </button>

                            {/* Teach a course */}
                            <button className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3f3f1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={20} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">สอนคอร์สเรียน</p>
                                <p className="text-sm text-gray-500">เปลี่ยนความเชี่ยวชาญของคุณเป็นคอร์สออนไลน์</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </button>
                          </div>

                          {/* Got Ideas Footer */}
                          <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                            <div className="w-11 h-11 bg-[#16bc51] rounded-full flex items-center justify-center text-white flex-shrink-0">
                              <Sparkles size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">มีไอเดียไหม?</p>
                              <p className="text-sm text-gray-500">เรารับฟังอยู่! <button className="underline font-semibold text-gray-900">แชร์ความคิดเห็น</button></p>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* ── Audience Section ── */}
                  {activeSection === 'audience' && (
                    <div className="space-y-6">
                      {/* Stats */}
                      <div id="subscribers" className="grid grid-cols-3 gap-4 scroll-mt-24">
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                          <p className="text-3xl font-bold text-gray-900">{subscribers.length}</p>
                          <p className="text-xs text-gray-400 mt-1">ผู้ติดตาม</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                          <p className="text-3xl font-bold text-gray-900">{subscribers.filter(s => { const d = new Date(s.date); const now = new Date(); return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000; }).length}</p>
                          <p className="text-xs text-gray-400 mt-1">สัปดาห์นี้</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                          <p className="text-3xl font-bold text-gray-900">0%</p>
                          <p className="text-xs text-gray-400 mt-1">อัตราเปิดอ่าน</p>
                        </div>
                      </div>

                      {/* Email Form Setup */}
                      <div id="email-forms" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Mail size={20} className="text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">แบบฟอร์มสมัครอีเมล</h3>
                            <p className="text-[11px] text-gray-400">รวบรวมอีเมลจากผู้เข้าชมของคุณ</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1.5">ชื่อแบบฟอร์ม</label>
                            <input
                              type="text"
                              value={emailFormTitle}
                              onChange={(e) => setEmailFormTitle(e.target.value)}
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newVal = !showSubscribe;
                              setShowSubscribe(newVal);
                              showToast(newVal ? 'เปิดใช้งานแบบฟอร์มสมัครแล้ว!' : 'ปิดใช้งานแบบฟอร์มสมัครแล้ว');
                            }}
                            className={`w-full py-2.5 text-sm font-semibold rounded-full transition-colors ${
                              showSubscribe
                                ? 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                          >
                            {showSubscribe ? 'ปิดใช้งานบนหน้าสาธารณะ' : 'เปิดใช้งานบนหน้าสาธารณะ'}
                          </button>
                        </div>
                      </div>

                      {/* Test Subscriber / Campaigns */}
                      <div id="campaigns" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-900">จัดการลูกค้าเป้าหมาย (B2B CRM)</h3>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-tight">เน้นโปรเจกต์</span>
                        </div>
                        <div className="flex gap-2 mb-4">
                          <input
                            type="email"
                            value={newSubscriberEmail}
                            onChange={(e) => setNewSubscriberEmail(e.target.value)}
                            placeholder="กรอกอีเมลธุรกิจ..."
                            className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                          />
                          <button
                            onClick={async () => {
                              if (!newSubscriberEmail) return;
                              if (pbPageId) {
                                try {
                                  const record = await pb.collection('subscribers').create({
                                    page: pbPageId,
                                    email: newSubscriberEmail,
                                    source: 'manual',
                                  });
                                  setSubscribers([{ email: newSubscriberEmail, date: record.created, id: record.id }, ...subscribers]);
                                  setNewSubscriberEmail('');
                                  showToast('เพิ่มลูกค้าเป้าหมายแล้ว!');
                                } catch {
                                  showToast('เพิ่มไม่สำเร็จ (อาจมีอยู่แล้ว)');
                                }
                              } else {
                                setSubscribers([...subscribers, { email: newSubscriberEmail, date: new Date().toISOString() }]);
                                setNewSubscriberEmail('');
                                showToast('เพิ่มลูกค้าเป้าหมายแล้ว (เฉพาะในเครื่อง)');
                              }
                            }}
                            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            เพิ่มลูกค้าเป้าหมาย
                          </button>
                        </div>
                        {subscribers.length > 0 ? (
                          <div className="space-y-1.5">
                            {subscribers.map((s, i) => (
                              <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg group transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                                    {s.email.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-700 block">{s.email}</span>
                                    <span className="text-[10px] text-gray-400">{s.id ? 'ผ่านแบบฟอร์มสมัคร' : 'เพิ่มด้วยตนเอง'}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-gray-400">{new Date(s.date).toLocaleDateString()}</span>
                                  <button onClick={async () => {
                                    if (s.id) { try { await pb.collection('subscribers').delete(s.id); } catch { /* ignore */ } }
                                    setSubscribers(subscribers.filter((_, idx) => idx !== i));
                                  }} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-2xl">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Users size={20} className="text-gray-300" />
                            </div>
                            <p className="text-sm text-gray-400 font-medium">ยังไม่มีลูกค้าเป้าหมาย</p>
                            <p className="text-[11px] text-gray-300 max-w-[200px] mx-auto">เริ่มรวบรวมลูกค้าเป้าหมายจากแบบฟอร์มขอใบเสนอราคา</p>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            if (subscribers.length === 0) { showToast('ไม่มีผู้ติดตามให้ส่งออก'); return; }
                            const header = 'Email,Date\n';
                            const rows = subscribers.map(s => `${s.email},${s.date}`).join('\n');
                            const blob = new Blob([header + rows], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
                            a.click();
                            URL.revokeObjectURL(url);
                            showToast('ส่งออก CSV แล้ว!');
                          }}
                          className="w-full mt-4 py-3 bg-gray-50 text-gray-500 text-xs font-semibold rounded-xl border border-gray-100 hover:bg-gray-100 hover:text-gray-700 transition-all flex items-center justify-center gap-2"
                        >
                          <Download size={14} /> ส่งออก CSV สำหรับ CRM (Salesforce/Hubspot)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Insights Section ── */}
                  {activeSection === 'insights' && (() => {
                    const analyticsRaw = localStorage.getItem('openbio_analytics');
                    const analytics = analyticsRaw ? JSON.parse(analyticsRaw) : { pageViews: 0, linkClicks: [], viewHistory: [] };
                    const totalClicks = (analytics.linkClicks || []).length;
                    const totalViews = analytics.pageViews || 0;
                    const ctr = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;
                    const clicksPerLink: Record<string, { title: string; count: number }> = {};
                    (analytics.linkClicks || []).forEach((c: { linkId: string; linkTitle: string }) => {
                      if (!clicksPerLink[c.linkId]) clicksPerLink[c.linkId] = { title: c.linkTitle, count: 0 };
                      clicksPerLink[c.linkId].count++;
                    });
                    const sortedLinks2 = Object.entries(clicksPerLink).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
                    // Last 7 days chart data
                    const last7 = Array.from({ length: 7 }).map((_, i) => {
                      const d = new Date(); d.setDate(d.getDate() - (6 - i));
                      const dateStr = d.toDateString();
                      return {
                        label: d.toLocaleDateString('th-TH', { weekday: 'short' }),
                        clicks: (analytics.linkClicks || []).filter((c: { timestamp: string }) => new Date(c.timestamp).toDateString() === dateStr).length,
                        views: (analytics.viewHistory || []).filter((v: string) => new Date(v).toDateString() === dateStr).length,
                      };
                    });
                    const maxBar = Math.max(...last7.map(d => d.clicks + d.views), 1);
                    return (
                    <>
                      {/* Overview Stats */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
                          <p className="text-[11px] text-gray-400 mt-1">คลิกทั้งหมด</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
                          <p className="text-[11px] text-gray-400 mt-1">การเข้าชม</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{ctr}%</p>
                          <p className="text-[11px] text-gray-400 mt-1">CTR</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{links.filter(l => l.enabled).length}</p>
                          <p className="text-[11px] text-gray-400 mt-1">ลิงก์ที่ใช้งาน</p>
                        </div>
                      </div>

                      {/* Mini Chart - Real data */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">7 วันล่าสุด</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> การเข้าชม</div>
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400"><div className="w-2.5 h-2.5 rounded-sm bg-purple-500" /> คลิก</div>
                        </div>
                        <div className="flex items-end gap-1.5 h-32">
                          {last7.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5" style={{ height: '100%', justifyContent: 'flex-end' }}>
                              <div className="w-full bg-blue-500 rounded-t-md" style={{ height: `${Math.max((day.views / maxBar) * 100, day.views > 0 ? 8 : 0)}%` }} title={`${day.views} views`} />
                              <div className="w-full bg-purple-500 rounded-b-md" style={{ height: `${Math.max((day.clicks / maxBar) * 100, day.clicks > 0 ? 8 : 0)}%` }} title={`${day.clicks} clicks`} />
                              <span className="text-[10px] text-gray-400 mt-1">{day.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Links - Real data */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">ลิงก์ที่มีประสิทธิภาพสูงสุด</h3>
                        {sortedLinks2.length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-4">ยังไม่มีคลิก แชร์ลิงก์ของคุณเพื่อเริ่มติดตาม!</p>
                        ) : (
                          <div className="space-y-2">
                            {sortedLinks2.map(([id, data], i) => (
                              <div key={id} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
                                <span className="text-xs font-bold text-gray-400 w-5">#{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{data.title || 'ไม่มีชื่อ'}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <BarChart3 size={12} className="text-purple-400" />
                                  <span className="text-sm font-semibold text-gray-900">{data.count}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* View full dashboard button */}
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <BarChart3 size={16} />
                        ดูแดชบอร์ดทั้งหมด
                      </button>
                    </>
                    );
                  })()}

                  {/* ── Social Planner ── */}
                  {activeSection === 'planner' && (
                    <>
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <Calendar size={20} className="text-indigo-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">ตั้งเวลาโพสต์</h3>
                            <p className="text-[11px] text-gray-400">วางแผนและตั้งเวลาคอนเทนต์โซเชียลมีเดียของคุณ</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <textarea
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                            placeholder="คุณอยากแชร์อะไร?"
                            rows={3}
                            className="w-full px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 resize-none"
                          />
                          <div className="flex gap-2">
                            <select
                              value={newPostPlatform}
                              onChange={(e) => setNewPostPlatform(e.target.value)}
                              className="flex-1 px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                            >
                              <option value="instagram">Instagram</option>
                              <option value="twitter">Twitter</option>
                              <option value="tiktok">TikTok</option>
                              <option value="facebook">Facebook</option>
                            </select>
                            <input type="date" value={newPostDate} onChange={(e) => setNewPostDate(e.target.value)} className="flex-1 px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            <input type="time" value={newPostTime} onChange={(e) => setNewPostTime(e.target.value)} className="w-40 px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </div>
                          <button
                            onClick={() => {
                              if (newPostText && newPostDate) {
                                setScheduledPosts([...scheduledPosts, { id: Date.now().toString(), text: newPostText, platform: newPostPlatform, date: newPostDate, time: newPostTime || '12:00' }]);
                                setNewPostText(''); setNewPostDate(''); setNewPostTime('');
                                showToast('ตั้งเวลาโพสต์แล้ว!');
                              } else { showToast('เพิ่มข้อความและวันที่'); }
                            }}
                            className="w-full py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-colors"
                          >
                            ตั้งเวลาโพสต์
                          </button>
                        </div>
                      </div>
                      {scheduledPosts.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">โพสต์ที่ตั้งเวลาแล้ว</h3>
                          <div className="space-y-2">
                            {scheduledPosts.map((post) => (
                              <div key={post.id} className="flex items-start gap-3 px-3 py-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {post.platform === 'instagram' && <Instagram size={14} className="text-indigo-600" />}
                                  {post.platform === 'twitter' && <Twitter size={14} className="text-indigo-600" />}
                                  {post.platform === 'tiktok' && <Music2 size={14} className="text-indigo-600" />}
                                  {post.platform === 'facebook' && <Facebook size={14} className="text-indigo-600" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-700 line-clamp-2">{post.text}</p>
                                  <p className="text-[11px] text-gray-400 mt-1">{post.date} เวลา {post.time}</p>
                                </div>
                                <button onClick={() => setScheduledPosts(scheduledPosts.filter(p => p.id !== post.id))} className="text-gray-300 hover:text-red-400 mt-0.5"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Instagram Auto-reply ── */}
                  {activeSection === 'autoreply' && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                            <MessageSquare size={20} className="text-pink-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">ตอบกลับอัตโนมัติ Instagram</h3>
                            <p className="text-[11px] text-gray-400">ตอบกลับ DM อัตโนมัติด้วย OpenBio ของคุณ</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setAutoReplyEnabled(!autoReplyEnabled); showToast(autoReplyEnabled ? 'ปิดใช้งานตอบกลับอัตโนมัติ' : 'เปิดใช้งานตอบกลับอัตโนมัติแล้ว!'); }}
                          className={`relative w-10 h-6 rounded-full transition-colors ${autoReplyEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoReplyEnabled ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-medium text-gray-500 mb-1.5">ข้อความตอบกลับอัตโนมัติ</label>
                          <textarea
                            value={autoReplyMessage}
                            onChange={(e) => setAutoReplyMessage(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-gray-500 mb-1.5">คำที่ทริกเกอร์ (คั่นด้วยจุลภาค)</label>
                          <input
                            type="text"
                            value={autoReplyKeywords}
                            onChange={(e) => setAutoReplyKeywords(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300"
                          />
                        </div>
                        <div className="bg-pink-50 rounded-xl p-4">
                          <p className="text-[11px] font-medium text-pink-700 mb-2">ตัวอย่าง</p>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-400 mb-1">เมื่อมีคนส่ง: "{autoReplyKeywords.split(',')[0]?.trim()}"</p>
                            <p className="text-sm text-gray-800">{autoReplyMessage}</p>
                            <p className="text-xs text-blue-500 mt-1">linkc.ee/{displayName || 'username'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast('บันทึกการตั้งค่าแล้ว!')}
                          className="w-full py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors"
                        >
                          บันทึกการตั้งค่า
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Link Shortener ── */}
                  {activeSection === 'shortener' && (
                    <>
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                            <Scissors size={20} className="text-orange-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">ย่อลิงก์</h3>
                            <p className="text-[11px] text-gray-400">สร้างลิงก์สั้นแบบมีแบรนด์</p>
                          </div>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleShortenUrl(); }} className="flex gap-2">
                          <div className="flex-1">
                            <input
                              type="url"
                              value={shortenerInput}
                              onChange={(e) => { setShortenerInput(e.target.value); setShortenerError(''); }}
                              placeholder="วาง URL ยาวๆ ที่นี่... (เช่น https://example.com/very-long-url)"
                              className={`w-full px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 ${shortenerError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'}`}
                              disabled={shortenerLoading}
                            />
                            {shortenerError && <p className="text-xs text-red-500 mt-1">{shortenerError}</p>}
                          </div>
                          <button
                            type="submit"
                            disabled={shortenerLoading || !shortenerInput.trim()}
                            className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                          >
                            {shortenerLoading ? (
                              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> กำลังย่อ...</>
                            ) : 'ย่อลิงก์'}
                          </button>
                        </form>
                      </div>

                      {/* Stats summary */}
                      {shortenedLinks.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                            <p className="text-2xl font-bold text-orange-500">{shortenedLinks.length}</p>
                            <p className="text-[11px] text-gray-400">ลิงก์ทั้งหมด</p>
                          </div>
                          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                            <p className="text-2xl font-bold text-orange-500">{shortenedLinks.reduce((sum, l) => sum + l.clicks, 0)}</p>
                            <p className="text-[11px] text-gray-400">คลิกทั้งหมด</p>
                          </div>
                        </div>
                      )}

                      {/* Shortened links list */}
                      {shortenedLinks.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">ลิงก์ที่ย่อแล้ว ({shortenedLinks.length})</h3>
                          <div className="space-y-3">
                            {shortenedLinks.map((link, i) => (
                              <div key={i} className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                                    <Link2 size={14} className="text-orange-500" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <a href={link.short} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                                      {link.short}
                                    </a>
                                    <p className="text-[11px] text-gray-400 truncate">{link.original}</p>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(link.short);
                                        setCopiedIndex(i);
                                        setTimeout(() => setCopiedIndex(null), 2000);
                                        showToast('คัดลอกลิงก์แล้ว!');
                                      }}
                                      className={`p-2 rounded-lg transition-all ${copiedIndex === i ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                      title="คัดลอก"
                                    >
                                      {copiedIndex === i ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                    </button>
                                    <a
                                      href={link.original}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-all"
                                      title="เปิดลิงก์ต้นฉบับ"
                                    >
                                      <ExternalLink size={14} />
                                    </a>
                                    <button
                                      onClick={() => setShortenedLinks(shortenedLinks.filter((_, idx) => idx !== i))}
                                      className="p-2 text-gray-300 hover:text-red-400 rounded-lg hover:bg-red-50 transition-all"
                                      title="ลบ"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 mt-2 ml-11">
                                  <span className="text-[10px] text-gray-400">
                                    {new Date(link.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          {shortenedLinks.length > 0 && (
                            <button
                              onClick={() => { if (confirm('ลบลิงก์ทั้งหมด?')) setShortenedLinks([]); }}
                              className="mt-4 w-full py-2 text-xs text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ลบทั้งหมด
                            </button>
                          )}
                        </div>
                      )}

                      {/* Empty state */}
                      {shortenedLinks.length === 0 && (
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3">
                            <Scissors size={24} className="text-orange-300" />
                          </div>
                          <p className="text-sm text-gray-500">ยังไม่มีลิงก์ที่ย่อ</p>
                          <p className="text-[11px] text-gray-400 mt-1">วาง URL ด้านบนเพื่อสร้างลิงก์สั้น</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Post Ideas ── */}
                  {activeSection === 'ideas' && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                          <Lightbulb size={20} className="text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">ไอเดียโพสต์</h3>
                          <p className="text-[11px] text-gray-400">ไอเดียคอนเทนต์เพื่อเพิ่มการมีส่วนร่วม</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[
                          { emoji: '🎯', title: 'แชร์เป้าหมายของคุณสำหรับเดือนนี้', desc: 'สร้างความสัมพันธ์กับผู้ติดตามโดยการแชร์ก้าวสำคัญส่วนตัว' },
                          { emoji: '📸', title: 'เบื้องหลังพื้นที่ทำงานของคุณ', desc: 'ผู้คนชอบเห็นตัวตนที่แท้จริงและกระบวนการสร้างสรรค์ของคุณ' },
                          { emoji: '💡', title: 'เคล็ดลับ 3 อันดับแรกในสายงานของคุณ', desc: 'วางตำแหน่งตัวเองเป็นผู้เชี่ยวชาญด้วยเคล็ดลับที่มีคุณค่า' },
                          { emoji: '🎁', title: 'จัดแจกของรางวัลให้ผู้ติดตาม', desc: 'เพิ่มการมีส่วนร่วมและดึงดูดผู้ติดตามใหม่ด้วยคุณค่าฟรี' },
                          { emoji: '📊', title: 'แชร์เหตุการณ์สำคัญหรือความสำเร็จ', desc: 'เฉลิมฉลองความสำเร็จเพื่อสร้าง Social proof และชุมชน' },
                          { emoji: '❓', title: 'ถามคำถามกับผู้ติดตามของคุณ', desc: 'กระตุ้นความคิดเห็นและเรียนรู้เกี่ยวกับความชอบของผู้ติดตาม' },
                          { emoji: '🔗', title: 'โปรโมตลิงก์ OpenBio ใหม่ล่าสุด', desc: 'เพิ่มการเข้าชมไปยังคอนเทนต์หรือสินค้าล่าสุดของคุณ' },
                          { emoji: '📹', title: 'สร้างสอนแบบสั้น ๆ หรือ How-to', desc: 'คอนเทนต์ให้ความรู้ถูกบันทึกและแชร์มากที่สุด' },
                        ].map((idea, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setNewPostText(idea.title);
                              setActiveSection('planner');
                              showToast('เพิ่มไอเดียไปยังตัวจัดตารางแล้ว!');
                            }}
                            className="w-full flex items-start gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left group"
                          >
                            <span className="text-xl mt-0.5">{idea.emoji}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{idea.title}</p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{idea.desc}</p>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 mt-1 flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === 'links' && <>
                {/* Hidden file inputs */}
                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                <input ref={linkImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleLinkImageUpload} />
                <input ref={linkBannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleLinkBannerUpload} />
                <input ref={productImagesInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleProductImagesUpload} />

                {/* ── Profile Settings Card (row-based like settings page) ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] mb-6 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100/80">
                    <h2 className="text-lg font-bold text-gray-800">โปรไฟล์</h2>
                    <p className="text-xs text-gray-400 mt-0.5">จัดการข้อมูลโปรไฟล์สาธารณะของคุณ</p>
                  </div>

                  {/* Avatar row */}
                  <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <span className="text-sm text-gray-500 w-28 flex-shrink-0">รูปภาพ</span>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative group">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 ring-2 ring-white shadow-sm">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover"
                              style={{ objectPosition: `${50 - avatarX}% ${50 - avatarY}%`, transform: `scale(${avatarScale})` }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User size={20} className="text-pink-300" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => avatarInputRef.current?.click()}
                          className="text-xs font-medium text-pink-500 hover:text-pink-600 transition-colors text-left"
                        >
                          {avatar ? 'เปลี่ยนรูป' : 'อัปโหลดรูป'}
                        </button>
                        {avatar && (
                          <button
                            onClick={() => {
                              setPrevAvatarCrop({ scale: avatarScale, x: avatarX, y: avatarY, avatar });
                              setShowAvatarCrop(true);
                            }}
                            className="text-xs font-medium text-violet-500 hover:text-violet-600 transition-colors text-left"
                          >
                            ครอบตัด
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name row */}
                  <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <span className="text-sm text-gray-500 w-28 flex-shrink-0">ชื่อ</span>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="ชื่อของคุณ"
                      className="flex-1 text-sm font-medium text-gray-800 placeholder-gray-300 bg-transparent focus:outline-none"
                    />
                    <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                  </div>

                  {/* Bio row */}
                  <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                    <span className="text-sm text-gray-500 w-28 flex-shrink-0">ประวัติ</span>
                    <input
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="เขียนอะไรบางอย่างเกี่ยวกับตัวคุณ..."
                      className="flex-1 text-sm text-gray-600 placeholder-gray-300 bg-transparent focus:outline-none"
                    />
                    <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                  </div>


                  {/* Save Profile button */}
                  <div className="px-6 py-3 border-b border-gray-50">
                    <button
                      onClick={handleSaveProfile}
                      disabled={profileSaving}
                      className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#7c3aed] rounded-xl hover:bg-[#6d28d9] transition-colors disabled:opacity-50 active:scale-[0.98]"
                    >
                      {profileSaving ? 'กำลังบันทึก...' : 'บันทึกโปรไฟล์'}
                    </button>
                  </div>

                  {/* Social row */}
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-500 w-28 flex-shrink-0">โซเชียล</span>
                      <div className="flex items-center gap-2 flex-1 flex-wrap">
                        {socialPlatforms.slice(0, 5).map((p) => {
                          const isActive = activeSocials.includes(p.id);
                          return (
                            <button
                              key={p.id}
                              onClick={() => toggleSocial(p.id)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${isActive
                                ? 'bg-pink-50 text-pink-500 ring-1 ring-pink-200'
                                : 'bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-400'
                                }`}
                              title={p.label}
                            >
                              <p.icon size={14} />
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setShowSocialPicker(!showSocialPicker)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border border-dashed ${showSocialPicker ? 'border-pink-300 bg-pink-50 text-pink-500 rotate-45' : 'border-gray-200 text-gray-400 hover:border-pink-300 hover:text-pink-400'}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Active social URL inputs */}
                    {activeSocials.length > 0 && (
                      <div className="ml-32 space-y-2 mb-3">
                        {activeSocials.map((id) => {
                          const p = socialPlatforms.find((s) => s.id === id);
                          if (!p) return null;
                          return (
                            <div key={id} className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-pink-50 text-pink-400 flex items-center justify-center flex-shrink-0">
                                <p.icon size={11} />
                              </div>
                              <input
                                type="url"
                                value={socialUrls[id] || ''}
                                onChange={(e) => setSocialUrls({ ...socialUrls, [id]: e.target.value })}
                                placeholder={`${p.label} URL`}
                                className="flex-1 text-xs text-gray-600 placeholder-gray-300 bg-gray-50/80 border border-gray-100 rounded-lg px-3 py-1.5 focus:outline-none focus:border-pink-300 transition-all"
                              />
                              {socialUrls[id] && urlToEmbedCode(socialUrls[id]) && (
                                <button
                                  onClick={() => {
                                    const code = urlToEmbedCode(socialUrls[id]);
                                    if (code) {
                                      const newLink: LinkItem = { id: Date.now().toString(), title: `${p.label} Embed`, url: socialUrls[id], enabled: true, clicks: 0, embedCode: code };
                                      setLinks(prev => [...prev, newLink]);
                                      showToast(`สร้าง ${p.label} Embed สำเร็จ!`);
                                    }
                                  }}
                                  className="flex items-center gap-1 px-2 py-1 text-[9px] font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg border border-violet-100 transition-colors whitespace-nowrap"
                                  title="สร้าง Embed จากลิงก์นี้"
                                >
                                  <Code2 size={10} /> Embed
                                </button>
                              )}
                              <button
                                onClick={() => toggleSocial(id)}
                                className="p-1 rounded text-gray-300 hover:text-red-400 transition-colors"
                              >
                                <X size={11} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Social Picker */}
                    <AnimatePresence>
                      {showSocialPicker && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-32 pt-2 pb-1 overflow-hidden"
                        >
                          <p className="text-[10px] font-medium text-gray-400 mb-2 uppercase tracking-wider">แพลตฟอร์มทั้งหมด</p>
                          <div className="relative mb-2">
                            <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={socialSearch}
                              onChange={(e) => setSocialSearch(e.target.value)}
                              placeholder="ค้นหาแพลตฟอร์ม..."
                              className="w-full pl-7 pr-7 py-1.5 rounded-md bg-gray-50 border border-gray-200 text-[11px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 focus:bg-white transition-colors"
                            />
                            {socialSearch && (
                              <button
                                onClick={() => setSocialSearch('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                <X size={11} />
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {socialPlatforms
                              .filter((p) => p.label.toLowerCase().includes(socialSearch.toLowerCase()))
                              .map((p) => {
                                const isActive = activeSocials.includes(p.id);
                                return (
                                  <button
                                    key={p.id}
                                    onClick={() => toggleSocial(p.id)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${isActive
                                      ? 'bg-pink-100 text-pink-600'
                                      : 'bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-pink-500'
                                      }`}
                                  >
                                    <p.icon size={11} />
                                    {p.label}
                                  </button>
                                );
                              })}
                            {socialPlatforms.filter((p) => p.label.toLowerCase().includes(socialSearch.toLowerCase())).length === 0 && (
                              <p className="text-[11px] text-gray-400 py-2">ไม่พบแพลตฟอร์มที่ค้นหา</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* ── My Links Card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] mb-6 overflow-hidden"
                >
                  <div className="px-4 py-2.5 border-b border-gray-100/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-800">ลิงก์ของฉัน</h2>
                      <span className="text-[10px] text-gray-400">เพิ่มแล้ว {visibleLinks.length} รายการ</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          const id = Date.now().toString();
                          setLinks([...links, { id, title: 'คอลเลกชัน', url: '', enabled: true, clicks: 0 }]);
                          showToast('เพิ่มคอลเลกชันแล้ว');
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-gray-500 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <FolderOpen size={10} /> คอลเลกชัน
                      </button>
                    </div>
                  </div>

                  {/* Add new link button inside card */}
                  <button
                    onClick={() => setAddModalOpen(true)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 border-b border-gray-100/80 text-pink-500 hover:bg-pink-50/40 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-md bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                      <Plus size={13} className="text-pink-500" />
                    </div>
                    <span className="text-xs font-semibold">เพิ่มลิงก์ใหม่</span>
                  </button>

                  {/* Link list */}
                  {visibleLinks.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <div className="w-10 h-10 mx-auto mb-2.5 rounded-xl bg-gray-50 flex items-center justify-center">
                        <Link2 size={16} className="text-gray-300" />
                      </div>
                      <h3 className="text-xs font-bold text-gray-700 mb-0.5">ยังไม่มีลิงก์</h3>
                      <p className="text-[11px] text-gray-400 max-w-[200px] mx-auto">เพิ่มลิงก์แรกเพื่อเริ่มสร้างหน้า OpenBio ของคุณ</p>
                    </div>
                  ) : (
                    <div>
                      <AnimatePresence>
                        {visibleLinks.map((link, linkIndex) => (
                          <motion.div
                            key={link.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`border-b border-gray-50 last:border-b-0 transition-colors ${!link.enabled ? 'opacity-40' : 'hover:bg-gray-50/40'}`}
                          >
                            <div className="flex items-center gap-3 px-6 py-3.5">
                              <div
                                className="w-1.5 h-8 rounded-full flex-shrink-0"
                                style={{ backgroundColor: link.color || ['#ec4899', '#a855f7', '#6366f1', '#10b981', '#f59e0b', '#f43f5e'][linkIndex % 6] }}
                              />
                              {link.thumbnail && (
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                                  <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                                  {link.thumbnailUploading && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                    placeholder="ชื่อลิงก์"
                                    className="flex-1 text-sm font-medium text-gray-800 placeholder-gray-300 bg-transparent focus:outline-none"
                                  />
                                  {!link.enabled && (
                                    <span className="px-2 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded-full">ซ่อนอยู่</span>
                                  )}
                                </div>
                                {(() => {
                                  const t = (link.title || '').toLowerCase().trim();
                                  const isPhone = link.url.startsWith('tel:') || t === 'เบอร์โทรศัพท์' || t === 'เบอร์โทร' || t === 'phone';
                                  if (isPhone) {
                                    const phoneValue = link.url.startsWith('tel:') ? link.url.slice(4) : link.url;
                                    return (
                                      <input
                                        type="tel"
                                        inputMode="tel"
                                        value={phoneValue}
                                        onChange={(e) => {
                                          const num = e.target.value.replace(/^tel:/, '').trim();
                                          updateLink(link.id, 'url', num ? `tel:${num}` : '');
                                        }}
                                        placeholder="กรอกเบอร์โทร เช่น 0812345678 (กดเพื่อโทรได้เลย)"
                                        className="block w-full text-[11px] text-gray-400 placeholder-gray-300 bg-transparent focus:outline-none mt-0.5"
                                      />
                                    );
                                  }
                                  return (
                                    <input
                                      type="url"
                                      value={link.url}
                                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                      placeholder="URL"
                                      className="block w-full text-[11px] text-gray-400 placeholder-gray-300 bg-transparent focus:outline-none mt-0.5"
                                    />
                                  );
                                })()}
                                {/* Embed badge / action */}
                                {link.embedCode ? (
                                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[9px] font-bold text-violet-600 bg-violet-50 rounded-full w-fit">
                                    <Code2 size={8} /> Embed ใช้งานอยู่
                                  </span>
                                ) : link.url && urlToEmbedCode(link.url) ? (
                                  <button
                                    onClick={() => { const code = urlToEmbedCode(link.url); if (code) updateLink(link.id, 'embedCode', code); }}
                                    className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[9px] font-bold text-violet-500 bg-violet-50 hover:bg-violet-100 rounded-full w-fit transition-colors"
                                  >
                                    <Code2 size={8} /> สร้าง Embed อัตโนมัติ
                                  </button>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => setEditingLinkId(editingLinkId === link.id ? null : link.id)}
                                  className={`p-1.5 rounded-lg transition-all ${editingLinkId === link.id ? 'text-pink-500 bg-pink-50' : 'text-gray-300 hover:text-gray-500'}`}
                                >
                                  <Pencil size={13} />
                                </button>
                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">
                                  <BarChart3 size={12} className="text-gray-400" />
                                  <span className="text-xs font-medium text-gray-600">{link.clicks || 0}</span>
                                  <span className="text-[10px] text-gray-400">คลิก</span>
                                </div>
                                <button
                                  onClick={() => toggleLink(link.id)}
                                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out ${link.enabled ? 'bg-gradient-to-r from-pink-400 to-pink-500 shadow-md shadow-pink-200' : 'bg-gray-200'}`}
                                  title={link.enabled ? 'ซ่อนลิงก์จากการแสดงตัวอย่าง' : 'แสดงลิงก์ในการแสดงตัวอย่าง'}
                                >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ease-out ${link.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                                </button>
                                <button
                                  onClick={() => removeLink(link.id)}
                                  className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                            {/* Embed code preview - always visible when embed exists */}
                            {link.embedCode && (
                              <div className="mx-6 mb-3 p-3 bg-violet-50/80 rounded-xl border border-violet-100">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider flex items-center gap-1"><Code2 size={10} /> Embed Code</span>
                                  <button
                                    onClick={() => updateLink(link.id, 'embedCode', '')}
                                    className="text-[10px] text-red-400 hover:text-red-500 transition-colors"
                                  >
                                    ลบ Embed
                                  </button>
                                </div>
                                <textarea
                                  value={link.embedCode}
                                  onChange={(e) => updateLink(link.id, 'embedCode', e.target.value)}
                                  rows={2}
                                  className="w-full px-2.5 py-1.5 text-[10px] font-mono text-violet-700 bg-white border border-violet-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 resize-y"
                                />
                              </div>
                            )}
                            {/* Expanded edit area */}
                            <AnimatePresence>
                              {editingLinkId === link.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="px-6 pb-4 overflow-hidden"
                                >
                                  <div className="ml-9 pl-4 border-l-2 border-pink-100 space-y-3 pt-1">
                                    <div>
                                      <label className="block text-[11px] text-gray-400 mb-1">ชื่อลิงก์</label>
                                      <input
                                        type="text"
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">สีปุ่ม</label>
                                      <div className="grid grid-cols-10 gap-1.5 w-fit">
                                        {linkColors.map((c) => (
                                          <button
                                            key={c.id}
                                            onClick={() => updateLink(link.id, 'color', c.value)}
                                            className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${link.color === c.value ? 'border-gray-900 scale-110 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                                            style={{ backgroundColor: c.value || '#f3f4f6' }}
                                            title={c.label}
                                          >
                                            {link.color === c.value && <Check size={8} className={c.value && parseInt(c.value.slice(1), 16) < 0x808080 ? 'text-white' : 'text-gray-900'} />}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    {/* ── Image Link ── */}
                                    <div>
                                      <label className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">รูปภาพลิงก์</label>
                                      {link.linkImage ? (
                                        <div className="relative group">
                                          <img src={link.linkImage} alt="" className="w-full h-28 object-cover rounded-xl border border-gray-200" />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center gap-2">
                                            <button
                                              onClick={() => { setBannerTargetLinkId(link.id); linkBannerInputRef.current?.click(); }}
                                              className="px-3 py-1.5 text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                                            >
                                              เปลี่ยนรูป
                                            </button>
                                            <button
                                              onClick={() => updateLink(link.id, 'linkImage', '')}
                                              className="px-3 py-1.5 text-[10px] font-bold text-white bg-red-500/60 backdrop-blur-sm rounded-lg hover:bg-red-500/80 transition-colors"
                                            >
                                              ลบรูป
                                            </button>
                                          </div>
                                          {link.url && (
                                            <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[8px] font-bold text-white bg-black/50 backdrop-blur-sm rounded-md">
                                              คลิกเปิด → {link.url.length > 30 ? link.url.slice(0, 30) + '...' : link.url}
                                            </span>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => { setBannerTargetLinkId(link.id); linkBannerInputRef.current?.click(); }}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-200 hover:border-gray-300 rounded-xl transition-all"
                                          >
                                            <Upload size={14} /> อัปโหลดรูป
                                          </button>
                                          <button
                                            onClick={() => {
                                              const url = prompt('วาง URL รูปภาพ:');
                                              if (url?.trim()) updateLink(link.id, 'linkImage', url.trim());
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-200 hover:border-gray-300 rounded-xl transition-all"
                                          >
                                            <Image size={14} /> ใส่ URL รูป
                                          </button>
                                        </div>
                                      )}
                                      <p className="text-[9px] text-gray-400 mt-1">เมื่อคนกดที่รูป จะเปิดลิงก์ในแท็บใหม่</p>
                                    </div>
                                    {/* ── Embed Code ── */}
                                    <div>
                                      <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">Embed Code</label>
                                        {link.url && urlToEmbedCode(link.url) && !link.embedCode && (
                                          <button
                                            onClick={() => { const code = urlToEmbedCode(link.url); if (code) updateLink(link.id, 'embedCode', code); }}
                                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-full transition-colors"
                                          >
                                            <Code2 size={10} /> สร้างจาก URL อัตโนมัติ
                                          </button>
                                        )}
                                      </div>
                                      <textarea
                                        value={link.embedCode || ''}
                                        onChange={(e) => updateLink(link.id, 'embedCode', e.target.value)}
                                        placeholder="วาง embed code (iframe) จาก YouTube, Spotify, TikTok ฯลฯ"
                                        rows={3}
                                        className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 resize-y bg-gray-50"
                                      />
                                      {link.embedCode && (
                                        <button
                                          onClick={() => updateLink(link.id, 'embedCode', '')}
                                          className="mt-1.5 text-[10px] text-red-400 hover:text-red-500 transition-colors"
                                        >
                                          ลบ Embed Code
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>

                {/* Tabs: Add links / Settings */}
                <div className="mb-6">
                  <div className="inline-flex bg-gray-100/80 rounded-full p-0.5 gap-0.5">
                    {(['add', 'settings'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMainTab(tab)}
                        className={`relative px-5 py-2 text-xs font-medium rounded-full transition-all duration-300 ${mainTab === tab
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {tab === 'add' ? <><Plus size={12} /> เพิ่มลิงก์</> : <><Settings size={12} /> รูปลักษณ์</>}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {mainTab === 'settings' ? (
                  <div className="space-y-5 pb-10">
                    {/* Themes */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] overflow-hidden relative"
                    >
                      <div className="px-5 py-3 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800">ธีม</h2>
                      </div>

                      {/* Dropdown trigger */}
                      <div className="px-5 pb-3">
                        <button
                          onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                          className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-gray-50/80"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${!isCustom ? (themes.find(t => t.id === selectedTheme)?.bg || '') : ''}`}
                            style={isCustom ? customTheme.bgStyle : undefined}
                          >
                            <div className="space-y-0.5">
                              <div className="w-3 h-3 rounded-full bg-white/30 mx-auto" />
                              <div className="w-5 h-0.5 rounded-full bg-white/25 mx-auto" />
                            </div>
                          </div>
                          <div className="flex-1 text-left">
                            <span className="text-sm font-medium text-gray-700">
                              {isCustom ? 'กำหนดเอง' : (themes.find(t => t.id === selectedTheme)?.label || 'Minimal')}
                            </span>
                          </div>
                          <ChevronDown size={16} className={`text-gray-400 transition-transform ${themeDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Dropdown panel */}
                      {themeDropdownOpen && (
                        <div className="mx-5 mb-4 bg-white rounded-xl border border-gray-200 shadow-lg p-3 max-h-[280px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                          <div className="grid grid-cols-4 gap-2">
                            {themes.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => { setSelectedTheme(t.id); setThemeDropdownOpen(false); }}
                                className="group"
                              >
                                <div className={`h-12 rounded-lg ${t.bg} flex items-center justify-center ring-2 transition-all ${selectedTheme === t.id ? 'ring-gray-700 ring-offset-2' : 'ring-transparent group-hover:ring-gray-200 group-hover:ring-offset-1'}`}>
                                  <div className="space-y-0.5">
                                    <div className="w-3 h-3 rounded-full bg-white/30 mx-auto" />
                                    <div className="w-6 h-0.5 rounded-full bg-white/25 mx-auto" />
                                  </div>
                                </div>
                                <span className={`block text-[9px] mt-1 text-center truncate ${selectedTheme === t.id ? 'font-semibold text-gray-700' : 'text-gray-400'}`}>{t.label}</span>
                              </button>
                            ))}
                            {/* Custom */}
                            <button
                              onClick={() => { setSelectedTheme('custom'); setThemeDropdownOpen(false); }}
                              className="group"
                            >
                              <div className={`h-12 rounded-lg flex items-center justify-center ring-2 transition-all border border-dashed border-gray-200 ${isCustom ? 'ring-gray-700 ring-offset-2' : 'ring-transparent group-hover:ring-gray-200 group-hover:ring-offset-1'}`} style={customTheme.bgStyle}>
                                <div className="space-y-0.5">
                                  <div className="w-3 h-3 rounded-full bg-white/30 mx-auto" />
                                  <div className="w-6 h-0.5 rounded-full bg-white/25 mx-auto" />
                                </div>
                              </div>
                              <span className={`block text-[9px] mt-1 text-center truncate ${isCustom ? 'font-semibold text-gray-700' : 'text-gray-400'}`}>กำหนดเอง</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Custom color picker */}
                      <AnimatePresence>
                        {isCustom && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 pt-1">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <label className="text-[11px] font-medium text-gray-500">สีหลัก</label>
                                  <input type="color" value={customBgColor} onChange={(e) => setCustomBgColor(e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200 p-0.5" />
                                  <span className="text-[10px] text-gray-400 font-mono">{customBgColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <label className="text-[11px] font-medium text-gray-500">สีรอง</label>
                                  <input type="color" value={customBgSecondary} onChange={(e) => setCustomBgSecondary(e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200 p-0.5" />
                                  <span className="text-[10px] text-gray-400 font-mono">{customBgSecondary}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Background Pattern & Button Style - single row */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-gray-100/60 shadow-sm hover:shadow-lg hover:shadow-[#7c3aed]/5 transition-all duration-500 relative"
                    >
                      <div className="flex gap-5">
                        {/* Background Pattern */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                                <Grid3x3 size={12} className="text-rose-500" />
                              </div>
                              ลายพื้นหลัง
                            </h2>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setPatternGlow(!patternGlow)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${patternGlow ? 'bg-amber-100 text-amber-600 shadow-[0_0_8px_rgba(251,191,36,0.4)]' : 'bg-gray-100 text-gray-400'}`}
                                title={patternGlow ? 'Glow เปิดอยู่' : 'Glow ปิดอยู่'}
                              >
                                <Sun size={10} />
                                Glow
                              </button>
                            <div className="relative">
                              <button
                                onClick={() => setPatternAnimDropdownOpen(!patternAnimDropdownOpen)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${selectedPatternAnim !== 'none' ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400'}`}
                                title={selectedPatternAnim !== 'none' ? `แอนิเมชัน: ${patternAnimations.find(a => a.id === selectedPatternAnim)?.label}` : 'แอนิเมชันปิดอยู่'}
                              >
                                <Sparkles size={10} />
                                Anim
                              </button>
                              {patternAnimDropdownOpen && (
                                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-gray-200 shadow-lg p-1.5 z-50 min-w-[100px]">
                                  {patternAnimations.map((a) => (
                                    <button
                                      key={a.id}
                                      onClick={() => { setSelectedPatternAnim(a.id); setPatternAnimDropdownOpen(false); }}
                                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${selectedPatternAnim === a.id ? 'bg-violet-50 text-violet-600' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                      {a.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          </div>
                          <button
                            onClick={() => setPatternDropdownOpen(!patternDropdownOpen)}
                            className="w-full flex items-center gap-2 p-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-gray-50"
                          >
                            <div
                              className="w-8 h-8 rounded-lg bg-gray-200 border border-gray-200 shrink-0"
                              style={selectedPattern !== 'none' ? bgPatterns.find((p) => p.id === selectedPattern)?.style : undefined}
                            />
                            <span className="text-xs font-medium text-gray-700 truncate">
                              {bgPatterns.find((p) => p.id === selectedPattern)?.label || 'None'}
                            </span>
                            <ChevronDown size={14} className={`ml-auto text-gray-400 transition-transform flex-shrink-0 ${patternDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        <div className="w-px bg-gray-100 self-stretch" />

                        {/* Button Style */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                                <Type size={12} className="text-blue-500" />
                              </div>
                              รูปแบบปุ่ม
                            </h2>
                            <button
                              onClick={() => setButtonAnimation(!buttonAnimation)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${buttonAnimation ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400'}`}
                              title={buttonAnimation ? 'แอนิเมชันเปิดอยู่' : 'แอนิเมชันปิดอยู่'}
                            >
                              <Sparkles size={10} />
                              Anim
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {buttonStyles.map((style) => {
                              const isActive = selectedButton === style.id;
                              return (
                                <button
                                  key={style.id}
                                  onClick={() => {
                                    setSelectedButton(style.id);
                                    if (buttonAnimation) setBtnAnimKey((k) => k + 1);
                                  }}
                                  className={`flex-1 min-w-[52px] p-2 rounded-lg border-2 transition-colors ${isActive ? 'border-gray-400' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                  <motion.div
                                    key={isActive ? `${style.id}-${btnAnimKey}` : style.id}
                                    className={`h-5 bg-gray-300 ${style.cls} mb-1`}
                                    initial={isActive && buttonAnimation ? { scale: 0.7, opacity: 0.5 } : false}
                                    animate={isActive && buttonAnimation
                                      ? { scale: 1, opacity: 1, boxShadow: ['0 0 0 4px rgba(124,58,237,0.3)', '0 0 0 0px rgba(124,58,237,0)'] }
                                      : { scale: 1, opacity: 1, boxShadow: '0 0 0 0 rgba(124,58,237,0)' }
                                    }
                                    transition={isActive && buttonAnimation
                                      ? { type: 'spring', stiffness: 500, damping: 15, boxShadow: { duration: 0.6 } }
                                      : { duration: 0 }
                                    }
                                  />
                                  <span className="block text-[9px] font-medium text-gray-500 text-center">{style.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Pattern dropdown panel */}
                      {patternDropdownOpen && (
                        <div className="mt-3 bg-white rounded-xl border border-gray-200 shadow-lg p-3">
                          <div className="grid grid-cols-6 gap-1.5 max-h-[160px] overflow-y-auto">
                            {bgPatterns.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => { setSelectedPattern(p.id); setPatternDropdownOpen(false); }}
                                className={`p-1.5 rounded-lg border transition-all ${selectedPattern === p.id ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                              >
                                <div
                                  className="h-8 rounded-md bg-gray-100"
                                  style={p.id !== 'none' ? p.style : undefined}
                                />
                                <span className="block text-[8px] font-medium text-gray-500 mt-0.5 text-center truncate">{p.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Font & Text Color - side by side */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-gray-100/60 shadow-sm hover:shadow-lg hover:shadow-[#7c3aed]/5 transition-all duration-500"
                    >
                      <div className="flex gap-5">
                        {/* Font */}
                        <div className="flex-1 min-w-0">
                          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                              <Type size={12} className="text-amber-600" />
                            </div>
                            ฟอนต์
                          </h2>
                          <div className="flex gap-1 mb-2 overflow-x-auto pb-1">
                            {['all', 'Sans-serif', 'Serif', 'Mono', 'Handwriting'].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setFontCategory(cat)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${fontCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                              >
                                {cat === 'all' ? 'ทั้งหมด' : cat}
                              </button>
                            ))}
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                            {fontOptions
                              .filter((f) => fontCategory === 'all' || f.category === fontCategory)
                              .map((f) => (
                                <button
                                  key={f.id}
                                  onClick={() => setSelectedFont(f.id)}
                                  className={`p-1.5 rounded-lg border transition-all ${selectedFont === f.id ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                  <span className={`text-sm ${f.cls} text-gray-700`}>Aa</span>
                                  <span className="block text-[9px] font-medium text-gray-400 mt-0.5 truncate">{f.label}</span>
                                </button>
                              ))}
                          </div>
                        </div>

                        <div className="w-px bg-gray-100 self-stretch" />

                        {/* Text Color */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                                <Palette size={12} className="text-green-600" />
                              </div>
                              สีตัวอักษร
                            </h2>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="color"
                                value={customTextColor || '#000000'}
                                onChange={(e) => setCustomTextColor(e.target.value)}
                                className="w-5 h-5 rounded cursor-pointer border border-gray-200 p-0.5"
                              />
                              <button
                                onClick={() => setCustomTextColor('')}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${!customTextColor ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                              >
                                Auto
                              </button>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-2.5 mb-3 text-center">
                            <span className="text-base font-semibold" style={{ color: customTextColor || '#1f2937' }}>ตัวอย่างข้อความ</span>
                            <p className="text-[10px] mt-0.5" style={{ color: customTextColor || '#6b7280', opacity: 0.6 }}>คำบรรยายจะแสดงแบบนี้</p>
                          </div>
                          {textColorGroups.map((group) => (
                            <div key={group.label} className="mb-2.5 last:mb-0">
                              <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">{group.label}</p>
                              <div className="flex items-center gap-1 flex-wrap">
                                {group.colors.map((c) => (
                                  <button
                                    key={c.id}
                                    onClick={() => setCustomTextColor(c.value)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${customTextColor === c.value ? 'border-gray-400 scale-110 ring-2 ring-gray-200' : 'border-transparent hover:scale-105'}`}
                                    style={{ backgroundColor: c.value }}
                                    title={c.label}
                                  >
                                    {customTextColor === c.value && (
                                      <Check size={8} className={parseInt(c.value.slice(1), 16) < 0x808080 ? 'text-white' : 'text-gray-600'} />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                  </div>
                ) : (
                  /* Add links tab - suggestion cards */
                  <div className="space-y-3 pb-10">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">เพิ่มด่วน</p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { icon: ExternalLink, label: 'Link', desc: 'เพิ่ม URL', gradient: 'from-violet-600 to-indigo-500' },
                        { icon: Image, label: 'Header', desc: 'หัวข้อข้อความ', gradient: 'from-gray-500 to-gray-600' },
                        { icon: Music2, label: 'Music', desc: 'ฝังเพลง', gradient: 'from-[#1DB954] to-[#1ed760]' },
                        { icon: Youtube, label: 'Video', desc: 'ฝังวิดีโอ', gradient: 'from-[#FF0000] to-[#CC0000]' },
                        { icon: DollarSign, label: 'Store', desc: 'ขายสินค้า', gradient: 'from-[#8b5cf6] to-[#a78bfa]' },
                        { icon: Calendar, label: 'Event', desc: 'โปรโมตกิจกรรม', gradient: 'from-[#f59e0b] to-[#fbbf24]' },
                      ].map((item) => (
                        <motion.button
                          key={item.label}
                          whileHover={{ y: -3, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => addLink(item.label)}
                          className="flex flex-col items-center gap-2.5 p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg hover:shadow-[#7c3aed]/10 transition-all duration-300 text-center group"
                        >
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
                            <item.icon size={18} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    {/* More options prompt */}
                    <button
                      onClick={() => setAddModalOpen(true)}
                      className="w-full py-3 text-xs font-medium text-pink-500 hover:text-pink-600 bg-pink-50/50 hover:bg-pink-50 rounded-xl border border-pink-100/50 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles size={13} /> ดูการเชื่อมต่อทั้งหมด
                      <ChevronRight size={13} />
                    </button>
                  </div>
                )}
              </>}
            </div>

            {/* ── Live Preview (desktop) ── */}
            <div className="hidden xl:block w-[360px] flex-shrink-0 p-6">
              <div className="sticky top-36">
                {/* Preview header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleOpenPreview}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg hover:shadow-[#7c3aed]/10 hover:border-[#a78bfa]/30 transition-all duration-300 group"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center">
                        <Globe size={10} className="text-white" />
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-[#7c3aed] transition-colors">linkc.ee/</span>
                      <span className="text-xs font-bold text-gray-900">{displayName || 'username'}</span>
                      <ExternalLink size={11} className="text-gray-300 ml-1 group-hover:text-[#7c3aed] transition-colors" />
                    </button>
                    <button
                      onClick={handleCopyUrl}
                      className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100/80 shadow-sm hover:shadow-lg hover:shadow-[#7c3aed]/10 hover:border-[#a78bfa]/30 transition-all duration-300"
                    >
                      {copied ? <CheckCircle2 size={13} className="text-green-500" /> : <Copy size={13} className="text-gray-300 hover:text-[#7c3aed] transition-colors" />}
                    </button>
                  </div>
                </div>

                {/* Phone Frame */}
                <div
                  className="mx-auto w-[290px]"
                >
                  <div className="rounded-[2.8rem] bg-gradient-to-b from-gray-800 to-gray-900 p-[10px] shadow-2xl shadow-gray-900/30 relative">
                    {/* Glow effect behind phone */}
                    <div className="absolute -inset-4 bg-gradient-to-b from-violet-300/25 via-indigo-200/15 to-purple-300/15 rounded-[3.5rem] blur-2xl -z-[1]" />
                    {/* Side buttons */}
                    <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[2px] top-[200px] w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-gray-700 rounded-r-sm" />
                    <div className="relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
                        <div className="w-12 h-3 bg-gray-800 rounded-full" />
                      </div>
                    </div>
                    <div
                      className={`rounded-[2.2rem] overflow-hidden ${!isCustom ? theme.bg : ''} min-h-[480px] flex flex-col ${fontStyle.cls} relative`}
                      style={isCustom ? customTheme.bgStyle : undefined}
                    >
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
                      {selectedPattern !== 'none' && (
                        <div
                          className="absolute inset-0 pointer-events-none z-0 rounded-[2.3rem] overflow-hidden"
                        >
                          <div
                            className="absolute inset-[-50%] w-[200%] h-[200%]"
                            style={{
                              ...bgPatterns.find((p) => p.id === selectedPattern)?.style,
                              ...getPatternAnimStyle(selectedPatternAnim),
                            }}
                          />
                        </div>
                      )}
                      {/* Glow overlay */}
                      {patternGlow && (
                        <div className="absolute inset-0 pointer-events-none z-0 rounded-[2.3rem] overflow-hidden">
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
                      <div className="pt-8 pb-3 flex flex-col items-center px-6 relative z-[1]">
                        <div className="w-[68px] h-[68px] rounded-full bg-gray-300/20 flex items-center justify-center mb-2.5 overflow-hidden">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" style={{ objectPosition: `${50 - avatarX}% ${50 - avatarY}%`, transform: `scale(${avatarScale})` }} />
                          ) : (
                            <User size={22} className={`${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-25`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined} />
                          )}
                        </div>
                        <h3 className={`font-bold text-sm ${!resolvedTextColor && !isCustom ? theme.text : ''}`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined}>
                          {displayName || 'username'}
                        </h3>
                        {bio && (
                          <p className={`text-[11px] mt-0.5 ${!resolvedTextColor && !isCustom ? theme.subtext : ''} text-center`} style={resolvedTextColor ? { color: resolvedTextColor, opacity: 0.6 } : undefined}>{bio}</p>
                        )}
                      </div>

                      {/* Social Row */}
                      {activeSocials.length > 0 && (
                        <div className="px-5 pb-3 flex items-center justify-center gap-3 relative z-[1]">
                          {activeSocials.map((id) => {
                            const p = socialPlatforms.find((s) => s.id === id);
                            if (!p) return null;
                            const url = socialUrls[id];
                            const Wrapper = url ? 'a' : 'div';
                            return (
                              <Wrapper
                                key={id}
                                {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className={`w-7 h-7 rounded-full ${!isCustom ? theme.card : ''} flex items-center justify-center ${url ? 'hover:opacity-80 transition-opacity cursor-pointer' : ''}`}
                                style={isCustom ? customTheme.cardStyle : undefined}
                              >
                                <p.icon size={12} className={`${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-50`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined} />
                              </Wrapper>
                            );
                          })}
                        </div>
                      )}

                      {/* Product Gallery */}
                      {productImages.length > 0 && (
                        <div className="px-4 pb-3 relative z-[1]">
                          <div className="grid grid-cols-2 gap-2">
                            {productImages.map((img, idx) => (
                              <div
                                key={idx}
                                className={`aspect-square rounded-xl overflow-hidden ${!isCustom ? theme.card : ''} ${!isCustom ? theme.cardBorder : ''}`}
                                style={isCustom ? customTheme.cardStyle : undefined}
                              >
                                <img
                                  src={img}
                                  alt={`Product ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="px-4 pb-4 space-y-2 flex-1 relative z-[1]">
                        {links.filter((l) => {
                          if (!l.enabled) return false;
                          if (l.embedCode || l.linkImage) return true;
                          const url = resolveUrl(l);
                          return !!(l.title || (url && urlToEmbedCode(url)));
                        }).length === 0 && (
                          <div className={`text-center py-6 ${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-15`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined}>
                            <ExternalLink size={20} className="mx-auto mb-1.5" />
                            <p className="text-[10px]">เพิ่มลิงก์ด้านบน</p>
                          </div>
                        )}
                        {links
                          .filter((l) => {
                            if (!l.enabled) return false;
                            if (l.embedCode || l.linkImage) return true;
                            const url = resolveUrl(l);
                            return !!(l.title || (url && urlToEmbedCode(url)));
                          })
                          .map((link) => {
                            const actualUrl = resolveUrl(link);
                            const resolvedEmbed = link.embedCode || (actualUrl ? urlToEmbedCode(actualUrl) : null);
                            return resolvedEmbed ? (
                              <div key={link.id} className="relative z-[1] rounded-xl overflow-hidden [&_iframe]:!h-[180px]">
                                <div dangerouslySetInnerHTML={{ __html: resolvedEmbed }} />
                              </div>
                            ) : link.linkImage ? (
                              <div key={link.id} className="relative z-[1] rounded-xl overflow-hidden cursor-pointer group">
                                <img src={link.linkImage} alt={link.title} className="w-full rounded-xl object-cover transition-transform group-hover:scale-[1.02]" />
                              </div>
                            ) : (
                            <motion.div
                              key={link.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={buttonAnimation ? { scale: 1.03, y: -1 } : undefined}
                              whileTap={buttonAnimation ? { scale: 0.97 } : undefined}
                              transition={buttonAnimation ? { type: 'spring', stiffness: 400, damping: 17 } : undefined}
                              className={`${!link.color && !isCustom ? `${theme.card} ${theme.cardBorder}` : ''} ${btnStyle.cls} px-4 py-2.5 ${link.thumbnail ? 'flex items-center gap-2' : 'text-center'} relative z-[1] ${buttonAnimation ? 'cursor-pointer' : ''}`}
                              style={link.color
                                ? { backgroundColor: link.color, border: '1px solid rgba(0,0,0,0.06)' }
                                : isCustom ? customTheme.cardStyle : undefined
                              }
                            >
                              {link.thumbnail && (
                                <img src={link.thumbnail} alt="" className="w-5 h-5 rounded object-cover flex-shrink-0" />
                              )}
                              <span className={`text-[11px] font-medium ${!link.color && !resolvedTextColor && !isCustom ? theme.text : ''} ${link.thumbnail ? 'flex-1 text-left' : ''}`} style={resolvedTextColor ? { color: resolvedTextColor } : link.color ? { color: '#374151' } : undefined}>{link.title}</span>
                            </motion.div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ══════ Add Modal ══════ */}
      <AnimatePresence>
        {addModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => { setAddModalOpen(false); setAddModalSearch(''); }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed inset-4 sm:inset-auto sm:top-[8%] sm:left-1/2 sm:-translate-x-1/2 sm:w-[700px] sm:max-h-[78vh] bg-white/98 backdrop-blur-2xl rounded-3xl z-50 flex flex-col shadow-2xl shadow-gray-900/10 overflow-hidden border border-gray-200/50 ring-1 ring-white/80"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <h2 className="text-lg font-bold text-gray-900">เพิ่ม</h2>
                <button
                  onClick={() => { setAddModalOpen(false); setAddModalSearch(''); }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-gray-400 transition-colors">
                  <Search size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={addModalSearch}
                    onChange={(e) => setAddModalSearch(e.target.value)}
                    placeholder="วางหรือค้นหาลิงก์"
                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left - Categories */}
                <div className="w-48 border-r border-gray-100 px-3 py-2 space-y-0.5 overflow-y-auto">
                  {addCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setAddModalCategory(cat.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${addModalCategory === cat.id
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <cat.icon size={16} />
                      {cat.label}
                    </button>
                  ))}
                  <div className="pt-1">
                    <button
                      onClick={() => { setShowAllCategories(!showAllCategories); setAddModalCategory('suggested'); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${showAllCategories ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                    >
                      <Grid3x3 size={16} />
                      ดูทั้งหมด
                    </button>
                  </div>
                </div>

                {/* Right - Content */}
                <div className="flex-1 overflow-y-auto px-5 py-3">
                  {/* Quick Add Cards */}
                  <div className="grid grid-cols-4 gap-2.5 mb-5">
                    {addQuickCards.map((card) => (
                      <button
                        key={card.label}
                        onClick={() => addLink(card.label)}
                        className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 hover:border-gray-200 transition-all"
                      >
                        <card.icon size={20} className="text-purple-500" />
                        <span className="text-xs font-medium text-gray-700">{card.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* URL Detection */}
                  {addModalSearch && (addModalSearch.startsWith('http') || addModalSearch.includes('.')) && (
                    <button
                      onClick={() => {
                        const url = addModalSearch.startsWith('http') ? addModalSearch : `https://${addModalSearch}`;
                        setLinks([...links, { id: Date.now().toString(), title: addModalSearch.replace(/^https?:\/\//, '').split('/')[0], url, enabled: true, clicks: 0 }]);
                        setAddModalOpen(false);
                        setAddModalSearch('');
                        showToast('เพิ่มลิงก์แล้ว!');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 mb-4 bg-purple-50 rounded-xl hover:bg-purple-100 border border-purple-100 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                        <Link2 size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#6d28d9]">เพิ่มเป็นลิงก์</p>
                        <p className="text-[11px] text-[#7c3aed] truncate">{addModalSearch}</p>
                      </div>
                      <Plus size={18} className="text-purple-400" />
                    </button>
                  )}

                  {/* Suggested Label */}
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {showAllCategories ? 'รายการทั้งหมด' : addModalCategory === 'suggested' ? 'แนะนำ' : addCategories.find(c => c.id === addModalCategory)?.label}
                  </p>

                  {/* Suggested Items */}
                  <div className="space-y-1">
                    {addSuggestedItems
                      .filter((item) => {
                        if (addModalSearch) return item.label.toLowerCase().includes(addModalSearch.toLowerCase()) || item.desc.toLowerCase().includes(addModalSearch.toLowerCase());
                        if (showAllCategories) return true;
                        if (addModalCategory === 'suggested') return true;
                        return item.category === addModalCategory;
                      })
                      .map((item, idx) => (
                        <button
                          key={`${item.label}-${idx}`}
                          onClick={() => addLink(item.label)}
                          className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                            <item.icon size={18} className="text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-[11px] text-gray-400">{item.desc}</p>
                          </div>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                        </button>
                      ))}
                    {addSuggestedItems.filter((item) => {
                      if (addModalSearch) return item.label.toLowerCase().includes(addModalSearch.toLowerCase()) || item.desc.toLowerCase().includes(addModalSearch.toLowerCase());
                      if (showAllCategories) return true;
                      if (addModalCategory === 'suggested') return true;
                      return item.category === addModalCategory;
                    }).length === 0 && (
                        <div className="text-center py-6">
                          <Search size={24} className="text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">ไม่พบรายการ</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════ Mobile Preview Float Button ══════ */}
      <button
        onClick={() => setMobilePreviewOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] rounded-full shadow-lg shadow-[#7c3aed]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#7c3aed]/40 transition-all active:scale-95"
      >
        <Eye size={22} className="text-white" />
      </button>

      {/* ══════ Mobile Preview Modal ══════ */}
      <AnimatePresence>
        {mobilePreviewOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 xl:hidden"
              onClick={() => setMobilePreviewOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 top-8 z-50 xl:hidden bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-3xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center">
                    <Eye size={10} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">ตัวอย่าง</span>
                </div>
                <button
                  onClick={() => setMobilePreviewOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Phone Preview */}
              <div className="flex-1 overflow-y-auto flex items-start justify-center py-6 px-4">
                <div className="w-[290px] flex-shrink-0">
                  <div className="rounded-[2.8rem] bg-gradient-to-b from-gray-800 to-gray-900 p-[10px] shadow-2xl shadow-gray-900/30 relative">
                    {/* Glow effect behind phone */}
                    <div className="absolute -inset-4 bg-gradient-to-b from-violet-300/25 via-indigo-200/15 to-purple-300/15 rounded-[3.5rem] blur-2xl -z-[1]" />
                    {/* Side buttons */}
                    <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -left-[2px] top-[200px] w-[3px] h-12 bg-gray-700 rounded-l-sm" />
                    <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-gray-700 rounded-r-sm" />
                    <div className="relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
                        <div className="w-12 h-3 bg-gray-800 rounded-full" />
                      </div>
                    </div>
                    <div
                      className={`rounded-[2.2rem] overflow-hidden ${!isCustom ? theme.bg : ''} min-h-[480px] flex flex-col ${fontStyle.cls} relative`}
                      style={isCustom ? customTheme.bgStyle : undefined}
                    >
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
                      {selectedPattern !== 'none' && (
                        <div className="absolute inset-0 pointer-events-none z-0 rounded-[2.3rem] overflow-hidden">
                          <div
                            className="absolute inset-[-50%] w-[200%] h-[200%]"
                            style={{
                              ...bgPatterns.find((p) => p.id === selectedPattern)?.style,
                              ...getPatternAnimStyle(selectedPatternAnim),
                            }}
                          />
                        </div>
                      )}
                      {/* Glow overlay */}
                      {patternGlow && (
                        <div className="absolute inset-0 pointer-events-none z-0 rounded-[2.3rem] overflow-hidden">
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
                      <div className="pt-8 pb-3 flex flex-col items-center px-6 relative z-[1]">
                        <div className="w-[68px] h-[68px] rounded-full bg-gray-300/20 flex items-center justify-center mb-2.5 overflow-hidden">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" style={{ objectPosition: `${50 - avatarX}% ${50 - avatarY}%`, transform: `scale(${avatarScale})` }} />
                          ) : (
                            <User size={22} className={`${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-25`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined} />
                          )}
                        </div>
                        <h3 className={`font-bold text-sm ${!resolvedTextColor && !isCustom ? theme.text : ''}`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined}>
                          {displayName || 'username'}
                        </h3>
                        {bio && (
                          <p className={`text-[11px] mt-0.5 ${!resolvedTextColor && !isCustom ? theme.subtext : ''} text-center`} style={resolvedTextColor ? { color: resolvedTextColor, opacity: 0.6 } : undefined}>{bio}</p>
                        )}
                      </div>

                      {/* Social Row */}
                      {activeSocials.length > 0 && (
                        <div className="px-5 pb-3 flex items-center justify-center gap-3 relative z-[1]">
                          {activeSocials.map((id) => {
                            const p = socialPlatforms.find((s) => s.id === id);
                            if (!p) return null;
                            const url = socialUrls[id];
                            const Wrapper = url ? 'a' : 'div';
                            return (
                              <Wrapper
                                key={id}
                                {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className={`w-7 h-7 rounded-full ${!isCustom ? theme.card : ''} flex items-center justify-center ${url ? 'hover:opacity-80 transition-opacity cursor-pointer' : ''}`}
                                style={isCustom ? customTheme.cardStyle : undefined}
                              >
                                <p.icon size={12} className={`${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-50`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined} />
                              </Wrapper>
                            );
                          })}
                        </div>
                      )}

                      {/* Product Gallery */}
                      {productImages.length > 0 && (
                        <div className="px-4 pb-3 relative z-[1]">
                          <div className="grid grid-cols-2 gap-2">
                            {productImages.map((img, idx) => (
                              <div
                                key={idx}
                                className={`aspect-square rounded-xl overflow-hidden ${!isCustom ? theme.card : ''} ${!isCustom ? theme.cardBorder : ''}`}
                                style={isCustom ? customTheme.cardStyle : undefined}
                              >
                                <img
                                  src={img}
                                  alt={`Product ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="px-4 pb-4 space-y-2 flex-1 relative z-[1]">
                        {links.filter((l) => {
                          if (!l.enabled) return false;
                          if (l.embedCode || l.linkImage) return true;
                          const url = resolveUrl(l);
                          return !!(l.title || (url && urlToEmbedCode(url)));
                        }).length === 0 && (
                          <div className={`text-center py-6 ${!resolvedTextColor && !isCustom ? theme.text : ''} opacity-15`} style={resolvedTextColor ? { color: resolvedTextColor } : undefined}>
                            <ExternalLink size={20} className="mx-auto mb-1.5" />
                            <p className="text-[10px]">เพิ่มลิงก์ด้านบน</p>
                          </div>
                        )}
                        {links
                          .filter((l) => {
                            if (!l.enabled) return false;
                            if (l.embedCode || l.linkImage) return true;
                            const url = resolveUrl(l);
                            return !!(l.title || (url && urlToEmbedCode(url)));
                          })
                          .map((link) => {
                            const actualUrl = resolveUrl(link);
                            const resolvedEmbed = link.embedCode || (actualUrl ? urlToEmbedCode(actualUrl) : null);
                            return resolvedEmbed ? (
                              <div key={link.id} className="relative z-[1] rounded-xl overflow-hidden [&_iframe]:!h-[180px]">
                                <div dangerouslySetInnerHTML={{ __html: resolvedEmbed }} />
                              </div>
                            ) : link.linkImage ? (
                              <div key={link.id} className="relative z-[1] rounded-xl overflow-hidden cursor-pointer group">
                                <img src={link.linkImage} alt={link.title} className="w-full rounded-xl object-cover transition-transform group-hover:scale-[1.02]" />
                              </div>
                            ) : (
                            <div
                              key={link.id}
                              className={`${!link.color && !isCustom ? `${theme.card} ${theme.cardBorder}` : ''} ${btnStyle.cls} px-4 py-2.5 ${link.thumbnail ? 'flex items-center gap-2' : 'text-center'} relative z-[1]`}
                              style={link.color
                                ? { backgroundColor: link.color, border: '1px solid rgba(0,0,0,0.06)' }
                                : isCustom ? customTheme.cardStyle : undefined
                              }
                            >
                              {link.thumbnail && (
                                <img src={link.thumbnail} alt="" className="w-5 h-5 rounded object-cover flex-shrink-0" />
                              )}
                              <span className={`text-[11px] font-medium ${!link.color && !resolvedTextColor && !isCustom ? theme.text : ''} ${link.thumbnail ? 'flex-1 text-left' : ''}`} style={resolvedTextColor ? { color: resolvedTextColor } : link.color ? { color: '#374151' } : undefined}>{link.title}</span>
                            </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Avatar Crop Modal */}
      <AnimatePresence>
        {showAvatarCrop && avatar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-center px-4 py-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">ครอบตัด</h2>
            </div>

            {/* Crop area */}
            <div className="flex-1 bg-gray-900 flex items-center justify-center relative overflow-hidden">
              <div
                ref={avatarCropRef}
                className="relative select-none cursor-grab active:cursor-grabbing overflow-hidden touch-none"
                style={{ width: 'min(80vw, 80vh)', height: 'min(80vw, 80vh)' }}
                onMouseDown={handleAvatarDragStart}
                onTouchStart={handleAvatarDragStart}
              >
                {/* Scale wrapper - separate from object-position to avoid interference */}
                <div className="w-full h-full" style={{ transform: `scale(${avatarScale})`, transformOrigin: 'center' }}>
                  <img src={avatar} alt="Crop" className="w-full h-full object-cover pointer-events-none" draggable={false}
                    style={{ objectPosition: `${50 - avatarX}% ${50 - avatarY}%` }} />
                </div>
              </div>
              {/* Dark overlay outside circle */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(circle at center, transparent min(39vw, 39vh), rgba(0,0,0,0.6) min(40vw, 40vh))`
              }} />
              {/* Reset button */}
              <button
                onClick={() => { setAvatarScale(1); setAvatarX(0); setAvatarY(0); }}
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Zoom slider */}
            <div className="bg-gray-900 px-8 pb-2">
              <div className="flex items-center gap-3 max-w-sm mx-auto">
                <Search size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type="range" min="1" max="3" step="0.05" value={avatarScale}
                  onChange={(e) => {
                    const s = parseFloat(e.target.value);
                    setAvatarScale(s);
                    const c = clampPan(s, avatarX, avatarY);
                    setAvatarX(c.x); setAvatarY(c.y);
                  }}
                  className="flex-1 h-1 accent-white cursor-pointer"
                />
                <Search size={20} className="text-gray-300 flex-shrink-0" />
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex gap-3 px-4 py-4 bg-white border-t border-gray-100">
              <button
                onClick={() => {
                  // Revert to previous
                  setAvatarScale(prevAvatarCrop.scale);
                  setAvatarX(prevAvatarCrop.x);
                  setAvatarY(prevAvatarCrop.y);
                  if (prevAvatarCrop.avatar) setAvatar(prevAvatarCrop.avatar);
                  setShowAvatarCrop(false);
                }}
                className="flex-1 py-3.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => setShowAvatarCrop(false)}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm hover:from-pink-600 hover:to-rose-600 transition-colors shadow-lg shadow-pink-500/25"
              >
                บันทึก
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3.5 bg-gray-900/90 backdrop-blur-xl text-white text-sm font-medium rounded-2xl shadow-xl shadow-gray-900/20 flex items-center gap-2.5 border border-white/5"
          >
            <CheckCircle2 size={16} className="text-green-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
