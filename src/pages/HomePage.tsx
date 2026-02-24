import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Instagram, Music2, Youtube, Twitter,
  Headphones, Play, Facebook, QrCode, User,
} from 'lucide-react';

// ── Phone Mockup Component ──
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-[260px] sm:w-[280px]"
    >
      {/* Phone Frame */}
      <div className="rounded-[2.5rem] bg-white p-2.5 shadow-xl shadow-gray-200/80 border border-gray-100">
        {/* Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-white rounded-b-2xl z-10" />
        <div className="rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
          {/* Profile Section */}
          <div className="pt-12 pb-5 flex flex-col items-center">
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden ring-2 ring-white/10 mb-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white font-bold text-base tracking-tight">@billie</h3>
            <p className="text-white/40 text-[11px] mt-0.5">Creative director & photographer</p>
          </div>

          {/* Links */}
          <div className="px-4 pb-3 space-y-2">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
              <Headphones size={15} className="text-gray-700" />
              <span className="text-gray-800 text-xs font-medium">Fall reading list</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3">
              <Zap size={15} className="text-white/70" />
              <span className="text-white/80 text-xs font-medium">Swell report</span>
            </div>
          </div>

          {/* Video Card */}
          <div className="px-4 pb-5">
            <div className="rounded-xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"
                alt="Video"
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={14} className="text-gray-800 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-3">
                <span className="text-white text-[10px] font-medium">June on film</span>
              </div>
            </div>
          </div>

          {/* Bottom Social Row */}
          <div className="px-4 pb-5 flex items-center justify-center gap-4">
            {[Instagram, Music2, Youtube].map((Icon, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Icon size={14} className="text-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Trusted By logos ──
const trustedBy = [
  'Spotify', 'YouTube', 'TikTok', 'Instagram', 'Shopify', 'Twitch',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ══════ Hero Section ══════ */}
      <section className="relative overflow-hidden bg-white min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left - Phone Mockup */}
            <div className="flex-shrink-0 flex justify-center">
              <PhoneMockup />
            </div>

            {/* Right - Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Create and customize your Linktree in minutes
              </h1>
              <p className="text-gray-500 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                Connect all your content across social media, websites, stores and more in
                one link in bio. Customize every detail or let Linktree automatically enhance it
                to match your brand and drive more clicks.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#43E660] text-gray-900 font-bold text-base rounded-full hover:bg-[#5AEC74] transition-colors shadow-lg shadow-green-200/50"
                >
                  Get started for free
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ Trusted By ══════ */}
      <section className="bg-white border-y border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 sm:gap-14 overflow-hidden">
          {trustedBy.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="text-gray-400 text-sm font-semibold whitespace-nowrap"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ══════ Share Anywhere Section ══════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-6 italic">
                Share your Linktree anywhere you like!
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                Add your unique Linktree URL to all the platforms and places you find your
                audience. Then use your QR code to drive your offline traffic back to your link
                in bio.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold text-base rounded-full hover:bg-gray-800 transition-colors"
              >
                Get started for free
              </Link>
            </motion.div>

            {/* Right - Stacked Social Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-[340px] sm:w-[400px] h-[320px] sm:h-[360px] flex-shrink-0"
            >
              {/* Card 4 - Blue / Facebook */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute top-0 right-0 w-[180px] sm:w-[200px] h-[140px] sm:h-[160px] rounded-2xl bg-[#1877F2] shadow-xl flex items-start justify-end p-4"
              >
                <Facebook size={32} className="text-white" />
              </motion.div>

              {/* Card 3 - Purple / Instagram */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-[40px] sm:top-[50px] right-[50px] sm:right-[60px] w-[180px] sm:w-[200px] h-[140px] sm:h-[160px] rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C] shadow-xl flex flex-col items-end justify-between p-4"
              >
                <Instagram size={28} className="text-white" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#c8f542] flex items-center justify-center">
                    <User size={14} className="text-gray-800" />
                  </div>
                  <div className="w-6 h-6 rounded bg-white/30 flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Pink / TikTok */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-[90px] sm:top-[110px] right-[100px] sm:right-[120px] w-[180px] sm:w-[200px] h-[140px] sm:h-[160px] rounded-2xl bg-[#ff0050] shadow-xl flex flex-col justify-between p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#c8f542] flex items-center justify-center">
                    <User size={16} className="text-gray-800" />
                  </div>
                  <Music2 size={26} className="text-white" />
                </div>
                <div className="space-y-1.5">
                  <div className="w-16 h-1.5 bg-white/40 rounded-full" />
                  <div className="w-12 h-1.5 bg-white/25 rounded-full" />
                </div>
              </motion.div>

              {/* Card 1 - Gray / Front card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-[140px] sm:top-[160px] right-[140px] sm:right-[170px] w-[200px] sm:w-[220px] h-[150px] sm:h-[170px] rounded-2xl bg-[#4a4a4a] shadow-2xl flex flex-col justify-between p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#c8f542] flex items-center justify-center">
                    <User size={18} className="text-gray-800" />
                  </div>
                  <QrCode size={24} className="text-white/60" />
                </div>
                <div className="space-y-2">
                  <div className="w-20 h-2 bg-white/30 rounded-full" />
                  <div className="w-14 h-2 bg-white/20 rounded-full" />
                </div>
              </motion.div>

              {/* Username badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute bottom-[10px] sm:bottom-[20px] left-[20px] sm:left-[30px] bg-white rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2"
              >
                <span className="text-black font-bold text-lg">*</span>
                <span className="text-gray-800 text-sm font-semibold">/averyclothing</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ CTA Section ══════ */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
              Join 70M+ people using Linktree
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
              The fastest way to create a page that connects all your content. Start for free, upgrade anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#43E660] text-gray-900 font-bold rounded-full hover:bg-[#5AEC74] transition-colors shadow-lg shadow-green-200/50"
              >
                Get started for free <ArrowRight size={18} />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
              >
                Browse templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ Social Proof ══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-3 gap-8 text-center"
          >
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
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ Footer ══════ */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1 text-black font-bold text-xl">
              Linktree<span className="text-2xl">*</span>
            </div>
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, url: 'https://www.instagram.com/linktree/' },
                { Icon: Music2, url: 'https://www.tiktok.com/@linktree' },
                { Icon: Twitter, url: 'https://twitter.com/Linktree_' },
                { Icon: Youtube, url: 'https://www.youtube.com/@linktree' },
              ].map(({ Icon, url }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>&copy; 2026 Linktree. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="https://linktr.ee/s/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="https://linktr.ee/s/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="https://linktr.ee/s/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
