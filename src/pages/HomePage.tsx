import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, Link2, Zap, Paintbrush, ArrowUpRight, Copy, Check,
  Sparkles, Instagram, Youtube, Twitter, Music2,
} from 'lucide-react';

/* ══════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════ */


/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-violet-100/50 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 left-[8%] w-48 h-48 rounded-full bg-pink-100/40 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-[10%] w-64 h-64 rounded-full bg-violet-100/30 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-full text-xs font-semibold text-violet-600 mb-8"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500">
                  simple link.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="text-lg text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed"
              >
                One link to share everything you create, curate, and sell —
                from your Instagram, TikTok, Twitter, and beyond.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Link
                  to="/create"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm rounded-full shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110 transition-all duration-300"
                >
                  Get started free
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-gray-500 font-medium text-sm rounded-full border border-gray-200 hover:border-violet-200 hover:text-violet-600 hover:bg-violet-50/50 transition-all duration-300"
                >
                  Browse templates
                </Link>
              </motion.div>

              {/* URL Preview */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="inline-flex items-center gap-3 mt-8 px-5 py-2.5 bg-gray-50 rounded-full border border-gray-100"
              >
                <span className="text-sm text-gray-300">linkc.ee/</span>
                <span className="text-sm font-semibold text-violet-600">yourname</span>
                <button
                  onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-300 hover:text-gray-500"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </motion.div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Get started in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
                3 simple steps
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Create your page in under 60 seconds.</p>
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
                className="relative group bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-violet-100/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-6xl font-extrabold text-gray-50 absolute top-5 right-6 group-hover:text-violet-50 transition-colors duration-300">
                  {step}
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/20">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
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
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <img src="/linkcenter.png" alt="LinkCenter" className="h-8" />
            <div className="flex items-center gap-4">
              {[Instagram, Music2, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-violet-500 hover:border-violet-200 hover:bg-violet-50 transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>&copy; 2026 LinkCenter. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-violet-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-violet-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-violet-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
