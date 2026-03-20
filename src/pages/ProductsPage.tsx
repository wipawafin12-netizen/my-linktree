import { motion } from 'motion/react';
import {
  Link2, Settings, Users,
  ChevronRight, Instagram, Music2, Linkedin, Twitter,
  ArrowRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const sidebarItems = [
  { icon: Link2, label: 'ลิงก์ในไบโอ + เครื่องมือ', desc: 'ทุกอย่างที่คุณต้องการเพื่อเชื่อมต่อผู้ชมกับคอนเทนต์', to: '/create' },
  { icon: Settings, label: 'จัดการโซเชียลมีเดีย', desc: 'ตั้งเวลา เผยแพร่ และวิเคราะห์ข้ามแพลตฟอร์ม', to: '/create' },
  { icon: Users, label: 'ขยายและมีส่วนร่วมกับผู้ติดตาม', desc: 'เปลี่ยนผู้ติดตามเป็นแฟนด้วยเครื่องมือทรงพลัง', to: '/admin/audience/contacts' },
];

const productItems = [
  { title: 'ลิงก์ในไบโอ', desc: 'ปรับแต่ง OpenBio ของคุณ', icon: '🔗', to: '/create' },
  { title: 'ตัวย่อลิงก์', desc: 'สร้างลิงก์สั้นที่ติดตามและแชร์ได้', icon: '✂️', to: '/link-shortener' },
  { title: 'ตัวสร้าง QR Code', desc: 'เปลี่ยนลิงก์เป็น QR Code ที่สแกนได้', icon: '📱', to: '/qr-code' },
  { title: 'ตัวแก้ไขพื้นหลัง Canva', desc: 'นำเข้าดีไซน์จาก Canva ไปยังโปรไฟล์ของคุณ', icon: '🎨', to: '/create' },
];

const socialIcons = [
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com' },
  { icon: Music2, label: 'TikTok', url: 'https://www.tiktok.com' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com' },
  { icon: Twitter, label: 'X', url: 'https://x.com' },
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleNavigate = (to: string) => {
    if (isLoggedIn) {
      navigate(to);
    } else {
      navigate('/signup');
    }
  };

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
            ทุกอย่างที่คุณต้องการเพื่อ<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">เชื่อมต่อ</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            ลิงก์เดียวเพื่อแชร์ทุกอย่างที่คุณสร้าง รวบรวม และขายผ่านโซเชียลทั้งหมด
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sidebarItems.map((item, i) => (
            <motion.div
              key={item.label}
              onClick={() => handleNavigate(item.to)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gray-900 flex items-center justify-center mb-4 transition-colors duration-300">
                <item.icon size={22} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                เรียนรู้เพิ่มเติม <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">ผลิตภัณฑ์ของเรา</h2>
          <p className="text-gray-500 text-center mb-10">เครื่องมือที่สร้างโดยครีเอเตอร์ เพื่อครีเอเตอร์</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productItems.map((item, i) => (
              <motion.div
                key={item.title}
                onClick={() => handleNavigate(item.to)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                className="group flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-black">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </motion.div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">เข้าร่วมกว่า 70 ล้านคนที่ใช้ OpenBio เป็นลิงก์ในไบโอ</h2>
            <p className="text-white/80 text-base mb-8">
              ลิงก์เดียวเพื่อแชร์ทุกอย่างที่คุณสร้าง รวบรวม และขายผ่านโซเชียลทั้งหมด
            </p>
            <Link
              to={isLoggedIn ? '/dashboard' : '/signup'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              {isLoggedIn ? 'ไปที่แดชบอร์ด' : 'เริ่มต้นใช้งานฟรี'} <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Social Links */}
        <div className="mt-16 flex items-center justify-center gap-4">
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
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
