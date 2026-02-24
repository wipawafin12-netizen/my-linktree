import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-md text-center"
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 mb-3">
        <Mail size={20} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">Join my newsletter</h3>
      <p className="text-sm text-gray-400 mb-4">Get the latest updates and resources directly to your inbox.</p>

      {status === 'success' ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="py-2 px-4 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium"
        >
          Thanks for subscribing! 🎉
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-black font-medium px-4 py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-colors disabled:opacity-70"
          >
            {status === 'loading' ? '...' : 'Join'}
          </button>
        </form>
      )}
    </motion.div>
  );
}
