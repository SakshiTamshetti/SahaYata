import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, User, UserPlus, AlertCircle, Phone, MapPin, Ruler, Fingerprint, Calendar, Landmark, Sprout, Tractor, ShieldCheck } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

import { Logo } from './Logo';

export const Register = ({ onRegisterSuccess, onGoToLogin }: { onRegisterSuccess: () => void, onGoToLogin: () => void }) => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    aadhaar: '',
    name: '',
    phone: '',
    age: '',
    state: '',
    district: '',
    farmSize: '',
    password: '',
    annualIncome: '',
    primaryCrop: '',
    occupation: 'Farmer',
    category: 'General',
    gender: 'Male'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!/^\d{12}$/.test(formData.aadhaar)) {
      setError('Aadhaar must be exactly 12 digits');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }
    if (!formData.state) {
      setError('Please select a state');
      return;
    }
    if (isNaN(parseFloat(formData.farmSize)) || parseFloat(formData.farmSize) < 0) {
      setError('Please enter a valid farm size');
      return;
    }
    if (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 18) {
      setError('You must be at least 18 years old');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          farmSize: parseFloat(formData.farmSize),
          annualIncome: parseFloat(formData.annualIncome || "0")
        }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        onRegisterSuccess();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err: any) {
      console.error('Registration error details:', err);
      setError(`Something went wrong: ${err.message || 'Unknown error'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-4xl p-10 rounded-2xl border ${
          theme === 'day' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        } shadow-xl`}
      >
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="mb-8">
              <Logo size="md" theme={theme} />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Create Account
            </h2>
            <p className={`text-sm mb-8 ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
              Register to access personalized government schemes and institutional support.
            </p>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${theme === 'day' ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/50 border-slate-700'}`}>
                <div className="flex items-center gap-3 text-green-600 mb-1">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Secure</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-300">Your data is encrypted and stored securely following government standards.</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center gap-3">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aadhaar */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Aadhaar Number
                  </label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="aadhaar"
                      placeholder="1234 5678 9012"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      name="age"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    State
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm appearance-none ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    District
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="district"
                      placeholder="District Name"
                      value={formData.district}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Farm Size */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Farm Size (Acres)
                  </label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      step="0.1"
                      name="farmSize"
                      placeholder="2.5"
                      value={formData.farmSize}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Annual Income (₹)
                  </label>
                  <div className="relative">
                    <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      name="annualIncome"
                      placeholder="50000"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Primary Crop */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Primary Crop
                  </label>
                  <div className="relative">
                    <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      name="primaryCrop"
                      placeholder="Wheat, Rice, etc."
                      value={formData.primaryCrop}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Occupation */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Occupation
                  </label>
                  <div className="relative">
                    <Tractor className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm appearance-none ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                    >
                      <option value="Farmer">Farmer</option>
                      <option value="Agricultural Laborer">Agricultural Laborer</option>
                      <option value="Artisan">Artisan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm ${
                        theme === 'day' ? 'bg-white border-slate-200 focus:border-green-500' : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onGoToLogin}
                  className="text-sm font-semibold text-slate-500 hover:text-green-600 transition-colors"
                >
                  Already have an account? Login
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
                >
                  {loading ? 'Creating Account...' : 'Register'}
                  <UserPlus size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
