import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, MessageCircle, Tractor, Sprout, Droplets, ClipboardList, ShieldCheck, MapPin, User, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

export const Home = ({ onStart }: { onStart: (page?: string) => void }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Government Badge / Top Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow max-w-[100px]" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
            <ShieldCheck size={12} className="text-green-500" />
            Official Digital Infrastructure
          </div>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow max-w-[100px]" />
        </motion.div>

        {/* Hero Section */}
        <div className="text-left mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-black uppercase tracking-widest mb-8 border border-green-100 dark:border-green-800 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Digital India Initiative
            </div>
            
            <h1 className={`text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] ${
              theme === 'day' ? 'text-slate-900' : 'text-white'
            }`}>
              Empowering <span className="text-green-600">Bharat's</span> <br />
              Agriculture.
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 max-w-xl leading-relaxed font-medium ${
              theme === 'day' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              A unified portal for real-time eligibility analysis and direct benefit transfers for the Indian farming community.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              {!isAuthenticated && (
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStart}
                  className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-green-600/30 transition-all"
                >
                  {t('checkButton')}
                  <ArrowRight size={22} />
                </motion.button>
              )}
              
              {isAuthenticated && (
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStart('schemes')}
                  className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-green-600/30 transition-all"
                >
                  <ClipboardList size={22} />
                  My Eligible Schemes
                </motion.button>
              )}

              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-lg">
                    <img src={`https://picsum.photos/seed/farmer${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-green-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
                  10M+
                </div>
              </div>
            </div>

            {/* News Ticker / Updates */}
            <div className={`p-4 rounded-3xl ${theme === 'day' ? 'bg-slate-50' : 'bg-slate-800/50'} border border-slate-200 dark:border-slate-700/50 flex items-center gap-4 overflow-hidden relative`}>
              <div className="px-3 py-1 bg-green-600 text-white text-[10px] font-black uppercase rounded-xl shrink-0">Latest</div>
              <div className="flex gap-8 animate-marquee whitespace-nowrap">
                <span className={`text-sm font-bold ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>🌾 PM-Kisan 16th Installment Released</span>
                <span className={`text-sm font-bold ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>🚜 New Subsidies for Electric Tractors</span>
                <span className={`text-sm font-bold ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>💧 Micro-irrigation Grants Open for 2024</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            {/* Main Illustration Card */}
            <div className={`relative p-12 rounded-[3rem] border-4 ${theme === 'day' ? 'bg-white/90 border-green-100' : 'bg-slate-900/90 border-green-900/30'} backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(34,197,94,0.2)] overflow-hidden group`}>
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <motion.div 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-3xl bg-green-600 flex items-center justify-center text-white shadow-2xl shadow-green-500/40"
                  >
                    <Logo size="lg" theme="night" />
                  </motion.div>
                  <div>
                    <div className={`text-3xl font-black tracking-tighter ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                      Saha<span className="text-green-600">Yata</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <div className="text-[10px] font-black text-green-600/70 uppercase tracking-[0.2em]">Institutional Portal</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-2xl">
                  <ShieldCheck className="text-green-600" size={32} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Active Schemes', value: '542', color: 'bg-green-500', icon: ClipboardList },
                  { label: 'Registered States', value: '28', color: 'bg-emerald-500', icon: MapPin },
                  { label: 'Beneficiaries', value: '12.4M', color: 'bg-teal-500', icon: User },
                  { label: 'Success Rate', value: '98.2%', color: 'bg-lime-500', icon: CheckCircle2 }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className={`p-8 rounded-[2rem] ${theme === 'day' ? 'bg-slate-50' : 'bg-slate-800/50'} border-2 ${theme === 'day' ? 'border-slate-100' : 'border-slate-700/50'} group-hover:border-green-500/30 transition-all hover:scale-105 shadow-sm`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-xl ${stat.color}/10 text-green-600`}>
                        {/* We need to import these icons or use generic ones */}
                        <stat.icon size={20} />
                      </div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                    </div>
                    <div className={`text-3xl font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>{stat.value}</div>
                    <div className={`h-1.5 w-12 rounded-full mt-4 ${stat.color}`} />
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]" />
              <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-green-100 dark:border-green-900/30 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Sprout size={24} />
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${theme === 'day' ? 'text-slate-400' : 'text-slate-300'}`}>Crop Yield</div>
                  <div className={`text-xl font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>+24%</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-green-100 dark:border-green-900/30 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Droplets size={24} />
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${theme === 'day' ? 'text-slate-400' : 'text-slate-300'}`}>Irrigation</div>
                  <div className={`text-xl font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>Active</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-24">
          {[
            {
              icon: Tractor,
              title: t('feature1Title'),
              desc: t('feature1Desc'),
              color: "bg-green-100 text-green-600 dark:bg-green-900/30"
            },
            {
              icon: Sprout,
              title: t('feature2Title'),
              desc: t('feature2Desc'),
              color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
            },
            {
              icon: Droplets,
              title: t('feature3Title'),
              desc: t('feature3Desc'),
              color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-10 rounded-[2rem] ${
                theme === 'day' ? 'bg-white border-green-50' : 'bg-slate-900 border-green-900/20'
              } border shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all group relative overflow-hidden`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className={`text-xl font-black mb-4 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed font-medium ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                {feature.desc}
              </p>
              
              {/* Soft decorative blob */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Trust Bar / Institutional Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="text-center mb-8">
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>Institutional Partners & Integration</div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <span className={`text-sm font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>NIC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <ClipboardList size={16} />
              </div>
              <span className={`text-sm font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>Ministry of Agriculture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <Sprout size={16} />
              </div>
              <span className={`text-sm font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>ICAR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <Tractor size={16} />
              </div>
              <span className={`text-sm font-black ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>Digital India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
