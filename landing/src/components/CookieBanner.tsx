import React, { useState } from 'react';
import { Cookie, Settings } from 'lucide-react';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { CookieSettingsModal } from './CookieSettingsModal';

export const CookieBanner: React.FC = () => {
  const { showBanner, acceptAll, rejectAll } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Mobile Layout */}
            <div className="block md:hidden p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg flex-shrink-0">
                  <Cookie className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg mb-2">We use cookies</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    We use cookies to improve your experience on our site. By continuing to use the site, you agree to our{' '}
                    <a href="https://sklgames.koltech.dev/cookies" className="text-indigo-400 hover:text-indigo-300 underline">
                      cookie policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={acceptAll}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Accept All Cookies
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50 font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={rejectAll}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50 font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between p-6">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="p-3 bg-indigo-500/20 rounded-xl flex-shrink-0">
                  <Cookie className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-xl mb-2">We use cookies to enhance your experience</h3>
                  <p className="text-slate-300 leading-relaxed">
                    We use cookies to improve your experience on our site. By continuing to use the site, you agree to our{' '}
                    <a href="https://sklgames.koltech.dev/cookies" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
                      cookie policy
                    </a>
                    . You can customize your preferences or accept all cookies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0 ml-6">
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50 font-medium py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center space-x-2"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                
                <button
                  onClick={rejectAll}
                  className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50 font-medium py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Reject All
                </button>
                
                <button
                  onClick={acceptAll}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};