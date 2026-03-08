import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, LogIn, AlertCircle, Fingerprint } from 'lucide-react';

import { Logo } from './Logo';

export const Login = ({ onLoginSuccess, onGoToRegister }: { onLoginSuccess: () => void, onGoToRegister: () => void }) => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [aadhaar, setAadhaar] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaar, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        onLoginSuccess();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-10 rounded-2xl border ${
          theme === 'day' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        } shadow-xl`}
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size="md" theme={theme} />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
            Secure Login
          </h2>
          <p className={`text-sm ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
            Access your institutional dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center gap-3">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Aadhaar Number
            </label>
            <div className="relative">
              <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                required
                maxLength={12}
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                  theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                }`}
                placeholder="1234 5678 9012"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                  theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                }`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? 'Authenticating...' : 'Login'}
            <LogIn size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            onClick={onGoToRegister}
            className="text-sm font-semibold text-slate-500 hover:text-green-600 transition-colors"
          >
            Don't have an account? Register
          </button>
        </div>
      </motion.div>
    </div>
  );
};
