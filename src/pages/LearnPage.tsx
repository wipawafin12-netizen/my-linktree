import { motion } from 'motion/react';
import { useState } from 'react';
import {
  LayoutGrid, HelpCircle, ChevronRight, BookOpen, Trophy,
  ArrowRight, Play, Clock, Star, TrendingUp, Users, Lightbulb,
  Palette, BarChart3, DollarSign, Megaphone, Search,
} from 'lucide-react';

// ── Sidebar Menu ──
const sidebarItems = [
  { icon: LayoutGrid, label: 'Resources' },
  { icon: HelpCircle, label: 'How to use OpenBio' },
];

// ── Resource Links ──
const resourceLinks = [
  { title: 'Read our blog', desc: 'All the latest tips, tricks and growth strategies', icon: BookOpen },
  { title: 'Success Stories', desc: 'Real people, real results on OpenBio', icon: Trophy },
  { title: 'Creator Toolkit', desc: 'Free tools and guides to level up your content', icon: Lightbulb },
  { title: 'Community Forum', desc: 'Connect with other creators and share ideas', icon: Users },
];

// ── Courses ──
const courses = [
  {
    title: 'The Art of Floral Design',
    price: '$75.00',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&q=80',
    color: '#2d5016',
    tag: 'Popular',
  },
  {
    title: 'Social Media Marketing 101',
    price: '$49.00',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80',
    color: '#1a365d',
    tag: 'Bestseller',
  },
  {
    title: 'Photography for Beginners',
    price: '$59.00',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    color: '#44337a',
  },
  {
    title: 'Building Your Brand Online',
    price: '$89.00',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    color: '#9c4221',
    tag: 'New',
  },
];

// ── Blog Posts ──
const blogPosts = [
  {
    title: 'How to Grow Your Audience in 2026',
    excerpt: 'Proven strategies to build a loyal following across all platforms.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
    category: 'Growth',
    readTime: '5 min read',
    icon: TrendingUp,
  },
  {
    title: 'Monetize Your Content: A Complete Guide',
    excerpt: 'Turn your passion into profit with these actionable tips.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
    category: 'Monetization',
    readTime: '8 min read',
    icon: DollarSign,
  },
  {
    title: 'Design Tips for a Standout Profile',
    excerpt: 'Make your OpenBio page look professional and on-brand.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
    category: 'Design',
    readTime: '4 min read',
    icon: Palette,
  },
  {
    title: 'Understanding Your Analytics',
    excerpt: 'Use data to make smarter decisions about your content strategy.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    category: 'Analytics',
    readTime: '6 min read',
    icon: BarChart3,
  },
  {
    title: 'The Creator Economy in 2026',
    excerpt: 'Trends, tools, and opportunities for modern creators.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80',
    category: 'Trends',
    readTime: '7 min read',
    icon: Megaphone,
  },
  {
    title: 'How Katy Grew 100K Followers',
    excerpt: 'A real success story of consistency, creativity, and community.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    category: 'Success Story',
    readTime: '5 min read',
    icon: Trophy,
  },
];

// ── How-To Guides ──
const guides = [
  { title: 'Getting Started with OpenBio', desc: 'Set up your profile in under 5 minutes.', icon: Play, time: '3 min' },
  { title: 'Adding & Managing Links', desc: 'Organize your links for maximum engagement.', icon: LayoutGrid, time: '4 min' },
  { title: 'Customizing Your Theme', desc: 'Match your OpenBio to your personal brand.', icon: Palette, time: '5 min' },
  { title: 'Installing Link Apps', desc: 'Supercharge your page with marketplace integrations.', icon: LayoutGrid, time: '3 min' },
  { title: 'Reading Your Analytics', desc: 'Understand clicks, views, and audience insights.', icon: BarChart3, time: '6 min' },
  { title: 'Monetization Setup', desc: 'Start accepting payments and tips.', icon: DollarSign, time: '4 min' },
];

type Tab = 'resources' | 'how-to';

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<Tab>('resources');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">OpenBio</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Resources, guides, and courses to help you create, grow, and earn from your online presence.
          </p>
        </motion.div>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:w-[260px] flex-shrink-0"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label === 'Resources' ? 'resources' : 'how-to')}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors cursor-pointer ${
                    (activeTab === 'resources' && item.label === 'Resources') ||
                    (activeTab === 'how-to' && item.label !== 'Resources')
                      ? 'bg-gray-50 text-black'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Featured Course Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Learn with OpenBio</h3>
                <div className="rounded-xl overflow-hidden relative group cursor-pointer">
                  <img
                    src={courses[0].image}
                    alt={courses[0].title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-bold">{courses[0].title}</p>
                    <p className="text-white/70 text-[10px] mt-0.5">{courses[0].price}</p>
                    <button className="mt-2 px-4 py-1.5 bg-white text-gray-900 text-[10px] font-semibold rounded-full hover:bg-gray-100 transition-colors">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h4 className="text-sm font-bold text-gray-900">Create & sell your own online Course</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  If you've got something to share, you've got something to sell. Easily create and share an online course that...
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">

            {/* ══ Resources Tab ══ */}
            {activeTab === 'resources' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Resource Links */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {resourceLinks.map((r, i) => (
                    <motion.a
                      key={r.title}
                      href="#"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gray-900 flex items-center justify-center flex-shrink-0 transition-colors">
                          <r.icon size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{r.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Search */}
                <div className="max-w-sm mb-6">
                  <div className="relative">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                    />
                  </div>
                </div>

                {/* Blog Posts */}
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={18} /> Latest from the blog
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                  {filteredPosts.map((post, i) => (
                    <motion.a
                      key={post.title}
                      href="#"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                    >
                      <div className="h-36 relative overflow-hidden">
                        <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-700 px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-black leading-snug">{post.title}</h3>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{post.excerpt}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {post.readTime}
                          </span>
                          <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-900 flex items-center gap-1 transition-colors">
                            Read <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No articles found</p>
                    <button onClick={() => setSearchQuery('')} className="mt-2 text-sm text-green-600 font-medium cursor-pointer">Clear search</button>
                  </div>
                )}

                {/* Courses Section */}
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star size={18} className="text-yellow-500" /> Courses
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {courses.map((course, i) => (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                      className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                    >
                      <div className="h-40 relative overflow-hidden">
                        <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {course.tag && (
                          <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm ${
                            course.tag === 'Popular' ? 'bg-yellow-400/90 text-yellow-900' :
                            course.tag === 'Bestseller' ? 'bg-purple-500/90 text-white' :
                            'bg-emerald-500/90 text-white'
                          }`}>
                            {course.tag}
                          </span>
                        )}
                        <div className="absolute bottom-3 left-3">
                          <span className="text-white font-bold text-sm">{course.price}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900">{course.title}</h3>
                        <button className="mt-3 w-full py-2 bg-gray-900 text-white text-xs font-semibold rounded-full hover:bg-black transition-colors">
                          Enroll Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══ How to use OpenBio Tab ══ */}
            {activeTab === 'how-to' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-gray-900 mb-2">How to use OpenBio</h2>
                <p className="text-sm text-gray-500 mb-8">Step-by-step guides to get the most out of your OpenBio.</p>

                <div className="space-y-4">
                  {guides.map((guide, i) => (
                    <motion.a
                      key={guide.title}
                      href="#"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="group flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-green-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <guide.icon size={20} className="text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900">{guide.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{guide.desc}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Clock size={10} /> {guide.time}
                        </span>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Video Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mt-12 rounded-2xl overflow-hidden relative group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80"
                    alt=""
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors mb-4">
                      <Play size={28} className="text-white ml-1" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Watch: Getting Started with OpenBio</h3>
                    <p className="text-white/70 text-sm mt-1">A complete walkthrough in under 10 minutes</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
