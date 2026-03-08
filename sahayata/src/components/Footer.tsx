import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ShieldCheck,
  Globe
} from 'lucide-react';

export const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const footerLinks = {
    platform: [
      { label: 'Home', href: '#' },
      { label: 'How it Works', href: '#' },
      { label: 'Schemes List', href: '#' },
      { label: 'Eligibility Check', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Support', href: '#' },
      { label: 'Application Centers', href: '#' },
      { label: 'FAQs', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Data Security', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ]
  };

  return (
    <footer className={`mt-24 border-t ${
      theme === 'day' ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
    } transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Logo size="md" theme={theme} />
              <div className="flex flex-col -space-y-1">
                <span className={`text-2xl font-black tracking-tight ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
                  Saha<span className="text-green-600">Yata</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600/70">
                  Farmer First
                </span>
              </div>
            </div>
            <p className={`text-sm leading-relaxed font-medium ${theme === 'day' ? 'text-slate-500' : 'text-slate-300'}`}>
              Empowering India's agricultural community through digital infrastructure and direct access to government welfare schemes.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-xl ${
                    theme === 'day' ? 'bg-slate-100 text-slate-600 hover:text-green-600' : 'bg-slate-900 text-slate-300 hover:text-green-500'
                  } transition-colors`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Platform
            </h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className={`text-sm font-medium transition-colors ${
                    theme === 'day' ? 'text-slate-500 hover:text-green-600' : 'text-slate-300 hover:text-green-500'
                  }`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className={`text-sm font-medium transition-colors ${
                    theme === 'day' ? 'text-slate-500 hover:text-green-600' : 'text-slate-300 hover:text-green-500'
                  }`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
              Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                  <Mail size={18} />
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>Email Support</div>
                  <a href="mailto:support@sahayata.gov.in" className={`text-sm font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>support@sahayata.gov.in</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                  <Phone size={18} />
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>Toll Free</div>
                  <a href="tel:18001234567" className={`text-sm font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>1800-123-4567</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col lg:flex-row items-center justify-between gap-8 ${
          theme === 'day' ? 'border-slate-100' : 'border-slate-900'
        }`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} className="text-green-500" />
              Official Portal
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Globe size={12} />
              Digital India Initiative
            </div>
          </div>

          <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>
            © 2026 SahaYata. All Rights Reserved.
          </div>

          <div className="flex items-center gap-8">
            {footerLinks.legal.map((link, i) => (
              <a key={i} href={link.href} className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                theme === 'day' ? 'text-slate-400 hover:text-slate-900' : 'text-slate-500 hover:text-white'
              }`}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
