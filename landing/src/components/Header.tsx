import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Skill Game
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/chess" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Chess
            </Link>
            <Link to="/checkers" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Checkers
            </Link>
            <Link to="/backgammon" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Backgammon
            </Link>
            <Link to="/tic-tac-toe" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Tic-Tac-Toe
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href='https://cabinetsklg.koltech.dev/login' className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Sign In
            </a>
            <a href='https://cabinetsklg.koltech.dev/register' className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
              Sign Up
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <Link to="/chess" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Chess
              </Link>
              <Link to="/checkers" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Checkers
              </Link>
              <Link to="/backgammon" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Backgammon
              </Link>
              <Link to="/tic-tac-toe" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Tic-Tac-Toe
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
                <a href='https://cabinetsklg.koltech.dev/login' className="d-flex px-4 py-2 text-gray-300 hover:text-white transition-colors text-center">
                  Sign In
                </a>
                <a href='https://cabinetsklg.koltech.dev/register' className="d-flex px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-center font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;