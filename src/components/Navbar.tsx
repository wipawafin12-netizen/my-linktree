import { motion } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { label: 'ผลิตภัณฑ์', to: '/products' },
  { label: 'เทมเพลต', to: '/templates' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

  const isHome = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${isHome ? 'bg-[#050510]/80 border-b border-white/5' : 'bg-white/90 border-b border-gray-100'}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 -ml-2">
            <img src="/linkcenter.png" alt="LinkCenter" className={`h-12 ${isHome ? 'brightness-0 invert' : ''}`} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-violet-600 bg-violet-50'
                    : isHome
                      ? 'text-gray-400 hover:text-white hover:bg-white/10'
                      : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/create"
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 rounded-full shadow-md shadow-violet-500/20 transition-all"
                >
                  My OpenBio
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isHome ? 'bg-white/10 border border-white/10 text-gray-300 hover:text-white hover:border-white/20' : 'bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200'}`}
                  >
                    <User size={16} />
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{username}</p>
                          <p className="text-xs text-gray-400">linkc.ee/{username}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <User size={14} /> แดชบอร์ด
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} /> ออกจากระบบ
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${isHome ? 'text-gray-300 hover:text-white border border-white/10 hover:border-white/20' : 'text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300'}`}
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 rounded-full shadow-md shadow-violet-500/20 transition-all"
                >
                  สมัครฟรี
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isHome ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden ${isHome ? 'bg-[#0a0a20] border-t border-white/5' : 'bg-white border-t border-gray-100'}`}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-violet-600 bg-violet-50'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/create" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-colors">
                    OpenBio ของฉัน
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-red-500 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} /> ออกจากระบบ
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                    เข้าสู่ระบบ
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-colors">
                    สมัครฟรี
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
