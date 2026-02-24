import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface LinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon?: any;
    description?: string;
    featured?: boolean;
  };
  index: number;
}

export default function LinkCard({ link, index }: LinkCardProps) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative group flex items-center p-4 mb-4 rounded-xl border transition-all duration-300
        ${link.featured
          ? 'bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/15'
          : 'bg-black/20 border-white/10 hover:bg-white/5 hover:border-white/20'
        }
        backdrop-blur-md overflow-hidden
      `}
    >
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      {/* Icon Section */}
      <div className={`
        flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg mr-4
        ${link.featured ? 'bg-white/20 text-white' : 'bg-black/20 text-gray-300'}
      `}>
        {Icon ? <Icon size={24} /> : <ExternalLink size={24} />}
      </div>

      {/* Text Section */}
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-white text-lg truncate pr-2">
          {link.title}
        </h3>
        {link.description && (
          <p className="text-sm text-gray-400 truncate">
            {link.description}
          </p>
        )}
      </div>

      {/* Arrow/Action Icon */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/50">
        <ExternalLink size={16} />
      </div>
    </motion.a>
  );
}
