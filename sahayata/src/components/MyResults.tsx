import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { History, Calendar, MapPin, Ruler, Languages, AlertCircle, Bell } from 'lucide-react';
import { NotificationSettings } from './NotificationSettings';

export const MyResults = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'history' | 'notifications'>('history');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/my-results', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          setError('Failed to fetch results');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchResults();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <History className="text-white" size={24} />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              {t('myResults')}
            </h2>
            <p className={theme === 'day' ? 'text-slate-600' : 'text-slate-300'}>
              Manage your history and alerts
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-8 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <History size={18} />
            History
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Bell size={18} />
            Alerts
          </button>
        </div>

        {activeTab === 'notifications' ? (
          <NotificationSettings />
        ) : (
          <>
            {error && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              {results.length === 0 ? (
                <div className={`p-12 text-center rounded-xl border-2 border-dashed ${
                  theme === 'day' ? 'border-slate-200 text-slate-400' : 'border-slate-700 text-slate-300'
                }`}>
                  No past results found.
                </div>
              ) : (
                results.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-6 rounded-xl border ${
                      theme === 'day' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                    } shadow-sm hover:shadow-md transition-all`}
                  >
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className={theme === 'day' ? 'text-slate-400' : 'text-slate-500'} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                          {new Date(result.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className={theme === 'day' ? 'text-slate-400' : 'text-slate-500'} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                          {result.district}, {result.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler size={16} className={theme === 'day' ? 'text-slate-400' : 'text-slate-500'} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                          {result.farm_size} Acres
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Languages size={16} className={theme === 'day' ? 'text-slate-400' : 'text-slate-500'} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                          {result.language}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
