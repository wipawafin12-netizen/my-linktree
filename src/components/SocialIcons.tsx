import { motion } from 'motion/react';
import { socialLinks } from '../data';

export default function SocialIcons() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap justify-center gap-4 mb-10"
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all backdrop-blur-sm border border-transparent hover:border-white/20"
            aria-label={social.label}
          >
            <Icon size={22} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
