/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { HowItWorks } from './components/HowItWorks';
import { EligibilityForm } from './components/EligibilityForm';
import { Processing } from './components/Processing';
import { Results } from './components/Results';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { MyResults } from './components/MyResults';
import { SchemesList } from './components/SchemesList';
import { Footer } from './components/Footer';
import AIChat from './components/AIChat';
import { AnimatePresence, motion } from 'motion/react';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setIsProcessing(true);
    setActivePage('processing');
  };

  const handleStartEligibility = (page?: string) => {
    if (page === 'schemes') {
      setActivePage('schemes');
      return;
    }

    if (isAuthenticated && user) {
      // Skip form and use user data
      const userData = {
        aadhaar: user.aadhaar,
        name: user.name,
        phone: user.phone,
        state: user.state,
        district: user.district,
        age: user.age.toString(),
        farmSize: user.farmSize.toString(),
        annualIncome: user.annualIncome?.toString() || '0',
        primaryCrop: user.primaryCrop || '',
        occupation: user.occupation || 'Farmer',
        category: user.category || 'General',
        gender: user.gender || 'Male',
        language: language
      };
      handleFormSubmit(userData);
    } else {
      setActivePage('eligibility');
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setShowResults(true);
    setActivePage('results');
  };

  const renderPage = () => {
    if (activePage === 'processing') {
      return <Processing onComplete={handleProcessingComplete} />;
    }
    if (activePage === 'results') {
      return <Results formData={formData} />;
    }

    switch (activePage) {
      case 'home':
        return <Home onStart={handleStartEligibility} />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'eligibility':
        return <EligibilityForm onSubmit={handleFormSubmit} />;
      case 'schemes':
        return <SchemesList />;
      case 'login':
        return <Login onLoginSuccess={() => setActivePage('schemes')} onGoToRegister={() => setActivePage('register')} />;
      case 'register':
        return <Register onRegisterSuccess={() => setActivePage('schemes')} onGoToLogin={() => setActivePage('login')} />;
      case 'my-results':
        return <MyResults />;
      default:
        return <Home onStart={handleStartEligibility} />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-green-200 selection:text-green-900">
      <Background />
      <Navbar activePage={activePage} onPageChange={(page) => {
        setActivePage(page);
        if (page !== 'results' && page !== 'processing') {
          setShowResults(false);
        }
      }} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <AIChat />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
