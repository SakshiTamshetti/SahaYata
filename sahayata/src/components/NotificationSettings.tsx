import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MessageSquare, PhoneCall, Bell, Save, CheckCircle2, AlertTriangle } from 'lucide-react';

export const NotificationSettings = () => {
  const { user, token, updateUser } = useAuth();
  const { theme } = useTheme();
  const [whatsappEnabled, setWhatsappEnabled] = useState(user?.whatsappEnabled === 1);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/update-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ whatsappEnabled })
      });

      if (response.ok && user) {
        updateUser({ ...user, whatsappEnabled: whatsappEnabled ? 1 : 0 });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update settings', err);
    } finally {
      setSaving(false);
    }
  };

  const simulateNewScheme = async () => {
    setSimulating(true);
    try {
      const response = await fetch('/api/admin/trigger-new-scheme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeName: "PM-Kisan Samman Nidhi (New Update)",
          targetState: user?.state || "Maharashtra",
          description: "किसानों के लिए ₹2000 की अगली किस्त जारी कर दी गई है। कृपया अपना बैंक खाता जांचें।"
        })
      });
      if (response.ok) {
        alert("Alert simulated! Check backend logs or Twilio dashboard.");
      }
    } catch (err) {
      console.error('Failed to simulate alert', err);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className={`p-10 rounded-2xl border ${
      theme === 'day' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
    } shadow-xl`}>
      <div className="flex items-center gap-3 mb-8">
        <Bell className="text-slate-400" size={20} />
        <h3 className={`text-xl font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>
          Notification Control
        </h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-slate-600 dark:text-slate-400" size={20} />
            </div>
            <div>
              <p className={`text-sm font-bold ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}>WhatsApp Integration</p>
              <p className="text-xs text-slate-500">Automated alerts for new scheme availability</p>
            </div>
          </div>
          <button
            onClick={() => setWhatsappEnabled(!whatsappEnabled)}
            className={`w-10 h-5 rounded-full transition-colors relative ${whatsappEnabled ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${whatsappEnabled ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : success ? (
              <CheckCircle2 size={18} />
            ) : (
              <Save size={18} />
            )}
            {success ? 'Configuration Saved' : 'Update Preferences'}
          </button>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="text-slate-400 shrink-0" size={18} />
              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-1">Simulation Environment</span>
                Trigger a mock government update to verify notification delivery systems for your current region.
              </div>
            </div>
            <button
              onClick={simulateNewScheme}
              disabled={simulating}
              className="w-full py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {simulating ? 'Processing...' : 'Trigger Mock Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
