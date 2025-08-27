import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookieBanner } from './components/CookieBanner';
import SupportChat from './components/SupportChat';

// Premium Loading component matching landing design
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    
    {/* Loading Content */}
    <div className="relative z-10 text-center">
      {/* Animated Logo */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-2xl shadow-yellow-500/25 mb-4 animate-bounce">
          <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L3.09 8.26L3 9L3.09 9.74L12 16L20.91 9.74L21 9L20.91 8.26L12 2ZM12 4.74L18.26 9L12 13.26L5.74 9L12 4.74Z"/>
            <path d="M12 18L3.09 24.26L3 25L3.09 25.74L12 32L20.91 25.74L21 25L20.91 24.26L12 18ZM12 20.74L18.26 25L12 29.26L5.74 25L12 20.74Z" transform="translate(0, -14)"/>
          </svg>
        </div>
      </div>
      
      {/* Brand Name */}
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        Skill Game
      </h2>
      
      {/* Loading Spinner */}
      <div className="relative mb-6">
        <div className="w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-500 border-r-yellow-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-yellow-300 border-r-yellow-200 animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.75s'}}></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <p className="text-xl text-gray-300 mb-4 animate-pulse">
        Loading amazing gaming experience...
      </p>
      
      {/* Progress Dots */}
      <div className="flex justify-center space-x-2">
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
    
    {/* Floating Particles Effect */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  </div>
);

// Lazy load all pages for code splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));

// Game pages - highest priority for preloading
const ChessPage = React.lazy(() => import('./pages/ChessPage'));
const CheckersPage = React.lazy(() => import('./pages/CheckersPage'));
const BackgammonPage = React.lazy(() => import('./pages/BackgammonPage'));
const TicTacToePage = React.lazy(() => import('./pages/TicTacToePage'));
const BingoPage = React.lazy(() => import('./pages/BingoPage'));
const DominoPage = React.lazy(() => import('./pages/DominoPage'));
const DicePage = React.lazy(() => import('./pages/DicePage'));
const DurakPage = React.lazy(() => import('./pages/DurakPage'));

// Info pages - medium priority
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const GameRules = React.lazy(() => import('./pages/GameRulesPage'));

// Legal pages - lower priority
const AMLPage = React.lazy(() => import('./pages/AMLPage'));
const KYCPolicy = React.lazy(() => import('./pages/KYCPolicyPage'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const PaymentPolicy = React.lazy(() => import('./pages/PaymentPolicyPage'));
const ResponsibleGambling = React.lazy(() => import('./pages/ResponsibleGamblingPage'));
const Disclaimer = React.lazy(() => import('./pages/DisclaimerPage'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicyPage'));
const LegalInformation = React.lazy(() => import('./pages/LegalInformationPage'));
const AccessibilityStatement = React.lazy(() => import('./pages/AccessibilityStatementPage'));
const ComplaintHandlingPolicy = React.lazy(() => import('./pages/ComplaintHandlingPolicyPage'));
const TakedownIPInfringementProcedure = React.lazy(() => import('./pages/TakedownIPInfringementProcedurePage'));
const AppendicesLegislativeReferences = React.lazy(() => import('./pages/AppendicesLegislativeReferencesPage'));
const GDPRPage = React.lazy(() => import('./pages/GDPRPage'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chess" element={<ChessPage />} />
            <Route path="/checkers" element={<CheckersPage />} />
            <Route path="/backgammon" element={<BackgammonPage />} />
            <Route path="/tic-tac-toe" element={<TicTacToePage />} />
            <Route path="/bingo" element={<BingoPage />} />
            <Route path="/domino" element={<DominoPage />} />
            <Route path="/dice" element={<DicePage />} />
            <Route path="/durak" element={<DurakPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/aml" element={<AMLPage />} />
            <Route path="/kyc" element={<KYCPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/payment-policy" element={<PaymentPolicy />} />
            <Route path="/game-rules" element={<GameRules />} />
            <Route path="/gambling-policy" element={<ResponsibleGambling />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/legal" element={<LegalInformation />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            <Route path="/complaints" element={<ComplaintHandlingPolicy />} />
            <Route path="/takedown" element={<TakedownIPInfringementProcedure />} />
            <Route path="/appendices" element={<AppendicesLegislativeReferences />} />
            <Route path="/GDPR" element={<GDPRPage />} />
          </Routes>
        </Suspense>
        <CookieBanner />
        <SupportChat />
      </div>
    </Router>
  );
}

export default App;