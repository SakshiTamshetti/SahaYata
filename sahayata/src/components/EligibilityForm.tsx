import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Send, MapPin, User, Phone, Hash, Calendar, Maximize, Languages, Landmark, Sprout, Tractor, ShieldCheck } from 'lucide-react';

interface FormData {
  aadhaar: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  age: string;
  farmSize: string;
  annualIncome: string;
  primaryCrop: string;
  occupation: string;
  category: string;
  gender: string;
  language: Language;
}

export const EligibilityForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { theme } = useTheme();
  const { t, setLanguage, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = React.useState<FormData>({
    aadhaar: '',
    name: '',
    phone: '',
    state: '',
    district: '',
    age: '',
    farmSize: '',
    annualIncome: '',
    primaryCrop: '',
    occupation: 'Farmer',
    category: 'General',
    gender: 'Male',
    language: language
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        aadhaar: user.aadhaar || '',
        name: user.name || '',
        phone: user.phone || '',
        state: user.state || '',
        district: user.district || '',
        age: user.age?.toString() || '',
        farmSize: user.farmSize?.toString() || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setFormData({ ...formData, language: lang });
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border-2 transition-all outline-hidden ${
    theme === 'day' 
      ? 'bg-white border-green-100 focus:border-green-500 text-slate-800' 
      : 'bg-slate-900 border-slate-700 focus:border-green-500 text-white'
  }`;

  const labelClasses = `block text-sm font-semibold mb-2 ${
    theme === 'day' ? 'text-slate-600' : 'text-slate-300'
  }`;

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-10 rounded-[2.5rem] border ${
            theme === 'day' ? 'bg-white border-green-50' : 'bg-slate-900 border-green-900/20'
          } shadow-2xl relative overflow-hidden`}
        >
          {/* Decorative soft elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-200 dark:border-green-800/50">
              <ShieldCheck size={12} />
              Secure Assessment
            </div>
            <h2 className={`text-4xl font-black mb-4 tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Eligibility <span className="text-green-600">Assessment</span>
            </h2>
            <p className={`text-base font-medium max-w-lg mx-auto leading-relaxed ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Provide your details to find compatible government support programs tailored for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="space-y-6">
              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Aadhaar Number
                </label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.aadhaar}
                    onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Mobile Number
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Age
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input
                      type="number"
                      required
                      placeholder="Years"
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                        theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Gender
                  </label>
                  <select
                    required
                    className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold appearance-none ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  State
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <select
                    required
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold appearance-none ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  District
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="District Name"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Farm Size (Acres)
                  </label>
                  <div className="relative group">
                    <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="Size"
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                        theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      value={formData.farmSize}
                      onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Language
                  </label>
                  <select
                    className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold appearance-none ${
                      theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                    }`}
                    value={formData.language}
                    onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Punjabi">Punjabi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Annual Income (₹)
                  </label>
                  <div className="relative group">
                    <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input
                      type="number"
                      required
                      placeholder="Income"
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                        theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Primary Crop
                  </label>
                  <div className="relative group">
                    <Sprout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wheat"
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                        theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                      }`}
                      value={formData.primaryCrop}
                      onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Category
                </label>
                <select
                  required
                  className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold appearance-none ${
                    theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                  }`}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Occupation
                </label>
                <select
                  required
                  className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-bold appearance-none ${
                    theme === 'day' ? 'bg-slate-50 border-slate-100 focus:border-green-500 focus:bg-white' : 'bg-slate-800/50 border-slate-700 focus:border-green-500 text-white'
                  }`}
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Agricultural Laborer">Agricultural Laborer</option>
                  <option value="Artisan">Artisan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2 mt-8">
              <motion.button
                type="submit"
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ y: 0, scale: 0.99 }}
                className="w-full py-5 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-green-600/30 transition-all"
              >
                {t('submitButton')}
                <Send size={20} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
