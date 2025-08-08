import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Crown } from 'lucide-react';

const CheckersPage: React.FC = () => {
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
              Checkers
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A classic strategy game of capturing pieces on an 8x8 board. Simple rules, endless possibilities.
            </p>
          </div>
        </section>

        {/* Game Content */}
        <section className="py-16 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src="https://dimitrovgrad-r73.gosweb.gosuslugi.ru/netcat_files/31/112/c71Ns7PgbeZiYp5Hsgs3jOfC1yQR1lIsArnV2_r82GPrn3rSS_XeegNUSdEP4fK7l7Kr2oghWtLK0Ko_6QRw7VcE.jpg"
                  alt="Checkers Game"
                  className="rounded-xl shadow-2xl w-full h-auto border border-gray-700"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">The Timeless Battle</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Checkers, also known as Draughts, is played on an 8x8 checkerboard. Each player starts with 12 pieces placed on the dark squares of the three rows closest to them. The goal is to capture all of your opponent's pieces or block them so they cannot make any moves.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  Pieces move diagonally forward. When a piece reaches the farthest row from its starting position, it becomes a "King" and can move both forward and backward diagonally. This simple yet elegant game has been enjoyed for centuries.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">Strategy</span>
                  <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Classic</span>
                  <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">Family</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">Checkers Fundamentals</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">●</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Objective</h3>
                  <p className="text-gray-400">
                    Capture all your opponent's pieces or block them so they cannot make a legal move. The last player with pieces remaining wins.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">↗</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Movement</h3>
                  <p className="text-gray-400">
                    Regular pieces move diagonally forward one square. To capture, jump over an opponent's piece to an empty square beyond it.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">♔</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Kinging</h3>
                  <p className="text-gray-400">
                    When a piece reaches the opponent's back row (crowning row), it becomes a King. Kings can move and capture diagonally in any direction.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Play Checkers?</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Easy to Learn:</strong> Simple rules make it accessible for players of all ages.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Strategic Depth:</strong> Despite simple rules, offers complex tactical and strategic possibilities.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Quick Games:</strong> Matches can be completed in a short amount of time, perfect for casual play.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300"><strong className="text-white">Mental Agility:</strong> Enhances pattern recognition, planning, and problem-solving skills.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://avatars.mds.yandex.net/i?id=4b3450e7ae907bd5d2344b8b208f87af_l-10591076-images-thumbs&n=13"
                  alt="Checkers Board"
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

export default CheckersPage;