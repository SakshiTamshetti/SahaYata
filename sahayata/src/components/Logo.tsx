import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Landmark } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'day' | 'night';
}

export const Logo = ({ size = 'md', theme = 'day' }: LogoProps) => {
  const sizes = {
    sm: { container: 'w-10 h-10', icon: 20 },
    md: { container: 'w-12 h-12', icon: 24 },
    lg: { container: 'w-24 h-24', icon: 48 },
  };

  const currentSize = sizes[size];

  return (
    <div className="relative group">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`${currentSize.container} bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center shadow-md transition-all duration-300 overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <Landmark size={currentSize.icon * 1.5} className={theme === 'day' ? 'text-white' : 'text-slate-900'} strokeWidth={1} />
        </div>
        
        <Sprout 
          className={theme === 'day' ? 'text-white' : 'text-slate-900'} 
          size={currentSize.icon} 
          strokeWidth={2} 
        />
      </motion.div>
    </div>
  );
};
