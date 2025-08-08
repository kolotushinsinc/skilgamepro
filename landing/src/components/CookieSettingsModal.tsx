import React, { useState } from 'react';
import { X, Shield, BarChart3, Target } from 'lucide-react';
import { useCookieConsent } from '../contexts/CookieConsentContext';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CookiePreferences {
  functional: boolean;
  analytical: boolean;
  marketing: boolean;
}

export const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ isOpen, onClose }) => {
  const { preferences, savePreferences } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  if (!isOpen) return null;

  const handleToggle = (type: keyof CookiePreferences) => {
    if (type === 'functional') return; // Functional cookies cannot be disabled
    
    setLocalPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      functional: true,
      analytical: true,
      marketing: true,
    };
    savePreferences(allAccepted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Cookie Settings</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-slate-300 text-sm mt-2">
            Customize your cookie preferences. Functional cookies are required for the site to work properly.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Functional Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Functional Cookies</h3>
                  <p className="text-sm text-slate-300">Required for basic site functionality</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="sr-only"
                />
                <div className="w-11 h-6 bg-green-500 rounded-full shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full shadow translate-x-6 translate-y-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytical Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Analytical Cookies</h3>
                  <p className="text-sm text-slate-300">Help us understand how you use our site</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('analytical')}
                className="relative focus:outline-none"
              >
                <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ${
                  localPreferences.analytical ? 'bg-indigo-500' : 'bg-slate-600'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 translate-y-1 ${
                    localPreferences.analytical ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </div>
              </button>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Marketing Cookies</h3>
                  <p className="text-sm text-slate-300">Personalize ads and content for you</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('marketing')}
                className="relative focus:outline-none"
              >
                <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ${
                  localPreferences.marketing ? 'bg-indigo-500' : 'bg-slate-600'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 translate-y-1 ${
                    localPreferences.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/50 flex space-x-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};