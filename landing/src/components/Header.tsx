import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Menu, X, ChevronDown, Gamepad2 } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGamesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const games = [
    { id: 'backgammon', name: 'Backgammon' },
    { id: 'bingo', name: 'Bingo' },
    { id: 'checkers', name: 'Checkers' },
    { id: 'chess', name: 'Chess' },
    { id: 'dice', name: 'Dice' },
    { id: 'domino', name: 'Domino' },
    { id: 'durak', name: 'Durak' },
    { id: 'tic-tac-toe', name: 'Tic-Tac-Toe' }
  ];

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
            <div
              ref={dropdownRef}
              className="relative"
            >
              <button
                onClick={() => setIsGamesDropdownOpen(!isGamesDropdownOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Gamepad2 className="w-4 h-4" />
                Games
                <ChevronDown className={`w-4 h-4 transition-transform ${isGamesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isGamesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
                  <div className="p-2">
                    <div className="space-y-1">
                      {games.map((game) => (
                        <Link
                          key={game.id}
                          to={`/${game.id}`}
                          className="block w-full px-4 py-3 text-left text-gray-300 hover:text-yellow-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium"
                          onClick={() => setIsGamesDropdownOpen(false)}
                        >
                          {game.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/game-rules" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Game Rules
            </Link>
            <Link to="/faq" className="text-gray-300 hover:text-yellow-500 transition-colors">
              FAQ
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href='https://platform.skillgame.pro/login' className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Sign In
            </a>
            <a href='https://platform.skillgame.pro/register' className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
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
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-3">
                  <Gamepad2 className="w-4 h-4" />
                  Games
                </div>
                <div className="space-y-1 pl-4">
                  {games.map((game) => (
                    <Link
                      key={game.id}
                      to={`/${game.id}`}
                      className="block w-full px-3 py-2 text-left text-gray-300 hover:text-yellow-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {game.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link to="/faq" className="text-gray-300 hover:text-yellow-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
                <a href='https://platform.skillgame.pro/login' className="d-flex px-4 py-2 text-gray-300 hover:text-white transition-colors text-center">
                  Sign In
                </a>
                <a href='https://platform.skillgame.pro/register' className="d-flex px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-center font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
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