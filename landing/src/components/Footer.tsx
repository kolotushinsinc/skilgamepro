import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import { XIcon, TelegramIcon } from './icons';

const Footer: React.FC = () => {
  const footerLinks = {
    games: [
      { name: 'Chess', href: `/chess` },
      { name: 'Checkers', href: `/checkers` },
      { name: 'Backgammon', href: `/backgammon` },
      { name: 'Tic-Tac-Toe', href: `/tic-tac-toe` },
      { name: 'Bingo', href: `/bingo` },
      { name: 'Dice', href: `/dice` },
      { name: 'Domino', href: `/domino` },
      { name: 'Durak', href: `/durak` }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'GDPR', href: '/GDPR' }
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Game Rules', href: '/game-rules' },
      { name: 'Responsible Gambling Policy', href: '/gambling-policy' },
      { name: 'Disclaimer', href: '/disclaimer' }
    ],
    legal: [
      { name: 'AML & KYC Policy', href: '/aml' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund & Billing Policy', href: '/payment-policy' },
      { name: 'Security & Fraud Prevention Policy', href: '/legal' },
      { name: 'Accessibility Statement', href: '/accessibility' },
      { name: 'Complaint Handling Policy', href: '/complaints' },
      { name: 'Takedown & IP Infringement Procedure', href: '/takedown' },
      { name: 'Appendices – Legislative References', href: '/appendices' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61579037923443', label: 'Facebook' },
    { icon: XIcon, href: 'https://x.com/skill1game', label: 'X' },
    { icon: TelegramIcon, href: 'https://t.me/skill1game', label: 'Telegram' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              Skill Game
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The premier destination for competitive board game tournaments. Join millions of players worldwide and compete for real money prizes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-500" />
                <a
                  href="mailto:support@skillgame.pro"
                  className="text-gray-400 hover:text-yellow-500 transition-colors underline decoration-dotted underline-offset-2"
                >
                  support@skillgame.pro
                </a>
              </div>
            </div>
          </div>
          
          {/* Games */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Games</h4>
            <ul className="space-y-2">
              {footerLinks.games.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© 2025 Skill Game. All rights reserved.</p>
              <p className="mt-1">
                UNITYRISE HOLDING LTD, Registration Number: 474712
              </p>
              <p>Jurisdiction: Republic of Cyprus, EU</p>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8" style={{ display: "flex", justifyContent: "center" }}>
              <img src='/Visa_Brandmark_White_RGB_2021.png' style={{ width: "100px", objectFit: "contain" }} />
              <img src='/mastercard_circles_92px_2x.png' style={{ width: "100px", objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;