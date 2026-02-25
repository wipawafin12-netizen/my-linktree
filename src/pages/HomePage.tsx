import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  ArrowRight, Link2, BarChart3, Palette, Globe, QrCode,
  Zap, DollarSign, Instagram, Youtube, Twitter, Music2,
  Facebook, Linkedin, Paintbrush, TrendingUp, Check,
  Users, MousePointerClick, Star, Shield, Layers, Sparkles,
} from 'lucide-react';

// ── Trusted By logos ──
const trustedBy = [
  'Spotify', 'YouTube', 'TikTok', 'Instagram', 'Shopify', 'Twitch',
];

// ── Animated Counter ──
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (target >= 1000000) return (v / 1000000).toFixed(1) + 'M';
    if (target >= 1000) return Math.round(v / 1000) + 'K';
    return Math.round(v).toString();
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(count, target, { duration: 2, ease: 'easeOut' });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ── Mini Bar Chart ──
function MiniBarChart() {
  const bars = [
    { h: 'h-8', color: 'bg-[#6b6b70]' },
    { h: 'h-14', color: 'bg-[#4a4a4f]' },
    { h: 'h-6', color: 'bg-[#8a8a8f]' },
    { h: 'h-18', color: 'bg-[#2d2d32]' },
    { h: 'h-10', color: 'bg-[#5a5a5f]' },
  ];
  return (
    <div className="flex items-end gap-2 mt-auto">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className={`w-5 rounded-t-md ${bar.h} ${bar.color}`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}

// ── Hero Phone Mockup ──
function HeroPhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative"
    >
      {/* Glow behind phone */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent blur-3xl scale-110 -z-10" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[220px] sm:w-[260px] mx-auto"
      >
        <div className="rounded-[2rem] bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl shadow-black/30 border border-white/10">
          {/* Notch */}
          <div className="w-20 h-5 bg-black rounded-full mx-auto -mt-0.5 mb-2" />
          <div className="rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-6 px-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mx-auto mb-3 ring-2 ring-white/20" />
            <div className="w-20 h-2 bg-white/50 rounded-full mx-auto mb-1.5" />
            <div className="w-14 h-1.5 bg-white/25 rounded-full mx-auto mb-5" />
            {/* Links */}
            <div className="space-y-2.5">
              {['bg-white/15', 'bg-cyan-500/20', 'bg-white/10', 'bg-blue-500/15'].map((bg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                  className={`h-8 ${bg} rounded-xl border border-white/10 flex items-center px-3`}
                >
                  <div className="w-3 h-3 rounded-full bg-white/30 mr-2" />
                  <div className={`h-1.5 bg-white/30 rounded-full`} style={{ width: `${50 + i * 10}%` }} />
                </motion.div>
              ))}
            </div>
            {/* Social */}
            <div className="flex justify-center gap-3 mt-5">
              {[Instagram, Youtube, Twitter, Music2].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + i * 0.1, type: 'spring' }}
                >
                  <Icon size={14} className="text-white/40" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute -left-8 sm:-left-16 top-16 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp size={14} className="text-green-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">+1,847</div>
            <div className="text-[10px] text-gray-400">clicks today</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute -right-6 sm:-right-14 bottom-24 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Users size={14} className="text-purple-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">12.4K</div>
            <div className="text-[10px] text-gray-400">followers</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Mini Phone Mockup for Customize card ──
function MiniPhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="w-[140px] mx-auto"
    >
      <div className="rounded-[1.2rem] bg-white/10 p-1.5 border border-white/10">
        <div className="rounded-[0.9rem] overflow-hidden bg-gradient-to-b from-white/10 to-white/5 py-4 px-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#555] to-[#333] mx-auto mb-2" />
          <div className="w-14 h-1.5 bg-white/40 rounded-full mx-auto mb-1" />
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />
          <div className="space-y-1.5">
            <div className="h-5 bg-white/20 rounded-lg" />
            <div className="h-5 bg-white/15 rounded-lg" />
            <div className="h-5 bg-white/10 rounded-lg" />
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-white/15" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Marquee ──
function InfiniteMarquee() {
  const items = ['Creators', 'Influencers', 'Musicians', 'Designers', 'Developers', 'Photographers', 'Entrepreneurs', 'Artists', 'Coaches', 'Streamers'];
  return (
    <div className="overflow-hidden py-4">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="px-5 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium border border-gray-200"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* ══════ Hero Section ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-28 pb-10">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Floating gradient orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-cyan-200/20 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-blue-200/15 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left - Text */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-semibold mb-7"
              >
                <Sparkles size={12} />
                Trusted by 70M+ creators worldwide
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6"
              >
                Everything starts
                <br />
                with your{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                    LinkCenter
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              >
                One link to share everything you create, curate, and sell from your
                Instagram, TikTok, Twitter, and beyond.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              >
                <Link
                  to="/create"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold text-base rounded-full hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-300"
                >
                  Get started for free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold text-base rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                  Browse templates
                </Link>
              </motion.div>

              {/* Mini social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-3 mt-8 justify-center lg:justify-start"
              >
                <div className="flex -space-x-2">
                  {['bg-cyan-400', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'].map((bg, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">4,000+</span> joined this week
                </div>
              </motion.div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="flex justify-center">
              <HeroPhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ Marquee ══════ */}
      <section className="border-y border-gray-100 bg-white py-2">
        <InfiniteMarquee />
      </section>

      {/* ══════ How It Works ══════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Get started in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">3 simple steps</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Create your page in under 60 seconds. No coding required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Layers,
                title: 'Claim your link',
                desc: 'Sign up and grab your unique linkc.ee/yourname URL.',
              },
              {
                step: '02',
                icon: Paintbrush,
                title: 'Customize your page',
                desc: 'Choose a template, add your links, and make it yours.',
              },
              {
                step: '03',
                icon: Zap,
                title: 'Share everywhere',
                desc: 'Drop your link in your bio and start driving traffic.',
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-6xl font-extrabold text-gray-100 absolute top-4 right-6 group-hover:text-gray-200 transition-colors">
                  {step}
                </div>
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-5">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ Bento Grid ══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Everything you need,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                one platform
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Powerful features to help you grow your audience, monetize your content, and build your brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

            {/* Card A - All Your Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0 }}
              className="md:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d32] p-7 lg:p-8 min-h-[260px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">All Your Links, One Place</h3>
                  <p className="text-white/50 text-sm">Share everything you create with a single link in your bio.</p>
                </div>
                <Link2 size={28} className="text-white/30 flex-shrink-0" />
              </div>
              <div className="mt-auto bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="space-y-2">
                  {[15, 10, 8].map((opacity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className={`h-8 bg-white/${opacity} rounded-xl flex items-center px-3`}
                    >
                      <div className="w-3 h-3 rounded-full bg-white/30 mr-2" />
                      <div className={`h-2 bg-white/25 rounded-full`} style={{ width: `${70 - i * 15}%` }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card B - Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gray-900 p-6 min-h-[260px] flex flex-col"
            >
              <BarChart3 size={24} className="text-white mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Real-Time Analytics</h3>
              <p className="text-white/50 text-sm">Track clicks, views, and audience insights.</p>
              <MiniBarChart />
            </motion.div>

            {/* Card C - Templates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 p-6 min-h-[260px] flex flex-col"
            >
              <Palette size={24} className="text-gray-700 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">Beautiful Templates</h3>
              <p className="text-gray-500 text-sm">Pick from dozens of stunning designs.</p>
              <div className="relative mt-auto h-24 flex items-end justify-center">
                {[
                  { gradient: 'from-[#f093fb] to-[#f5576c]', rotate: '-rotate-6', tx: '-translate-x-10' },
                  { gradient: 'from-[#667eea] to-[#764ba2]', rotate: 'rotate-3', tx: '-translate-x-3' },
                  { gradient: 'from-cyan-500 to-blue-600', rotate: 'rotate-0', tx: 'translate-x-4' },
                ].map(({ gradient, rotate, tx }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className={`absolute w-16 h-20 rounded-xl bg-gradient-to-b ${gradient} shadow-md ${rotate} left-1/2 ${tx}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Card D - Custom Domains */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gray-50 p-6 min-h-[260px] flex flex-col"
            >
              <Globe size={24} className="text-gray-900 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">Custom Domains</h3>
              <p className="text-gray-500 text-sm">Use your own branded URL for your page.</p>
              <div className="mt-auto">
                <div className="bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
                  <Check size={14} className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">yourname.bio</span>
                </div>
              </div>
            </motion.div>

            {/* Card E - Social Integration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 p-6 min-h-[260px] flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Social Integration</h3>
              <p className="text-gray-500 text-sm mb-4">Connect all your platforms seamlessly.</p>
              <div className="grid grid-cols-3 gap-2 mt-auto">
                {[
                  { Icon: Instagram, bg: 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', color: 'text-white' },
                  { Icon: Youtube, bg: 'bg-red-500', color: 'text-white' },
                  { Icon: Twitter, bg: 'bg-sky-500', color: 'text-white' },
                  { Icon: Music2, bg: 'bg-black', color: 'text-white' },
                  { Icon: Facebook, bg: 'bg-[#1877F2]', color: 'text-white' },
                  { Icon: Linkedin, bg: 'bg-[#0A66C2]', color: 'text-white' },
                ].map(({ Icon, bg, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05, type: 'spring' }}
                    className={`w-full aspect-square rounded-xl ${bg} flex items-center justify-center`}
                  >
                    <Icon size={18} className={color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Card F - QR Code */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gray-50 border border-gray-100 p-7 min-h-[220px] flex items-center"
            >
              <div className="flex-1">
                <QrCode size={28} className="text-gray-700 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">QR Code Sharing</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Drive offline traffic online. Generate a unique QR code for your page instantly.
                </p>
              </div>
              <div className="flex-shrink-0 ml-6">
                <QrCode size={100} className="text-gray-200" strokeWidth={1} />
              </div>
            </motion.div>

            {/* Card G - Customize */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-b from-gray-900 to-gray-800 p-7 lg:p-8 min-h-[440px] lg:min-h-[530px] flex flex-col"
            >
              <Paintbrush size={28} className="text-white/60 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Customize Everything</h3>
              <p className="text-white/50 text-sm max-w-xs mb-6">
                Fonts, colors, layouts, buttons — make your page truly yours with complete creative control.
              </p>
              <div className="mt-auto">
                <MiniPhoneMockup />
              </div>
              <div className="flex items-center justify-center gap-2 mt-5">
                {['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#eab308'].map((c) => (
                  <motion.div
                    key={c}
                    whileHover={{ scale: 1.3 }}
                    className="w-5 h-5 rounded-full ring-2 ring-white/10 cursor-pointer"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Card H - Monetization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.56 }}
              className="md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gray-50 border border-gray-100 p-7 min-h-[220px] lg:min-h-[260px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <DollarSign size={28} className="text-gray-700 mb-2" />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Monetization Tools</h3>
                  <p className="text-gray-500 text-sm">Accept tips, sell products, and grow your revenue.</p>
                </div>
              </div>
              <div className="mt-auto flex items-end gap-3">
                <span className="text-4xl font-extrabold text-gray-900">$1,284</span>
                <div className="flex items-center gap-1 text-green-600 mb-1.5">
                  <TrendingUp size={16} />
                  <span className="text-sm font-semibold">+24%</span>
                </div>
              </div>
            </motion.div>

            {/* Card I - Lightning Fast */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.64 }}
              className="md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 p-7 min-h-[220px] lg:min-h-[260px] flex flex-col"
            >
              <Zap size={28} className="text-gray-900 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">Lightning Fast</h3>
              <p className="text-gray-500 text-sm mb-6">Your page loads in under 300ms. Every millisecond counts.</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>0ms</span>
                  <span className="text-gray-900 font-bold text-sm">297ms</span>
                  <span>1000ms</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '30%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════ Testimonials ══════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">creators</span> everywhere
            </h2>
            <p className="text-gray-500 text-lg">See what our community has to say.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', role: 'Content Creator', text: 'LinkCenter completely changed how I share my content. My engagement went up 300% in the first month!', avatar: 'bg-pink-400' },
              { name: 'Alex K.', role: 'Musician', text: 'The templates are gorgeous and the analytics are incredibly helpful. Best link-in-bio tool I\'ve ever used.', avatar: 'bg-cyan-400' },
              { name: 'Priya R.', role: 'Small Business Owner', text: 'Setting up my shop through LinkCenter was so easy. I\'m already seeing more sales from social media traffic.', avatar: 'bg-purple-400' },
            ].map(({ name, role, text, avatar }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatar}`} />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA Banner ══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 sm:p-16 text-center relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                Ready to build your LinkCenter?
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
                Join 70M+ people already on board. Create your page in seconds — it's free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/create"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get started for free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-colors"
                >
                  Browse templates
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ Footer ══════ */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/linkcenter.png" alt="LinkCenter" className="h-8" />
            </div>
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, url: 'https://www.instagram.com/openbio/' },
                { Icon: Music2, url: 'https://www.tiktok.com/@openbio' },
                { Icon: Twitter, url: 'https://twitter.com/OpenBio_' },
                { Icon: Youtube, url: 'https://www.youtube.com/@openbio' },
              ].map(({ Icon, url }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>&copy; 2026 LinkCenter. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
