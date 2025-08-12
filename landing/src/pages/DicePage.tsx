import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FadeInOnScroll, FloatingParticles, TypeWriter } from '../components/animations';
import { ArrowRight, Crown } from 'lucide-react';

const DicePage: React.FC = () => {
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
            count={40}
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
                  text="Dice"
                  speed={200}
                  delay={800}
                  showCursor={true}
                  cursorChar="🎲"
                />
              </h1>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={300} duration={800}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Roll the dice and test your luck! Fast-paced games with instant excitement and rewards.
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
                    src="https://i.pinimg.com/originals/18/fd/e1/18fde15323d44e0c2d6bcd23e6f2c93f.jpg"
                    alt="Dice Game"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 transition-all duration-500 group-hover:shadow-blue-500/20"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll direction="right" duration={800} delay={200}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white hover:text-blue-400 transition-colors duration-300">Roll for Victory</h2>
                  <p className="text-lg text-gray-300 mb-6 hover:text-gray-200 transition-colors duration-300">
                    Dice games are among the oldest forms of gaming, combining pure chance with strategic decision-making. Players take turns rolling the dice and trying to achieve specific combinations or highest scores based on the rules of the game.
                  </p>
                  <p className="text-lg text-gray-300 mb-6 hover:text-gray-200 transition-colors duration-300">
                    From simple high-roll competitions to complex scoring systems, dice games offer quick thrills and instant results. The unpredictable nature of dice makes every roll exciting and full of potential.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Luck</span>
                    <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Fast</span>
                    <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 hover:bg-green-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">Exciting</span>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll direction="up" duration={800} delay={400}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-8 text-white text-center">Dice Game Basics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FadeInOnScroll direction="up" delay={600} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-lg font-bold text-white">⚀⚁⚂</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Objective</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Roll dice to achieve target combinations, highest scores, or specific patterns depending on the game variant being played.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll direction="up" delay={700} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">🎲</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">Rolling</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Take turns rolling one or more dice. The outcome is determined by chance, making every roll unpredictable and exciting.
                      </p>
                    </div>
                  </FadeInOnScroll>
                  
                  <FadeInOnScroll direction="up" delay={800} duration={600}>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <span className="text-2xl font-bold text-white">🏆</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">Winning</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Victory conditions vary by game type - from achieving the highest total to rolling specific combinations or patterns.
                      </p>
                    </div>
                  </FadeInOnScroll>
                </div>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll direction="left" duration={800} delay={600}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white hover:text-purple-400 transition-colors duration-300">Why Play Dice Games?</h2>
                  <ul className="space-y-4 mb-8">
                    <FadeInOnScroll direction="right" delay={800} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Instant Excitement:</strong> Quick rounds with immediate results keep the adrenaline pumping.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={900} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Pure Chance:</strong> Everyone has an equal opportunity to win, regardless of skill level or experience.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={1000} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Variety of Games:</strong> Countless variations and rule sets provide endless entertainment options.</span>
                      </li>
                    </FadeInOnScroll>
                    
                    <FadeInOnScroll direction="right" delay={1100} duration={500}>
                      <li className="flex items-start group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><strong className="text-white">Social Fun:</strong> Perfect for groups and parties, creating shared moments of suspense and celebration.</span>
                      </li>
                    </FadeInOnScroll>
                  </ul>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll direction="right" duration={800} delay={700}>
                <div className="group">
                  <img
                    src="https://i.pinimg.com/originals/86/14/aa/8614aa2bc898a0e60aff0ae49119d8f1.jpg"
                    alt="Dice Collection"
                    className="rounded-xl shadow-2xl w-full h-auto border border-gray-700 group-hover:scale-105 group-hover:shadow-purple-500/20 transition-all duration-500"
                  />
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={1000} direction="up" className="lg:col-span-2">
                <a href='https://platform.skillgame.pro/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-105">
                    <Crown className="w-5 h-5 group-hover:animate-bounce" />
                      Roll Dice Now
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

export default DicePage;