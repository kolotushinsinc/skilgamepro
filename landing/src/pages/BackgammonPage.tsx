import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FadeInOnScroll, FloatingParticles, TypeWriter } from '../components/animations';
import { ArrowRight, Crown } from 'lucide-react';

const BackgammonPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex flex-col bg-gray-900 text-gray-300 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden w-full">
          <FloatingParticles
            count={30}
            colors={['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981']}
            className="opacity-30"
          />
          
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <div className="absolute top-10 left-4 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll direction="down" duration={800}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                <TypeWriter
                  text="Backgammon"
                  speed={150}
                  delay={800}
                  showCursor={true}
                  cursorChar="⚀"
                />
              </h1>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={300} duration={800}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The ancient game of luck and strategy. Race your pieces home before your opponent.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Game Content */}
        <section className="py-16 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <FadeInOnScroll direction="left" duration={800}>
                <div className="group">
                  <img
                    src="https://content-12.foto.my.mail.ru/community/nardyclub/_groupsphoto/h-54.jpg"
                    alt="Backgammon Game"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 transition-all duration-500 group-hover:shadow-blue-500/20"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll direction="right" duration={800} delay={200}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white hover:text-blue-400 transition-colors duration-300">The Ancient Race</h2>
                  <p className="text-lg text-gray-300 mb-6 hover:text-gray-200 transition-colors duration-300">
                    Backgammon is one of the oldest known board games, combining elements of strategy and luck. Players move their 15 checkers according to rolls of dice, aiming to bear them all off the board first.
                  </p>
                  <p className="text-lg text-gray-300 mb-6 hover:text-gray-200 transition-colors duration-300">
                    The game is played on a board consisting of four tables (quadrants), each divided into six points. The unique blend of chance (dice rolls) and skill (checker movement) makes Backgammon endlessly fascinating and challenging.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Strategy</span>
                    <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Luck</span>
                    <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 hover:bg-green-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Classic</span>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll direction="up" duration={800} delay={400}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-8 text-white text-center">Backgammon Essentials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FadeInOnScroll direction="up" delay={600} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">⚀ ⚅</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Objective</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Move all 15 of your checkers into your home board and then bear them off (remove them from the board) before your opponent does.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll direction="up" delay={700} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">→</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">Movement</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Roll two dice to determine how many points you can move your checkers. You must move according to the dice values, if possible.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll direction="up" delay={800} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">●</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">Hitting & Entering</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Land on a single opponent checker to hit it and send it to the bar. Hitted checkers must re-enter from the opponent's home board.
                      </p>
                    </div>
                  </FadeInOnScroll>
                </div>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll direction="left" duration={800} delay={600}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white hover:text-purple-400 transition-colors duration-300">Why Play Backgammon?</h2>
                  <ul className="space-y-4 mb-8">
                    <FadeInOnScroll direction="right" delay={800} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Perfect Balance:</strong> Combines luck and skill, making it exciting for both beginners and experts.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={900} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Fast-Paced:</strong> Games are typically quick and engaging, with constant action.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={1000} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Rich History:</strong> Enjoy a game with thousands of years of history and cultural significance.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={1100} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Mental Challenge:</strong> Develops risk assessment, tactical thinking, and adaptability skills.</span>
                      </li>
                    </FadeInOnScroll>
                  </ul>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll direction="right" duration={800} delay={700}>
                <div className="group">
                  <img
                    src="https://img-s1.onedio.com/id-558d41e874e0ec76434edf89/rev-0/w-1200/h-675/f-jpg/s-4b3f74171869afeb4a4ae746bdc102c2542c610e.jpg"
                    alt="Backgammon Board"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 group-hover:shadow-purple-500/20 transition-all duration-500"
                  />
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll delay={1000} direction="up" className="lg:col-span-2">
                <a href='https://platform.skillgame.pro/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105">
                    <Crown className="w-5 h-5 group-hover:animate-bounce" />
                      Play Backgammon Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BackgammonPage;