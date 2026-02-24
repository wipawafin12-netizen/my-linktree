import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Trash2, GripVertical, ExternalLink, Image, Eye, EyeOff,
  Instagram, Youtube, Twitter, Music2, Globe, Github, Twitch, Facebook,
  User, Palette, Type, ChevronRight, ChevronDown, Settings, Sparkles,
  Share2, BarChart3, DollarSign, Users, TrendingUp, Calendar,
  MessageSquare, Link2, Scissors, Lightbulb, Archive, FolderOpen,
  Check, Upload, Pencil, X, Search, Heart, Play, Phone, FileText,
  ShoppingBag, Grid3x3, Tag, ClipboardList, Download, Mail,
  Copy, CheckCircle2, Coins, Info, GraduationCap,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ── Sidebar nav items ──
const sidebarMain = [
  { icon: Link2, label: 'My OpenBio', id: 'links' },
  { icon: Coins, label: 'Earn', id: 'earn' },
  { icon: Users, label: 'Audience', id: 'audience' },
  { icon: BarChart3, label: 'Insights', id: 'insights' },
];

const sidebarTools = [
  { icon: Calendar, label: 'Social planner', id: 'planner' },
  { icon: MessageSquare, label: 'Instagram auto-reply', id: 'autoreply' },
  { icon: Scissors, label: 'Link shortener', id: 'shortener' },
  { icon: Lightbulb, label: 'Post ideas', id: 'ideas' },
];

// ── Theme presets ──
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
];

// ── Background patterns ──
const bgPatterns = [
  { id: 'none', label: 'None', style: {} as React.CSSProperties },
  { id: 'gingham', label: 'Gingham', style: {
    backgroundImage: `repeating-linear-gradient(0deg, rgba(200,150,200,0.12) 0px, rgba(200,150,200,0.12) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(200,150,200,0.12) 0px, rgba(200,150,200,0.12) 1px, transparent 1px, transparent 20px)`,
    backgroundSize: '20px 20px',
  } as React.CSSProperties },
  { id: 'dots', label: 'Dots', style: {
    backgroundImage: `radial-gradient(circle, rgba(180,140,200,0.18) 1.5px, transparent 1.5px)`,
    backgroundSize: '16px 16px',
  } as React.CSSProperties },
  { id: 'stripes', label: 'Stripes', style: {
    backgroundImage: `repeating-linear-gradient(135deg, rgba(200,150,200,0.1) 0px, rgba(200,150,200,0.1) 2px, transparent 2px, transparent 12px)`,
  } as React.CSSProperties },
  { id: 'confetti', label: 'Confetti', style: {
    backgroundImage: `radial-gradient(circle, rgba(252,196,204,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(200,180,240,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(180,230,200,0.3) 2px, transparent 2px), radial-gradient(circle, rgba(255,240,170,0.3) 2px, transparent 2px)`,
    backgroundSize: '40px 40px, 50px 50px, 35px 45px, 45px 35px',
    backgroundPosition: '0 0, 20px 15px, 10px 30px, 35px 5px',
  } as React.CSSProperties },
  { id: 'diamond', label: 'Diamond', style: {
    backgroundImage: `repeating-linear-gradient(45deg, rgba(180,160,210,0.1) 0px, rgba(180,160,210,0.1) 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, rgba(180,160,210,0.1) 0px, rgba(180,160,210,0.1) 1px, transparent 1px, transparent 16px)`,
    backgroundSize: '22px 22px',
  } as React.CSSProperties },
  { id: 'zigzag', label: 'Zigzag', style: {
    backgroundImage: `linear-gradient(135deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(225deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(315deg, rgba(200,150,180,0.12) 25%, transparent 25%), linear-gradient(45deg, rgba(200,150,180,0.12) 25%, transparent 25%)`,
    backgroundSize: '20px 10px',
    backgroundPosition: '0 0, 10px 0, 10px -5px, 0 5px',
  } as React.CSSProperties },
  { id: 'waves', label: 'Waves', style: {
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(160,180,220,0.12) 14px, rgba(160,180,220,0.12) 16px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(160,180,220,0.06) 30px, rgba(160,180,220,0.06) 32px)`,
  } as React.CSSProperties },
  { id: 'hearts', label: 'Hearts', style: {
    backgroundImage: `radial-gradient(circle, rgba(240,140,160,0.2) 3px, transparent 3px), radial-gradient(circle, rgba(240,140,160,0.12) 2px, transparent 2px)`,
    backgroundSize: '30px 30px, 30px 30px',
    backgroundPosition: '0 0, 15px 15px',
  } as React.CSSProperties },
  { id: 'stars', label: 'Stars', style: {
    backgroundImage: `radial-gradient(circle, rgba(220,180,100,0.2) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(220,180,100,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(220,180,100,0.25) 2px, transparent 2px)`,
    backgroundSize: '24px 24px, 36px 36px, 48px 48px',
    backgroundPosition: '0 0, 12px 18px, 6px 36px',
  } as React.CSSProperties },
  { id: 'grid', label: 'Grid', style: {
    backgroundImage: `linear-gradient(rgba(150,150,180,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,180,0.08) 1px, transparent 1px)`,
    backgroundSize: '12px 12px',
  } as React.CSSProperties },
  { id: 'honeycomb', label: 'Honeycomb', style: {
    backgroundImage: `radial-gradient(circle, transparent 7px, rgba(200,170,130,0.08) 7px, rgba(200,170,130,0.08) 8px, transparent 8px)`,
    backgroundSize: '20px 34px',
    backgroundPosition: '0 0, 10px 17px',
  } as React.CSSProperties },
  { id: 'bubbles', label: 'Bubbles', style: {
    backgroundImage: `radial-gradient(circle, rgba(160,200,230,0.15) 6px, transparent 6px), radial-gradient(circle, rgba(200,170,220,0.12) 4px, transparent 4px), radial-gradient(circle, rgba(180,220,180,0.1) 8px, transparent 8px)`,
    backgroundSize: '50px 50px, 38px 38px, 60px 60px',
    backgroundPosition: '0 0, 25px 20px, 10px 35px',
  } as React.CSSProperties },
];

// ── Button styles ──
const buttonStyles = [
  { id: 'rounded', label: 'Rounded', cls: 'rounded-full' },
  { id: 'soft', label: 'Soft', cls: 'rounded-xl' },
  { id: 'sharp', label: 'Sharp', cls: 'rounded-md' },
  { id: 'outline-round', label: 'Outline', cls: 'rounded-full border-2' },
  { id: 'shadow', label: 'Shadow', cls: 'rounded-xl shadow-md' },
];

// ── Font options ──
const fontOptions = [
  { id: 'inter', label: 'Inter', cls: 'font-sans' },
  { id: 'serif', label: 'Serif', cls: 'font-serif' },
  { id: 'mono', label: 'Mono', cls: 'font-mono' },
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
];

// ── Add modal categories ──
const addCategories = [
  { id: 'suggested', icon: Sparkles, label: 'Suggested' },
  { id: 'projects', icon: Grid3x3, label: 'Projects & SDK' },
  { id: 'commerce', icon: ShoppingBag, label: 'Commerce' },
  { id: 'social', icon: Heart, label: 'Social' },
  { id: 'media', icon: Play, label: 'Media' },
  { id: 'contact', icon: Phone, label: 'Contact' },
  { id: 'events', icon: Calendar, label: 'Events' },
  { id: 'text', icon: FileText, label: 'Text' },
];

const addQuickCards = [
  { icon: Grid3x3, label: 'Collection', color: '#8b5cf6' },
  { icon: Link2, label: 'Link', color: '#8b5cf6' },
  { icon: Tag, label: 'Product', color: '#8b5cf6' },
  { icon: ClipboardList, label: 'Form', color: '#8b5cf6' },
];

const addSuggestedItems = [
  { icon: Download, label: 'Catalog / Drawing', desc: 'Securely share PDF catalogs or CAD drawings', category: 'projects', gradient: 'from-[#2563eb] to-[#3b82f6]' },
  { icon: ClipboardList, label: 'RFQ (Quotation)', desc: 'Professional Request for Quotation form', category: 'projects', gradient: 'from-[#059669] to-[#10b981]' },
  { icon: Grid3x3, label: 'Project Reference', desc: 'Showcase your completed projects portfolio', category: 'projects', gradient: 'from-[#4f46e5] to-[#6366f1]' },
  { icon: Tag, label: 'Material Datasheet', desc: 'Detailed technical specifications for spec-in', category: 'projects', gradient: 'from-[#db2777] to-[#ec4899]' },
  { icon: Phone, label: 'Direct Site Visit', desc: 'Schedule a consultant visit to your site', category: 'projects', gradient: 'from-[#d97706] to-[#f59e0b]' },
  { icon: Instagram, label: 'Instagram', desc: 'Display your posts and reels', category: 'social', gradient: 'from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
  { icon: Music2, label: 'TikTok', desc: 'Share your TikToks on your OpenBio', category: 'social', gradient: 'from-[#69C9D0] to-[#EE1D52]' },
  { icon: Youtube, label: 'YouTube', desc: 'Share YouTube videos on your OpenBio', category: 'media', gradient: 'from-[#FF0000] to-[#CC0000]' },
  { icon: Music2, label: 'Spotify', desc: 'Share your latest or favorite music', category: 'media', gradient: 'from-[#1DB954] to-[#1ed760]' },
  { icon: Download, label: 'File downloads', desc: 'Upload files to sell on your OpenBio', category: 'commerce', gradient: 'from-[#f97316] to-[#fb923c]' },
  { icon: Mail, label: 'Email signup', desc: 'Collect emails from your audience', category: 'contact', gradient: 'from-[#6366f1] to-[#818cf8]' },
  { icon: DollarSign, label: 'Tip jar', desc: 'Accept tips from your supporters', category: 'commerce', gradient: 'from-[#eab308] to-[#facc15]' },
  { icon: ShoppingBag, label: 'Shop', desc: 'Sell products directly from OpenBio', category: 'commerce', gradient: 'from-[#ec4899] to-[#f472b6]' },
  { icon: Facebook, label: 'Facebook', desc: 'Link your Facebook profile or page', category: 'social', gradient: 'from-[#1877F2] to-[#4299e1]' },
  { icon: Twitter, label: 'Twitter', desc: 'Share your tweets and profile', category: 'social', gradient: 'from-[#1DA1F2] to-[#0d8bd9]' },
  { icon: Phone, label: 'Phone number', desc: 'Let visitors call you directly', category: 'contact', gradient: 'from-[#10b981] to-[#34d399]' },
  { icon: Mail, label: 'Contact form', desc: 'Receive messages from your visitors', category: 'contact', gradient: 'from-[#8b5cf6] to-[#a78bfa]' },
  { icon: Calendar, label: 'Event', desc: 'Promote upcoming events', category: 'events', gradient: 'from-[#f59e0b] to-[#fbbf24]' },
  { icon: Calendar, label: 'Booking', desc: 'Let visitors book appointments', category: 'events', gradient: 'from-[#6366f1] to-[#818cf8]' },
  { icon: Play, label: 'Video', desc: 'Embed YouTube or Vimeo videos', category: 'media', gradient: 'from-[#ef4444] to-[#f87171]' },
  { icon: Music2, label: 'Podcast', desc: 'Share your podcast episodes', category: 'media', gradient: 'from-[#8b5cf6] to-[#c084fc]' },
  { icon: FileText, label: 'Text block', desc: 'Add a text section to your page', category: 'text', gradient: 'from-[#6b7280] to-[#9ca3af]' },
  { icon: FileText, label: 'Heading', desc: 'Add a heading to organize links', category: 'text', gradient: 'from-[#374151] to-[#6b7280]' },
];

type LinkItem = { id: string; title: string; url: string; enabled: boolean; thumbnail?: string; clicks?: number; color?: string };

export default function CreatePage() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [displayName, setDisplayName] = useState(username || '');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('minimal');
  const [selectedButton, setSelectedButton] = useState('rounded');
  const [selectedFont, setSelectedFont] = useState('inter');
  const [customBgColor, setCustomBgColor] = useState('#6366f1');
  const [customBgSecondary, setCustomBgSecondary] = useState('#4f46e5');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [activeSocials, setActiveSocials] = useState<string[]>([]);
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
  const [toast, setToast] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const linkImageInputRef = useRef<HTMLInputElement>(null);
  const [imageTargetLinkId, setImageTargetLinkId] = useState<string | null>(null);

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
  const [subscribers, setSubscribers] = useState<{ email: string; date: string }[]>([]);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
  const [emailFormTitle, setEmailFormTitle] = useState('Join my newsletter');

  // Insights section
  const [insightsPeriod, setInsightsPeriod] = useState<'7d' | '30d' | 'all'>('7d');

  // Tools section
  const [scheduledPosts, setScheduledPosts] = useState<{ id: string; text: string; platform: string; date: string; time: string }[]>([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('instagram');
  const [newPostDate, setNewPostDate] = useState('');
  const [newPostTime, setNewPostTime] = useState('');
  const [autoReplyMessage, setAutoReplyMessage] = useState('Thanks for reaching out! Check out my OpenBio for all my links.');
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  const [autoReplyKeywords, setAutoReplyKeywords] = useState('link, links, website, url');
  const [shortenerInput, setShortenerInput] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState<{ original: string; short: string; clicks: number }[]>([]);
  const [expandedSidebar, setExpandedSidebar] = useState<string | null>(null);
  const [sidebarUserMenu, setSidebarUserMenu] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [earnSubTab, setEarnSubTab] = useState<'overview' | 'earnings'>('overview');
  const [selectedPattern, setSelectedPattern] = useState('none');
  const [showAllThemes, setShowAllThemes] = useState(false);

  // Apply template data from TemplatesPage navigation
  useEffect(() => {
    const state = location.state as { template?: { name: string; bio: string; links: string[]; avatarBg: string; avatarText?: string; overlay: string } } | null;
    if (state?.template) {
      const t = state.template;
      setDisplayName(t.name);
      setBio(t.bio);
      setLinks(
        t.links.map((title, i) => ({
          id: `tpl-${Date.now()}-${i}`,
          title,
          url: '',
          enabled: true,
          clicks: 0,
        }))
      );
      // Clear the state so refreshing doesn't re-apply
      window.history.replaceState({}, '');
    }
  }, []);

  const isLightColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b > 0.55;
  };

  const isCustom = selectedTheme === 'custom';
  const light = isLightColor(customBgColor);
  const customTheme = {
    id: 'custom', label: 'Custom', preview: customBgColor,
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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const addLink = (title = '') => {
    setLinks([...links, { id: Date.now().toString(), title, url: '', enabled: true, clicks: 0 }]);
    setAddModalOpen(false);
    setAddModalSearch('');
  };
  const removeLink = (id: string) => setLinks(links.filter((l) => l.id !== id));
  const updateLink = (id: string, field: 'title' | 'url' | 'color', value: string) => {
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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLinkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && imageTargetLinkId) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLinks(links.map((l) => l.id === imageTargetLinkId ? { ...l, thumbnail: ev.target?.result as string } : l));
      };
      reader.readAsDataURL(file);
      setImageTargetLinkId(null);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`linktr.ee/${displayName || 'username'}`);
    setCopied(true);
    showToast('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnhance = () => {
    if (!displayName) setDisplayName(username || 'mylinktree');
    if (!bio) setBio('Creator, dreamer & maker of cool things');
    if (links.length === 0) {
      setLinks([
        { id: '1', title: 'My Website', url: 'https://example.com', enabled: true, clicks: 142 },
        { id: '2', title: 'Follow me on Instagram', url: 'https://instagram.com', enabled: true, clicks: 89 },
        { id: '3', title: 'Latest Video', url: 'https://youtube.com', enabled: true, clicks: 256 },
      ]);
    }
    if (activeSocials.length === 0) setActiveSocials(['instagram', 'youtube', 'twitter']);
    showToast('Profile enhanced with demo content!');
  };

  const handleFinishSetup = () => {
    if (!displayName) {
      showToast('Add your name to complete setup');
      return;
    }
    if (links.length === 0) {
      setAddModalOpen(true);
      showToast('Add at least one link');
      return;
    }
    if (activeSocials.length === 0) {
      setMainTab('settings');
      showToast('Add social icons to complete setup');
      return;
    }
    showToast('Setup complete! Your OpenBio is ready');
  };

  const visibleLinks = showArchive ? links : links.filter((l) => l.enabled);

  return (
    <div className="min-h-screen bg-[#f3f3f1] pt-16">
      <div className="flex">

        {/* ══════ Sidebar ══════ */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 pt-20 lg:pt-4 pb-6 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* User info */}
          <div className="px-5 pb-4 mb-2 border-b border-gray-100 relative">
            <button
              onClick={() => setSidebarUserMenu(!sidebarUserMenu)}
              className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} className="text-gray-400" />
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
                <div className="absolute left-3 right-3 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">linktr.ee/{displayName || 'username'}</p>
                  </div>
                  <button onClick={() => { handleCopyUrl(); setSidebarUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Copy size={14} /> Copy my link
                  </button>
                  <button onClick={() => { setActiveSection('links'); setSidebarUserMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={14} /> Account settings
                  </button>
                  <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                    <X size={14} /> Log out
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeSection === item.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <item.icon size={18} />
                  {item.label}
                  {(item.id === 'earn' || item.id === 'audience') && (
                    <ChevronDown size={14} className={`ml-auto text-gray-300 transition-transform ${expandedSidebar === item.id ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {/* Sub-menu for Earn */}
                {item.id === 'earn' && expandedSidebar === 'earn' && (
                  <div className="ml-8 mt-2 space-y-2 relative before:absolute before:left-[-15px] before:top-[-10px] before:bottom-3 before:w-[1.5px] before:bg-gray-100">
                    <button
                      onClick={() => { setEarnSubTab('overview'); scrollToSubSection('earn', 'revenue-overview'); }}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${earnSubTab === 'overview' ? 'bg-[#f3f3f1] text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => { setEarnSubTab('earnings'); scrollToSubSection('earn', 'revenue-overview'); }}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-between ${earnSubTab === 'earnings' ? 'bg-[#f3f3f1] text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                      <span>Earnings</span>
                      <span>US$0.00</span>
                    </button>
                  </div>
                )}
                {/* Sub-menu for Audience */}
                {item.id === 'audience' && expandedSidebar === 'audience' && (
                  <div className="ml-8 mt-0.5 space-y-0.5">
                    <button onClick={() => scrollToSubSection('audience', 'subscribers')} className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">Subscribers</button>
                    <button onClick={() => scrollToSubSection('audience', 'email-forms')} className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">Email forms</button>
                    <button onClick={() => scrollToSubSection('audience', 'campaigns')} className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">Campaigns</button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Tools section */}
          <div className="px-3 mt-6">
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Tools</p>
            <div className="space-y-0.5">
              {sidebarTools.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeSection === item.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Setup checklist */}
          <div className="mt-auto mx-3 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="3"
                    strokeDasharray={`${(links.length > 0 ? 33 : 0) + (displayName ? 33 : 0) + (activeSocials.length > 0 ? 34 : 0)} 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-600">
                  {(links.length > 0 ? 1 : 0) + (displayName ? 1 : 0) + (activeSocials.length > 0 ? 1 : 0)}/3
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Your setup checklist</p>
                <p className="text-[11px] text-gray-400">
                  {(links.length > 0 ? 1 : 0) + (displayName ? 1 : 0) + (activeSocials.length > 0 ? 1 : 0)} of 3 complete
                </p>
              </div>
            </div>
            <button
              onClick={handleFinishSetup}
              className="w-full py-2 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Finish setup
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
          <div className="sticky top-16 z-20 bg-white border-b border-gray-100 px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <GripVertical size={18} />
                </button>
                <h1 className="text-lg font-bold text-gray-900">
                  {activeSection === 'links' ? 'Links' : [...sidebarMain, ...sidebarTools].find(s => s.id === activeSection)?.label || 'Links'}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEnhance}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Sparkles size={15} /> Enhance
                </button>
                <button
                  onClick={() => setMainTab('settings')}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings size={18} />
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="hidden sm:flex items-center gap-2 ml-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xs text-gray-500">linktr.ee/</span>
                  <span className="text-xs font-semibold text-gray-900">{displayName || 'username'}</span>
                  {copied ? <CheckCircle2 size={14} className="text-green-500 ml-1" /> : <Copy size={14} className="text-gray-400 ml-1" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* ── Editor Area ── */}
            <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-6">

              {/* Section content for non-links sections */}
              {activeSection !== 'links' && (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5 mb-6"
                >
                  {/* ── Earn Section ── */}
                  {activeSection === 'earn' && (
                    <div id="revenue-overview" className="scroll-mt-24">

                      {/* === Overview Sub-tab === */}
                      {earnSubTab === 'overview' && (
                        <div>
                          {/* Page Title */}
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">Earn</h1>

                          {/* Overview Tab */}
                          <div className="mb-8">
                            <div className="border-b border-gray-200">
                              <button className="px-1 pb-3 text-sm font-medium text-gray-500 border-b-2 border-gray-400">
                                Overview
                              </button>
                            </div>
                          </div>

                          {/* Info Notice */}
                          <div className="bg-[#fef9e7] rounded-2xl p-5 mb-8">
                            <p className="text-sm font-semibold text-[#856404] mb-1">Selling is not enabled in your country</p>
                            <p className="text-sm text-[#856404]/80">
                              Currently you can only offer free digital products at this time. <button className="underline font-semibold text-[#856404]">Learn more</button>
                            </p>
                          </div>

                          {/* Free digital products */}
                          <h2 className="text-lg font-bold text-gray-900 mb-5 px-2">Free digital products</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {/* Courses */}
                            <button className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#e9d5ff] rounded-xl flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={22} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">Courses</p>
                                <p className="text-sm text-gray-500">Share your expertise with an online course.</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                            </button>

                            {/* Digital products */}
                            <button className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#fee2e2] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Download size={22} className="text-[#ef4444]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">Digital products</p>
                                <p className="text-sm text-gray-500">Share downloadable content.</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                            </button>

                            {/* Bookings */}
                            <button className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3e8ff] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar size={22} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900">Bookings</p>
                                <p className="text-sm text-gray-500">Get booked for sessions, calls, or coaching.</p>
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
                              <p className="text-sm font-bold text-gray-900">Got ideas?</p>
                              <p className="text-sm text-gray-500">We're listening! <button className="underline font-semibold text-gray-900">Share feedback</button></p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* === Earnings Sub-tab === */}
                      {earnSubTab === 'earnings' && (
                        <div>
                          {/* Page Title */}
                          <h1 className="text-2xl font-bold text-gray-900 mb-6">Earnings</h1>

                          {/* Balance Card */}
                          <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm mb-8">
                            <div className="flex items-center gap-1.5 mb-1 text-gray-500">
                              <span className="text-sm font-medium">Balance</span>
                              <Info size={14} className="text-gray-300" />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900">$0.00</h2>
                          </div>

                          {/* Start earning */}
                          <h2 className="text-lg font-bold text-gray-900 mb-5 px-1">Start earning on OpenBio</h2>
                          <div className="space-y-4 mb-10">
                            {/* Offer your time */}
                            <button className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3f3f1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar size={20} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">Offer your time</p>
                                <p className="text-sm text-gray-500">Get booked for sessions, calls, or coaching</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </button>

                            {/* Sell digital products */}
                            <button className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3f3f1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <ShoppingBag size={20} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">Sell digital products</p>
                                <p className="text-sm text-gray-500">Share guides, music, templates, and more</p>
                              </div>
                              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </button>

                            {/* Teach a course */}
                            <button className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group text-left">
                              <div className="w-12 h-12 bg-[#f3f3f1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={20} className="text-[#7c3aed]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">Teach a course</p>
                                <p className="text-sm text-gray-500">Turn your expertise into an online course</p>
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
                              <p className="text-sm font-bold text-gray-900">Got ideas?</p>
                              <p className="text-sm text-gray-500">We're listening! <button className="underline font-semibold text-gray-900">Share feedback</button></p>
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
                          <p className="text-xs text-gray-400 mt-1">Subscribers</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                          <p className="text-3xl font-bold text-gray-900">{subscribers.filter(s => { const d = new Date(s.date); const now = new Date(); return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000; }).length}</p>
                          <p className="text-xs text-gray-400 mt-1">This week</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                          <p className="text-3xl font-bold text-gray-900">0%</p>
                          <p className="text-xs text-gray-400 mt-1">Open rate</p>
                        </div>
                      </div>

                      {/* Email Form Setup */}
                      <div id="email-forms" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Mail size={20} className="text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">Email signup form</h3>
                            <p className="text-[11px] text-gray-400">Collect emails from your visitors</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Form title</label>
                            <input
                              type="text"
                              value={emailFormTitle}
                              onChange={(e) => setEmailFormTitle(e.target.value)}
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                            />
                          </div>
                          <button
                            onClick={() => { addLink(emailFormTitle); setActiveSection('links'); showToast('Email form added!'); }}
                            className="w-full py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors"
                          >
                            Add to OpenBio
                          </button>
                        </div>
                      </div>

                      {/* Test Subscriber / Campaigns */}
                      <div id="campaigns" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-900">Lead management (B2B CRM)</h3>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-tight">Project Focused</span>
                        </div>
                        <div className="flex gap-2 mb-4">
                          <input
                            type="email"
                            value={newSubscriberEmail}
                            onChange={(e) => setNewSubscriberEmail(e.target.value)}
                            placeholder="Enter business email..."
                            className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                          />
                          <button
                            onClick={() => {
                              if (newSubscriberEmail) {
                                setSubscribers([...subscribers, { email: newSubscriberEmail, date: new Date().toISOString() }]);
                                setNewSubscriberEmail('');
                                showToast('Lead added to Project List!');
                              }
                            }}
                            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add Lead
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
                                    <span className="text-[10px] text-gray-400">Project: High-Rise Condo (Sample)</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-gray-400">{new Date(s.date).toLocaleDateString()}</span>
                                  <button onClick={() => setSubscribers(subscribers.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-2xl">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Users size={20} className="text-gray-300" />
                            </div>
                            <p className="text-sm text-gray-400 font-medium">No active leads</p>
                            <p className="text-[11px] text-gray-300 max-w-[200px] mx-auto">Start collecting leads from your project quotation forms</p>
                          </div>
                        )}
                        <button className="w-full mt-4 py-3 bg-gray-50 text-gray-500 text-xs font-semibold rounded-xl border border-gray-100 hover:bg-gray-100 hover:text-gray-700 transition-all flex items-center justify-center gap-2">
                          <Download size={14} /> Export CSV for CRM (Salesforce/Hubspot)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Insights Section ── */}
                  {activeSection === 'insights' && (
                    <>
                      {/* Period Selector */}
                      <div className="flex gap-2 mb-2">
                        {([['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['all', 'All time']] as const).map(([val, label]) => (
                          <button
                            key={val}
                            onClick={() => setInsightsPeriod(val)}
                            className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${insightsPeriod === val ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Overview Stats */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{links.reduce((a, l) => a + (l.clicks || 0), 0)}</p>
                          <p className="text-[11px] text-gray-400 mt-1">Total clicks</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{Math.round(links.reduce((a, l) => a + (l.clicks || 0), 0) * 2.3)}</p>
                          <p className="text-[11px] text-gray-400 mt-1">Views</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{links.length > 0 ? Math.round(links.reduce((a, l) => a + (l.clicks || 0), 0) / Math.max(links.reduce((a, l) => a + (l.clicks || 0), 0) * 2.3, 1) * 100) : 0}%</p>
                          <p className="text-[11px] text-gray-400 mt-1">CTR</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                          <p className="text-2xl font-bold text-gray-900">{links.filter(l => l.enabled).length}</p>
                          <p className="text-[11px] text-gray-400 mt-1">Active links</p>
                        </div>
                      </div>

                      {/* Mini Chart */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Click activity</h3>
                        <div className="flex items-end gap-1.5 h-32">
                          {Array.from({ length: insightsPeriod === '7d' ? 7 : insightsPeriod === '30d' ? 15 : 12 }).map((_, i) => {
                            const height = links.length > 0 ? Math.random() * 80 + 20 : 10;
                            return (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                  className="w-full bg-purple-400 rounded-t-md transition-all hover:bg-purple-500"
                                  style={{ height: `${height}%` }}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-[10px] text-gray-400">{insightsPeriod === '7d' ? 'Mon' : insightsPeriod === '30d' ? '1st' : 'Jan'}</span>
                          <span className="text-[10px] text-gray-400">{insightsPeriod === '7d' ? 'Sun' : insightsPeriod === '30d' ? '30th' : 'Dec'}</span>
                        </div>
                      </div>

                      {/* Top Links */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Top performing links</h3>
                        {links.length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-4">Add links to see analytics</p>
                        ) : (
                          <div className="space-y-2">
                            {[...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5).map((link, i) => (
                              <div key={link.id} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
                                <span className="text-xs font-bold text-gray-400 w-5">#{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{link.title || 'Untitled'}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <BarChart3 size={12} className="text-purple-400" />
                                  <span className="text-sm font-semibold text-gray-900">{link.clicks || 0}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── Social Planner ── */}
                  {activeSection === 'planner' && (
                    <>
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <Calendar size={20} className="text-indigo-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">Schedule a post</h3>
                            <p className="text-[11px] text-gray-400">Plan and schedule your social media content</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <textarea
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                            placeholder="What do you want to share?"
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
                                showToast('Post scheduled!');
                              } else { showToast('Add text and date'); }
                            }}
                            className="w-full py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-colors"
                          >
                            Schedule post
                          </button>
                        </div>
                      </div>
                      {scheduledPosts.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Scheduled posts</h3>
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
                                  <p className="text-[11px] text-gray-400 mt-1">{post.date} at {post.time}</p>
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
                            <h3 className="text-sm font-semibold text-gray-900">Instagram auto-reply</h3>
                            <p className="text-[11px] text-gray-400">Auto-respond to DMs with your OpenBio</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setAutoReplyEnabled(!autoReplyEnabled); showToast(autoReplyEnabled ? 'Auto-reply disabled' : 'Auto-reply enabled!'); }}
                          className={`relative w-10 h-6 rounded-full transition-colors ${autoReplyEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoReplyEnabled ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Auto-reply message</label>
                          <textarea
                            value={autoReplyMessage}
                            onChange={(e) => setAutoReplyMessage(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Trigger keywords (comma-separated)</label>
                          <input
                            type="text"
                            value={autoReplyKeywords}
                            onChange={(e) => setAutoReplyKeywords(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300"
                          />
                        </div>
                        <div className="bg-pink-50 rounded-xl p-4">
                          <p className="text-[11px] font-medium text-pink-700 mb-2">Preview</p>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-400 mb-1">When someone sends: "{autoReplyKeywords.split(',')[0]?.trim()}"</p>
                            <p className="text-sm text-gray-800">{autoReplyMessage}</p>
                            <p className="text-xs text-blue-500 mt-1">linktr.ee/{displayName || 'username'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast('Settings saved!')}
                          className="w-full py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors"
                        >
                          Save settings
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
                            <h3 className="text-sm font-semibold text-gray-900">Link shortener</h3>
                            <p className="text-[11px] text-gray-400">Create short branded links</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={shortenerInput}
                            onChange={(e) => setShortenerInput(e.target.value)}
                            placeholder="Paste a long URL..."
                            className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
                          />
                          <button
                            onClick={() => {
                              if (shortenerInput) {
                                const rand = Math.random().toString(36).substring(2, 7);
                                setShortenedLinks([...shortenedLinks, { original: shortenerInput, short: `lnk.to/${rand}`, clicks: 0 }]);
                                setShortenerInput('');
                                showToast('Link shortened!');
                              }
                            }}
                            className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            Shorten
                          </button>
                        </div>
                      </div>
                      {shortenedLinks.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Your shortened links</h3>
                          <div className="space-y-2">
                            {shortenedLinks.map((link, i) => (
                              <div key={i} className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-orange-600">{link.short}</p>
                                  <p className="text-[11px] text-gray-400 truncate">{link.original}</p>
                                </div>
                                <button
                                  onClick={() => { navigator.clipboard.writeText(link.short); showToast('Short link copied!'); }}
                                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Copy size={14} />
                                </button>
                                <button onClick={() => setShortenedLinks(shortenedLinks.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-400"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
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
                          <h3 className="text-sm font-semibold text-gray-900">Post ideas</h3>
                          <p className="text-[11px] text-gray-400">Content ideas to boost engagement</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[
                          { emoji: '🎯', title: 'Share your goals for this month', desc: 'Build connection with your audience by sharing personal milestones' },
                          { emoji: '📸', title: 'Behind the scenes of your workspace', desc: 'People love seeing the real you and your creative process' },
                          { emoji: '💡', title: 'Top 3 tips in your niche', desc: 'Position yourself as an expert with quick value-packed tips' },
                          { emoji: '🎁', title: 'Run a giveaway for your followers', desc: 'Boost engagement and attract new followers with free value' },
                          { emoji: '📊', title: 'Share a milestone or achievement', desc: 'Celebrate wins publicly to build social proof and community' },
                          { emoji: '❓', title: 'Ask your audience a question', desc: 'Drive comments and learn about your audience preferences' },
                          { emoji: '🔗', title: 'Promote your newest OpenBio link', desc: 'Drive traffic to your latest content or product' },
                          { emoji: '📹', title: 'Create a quick tutorial or how-to', desc: 'Educational content gets saved and shared the most' },
                        ].map((idea, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setNewPostText(idea.title);
                              setActiveSection('planner');
                              showToast('Idea added to planner!');
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

                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {avatar ? (
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={24} className="text-gray-300" />
                        )}
                      </div>
                      <button
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Upload size={16} className="text-white" />
                      </button>
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Add your name"
                        className="w-full text-sm font-semibold text-gray-900 placeholder-gray-300 bg-transparent focus:outline-none"
                      />
                      <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Add bio"
                        className="w-full text-sm text-gray-500 placeholder-gray-300 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Add social icons */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                    {socialPlatforms.slice(0, 5).map((p) => {
                      const isActive = activeSocials.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggleSocial(p.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                            }`}
                          title={p.label}
                        >
                          <p.icon size={14} />
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setShowSocialPicker(!showSocialPicker)}
                      className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {/* Social Picker Dropdown */}
                  <AnimatePresence>
                    {showSocialPicker && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-50 overflow-hidden"
                      >
                        <p className="text-[11px] text-gray-400 mb-2">All platforms</p>
                        <div className="flex flex-wrap gap-2">
                          {socialPlatforms.map((p) => {
                            const isActive = activeSocials.includes(p.id);
                            return (
                              <button
                                key={p.id}
                                onClick={() => toggleSocial(p.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isActive
                                  ? 'bg-gray-900 text-white'
                                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                  }`}
                              >
                                <p.icon size={12} />
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add Button */}
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full flex items-center justify-center gap-2 transition-colors border border-gray-200 shadow-sm mb-5"
                >
                  <Plus size={20} /> Add
                </button>

                {/* Actions row */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={() => {
                      const id = Date.now().toString();
                      setLinks([...links, { id, title: 'Collection', url: '', enabled: true, clicks: 0 }]);
                      showToast('Collection added');
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <FolderOpen size={15} /> Add collection
                  </button>
                  <button
                    onClick={() => setShowArchive(!showArchive)}
                    className={`flex items-center gap-2 text-sm transition-colors ${showArchive ? 'text-purple-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Archive size={15} /> {showArchive ? 'Hide archive' : 'View archive'} <ChevronRight size={14} className={`transition-transform ${showArchive ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Link Cards */}
                <div className="space-y-3 mb-6">
                  <AnimatePresence>
                    {visibleLinks.map((link) => (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${!link.enabled ? 'border-gray-200 opacity-60' : 'border-gray-100'}`}
                      >
                        <div className="flex items-start gap-1 p-4">
                          <div className="mt-1 text-gray-300 cursor-grab hover:text-gray-400 p-1">
                            <GripVertical size={16} />
                          </div>
                          {link.thumbnail && (
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 mr-2">
                              <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                value={link.title}
                                onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                placeholder="Title"
                                className="flex-1 text-sm font-semibold text-gray-900 placeholder-gray-300 bg-transparent focus:outline-none"
                              />
                              <button
                                onClick={() => setEditingLinkId(editingLinkId === link.id ? null : link.id)}
                                className={`p-1 transition-colors ${editingLinkId === link.id ? 'text-purple-500' : 'text-gray-300 hover:text-gray-500'}`}
                              >
                                <Pencil size={13} />
                              </button>
                            </div>
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                              placeholder="URL"
                              className="w-full text-xs text-gray-400 placeholder-gray-300 bg-transparent focus:outline-none"
                            />
                            {/* Expanded edit area */}
                            <AnimatePresence>
                              {editingLinkId === link.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-gray-100 space-y-2 overflow-hidden"
                                >
                                  <label className="block text-[11px] text-gray-400">Title</label>
                                  <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
                                  />
                                  <label className="block text-[11px] text-gray-400">URL</label>
                                  <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
                                  />
                                  <label className="block text-[11px] text-gray-400">Button Color</label>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {linkColors.map((c) => (
                                      <button
                                        key={c.id}
                                        onClick={() => updateLink(link.id, 'color', c.value)}
                                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${link.color === c.value ? 'border-gray-900 scale-110' : 'border-gray-200 hover:border-gray-300'}`}
                                        style={{ backgroundColor: c.value || '#f3f4f6' }}
                                        title={c.label}
                                      >
                                        {link.color === c.value && <Check size={12} className="text-gray-600" />}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            {/* Toggle */}
                            <button
                              onClick={() => toggleLink(link.id)}
                              className={`relative w-10 h-6 rounded-full transition-colors ${link.enabled ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                            >
                              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${link.enabled ? 'translate-x-[18px]' : 'translate-x-0.5'
                                }`} />
                            </button>
                          </div>
                        </div>
                        {/* Card footer */}
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 border-t border-gray-50">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => { setImageTargetLinkId(link.id); linkImageInputRef.current?.click(); }}
                              className="text-gray-300 hover:text-gray-500 transition-colors"
                              title="Add thumbnail"
                            >
                              <Image size={14} />
                            </button>
                            <button
                              onClick={() => showToast(`${link.clicks || 0} clicks`)}
                              className="flex items-center gap-1 text-gray-300 hover:text-gray-500 transition-colors"
                              title="View stats"
                            >
                              <BarChart3 size={14} />
                              {(link.clicks ?? 0) > 0 && <span className="text-[10px] text-gray-400">{link.clicks}</span>}
                            </button>
                          </div>
                          <button
                            onClick={() => removeLink(link.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Tabs: Add links / Settings */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex">
                    {(['add', 'settings'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMainTab(tab)}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mainTab === tab
                          ? 'border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        {tab === 'add' ? 'Add links' : 'Settings'}
                      </button>
                    ))}
                  </div>
                </div>

                {mainTab === 'settings' ? (
                  <div className="space-y-6 pb-10">
                    {/* Themes */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Palette size={16} /> Themes
                      </h2>
                      <div className="grid grid-cols-3 gap-3">
                        {(showAllThemes ? themes : themes.slice(0, 6)).map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTheme(t.id)}
                            className={`relative p-1 rounded-2xl border-2 transition-all ${selectedTheme === t.id ? 'border-gray-900' : 'border-transparent hover:border-gray-200'
                              }`}
                          >
                            <div className={`h-20 rounded-xl ${t.bg} flex items-center justify-center`}>
                              <div className="space-y-1.5">
                                <div className="w-6 h-6 rounded-full bg-white/30 mx-auto" />
                                <div className="w-12 h-1.5 rounded-full bg-white/30" />
                                <div className="w-10 h-1.5 rounded-full bg-white/20" />
                              </div>
                            </div>
                            <span className="block text-[11px] font-medium text-gray-500 mt-1.5 text-center">{t.label}</span>
                            {selectedTheme === t.id && (
                              <motion.div layoutId="themeCheck" className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                                <Check size={11} className="text-white" />
                              </motion.div>
                            )}
                          </button>
                        ))}
                        {/* Custom theme tile - always visible */}
                        {showAllThemes && (
                          <button
                            onClick={() => setSelectedTheme('custom')}
                            className={`relative p-1 rounded-2xl border-2 transition-all ${isCustom ? 'border-gray-900' : 'border-transparent hover:border-gray-200'}`}
                          >
                            <div className="h-20 rounded-xl flex items-center justify-center" style={customTheme.bgStyle}>
                              <div className="space-y-1.5">
                                <div className="w-6 h-6 rounded-full bg-white/30 mx-auto" />
                                <div className="w-12 h-1.5 rounded-full bg-white/30" />
                                <div className="w-10 h-1.5 rounded-full bg-white/20" />
                              </div>
                            </div>
                            <span className="block text-[11px] font-medium text-gray-500 mt-1.5 text-center">Custom</span>
                            {isCustom && (
                              <motion.div layoutId="themeCheck" className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                                <Check size={11} className="text-white" />
                              </motion.div>
                            )}
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => setShowAllThemes(!showAllThemes)}
                        className="w-full mt-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <ChevronDown size={14} className={`transition-transform ${showAllThemes ? 'rotate-180' : ''}`} />
                        {showAllThemes ? 'Show less' : `Show all (${themes.length + 1})`}
                      </button>

                      {/* Custom color picker */}
                      <AnimatePresence>
                        {isCustom && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                              <div className="flex items-center gap-3">
                                <label className="text-xs font-medium text-gray-600 w-24">Primary</label>
                                <input
                                  type="color"
                                  value={customBgColor}
                                  onChange={(e) => setCustomBgColor(e.target.value)}
                                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 p-0.5"
                                />
                                <span className="text-xs text-gray-400 font-mono">{customBgColor}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <label className="text-xs font-medium text-gray-600 w-24">Secondary</label>
                                <input
                                  type="color"
                                  value={customBgSecondary}
                                  onChange={(e) => setCustomBgSecondary(e.target.value)}
                                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 p-0.5"
                                />
                                <span className="text-xs text-gray-400 font-mono">{customBgSecondary}</span>
                              </div>
                              <p className="text-[10px] text-gray-400">สีตัวอักษรและการ์ดจะปรับอัตโนมัติตามความสว่างของ background</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Background Pattern */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Grid3x3 size={16} /> Background Pattern
                      </h2>
                      <div className="grid grid-cols-5 gap-2">
                        {bgPatterns.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPattern(p.id)}
                            className={`relative p-1 rounded-xl border-2 transition-all ${selectedPattern === p.id ? 'border-gray-900' : 'border-transparent hover:border-gray-200'}`}
                          >
                            <div
                              className="h-12 rounded-lg bg-gray-100"
                              style={p.id !== 'none' ? p.style : undefined}
                            />
                            <span className="block text-[10px] font-medium text-gray-500 mt-1 text-center">{p.label}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2">ลายจะแสดงทับ background ของธีมใน Preview</p>
                    </div>

                    {/* Button Style */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Type size={16} /> Button Style
                      </h2>
                      <div className="grid grid-cols-5 gap-2">
                        {buttonStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedButton(style.id)}
                            className={`p-3 rounded-xl border-2 transition-all ${selectedButton === style.id ? 'border-gray-900' : 'border-gray-100 hover:border-gray-200'
                              }`}
                          >
                            <div className={`h-7 bg-gray-300 ${style.cls} mb-1.5`} />
                            <span className="text-[10px] font-medium text-gray-500">{style.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Type size={16} /> Font
                      </h2>
                      <div className="grid grid-cols-3 gap-3">
                        {fontOptions.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setSelectedFont(f.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedFont === f.id ? 'border-gray-900' : 'border-gray-100 hover:border-gray-200'
                              }`}
                          >
                            <span className={`text-lg ${f.cls} text-gray-700`}>Aa</span>
                            <span className="block text-[11px] font-medium text-gray-400 mt-1">{f.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Social Icons */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Globe size={16} /> Social Icons
                      </h2>
                      <div className="grid grid-cols-4 gap-2">
                        {socialPlatforms.map((p) => {
                          const isActive = activeSocials.includes(p.id);
                          return (
                            <button
                              key={p.id}
                              onClick={() => toggleSocial(p.id)}
                              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                }`}
                            >
                              <p.icon size={18} />
                              <span className="text-[10px] font-medium">{p.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Add links tab - suggestion cards */
                  <div className="grid grid-cols-2 gap-3 pb-10">
                    {[
                      { icon: ExternalLink, label: 'Link', desc: 'Add a URL' },
                      { icon: Image, label: 'Header', desc: 'Add a text header' },
                      { icon: Music2, label: 'Music', desc: 'Embed a song' },
                      { icon: Youtube, label: 'Video', desc: 'Embed a video' },
                      { icon: DollarSign, label: 'Store', desc: 'Sell products' },
                      { icon: Calendar, label: 'Event', desc: 'Promote events' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => addLink(item.label)}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-[11px] text-gray-400">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>}
            </div>

            {/* ── Live Preview (desktop) ── */}
            <div className="hidden xl:block w-[340px] flex-shrink-0 p-6">
              <div className="sticky top-36">
                {/* Preview header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handleCopyUrl}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xs text-gray-400">linktr.ee/</span>
                    <span className="text-xs font-semibold text-gray-900">{displayName || 'username'}</span>
                    {copied ? <CheckCircle2 size={12} className="text-green-500 ml-1" /> : <Copy size={12} className="text-gray-300 ml-1" />}
                  </button>
                </div>

                {/* Phone Frame */}
                <div className="mx-auto w-[280px]">
                  <div className="rounded-[2.5rem] bg-white p-2 shadow-xl shadow-gray-200/80 border border-gray-100">
                    <div className="relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-white rounded-b-2xl z-10" />
                    </div>
                    <div
                      className={`rounded-[2.3rem] overflow-hidden ${!isCustom ? theme.bg : ''} min-h-[460px] flex flex-col ${fontStyle.cls} relative`}
                      style={isCustom ? customTheme.bgStyle : undefined}
                    >
                      {/* Pattern overlay */}
                      {selectedPattern !== 'none' && (
                        <div
                          className="absolute inset-0 pointer-events-none z-0 rounded-[2.3rem]"
                          style={bgPatterns.find((p) => p.id === selectedPattern)?.style}
                        />
                      )}
                      {/* OpenBio logo */}
                      <div className="pt-3 flex justify-center relative z-[1]">
                        <span className={`text-xs ${!isCustom ? theme.text : ''} opacity-20`} style={isCustom ? { color: customTheme.textColor } : undefined}>OpenBio</span>
                      </div>

                      {/* Profile */}
                      <div className="pt-4 pb-3 flex flex-col items-center px-6 relative z-[1]">
                        <div className="w-[68px] h-[68px] rounded-full bg-gray-300/20 flex items-center justify-center mb-2.5 overflow-hidden">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <User size={22} className={`${!isCustom ? theme.text : ''} opacity-25`} style={isCustom ? { color: customTheme.textColor } : undefined} />
                          )}
                        </div>
                        <h3 className={`font-bold text-sm ${!isCustom ? theme.text : ''}`} style={isCustom ? { color: customTheme.textColor } : undefined}>
                          {displayName || 'username'}
                        </h3>
                        {bio && (
                          <p className={`text-[11px] mt-0.5 ${!isCustom ? theme.subtext : ''} text-center`} style={isCustom ? { color: customTheme.subtextColor } : undefined}>{bio}</p>
                        )}
                      </div>

                      {/* Social Row */}
                      {activeSocials.length > 0 && (
                        <div className="px-5 pb-3 flex items-center justify-center gap-3 relative z-[1]">
                          {activeSocials.map((id) => {
                            const p = socialPlatforms.find((s) => s.id === id);
                            if (!p) return null;
                            return (
                              <div key={id} className={`w-7 h-7 rounded-full ${!isCustom ? theme.card : ''} flex items-center justify-center`} style={isCustom ? customTheme.cardStyle : undefined}>
                                <p.icon size={12} className={`${!isCustom ? theme.text : ''} opacity-50`} style={isCustom ? { color: customTheme.textColor } : undefined} />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Links */}
                      <div className="px-4 pb-4 space-y-2 flex-1 relative z-[1]">
                        {links.filter((l) => l.title && l.enabled).length === 0 && (
                          <div className={`text-center py-6 ${!isCustom ? theme.text : ''} opacity-15`} style={isCustom ? { color: customTheme.textColor } : undefined}>
                            <ExternalLink size={20} className="mx-auto mb-1.5" />
                            <p className="text-[10px]">Add links above</p>
                          </div>
                        )}
                        {links
                          .filter((l) => l.title && l.enabled)
                          .map((link) => (
                            <motion.div
                              key={link.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`${!link.color && !isCustom ? `${theme.card} ${theme.cardBorder}` : ''} ${btnStyle.cls} px-4 py-2.5 text-center relative z-[1]`}
                              style={link.color
                                ? { backgroundColor: link.color, border: '1px solid rgba(0,0,0,0.06)' }
                                : isCustom ? customTheme.cardStyle : undefined
                              }
                            >
                              <span className={`text-[11px] font-medium ${!link.color && !isCustom ? theme.text : ''}`} style={link.color ? { color: '#374151' } : isCustom ? { color: customTheme.textColor } : undefined}>{link.title}</span>
                            </motion.div>
                          ))}
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
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => { setAddModalOpen(false); setAddModalSearch(''); }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 sm:inset-auto sm:top-[10%] sm:left-1/2 sm:-translate-x-1/2 sm:w-[680px] sm:max-h-[75vh] bg-white rounded-2xl z-50 flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <h2 className="text-lg font-bold text-gray-900">Add</h2>
                <button
                  onClick={() => { setAddModalOpen(false); setAddModalSearch(''); }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-purple-400 transition-colors">
                  <Search size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={addModalSearch}
                    onChange={(e) => setAddModalSearch(e.target.value)}
                    placeholder="Paste or search a link"
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
                      View all
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
                        showToast('Link added!');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 mb-4 bg-purple-50 rounded-xl hover:bg-purple-100 border border-purple-100 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                        <Link2 size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-700">Add as link</p>
                        <p className="text-[11px] text-purple-400 truncate">{addModalSearch}</p>
                      </div>
                      <Plus size={18} className="text-purple-400" />
                    </button>
                  )}

                  {/* Suggested Label */}
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {showAllCategories ? 'All items' : addModalCategory === 'suggested' ? 'Suggested' : addCategories.find(c => c.id === addModalCategory)?.label}
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
                          <p className="text-sm text-gray-400">No items found</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-green-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
