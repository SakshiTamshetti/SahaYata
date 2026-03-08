import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { User, FileText, Search, CheckCircle, Tractor, Sprout, ClipboardList } from 'lucide-react';

export const HowItWorks = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const steps = [
    {
      icon: User,
      title: t('step1Title'),
      desc: t('step1Desc'),
      animation: Tractor,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/20"
    },
    {
      icon: Search,
      title: t('step2Title'),
      desc: t('step2Desc'),
      animation: FileText,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20"
    },
    {
      icon: ClipboardList,
      title: t('step3Title'),
      desc: t('step3Desc'),
      animation: Sprout,
      color: "bg-green-100 text-green-600 dark:bg-green-900/20"
    },
    {
      icon: CheckCircle,
      title: t('step4Title'),
      desc: t('step4Desc'),
      animation: CheckCircle,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold mb-4 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}
          >
            {t('howItWorksTitle')}
          </motion.h2>
          <p className={theme === 'day' ? 'text-slate-600' : 'text-slate-200'}>
            {t('howItWorksSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-10 rounded-[2.5rem] ${
                theme === 'day' ? 'bg-white border-green-50' : 'bg-slate-900 border-green-900/20'
              } border shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all group relative overflow-hidden`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${step.color} group-hover:scale-110 transition-transform duration-500`}>
                <step.icon size={28} />
              </div>
              <h3 className={`text-2xl font-black mb-4 tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                {step.title}
              </h3>
              <p className={`text-base leading-relaxed font-medium ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                {step.desc}
              </p>

              {/* Decorative number */}
              <div className="absolute top-8 right-10 text-6xl font-black text-green-500/5 select-none group-hover:text-green-500/10 transition-colors">
                0{i + 1}
              </div>
              
              {/* Soft decorative blob */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
