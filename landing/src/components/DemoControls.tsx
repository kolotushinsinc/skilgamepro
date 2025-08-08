import React from 'react';
import { RotateCcw, Settings, Eye } from 'lucide-react';
import { useCookieConsent } from '../contexts/CookieConsentContext';

export const DemoControls: React.FC = () => {
  const { hasConsent, preferences, resetConsent } = useCookieConsent();

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Settings className="w-5 h-5 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Cookie Consent Demo</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-300 flex items-center space-x-2">
              <Eye size={16} />
              <span>Consent Status</span>
            </h3>
            <p className="text-sm">
              <span className="text-slate-400">Has Consent: </span>
              <span className={hasConsent ? 'text-green-400' : 'text-red-400'}>
                {hasConsent ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-300">Current Preferences</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Functional:</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Analytical:</span>
                <span className={preferences.analytical ? 'text-green-400' : 'text-red-400'}>
                  {preferences.analytical ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Marketing:</span>
                <span className={preferences.marketing ? 'text-green-400' : 'text-red-400'}>
                  {preferences.marketing ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={resetConsent}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2"
        >
          <RotateCcw size={18} />
          <span>Reset & Show Banner Again</span>
        </button>
      </div>
    </div>
  );
};