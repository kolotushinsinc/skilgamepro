import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FadeInOnScroll, FloatingParticles, TypeWriter } from '../components/animations';
import { ArrowRight, Crown } from 'lucide-react';

const ChessPage: React.FC = () => {
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
            count={30}
            colors={['#3b82f6', '#8b5cf6', '#1e40af', '#7c3aed']}
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
                  text="Chess"
                  speed={200}
                  delay={800}
                  showCursor={true}
                  cursorChar="♔"
                />
              </h1>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={300} duration={800}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The ultimate game of strategy and intellect. Challenge your mind on the 64 squares.
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
                    src="https://cdnn1.img.sputnik.tj/img/102716/96/1027169691_0:117:1921:1197_1920x0_80_0_0_da82f192ad5ab98403e470025ac060d5.jpg"
                    alt="Chess Game"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 group-hover:shadow-3xl group-hover:shadow-blue-500/20 transition-all duration-500"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={200} direction="right" duration={800}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">The Royal Game</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid. Each player begins with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    The objective is to checkmate the opponent's king, whereby the king is under immediate attack (in "check") and there is no way for it to escape. Many different variants exist, making chess one of the most popular and enduring games worldwide.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 cursor-default">Strategy</span>
                    <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:scale-110 transition-all duration-300 cursor-default">Tactics</span>
                    <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 hover:bg-green-500/20 hover:scale-110 transition-all duration-300 cursor-default">Classic</span>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll delay={400} duration={800}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 mb-16">
                <h2 className="text-3xl font-bold mb-8 text-white text-center">Chess Mastery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FadeInOnScroll delay={600} direction="up">
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">♔</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Objective</h3>
                      <p className="text-gray-400">
                        Checkmate your opponent's king while protecting your own. Force the king into a position where it cannot escape capture.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll delay={700} direction="up">
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">♙</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">Piece Movement</h3>
                      <p className="text-gray-400">
                        Each piece moves uniquely: pawns move forward, rooks move horizontally/vertically, bishops diagonally, knights in L-shapes, queen in any direction, and king one square at a time.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll delay={800} direction="up">
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">♛</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Advanced Strategies</h3>
                      <p className="text-gray-400">
                        Master opening principles, middle-game tactics like forks and pins, and endgame techniques. Study famous games and grandmaster strategies.
                      </p>
                    </div>
                  </FadeInOnScroll>
                </div>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll delay={500} direction="left" duration={800}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Play Chess?</h2>
                  <ul className="space-y-4 mb-8">
                    <FadeInOnScroll delay={600} direction="up">
                      <li className="flex items-start group hover:scale-105 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300"><strong className="text-white">Mental Exercise:</strong> Improves memory, concentration, and analytical thinking.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll delay={700} direction="up">
                      <li className="flex items-start group hover:scale-105 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300"><strong className="text-white">Strategic Thinking:</strong> Develops planning and foresight abilities.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll delay={800} direction="up">
                      <li className="flex items-start group hover:scale-105 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300"><strong className="text-white">Patience & Discipline:</strong> Teaches the value of patience and calculated decision-making.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll delay={900} direction="up">
                      <li className="flex items-start group hover:scale-105 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300"><strong className="text-white">Global Community:</strong> Join millions of players worldwide in clubs, tournaments, and online platforms.</span>
                      </li>
                    </FadeInOnScroll>
                  </ul>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={600} direction="right" duration={800}>
                <div className="group">
                  <img
                    src="https://masterpiecer-images.s3.yandex.net/9d640ab47a7111eebbd0e6d39d9a42a4:upscaled"
                    alt="Chess Tournament"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 group-hover:shadow-3xl group-hover:shadow-purple-500/20 transition-all duration-500"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={1000} direction="up" className="lg:col-span-2">
                <a href='https://platform.skillgame.pro/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105">
                    <Crown className="w-5 h-5 group-hover:animate-bounce" />
                      Play Chess Now
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

export default ChessPage;