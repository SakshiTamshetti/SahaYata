import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Background = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          theme === 'day' 
            ? 'bg-slate-50' 
            : 'bg-slate-950'
        }`} 
      />

      {/* Subtle Animated Blobs */}
      <div className="absolute inset-0 opacity-60 dark:opacity-30">
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -top-[10%] -left-[5%] w-[70%] h-[70%] rounded-full blur-[140px] ${
            theme === 'day' ? 'bg-emerald-200/40' : 'bg-emerald-900/40'
          }`}
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 150, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-[15%] -right-[5%] w-[60%] h-[60%] rounded-full blur-[140px] ${
            theme === 'day' ? 'bg-green-200/40' : 'bg-green-900/30'
          }`}
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -bottom-[5%] left-[15%] w-[50%] h-[50%] rounded-full blur-[120px] ${
            theme === 'day' ? 'bg-lime-100/40' : 'bg-lime-900/20'
          }`}
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className={`absolute inset-0 opacity-[0.15] dark:opacity-[0.2]`}
        style={{
          backgroundImage: theme === 'day' 
            ? 'radial-gradient(#cbd5e1 1px, transparent 1px)' 
            : 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Vignette */}
      <div className={`absolute inset-0 ${
        theme === 'day' 
          ? 'bg-radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)' 
          : 'bg-radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)'
      }`} />
    </div>
  );
};
