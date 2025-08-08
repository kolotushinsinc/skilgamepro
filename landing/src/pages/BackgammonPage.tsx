import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Crown } from 'lucide-react';

const BackgammonPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex flex-col bg-gray-900 text-gray-300">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Backgammon
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ancient game of luck and strategy. Race your pieces home before your opponent.
            </p>
          </div>
        </section>

        {/* Game Content */}
        <section className="py-16 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src="https://content-12.foto.my.mail.ru/community/nardyclub/_groupsphoto/h-54.jpg"
                  alt="Backgammon Game"
                  className="rounded-xl shadow-2xl w-full h-auto border border-gray-700"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">The Ancient Race</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Backgammon is one of the oldest known board games, combining elements of strategy and luck. Players move their 15 checkers according to rolls of dice, aiming to bear them all off the board first.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  The game is played on a board consisting of four tables (quadrants), each divided into six points. The unique blend of chance (dice rolls) and skill (checker movement) makes Backgammon endlessly fascinating and challenging.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">Strategy</span>
                  <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Luck</span>
                  <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">Classic</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">Backgammon Essentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">⚀ ⚅</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Objective</h3>
                  <p className="text-gray-400">
                    Move all 15 of your checkers into your home board and then bear them off (remove them from the board) before your opponent does.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">→</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Movement</h3>
                  <p className="text-gray-400">
                    Roll two dice to determine how many points you can move your checkers. You must move according to the dice values, if possible.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">●</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Hitting & Entering</h3>
                  <p className="text-gray-400">
                    Land on a single opponent checker to hit it and send it to the bar. Hitted checkers must re-enter from the opponent's home board.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Play Backgammon?</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Perfect Balance:</strong> Combines luck and skill, making it exciting for both beginners and experts.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Fast-Paced:</strong> Games are typically quick and engaging, with constant action.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Rich History:</strong> Enjoy a game with thousands of years of history and cultural significance.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Mental Challenge:</strong> Develops risk assessment, tactical thinking, and adaptability skills.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://img-s1.onedio.com/id-558d41e874e0ec76434edf89/rev-0/w-1200/h-675/f-jpg/s-4b3f74171869afeb4a4ae746bdc102c2542c610e.jpg"
                  alt="Backgammon Board"
                  className="rounded-xl shadow-2xl w-full h-auto border border-gray-700"
                />
              </div>
              <a href='https://cabinetsklg.koltech.dev/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2 group">
                  <Crown className="w-4 h-4" />
                    Play Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BackgammonPage;