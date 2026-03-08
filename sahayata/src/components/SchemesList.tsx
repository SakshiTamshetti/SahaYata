import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ALL_SCHEMES, Scheme } from '../constants';
import { ExternalLink, Info, Search, Filter, X, CheckCircle2, FileText, Landmark, Wallet, ShieldCheck, Sprout, Tractor, Droplets } from 'lucide-react';

export const SchemesList = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const categories = ['All', 'Financial', 'Insurance', 'Equipment', 'Irrigation', 'Marketing'];

  const filteredSchemes = useMemo(() => {
    return ALL_SCHEMES.filter(scheme => {
      // Basic Search and Category filters
      const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
      
      if (!matchesSearch || !matchesCategory) return false;

      // If user is logged in, apply strict eligibility filtering
      if (isAuthenticated && user) {
        const criteria = scheme.criteria;
        if (!criteria) return true; // No criteria means everyone is eligible

        // Check Farm Size
        if (criteria.maxFarmSize !== undefined && user.farmSize > criteria.maxFarmSize) return false;
        if (criteria.minFarmSize !== undefined && user.farmSize < criteria.minFarmSize) return false;

        // Check Age
        if (criteria.minAge !== undefined && user.age < criteria.minAge) return false;
        if (criteria.maxAge !== undefined && user.age > criteria.maxAge) return false;

        // Check Annual Income
        if (criteria.maxAnnualIncome !== undefined && user.annualIncome > criteria.maxAnnualIncome) return false;

        // Check State
        if (criteria.allowedStates && !criteria.allowedStates.includes(user.state)) return false;

        // Check Category (Caste/Social)
        if (criteria.allowedCategories && !criteria.allowedCategories.includes(user.category)) return false;

        // Check Gender
        if (criteria.allowedGenders && !criteria.allowedGenders.includes(user.gender)) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, isAuthenticated, user]);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Financial': return Wallet;
      case 'Insurance': return ShieldCheck;
      case 'Equipment': return Tractor;
      case 'Irrigation': return Droplets;
      case 'Marketing': return Landmark;
      default: return Sprout;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold mb-4 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}
          >
            {isAuthenticated ? 'Your Eligible Schemes' : 'All Government Schemes'}
          </motion.h2>
          <p className={theme === 'day' ? 'text-slate-600' : 'text-slate-200'}>
            {isAuthenticated 
              ? `Based on your profile, we've found ${filteredSchemes.length} schemes you are eligible for.`
              : 'Explore all available welfare schemes designed to support and empower farmers.'}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`} size={16} />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all outline-none text-sm ${
                theme === 'day' 
                  ? 'bg-white border-slate-200 focus:border-green-500 text-slate-800' 
                  : 'bg-slate-800 border-slate-700 focus:border-green-500 text-white'
              }`}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                    : theme === 'day' 
                      ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme, i) => {
            const Icon = getIcon(scheme.category);
            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-8 rounded-2xl ${
                  theme === 'day' ? 'bg-white' : 'bg-slate-900'
                } border ${theme === 'day' ? 'border-slate-200' : 'border-slate-800'} flex flex-col h-full hover:border-green-500/50 transition-all shadow-sm`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-green-600`}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    {scheme.category}
                  </div>
                </div>
                
                <h3 className={`text-lg font-bold mb-3 leading-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                  {scheme.name}
                </h3>
                
                <p className={`text-sm mb-8 flex-grow leading-relaxed ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {scheme.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all border ${
                      theme === 'day' 
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Details
                  </button>
                  <a
                    href={scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    Apply
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-xl ${theme === 'day' ? 'text-slate-500' : 'text-slate-400'}`}>
              No schemes found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Scheme Detail Modal */}
      <AnimatePresence>
        {selectedScheme && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScheme(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
                theme === 'day' ? 'bg-white' : 'bg-slate-900'
              } shadow-2xl p-10 md:p-12 border border-slate-200 dark:border-slate-800`}
            >
              <button
                onClick={() => setSelectedScheme(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} className={theme === 'day' ? 'text-slate-600' : 'text-slate-400'} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-green-600">
                  {React.createElement(getIcon(selectedScheme.category), { size: 28 })}
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                  {selectedScheme.name}
                </h3>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${theme === 'day' ? 'text-slate-500' : 'text-slate-400'}`}>Description</h4>
                  <p className={`text-sm leading-relaxed ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {selectedScheme.description}
                  </p>
                </section>

                <section className={`p-6 rounded-xl ${theme === 'day' ? 'bg-slate-50' : 'bg-slate-800/50'} border border-slate-100 dark:border-slate-800`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Eligibility Criteria
                  </h4>
                  <p className={`text-sm font-medium ${theme === 'day' ? 'text-slate-800' : 'text-slate-200'}`}>
                    {selectedScheme.eligibility}
                  </p>
                </section>

                <section>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                    <FileText size={16} className="text-slate-400" />
                    Documents Required
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedScheme.documents.map((doc, i) => (
                      <li key={i} className={`text-xs flex items-center gap-2 p-3 rounded-lg ${theme === 'day' ? 'bg-white' : 'bg-slate-800'} border border-slate-200 dark:border-slate-700`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="pt-4">
                  <motion.a
                    href={selectedScheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    Apply on Official Portal
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
