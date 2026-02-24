import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Link2, BarChart3, Palette, Globe, QrCode,
  Zap, DollarSign, Instagram, Youtube, Twitter, Music2,
  Facebook, Linkedin, Paintbrush, TrendingUp, Check,
} from 'lucide-react';

// ── Trusted By logos ──
const trustedBy = [
  'Spotify', 'YouTube', 'TikTok', 'Instagram', 'Shopify', 'Twitch',
];

// ── Mini Bar Chart ──
function MiniBarChart() {
  const bars = [
    { h: 'h-8', color: 'bg-[#3CC8DB]' },
    { h: 'h-14', color: 'bg-[#4DC89F]' },
    { h: 'h-6', color: 'bg-[#3CC8DB]' },
    { h: 'h-18', color: 'bg-[#5BBD6B]' },
    { h: 'h-10', color: 'bg-[#4DC89F]' },
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

// ── Mini Phone Mockup for Customize card ──
function MiniPhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="w-[140px] mx-auto"
    >
      <div className="rounded-[1.2rem] bg-white/10 p-1.5 border border-white/10">
        <div className="rounded-[0.9rem] overflow-hidden bg-gradient-to-b from-[#3CC8DB]/30 to-[#5BBD6B]/30 py-4 px-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3CC8DB] to-[#5BBD6B] mx-auto mb-2" />
          <div className="w-14 h-1.5 bg-white/40 rounded-full mx-auto mb-1" />
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />
          {/* Links */}
          <div className="space-y-1.5">
            <div className="h-5 bg-white/20 rounded-lg" />
            <div className="h-5 bg-white/15 rounded-lg" />
            <div className="h-5 bg-white/10 rounded-lg" />
          </div>
          {/* Social */}
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ══════ Hero Section ══════ */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20">
        {/* Background gradient blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#3CC8DB]/15 to-[#5BBD6B]/15 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6"
          >
            Everything starts with your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3CC8DB] to-[#5BBD6B]">
              OpenBio
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            One link to share everything you create, curate, and sell from your
            Instagram, TikTok, Twitter, and beyond.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3CC8DB] to-[#5BBD6B] text-white font-bold text-base rounded-full hover:shadow-lg hover:shadow-[#3CC8DB]/25 transition-all"
            >
              Get started for free <ArrowRight size={18} />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold text-base rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Browse templates
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════ Trusted By ══════ */}
      <section className="bg-gray-50 border-y border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 sm:gap-14 overflow-hidden">
          {trustedBy.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="text-gray-400 text-sm font-semibold tracking-wide uppercase whitespace-nowrap"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ══════ Bento Grid ══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Everything you need,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3CC8DB] to-[#5BBD6B]">
                one platform
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Powerful features to help you grow your audience, monetize your content, and build your brand.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

            {/* Card A - All Your Links (2 col, brand gradient) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0 }}
              className="md:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-[#3CC8DB] to-[#5BBD6B] p-7 lg:p-8 min-h-[260px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">All Your Links, One Place</h3>
                  <p className="text-white/70 text-sm">Share everything you create with a single link in your bio.</p>
                </div>
                <Link2 size={28} className="text-white/50 flex-shrink-0" />
              </div>
              {/* Mini link mockup */}
              <div className="mt-auto bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="h-8 bg-white/30 rounded-xl flex items-center px-3">
                    <div className="w-3 h-3 rounded-full bg-white/60 mr-2" />
                    <div className="w-20 h-2 bg-white/50 rounded-full" />
                  </div>
                  <div className="h-8 bg-white/20 rounded-xl flex items-center px-3">
                    <div className="w-3 h-3 rounded-full bg-white/50 mr-2" />
                    <div className="w-24 h-2 bg-white/40 rounded-full" />
                  </div>
                  <div className="h-8 bg-white/15 rounded-xl flex items-center px-3">
                    <div className="w-3 h-3 rounded-full bg-white/40 mr-2" />
                    <div className="w-16 h-2 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card B - Analytics (1 col, dark) */}
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

            {/* Card C - Templates (1 col, white) */}
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
              {/* Overlapping template cards */}
              <div className="relative mt-auto h-24 flex items-end justify-center">
                <div className="absolute w-16 h-20 rounded-xl bg-gradient-to-b from-[#f093fb] to-[#f5576c] shadow-md -rotate-6 left-1/2 -translate-x-10" />
                <div className="absolute w-16 h-20 rounded-xl bg-gradient-to-b from-[#667eea] to-[#764ba2] shadow-md rotate-3 left-1/2 -translate-x-3" />
                <div className="absolute w-16 h-20 rounded-xl bg-gradient-to-b from-[#3CC8DB] to-[#5BBD6B] shadow-md rotate-0 left-1/2 translate-x-4" />
              </div>
            </motion.div>

            {/* Card D - Custom Domains (1 col, light green) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-[#f0fdf4] p-6 min-h-[260px] flex flex-col"
            >
              <Globe size={24} className="text-[#5BBD6B] mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">Custom Domains</h3>
              <p className="text-gray-500 text-sm">Use your own branded URL for your page.</p>
              {/* URL bar mockup */}
              <div className="mt-auto">
                <div className="bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
                  <Check size={14} className="text-[#5BBD6B]" />
                  <span className="text-sm font-medium text-gray-700">yourname.bio</span>
                </div>
              </div>
            </motion.div>

            {/* Card E - Social Integration (1 col, white) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 p-6 min-h-[260px] flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Social Integration</h3>
              <p className="text-gray-500 text-sm mb-4">Connect all your platforms seamlessly.</p>
              {/* Social icons grid */}
              <div className="grid grid-cols-3 gap-2 mt-auto">
                {[
                  { Icon: Instagram, bg: 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', color: 'text-white' },
                  { Icon: Youtube, bg: 'bg-red-500', color: 'text-white' },
                  { Icon: Twitter, bg: 'bg-sky-500', color: 'text-white' },
                  { Icon: Music2, bg: 'bg-black', color: 'text-white' },
                  { Icon: Facebook, bg: 'bg-[#1877F2]', color: 'text-white' },
                  { Icon: Linkedin, bg: 'bg-[#0A66C2]', color: 'text-white' },
                ].map(({ Icon, bg, color }, i) => (
                  <div key={i} className={`w-full aspect-square rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={18} className={color} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card F - QR Code (2 col, gray) */}
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

            {/* Card G - Customize (2 col, 2 row, dark) */}
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
              {/* Color swatches */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {['#3CC8DB', '#5BBD6B', '#f093fb', '#667eea', '#f5576c', '#fbbf24'].map((c) => (
                  <div
                    key={c}
                    className="w-5 h-5 rounded-full ring-2 ring-white/10"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Card H - Monetization (2 col, amber) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.56 }}
              className="md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50 p-7 min-h-[220px] lg:min-h-[260px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <DollarSign size={28} className="text-amber-600 mb-2" />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Monetization Tools</h3>
                  <p className="text-gray-500 text-sm">Accept tips, sell products, and grow your revenue.</p>
                </div>
              </div>
              {/* Revenue display */}
              <div className="mt-auto flex items-end gap-3">
                <span className="text-4xl font-extrabold text-gray-900">$1,284</span>
                <div className="flex items-center gap-1 text-[#5BBD6B] mb-1.5">
                  <TrendingUp size={16} />
                  <span className="text-sm font-semibold">+24%</span>
                </div>
              </div>
            </motion.div>

            {/* Card I - Lightning Fast (2 col, white) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.64 }}
              className="md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 p-7 min-h-[220px] lg:min-h-[260px] flex flex-col"
            >
              <Zap size={28} className="text-[#3CC8DB] mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">Lightning Fast</h3>
              <p className="text-gray-500 text-sm mb-6">Your page loads in under 300ms. Every millisecond counts.</p>
              {/* Speed gauge */}
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>0ms</span>
                  <span className="text-[#3CC8DB] font-bold text-sm">297ms</span>
                  <span>1000ms</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#3CC8DB] to-[#5BBD6B] rounded-full"
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

      {/* ══════ Stats ══════ */}
      <section className="py-24 bg-gradient-to-r from-[#3CC8DB]/5 to-[#5BBD6B]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '70M+', label: 'Users worldwide' },
              { value: '1.2B+', label: 'Monthly link clicks' },
              { value: '30+', label: 'Integrations' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={i < 2 ? 'sm:border-r sm:border-gray-200' : ''}
              >
                <div className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3CC8DB] to-[#5BBD6B] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
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
            className="rounded-3xl bg-gradient-to-br from-[#3CC8DB] to-[#5BBD6B] p-12 sm:p-16 text-center"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Ready to build your OpenBio?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Join 70M+ people already on board. Create your page in seconds — it's free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get started for free <ArrowRight size={18} />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-colors"
              >
                Browse templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ Footer ══════ */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-black font-bold text-xl">
              <img src="/openbio.png" alt="OpenBio" className="w-7 h-7 object-contain" />
              OpenBio
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
            <span>&copy; 2026 OpenBio. All rights reserved.</span>
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
