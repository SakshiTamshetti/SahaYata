import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Tractor, Search, Database, ShieldCheck } from 'lucide-react';

export const Processing = ({ onComplete }: { onComplete: () => void }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    t('msg1'),
    "Analyzing your profile with Deep Learning...",
    t('msg2'),
    "Matching with 500+ Government Schemes...",
    t('msg3'),
    "AI is calculating eligibility probabilities...",
    t('msg4'),
    "Optimizing results for your land size...",
    t('msg5'),
    "Finalizing personalized recommendations...",
    t('msg6')
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 rounded-2xl ${
            theme === 'day' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          } border shadow-xl`}
        >
          <div className="mb-12">
            {/* Progress Bar Track */}
            <div className={`h-2 w-full rounded-full overflow-hidden ${
              theme === 'day' ? 'bg-slate-100' : 'bg-slate-800'
            }`}>
              <motion.div 
                className="h-full bg-slate-900 dark:bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className={`text-3xl font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              {progress}%
            </h2>
            
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              <p className={`text-sm font-bold uppercase tracking-wider ${
                theme === 'day' ? 'text-slate-500' : 'text-slate-300'
              }`}>
                {messages[messageIndex]}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
