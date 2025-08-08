import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    games: [
      { name: 'Chess', href: `/chess` },
      { name: 'Checkers', href: `/checkers` },
      { name: 'Backgammon', href: `/backgammon` },
      { name: 'Tic-Tac-Toe', href: `/tic-tac-toe` }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'GDPR', href: '/GDPR' }
    ],
    support: [
      { name: 'Game Rules', href: '/game-rules' },
      { name: 'Responsible Gambling Policy', href: '/gambling-policy' },
      { name: 'Disclaimer', href: '/disclaimer' }
    ],
    legal: [              
      { name: 'AML Policy', href: '/aml' },
      { name: 'KYC Policy', href: '/kyc' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Payment and Refund Policy', href: '/payment-policy' },
      { name: 'Legal Information', href: '/legal' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
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
                <span className="text-gray-400">info@skillgame.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-400">+8 (888) 888-888</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-400">All World</span>
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
            <p className="text-gray-400 text-sm">
              © 2025 Skill Game. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
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