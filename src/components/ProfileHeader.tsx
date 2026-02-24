import { motion, AnimatePresence } from 'motion/react';
import { Share2, Check } from 'lucide-react';
import { profileData } from '../data';
import { useState } from 'react';

export default function ProfileHeader() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center text-center mb-8 relative z-10">
      {/* Top Controls */}
      <div className="absolute top-0 right-0 flex gap-2">
        <button 
          onClick={handleShare}
          className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-sm group"
          aria-label="Share profile"
        >
          <AnimatePresence mode='wait'>
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={20} className="text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="share"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Share2 size={20} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {copied ? 'Copied!' : 'Share Profile'}
          </span>
        </button>
      </div>

      {/* Avatar with Glow */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-4 group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src={profileData.avatar} 
          alt={profileData.name}
          className="relative w-28 h-28 rounded-full border-4 border-white/10 object-cover shadow-xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Name & Handle */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight flex items-center justify-center gap-2">
          {profileData.name}
          <span className="text-blue-400 text-sm bg-blue-400/10 px-1.5 py-0.5 rounded-full">✓</span>
        </h1>
        <p className="text-gray-400 font-medium mb-4">{profileData.handle}</p>
        
        {/* Bio */}
        <p className="text-gray-300 max-w-md mx-auto leading-relaxed whitespace-pre-line">
          {profileData.bio}
        </p>
      </motion.div>
    </div>
  );
}
