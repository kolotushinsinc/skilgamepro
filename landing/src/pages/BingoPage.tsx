import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Crown } from 'lucide-react';

const BingoPage: React.FC = () => {
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
              Bingo
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The exciting game of chance and quick thinking. Mark your numbers and shout "Bingo!"
            </p>
          </div>
        </section>

        {/* Game Content */}
        <section className="py-16 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src="https://avatars.mds.yandex.net/i?id=abe8723d93205892f919d0635deafded_l-5341604-images-thumbs&n=13"
                  alt="Bingo Game"
                  className="rounded-xl shadow-2xl w-full h-auto border border-gray-700"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">The Numbers Game</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Bingo is a popular game where players mark off numbers on a card as they are called out randomly by a host. Each player has a unique card with numbers arranged in a 5x5 grid, with the center square typically marked as "FREE".
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  The objective is to be the first to mark off a predetermined pattern of numbers, such as a line (horizontal, vertical, or diagonal), four corners, or a full house (all numbers). When achieved, the player calls out "Bingo!" to claim victory.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">Luck</span>
                  <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Social</span>
                  <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">Classic</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">Bingo Basics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">B</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Objective</h3>
                  <p className="text-gray-400">
                    Mark off numbers on your card as they're called. Be the first to complete a winning pattern and call "Bingo!" to win.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">5×5</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Card Layout</h3>
                  <p className="text-gray-400">
                    Each card has 25 squares in a 5x5 grid. The columns are labeled B-I-N-G-O, with the center square marked as "FREE".
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Winning Patterns</h3>
                  <p className="text-gray-400">
                    Common patterns include straight lines (horizontal, vertical, diagonal), four corners, or full house (entire card).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Play Bingo?</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Easy to Learn:</strong> Simple rules make it accessible for players of all ages and skill levels.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Social Experience:</strong> Great for bringing people together and creating a fun, interactive atmosphere.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Quick Rounds:</strong> Fast-paced games keep excitement high with frequent opportunities to win.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Mental Alertness:</strong> Keeps your mind sharp by requiring quick number recognition and pattern awareness.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.bonanzastatic.com/afu/images/5717/5747/__57.jpg"
                  alt="Bingo Cards"
                  className="rounded-xl shadow-2xl w-full h-auto border border-gray-700"
                />
              </div>
              <a href='https://platform.skillgame.pro/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2 group">
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

export default BingoPage;