import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChessPage from './pages/ChessPage';
import CheckersPage from './pages/CheckersPage';
import BackgammonPage from './pages/BackgammonPage';
import TicTacToePage from './pages/TicTacToePage';
import AboutPage from './pages/AboutPage';
// import CookieBanner from './components/CookieBanner';


import ContactPage from './pages/ContactPage';
import AMLPage from './pages/AMLPage';
import KYCPolicy from './pages/KYCPolicyPage';
import TermsOfService from './pages/TermsOfServicePage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import PaymentPolicy from './pages/PaymentPolicyPage';
import GameRules from './pages/GameRulesPage';
import ResponsibleGambling from './pages/ResponsibleGamblingPage';
import Disclaimer from './pages/DisclaimerPage';
import CookiePolicy from './pages/CookiePolicyPage';
import LegalInformation from './pages/LegalInformationPage';
import GDPRPage from './pages/GDPRPage';

import { CookieBanner } from './components/CookieBanner';
// import { DemoControls } from './components/DemoControls';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/checkers" element={<CheckersPage />} />
          <Route path="/backgammon" element={<BackgammonPage />} />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
          <Route path="/about" element={<AboutPage />} />
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
          <Route path="/GDPR" element={<GDPRPage />} />
        </Routes>
        {/* <DemoControls /> */}
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;