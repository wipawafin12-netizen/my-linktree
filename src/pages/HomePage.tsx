import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Link2, Zap, Paintbrush, ArrowUpRight,
  Sparkles, Instagram, Youtube, Twitter, Music2, QrCode,
  Palette,
} from 'lucide-react';

/* ── Floating phone mockup ── */
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      className="relative w-[260px] sm:w-[280px] mx-auto"
      style={{ perspective: 1200 }}                 
    >
      
      {/* Glow behind phone */}
      <div className="absolute -inset-8 bg-gradient-to-b from-violet-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl" />

      {/* Phone frame */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-black/50 border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden bg-gradient-to-b from-violet-600 via-indigo-700 to-purple-900 min-h-[420px]">
          {/* Profile content */}
          <div className="pt-12 pb-6 px-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-3">
              <span className="text-2xl">🎨</span>
            </div>
            <h4 className="text-white font-bold text-sm">Alex Creator</h4>
            <p className="text-white/50 text-[10px] mt-0.5">Digital Artist & Developer</p>

            {/* Social icons */}
            <div className="flex gap-2 mt-3">
              {[Instagram, Youtube, Twitter, Music2].map((Icon, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon size={12} className="text-white/60" />
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="w-full mt-5 space-y-2">
              {['My Portfolio', 'YouTube Channel', 'Latest Project', 'Book a Call'].map((title, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.12 }}
                  className="w-full py-2.5 px-4 bg-white/10 backdrop-blur-sm rounded-xl text-center border border-white/5"
                >
                  <span className="text-white/90 text-[11px] font-medium">{title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function HomePage() {

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 overflow-hidden">
        {/* Aurora mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a20] to-[#050510]" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-40%] left-[-20%] w-[800px] h-[800px] rounded-full opacity-[0.07]"
            style={{ background: 'conic-gradient(from 0deg, #7c3aed, #6366f1, #8b5cf6, #a855f7, #7c3aed)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 left-[15%] w-[600px] h-[400px] rounded-full bg-purple-600/10 blur-[120px]"
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-violet-300 mb-8 backdrop-blur-sm"
              >
                <Sparkles size={12} />
                Trusted by 70M+ creators worldwide
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.06] mb-6"
              >
                Everything you are.
                <br />
                In one{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400">
                  simple link.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                One link to share everything you create, curate, and sell —
                from your Instagram, TikTok, Twitter, and beyond.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
              >
                <Link
                  to="/create"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm rounded-full shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:brightness-110 transition-all duration-300"
                >
                  Get started free
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-gray-300 font-medium text-sm rounded-full border border-white/10 hover:border-violet-500/30 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  Browse templates
                </Link>
              </motion.div>

            </div>

            {/* Right: Phone mockup */}
            <div className="hidden lg:flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>


      {/* ══════ FEATURES BENTO GRID ══════ */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                stand out
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Powerful tools to grow your audience, track performance, and monetize your content.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 group relative rounded-3xl p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.06] hover:border-violet-500/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-all duration-700" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                  <Palette size={22} className="text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Unlimited customization</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                  Choose from 17+ themes, 25+ fonts, custom colors, background patterns, and button styles. Make your page truly yours.
                </p>
                <div className="flex gap-2 mt-6">
                  {['#7c3aed', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((c) => (
                    <div key={c} className="w-8 h-8 rounded-xl" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Small card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-3xl p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                  <QrCode size={22} className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">QR Codes</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Generate beautiful QR codes that link to your page. Download and share anywhere.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Get started in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                3 simple steps
              </span>
            </h2>
            <p className="text-gray-500 text-lg">Create your page in under 60 seconds.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Claim your link', desc: 'Sign up and grab your unique linkc.ee/yourname URL.', icon: Link2 },
              { step: '02', title: 'Make it yours', desc: 'Choose a template, add your links, and customize.', icon: Paintbrush },
              { step: '03', title: 'Share everywhere', desc: 'Drop your link in your bio and start driving traffic.', icon: Zap },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative group rounded-3xl p-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06] hover:border-violet-500/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-6xl font-extrabold text-white/10 absolute top-5 right-6 group-hover:text-violet-500/20 transition-colors duration-300">
                  {step}
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/20">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700" />
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            <div className="relative px-8 sm:px-16 py-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                Ready to build your
                <br />
                LinkCenter?
              </h2>
              <p className="text-white/60 text-lg max-w-lg mx-auto mb-10">
                Join millions of creators. Create your page in seconds — it's free, forever.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/create"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold text-sm rounded-full hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
                >
                  Get started free
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-semibold text-sm rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  Browse templates
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <img src="/linkcenter.png" alt="LinkCenter" className="h-8" />
            <div className="flex items-center gap-4">
              {[Instagram, Music2, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <span>&copy; 2026 LinkCenter. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
