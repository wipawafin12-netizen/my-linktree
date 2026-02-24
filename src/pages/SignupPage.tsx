import { motion } from 'motion/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name || email.split('@')[0] || 'user');
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-1 text-black font-bold text-2xl">
            OpenBio
          </Link>
          <p className="text-gray-400 text-sm mt-2">Create your free account in seconds.</p>
        </div>

        {/* Social signup */}
        <div className="space-y-2.5 mb-6">
          <button
            onClick={() => { signup('google_user'); navigate('/create'); }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>
          <button
            onClick={() => { signup('apple_user'); navigate('/create'); }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.04-.56-.04-.95 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.22.05.45.05.68zm4.565 17.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
            </svg>
            Sign up with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-300">OR</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="yourname"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
              />
            </div>
            {name && (
              <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                linktr.ee/<span className="text-gray-600 font-medium">{name.toLowerCase().replace(/\s+/g, '')}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      password.length >= i * 3
                        ? password.length >= 10
                          ? 'bg-green-400'
                          : password.length >= 6
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
                        : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Terms */}
          <p className="text-[11px] text-gray-400 leading-relaxed">
            By creating an account, you agree to OpenBio's{' '}
            <a href="https://linktr.ee/s/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Terms of Service</a> and{' '}
            <a href="https://linktr.ee/s/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Privacy Policy</a>.
          </p>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
          >
            Create account <ArrowRight size={16} />
          </motion.button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-900 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
