import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ExternalLink, CheckCircle2, Info, MessageCircle, Tractor, Sprout, HeartPulse, Leaf, Sparkles, Landmark, Wallet, ShieldCheck, BrainCircuit, Loader2, Phone, X, MapPin, Navigation } from 'lucide-react';
import { getWhatsAppLink } from '../lib/whatsapp';
import { getSchemeRecommendations, SchemeRecommendation, getNearbyCenters, ApplicationCenter } from '../services/geminiService';

export const Results = ({ formData }: { formData?: any }) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const { token, user } = useAuth();
  const [aiSchemes, setAiSchemes] = useState<SchemeRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState<SchemeRecommendation | null>(null);
  const [centers, setCenters] = useState<ApplicationCenter[]>([]);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (formData) {
        setLoading(true);
        const recommendations = await getSchemeRecommendations(formData, language);
        setAiSchemes(recommendations);
        setLoading(false);

        // Save results to backend
        try {
          await fetch('/api/save-results', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              ...formData,
              language: language,
              recommendations
            }),
          });
        } catch (err) {
          console.error('Failed to save results:', err);
        }
      }
    };

    fetchRecommendations();
  }, [formData, token, language]);

  useEffect(() => {
    const fetchCenters = async () => {
      if (navigator.geolocation) {
        setLoadingCenters(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const nearbyCenters = await getNearbyCenters(latitude, longitude);
            setCenters(nearbyCenters);
            setLoadingCenters(false);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setLocationError(t('locationPermissionMsg'));
            setLoadingCenters(false);
          }
        );
      }
    };

    fetchCenters();
  }, [language]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'tractor': return Tractor;
      case 'sprout': return Sprout;
      case 'shield': return ShieldCheck;
      case 'landmark': return Landmark;
      case 'wallet': return Wallet;
      default: return Sprout;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'tractor': return { color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20", accent: "text-emerald-600", border: "border-emerald-100 dark:border-emerald-900/30", glow: "shadow-emerald-500/20" };
      case 'sprout': return { color: "bg-teal-100 text-teal-600 dark:bg-teal-900/20", accent: "text-teal-600", border: "border-teal-100 dark:border-teal-900/30", glow: "shadow-teal-500/20" };
      case 'shield': return { color: "bg-lime-100 text-lime-600 dark:bg-lime-900/20", accent: "text-lime-600", border: "border-lime-100 dark:border-lime-900/30", glow: "shadow-lime-500/20" };
      case 'landmark': return { color: "bg-green-100 text-green-600 dark:bg-green-900/20", accent: "text-green-600", border: "border-green-100 dark:border-green-900/30", glow: "shadow-green-500/20" };
      case 'wallet': return { color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20", accent: "text-emerald-600", border: "border-emerald-100 dark:border-emerald-900/30", glow: "shadow-emerald-500/20" };
      default: return { color: "bg-green-100 text-green-600 dark:bg-green-900/20", accent: "text-green-600", border: "border-green-100 dark:border-green-900/30", glow: "shadow-green-500/20" };
    }
  };

  const handleWhatsAppResults = () => {
    let schemeDetails = '';
    if (aiSchemes.length > 0) {
      schemeDetails = '\n\n' + aiSchemes.map(s => 
        `📌 *${s.name}*\n` +
        `📝 ${s.description}\n` +
        `✅ *Eligibility:* ${s.eligibility_criteria}\n` +
        `📄 *Documents:* ${s.required_documents.join(', ')}\n` +
        `📞 *Helpline:* ${s.important_numbers.join(', ')}\n` +
        `🔗 ${s.link}\n`
      ).join('\n---\n\n');
    }
    
    const message = `*Farmer Welfare Schemes for You* 🌾${schemeDetails}`;
    const supportNumber = import.meta.env.VITE_SUPPORT_WHATSAPP || '919876543210';
    window.open(getWhatsAppLink(supportNumber, message), '_blank');
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle2 className="text-white w-8 h-8" />
          </motion.div>
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
            {t('resultsTitle')}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <BrainCircuit className="text-green-600" size={16} />
            <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Institutional Eligibility Report
            </span>
          </div>
          <p className={`max-w-2xl mx-auto ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
            Based on your profile analysis, the following government support programs have been identified as compatible with your requirements.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
              <Loader2 className="w-16 h-16 text-green-600 animate-spin" />
              <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full animate-pulse" />
            </div>
            <p className={`text-lg font-bold tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Analyzing profile compatibility...
            </p>
            <p className={`text-sm mt-2 font-medium ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Our AI is matching your profile with 500+ government schemes
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiSchemes.map((scheme, i) => {
              const Icon = getIcon(scheme.icon_type);
              const classes = getColorClasses(scheme.icon_type);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`p-8 rounded-[2rem] border ${
                    theme === 'day' ? 'bg-white border-green-50' : 'bg-slate-900 border-green-900/20'
                  } flex flex-col h-full shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all group relative overflow-hidden`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${classes.color} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={28} />
                  </div>
                  
                  <h3 className={`text-xl font-black mb-4 leading-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                    {scheme.name}
                  </h3>
                  
                  <p className={`text-sm mb-8 flex-grow leading-relaxed font-medium ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {scheme.description}
                  </p>

                  <div className={`p-6 rounded-2xl mb-8 ${
                    theme === 'day' ? 'bg-slate-50' : 'bg-slate-800/50'
                  } border border-slate-100 dark:border-slate-800 group-hover:bg-green-500/5 transition-colors`}>
                    <div className="flex items-start gap-3 mb-5">
                      <HeartPulse size={16} className={`shrink-0 mt-0.5 ${classes.accent}`} />
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${classes.accent} block mb-1.5`}>Primary Benefit</span>
                        <p className={`text-xs font-bold ${theme === 'day' ? 'text-slate-800' : 'text-slate-200'}`}>
                          {scheme.benefits}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BrainCircuit size={16} className="shrink-0 mt-0.5 text-blue-500" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 block mb-1.5">Compatibility Note</span>
                        <p className={`text-[11px] leading-relaxed font-medium ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                          {scheme.eligibility_reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => setSelectedScheme(scheme)}
                      className={`py-3.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg`}
                    >
                      Details
                    </motion.button>
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      href={scheme.link.startsWith('http') ? scheme.link : `https://${scheme.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-3.5 px-4 bg-green-600 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/20`}
                    >
                      Apply
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>

                  {/* Soft decorative blob */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-24 relative">
          {/* Background Pattern for Support Section */}
          <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
              <Navigation size={12} />
              Local Assistance
            </div>
            <h3 className={`text-3xl font-black mb-3 tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Support Infrastructure
            </h3>
            <p className={`text-base font-medium max-w-xl mx-auto leading-relaxed ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Locate verified application centers, Maha e-Seva Kendras, and CSC centers in your vicinity for guided application support.
            </p>
          </div>

          {loadingCenters ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full animate-pulse" />
              </div>
              <p className={`text-sm font-bold tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                Scanning nearby infrastructure...
              </p>
            </div>
          ) : centers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {centers.map((center, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-[2.5rem] border-2 ${
                    theme === 'day' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'
                  } flex flex-col hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10 group relative overflow-hidden`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                      <MapPin size={28} />
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest ${theme === 'day' ? 'text-slate-500' : 'text-slate-400'}`}>
                      <CheckCircle2 size={10} className="text-blue-500" />
                      Verified
                    </div>
                  </div>
                  
                  <h4 className={`text-lg font-black mb-2 leading-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                    {center.name}
                  </h4>
                  
                  <p className={`text-sm mb-8 flex-grow leading-relaxed font-medium ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                    {center.address}
                  </p>
                  
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={center.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest hover:underline"
                  >
                    Get Directions
                    <Navigation size={14} />
                  </motion.a>

                  {/* Soft decorative blob */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`p-16 text-center rounded-[3rem] border-4 border-dashed ${
              theme === 'day' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-800'
            } relative overflow-hidden`}>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-400">
                  <MapPin size={40} />
                </div>
                <h4 className={`text-2xl font-black mb-4 tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                  {locationError ? 'Location Access Required' : 'No Centers Found'}
                </h4>
                <p className={`text-base font-medium mb-10 max-w-md mx-auto leading-relaxed ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                  {locationError || 'We couldn\'t identify any verified support centers in your immediate area. Please try refreshing or checking a larger radius.'}
                </p>
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.reload()}
                  className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-blue-600/30 transition-all"
                >
                  <Navigation size={22} />
                  Retry Location Scan
                </motion.button>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] rounded-full" />
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className={`inline-block p-12 rounded-[3rem] ${
            theme === 'day' ? 'bg-white border-green-50' : 'bg-slate-900 border-green-900/20'
          } border shadow-2xl relative overflow-hidden group max-w-2xl w-full`}
          >
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <MessageCircle size={40} className="text-green-600" />
              </div>
              <h3 className={`text-3xl font-black mb-4 tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                Get Your <span className="text-green-600">Report on WhatsApp</span>
              </h3>
              <p className={`text-base font-medium mb-10 max-w-md mx-auto leading-relaxed ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
                Receive the complete list of eligible schemes and application details directly on your phone for easy access.
              </p>
              <motion.button
                onClick={handleWhatsAppResults}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 mx-auto shadow-2xl shadow-green-600/30 transition-all"
              >
                <MessageCircle size={24} />
                Send Report to WhatsApp
              </motion.button>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Official Support Channel
              </p>
            </div>
          </div>
        </motion.div>
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] ${
                theme === 'day' ? 'bg-white' : 'bg-slate-900'
              } shadow-2xl p-8 md:p-12`}
            >
              <button
                onClick={() => setSelectedScheme(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={24} className={theme === 'day' ? 'text-slate-600' : 'text-slate-300'} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getColorClasses(selectedScheme.icon_type).color}`}>
                  {React.createElement(getIcon(selectedScheme.icon_type), { size: 32 })}
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                  {selectedScheme.name}
                </h3>
              </div>

              <div className="space-y-8">
                <section>
                  <p className={`text-lg leading-relaxed ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {selectedScheme.description}
                  </p>
                </section>

                <section className={`p-6 rounded-3xl ${theme === 'day' ? 'bg-green-50' : 'bg-green-900/10'} border border-green-100 dark:border-green-900/20`}>
                  <h4 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <HeartPulse size={20} />
                    {t('benefitLabel')}
                  </h4>
                  <p className={`font-medium ${theme === 'day' ? 'text-slate-800' : 'text-slate-200'}`}>
                    {selectedScheme.benefits}
                  </p>
                </section>

                <section>
                  <h4 className={`font-bold mb-4 flex items-center gap-2 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                    <CheckCircle2 size={20} className="text-blue-500" />
                    {t('eligibilityCriteria')}
                  </h4>
                  <p className={`text-sm leading-relaxed ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {selectedScheme.eligibility_criteria}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h4 className={`font-bold mb-4 flex items-center gap-2 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                      <Info size={20} className="text-amber-500" />
                      {t('documentsLabel')}
                    </h4>
                    <ul className="space-y-2">
                      {selectedScheme.required_documents.map((doc, i) => (
                        <li key={i} className={`text-sm flex items-center gap-2 ${theme === 'day' ? 'text-slate-600' : 'text-slate-400'}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4 className={`font-bold mb-4 flex items-center gap-2 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                      <Phone size={20} className="text-emerald-500" />
                      {t('importantNumbers')}
                    </h4>
                    <ul className="space-y-2">
                      {selectedScheme.important_numbers.map((num, i) => (
                        <li key={i} className={`text-sm flex items-center gap-2 ${theme === 'day' ? 'text-slate-600' : 'text-slate-400'}`}>
                          <Phone size={14} className="text-emerald-500" />
                          {num}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="pt-4">
                  <motion.a
                    href={selectedScheme.link.startsWith('http') ? selectedScheme.link : `https://${selectedScheme.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-600/20"
                  >
                    {t('applyNow')}
                    <ExternalLink size={20} />
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
