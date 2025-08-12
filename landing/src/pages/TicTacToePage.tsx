import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FadeInOnScroll, FloatingParticles, TypeWriter } from '../components/animations';
import { ArrowRight, Crown } from 'lucide-react';

const TicTacToePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex flex-col bg-gray-900 text-gray-300">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <FloatingParticles
            count={25}
            colors={['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']}
            className="opacity-30"
          />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll direction="down" duration={800}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                <TypeWriter
                  text="Tic-Tac-Toe"
                  speed={140}
                  delay={800}
                  showCursor={true}
                  cursorChar="X"
                />
              </h1>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={300} duration={800}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The classic game of X's and O's. Simple rules, strategic fun for all ages.
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
                    src="https://media.printables.com/media/prints/996434/images/7583872_2b06d94c-bc98-436a-8a76-08eb398d2da1_50ba027f-7d9d-49b3-8b97-0ad206a3ac7a/thumbs/cover/1200x630/png/tictac_camera_default-camera.png"
                    alt="Tic-Tac-Toe Game"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 transition-all duration-500 group-hover:shadow-blue-500/20"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll direction="right" duration={800} delay={200}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white hover:text-blue-400 transition-colors duration-300">The Universal Classic</h2>
                  <p className="text-lg text-gray-300 mb-6 hover:text-gray-200 transition-colors duration-300">
                    Tic-Tac-Toe, also known as Noughts and Crosses, is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.
                  </p>
                  <p className="text-lg text-gray-300 mb-6 hover:text-gray-200 transition-colors duration-300">
                    Despite its simple rules, Tic-Tac-Toe is a great introduction to strategy games and combinatorial game theory. It's a perfect game for quick matches and is enjoyed by children and adults alike.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Simple</span>
                    <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Classic</span>
                    <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 hover:bg-green-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Family</span>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll direction="up" duration={800} delay={400}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-8 text-white text-center">Tic-Tac-Toe Basics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FadeInOnScroll direction="up" delay={600} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">X</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Objective</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Be the first player to get three of your marks (X or O) in a row - horizontally, vertically, or diagonally.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll direction="up" delay={700} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-lg font-bold text-white">3×3</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">Setup</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Draw a 3x3 grid. Players decide who goes first (X traditionally goes first). Players alternate turns placing their marks.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll direction="up" delay={800} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">O</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">Winning</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        If all 9 squares are filled and no player has three in a row, the game is a draw (tie). With perfect play, this is the most common outcome.
                      </p>
                    </div>
                  </FadeInOnScroll>
                </div>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll direction="left" duration={800} delay={600}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white hover:text-purple-400 transition-colors duration-300">Why Play Tic-Tac-Toe?</h2>
                  <ul className="space-y-4 mb-8">
                    <FadeInOnScroll direction="right" delay={800} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Instant Fun:</strong> Quick to learn and play, making it perfect for short breaks or casual games.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={900} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Universal Appeal:</strong> Loved by children and adults, transcending age and cultural barriers.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={1000} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Educational Value:</strong> Introduces basic strategy, pattern recognition, and logical thinking.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={1100} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Foundation Game:</strong> Serves as an excellent starting point for learning more complex strategy games.</span>
                      </li>
                    </FadeInOnScroll>
                  </ul>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll direction="right" duration={800} delay={700}>
                <div className="group">
                  <img
                    src="https://www.machines-3d.com/images/Image/Image/Alexis/publications/20190908_152856_large.jpg?1596547043335"
                    alt="Tic-Tac-Toe Board"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 group-hover:shadow-purple-500/20 transition-all duration-500"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={1000} direction="up" className="lg:col-span-2">
                <a href='https://platform.skillgame.pro/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105">
                    <Crown className="w-5 h-5 group-hover:animate-bounce" />
                      Play Tic-Tac-Toe Now
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

export default TicTacToePage;