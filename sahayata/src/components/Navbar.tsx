import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Menu, X, Home, Info, ClipboardCheck, ClipboardList, MessageCircle, LogIn, LogOut, User, History, Sprout, Wheat, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

import { Logo } from './Logo';

export const Navbar = ({ activePage, onPageChange }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: t('home'), icon: Home },
    ...(isAuthenticated ? [{ id: 'schemes', label: 'Schemes', icon: ClipboardList }] : []),
    { id: 'how-it-works', label: t('howItWorks'), icon: Info },
    ...(!isAuthenticated ? [{ id: 'eligibility', label: t('checkEligibility'), icon: ClipboardCheck }] : []),
  ];

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 ${
      theme === 'day' ? 'bg-white/70' : 'bg-slate-900/70'
    } backdrop-blur-xl border ${
      theme === 'day' ? 'border-green-100' : 'border-green-900/30'
    } rounded-[2rem] shadow-2xl shadow-green-500/5`}>
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center gap-4 cursor-pointer group"
              onClick={() => onPageChange('home')}
            >
              <Logo size="md" theme={theme} />
              <div className="flex flex-col -space-y-1">
                <div className="flex items-baseline gap-0.5">
                  <span className={`text-2xl font-black tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                    Saha<span className="text-green-600">Yata</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-600/70">
                    Farmer First
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => onPageChange(item.id)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
                    activePage === item.id
                      ? 'text-green-700 bg-green-100 dark:bg-green-900/40 shadow-lg shadow-green-500/10'
                      : theme === 'day' ? 'text-slate-600 hover:bg-green-50' : 'text-slate-300 hover:bg-green-900/20'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4" />

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => onPageChange('my-results')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
                      activePage === 'my-results'
                        ? 'text-green-700 bg-green-100 dark:bg-green-900/40 shadow-lg shadow-green-500/10'
                        : theme === 'day' ? 'text-slate-600 hover:bg-green-50' : 'text-slate-300 hover:bg-green-900/20'
                    }`}
                  >
                    <History size={16} />
                    {t('myResults')}
                  </motion.button>
                  <div className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    {user?.name}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      logout();
                      onPageChange('home');
                    }}
                    className={`p-3 rounded-2xl transition-all ${
                      theme === 'day' ? 'text-slate-400 hover:text-red-600 hover:bg-red-50' : 'text-slate-500 hover:text-red-400 hover:bg-red-900/10'
                    }`}
                    title={t('logout')}
                  >
                    <LogOut size={20} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  onClick={() => onPageChange('login')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-xl ${
                    theme === 'day' 
                      ? 'bg-slate-900 text-white hover:bg-slate-800' 
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LogIn size={16} />
                  {t('login')}
                </motion.button>
              )}

              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onClick={toggleTheme}
                className={`p-3 rounded-2xl transition-colors ${
                  theme === 'day' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {theme === 'day' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'day' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {theme === 'day' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            theme === 'day' ? 'bg-white' : 'bg-slate-900'
          } border-b ${theme === 'day' ? 'border-green-100' : 'border-slate-800'}`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activePage === item.id
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                  : theme === 'day' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
            </button>
          ))}
          
          <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    onPageChange('my-results');
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activePage === 'my-results'
                      ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                      : theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <History size={18} />
                    {t('myResults')}
                  </div>
                </button>
                <div className="px-3 py-2 text-sm font-medium text-green-600 flex items-center gap-3">
                  <User size={18} />
                  {user?.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    onPageChange('home');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500"
                >
                  <div className="flex items-center gap-3">
                    <LogOut size={18} />
                    {t('logout')}
                  </div>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onPageChange('login');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-600"
              >
                <div className="flex items-center gap-3">
                  <LogIn size={18} />
                  {t('login')}
                </div>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};
