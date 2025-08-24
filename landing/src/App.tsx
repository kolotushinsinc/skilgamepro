import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookieBanner } from './components/CookieBanner';
import SupportChat from './components/SupportChat';

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #333',
        borderTop: '3px solid #4f46e5',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }}></div>
      <div>Loading...</div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
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