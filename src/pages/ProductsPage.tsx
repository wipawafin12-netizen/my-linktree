import { motion } from 'motion/react';
import {
  Link2, Settings, Users, DollarSign, BarChart3,
  ChevronRight, Instagram, Music2, Linkedin, Twitter,
  ArrowRight,
} from 'lucide-react';

const sidebarItems = [
  { icon: Link2, label: 'Link in bio + tools', desc: 'Everything you need to connect audiences to your content.' },
  { icon: Settings, label: 'Manage your social media', desc: 'Schedule, publish, and analyze across platforms.' },
  { icon: Users, label: 'Grow and engage your audience', desc: 'Turn followers into fans with powerful tools.' },
  { icon: DollarSign, label: 'Monetize your following', desc: 'Start earning from your content and community.' },
  { icon: BarChart3, label: 'Measure your success', desc: 'Track clicks, views, and revenue in one dashboard.' },
];

const productItems = [
  { title: 'Link in bio', desc: 'Customize your Linktree', icon: '🔗' },
  { title: 'Link shortener', desc: 'Create trackable, shareable short links', icon: '✂️' },
  { title: 'QR code generator', desc: 'Turn links into scannable QR codes', icon: '📱' },
  { title: 'Canva Background Editor', desc: 'Import your custom designs from Canva into your profile', icon: '🎨' },
  { title: 'Linktree for every social platform', desc: 'Grow and engage your audience everywhere', icon: '🌐' },
];

const socialIcons = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Music2, label: 'TikTok' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'X' },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">connect</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            One link to share everything you create, curate, and sell across all your socials.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sidebarItems.map((item, i) => (
            <motion.a
              key={item.label}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gray-900 flex items-center justify-center mb-4 transition-colors duration-300">
                <item.icon size={22} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                Learn more <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Our Products</h2>
          <p className="text-gray-500 text-center mb-10">Tools built for creators, by creators.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productItems.map((item, i) => (
              <motion.a
                key={item.title}
                href="#"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                className="group flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-black">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-10 sm:p-14 text-white relative"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join 70M+ using Linktree as their link in bio</h2>
            <p className="text-white/80 text-base mb-8">
              One link to share everything you create, curate, and sell across all your socials.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Get started free <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        {/* Social Links */}
        <div className="mt-16 flex items-center justify-center gap-4">
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-gray-400 transition-colors"
              title={s.label}
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
