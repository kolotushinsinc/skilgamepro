import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown, Users, DollarSign } from 'lucide-react';
import { FadeInOnScroll, CountUp } from './animations';

const GameSelection: React.FC = () => {
  const games = [
    {
      id: 'chess',
      title: 'Chess',
      description: 'The ultimate strategy game. Test your tactical skills against masters worldwide.',
      image: 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=800',
      players: '15,234',
      prize: '$50,000',
      difficulty: 'Expert'
    },
    {
      id: 'checkers',
      title: 'Checkers',
      description: 'Classic board game with simple rules but deep strategic gameplay.',
      image: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67a99e7d6bcf180eb89c36da_67a99e866bcf180eb89c3b0d/scale_1200',
      players: '8,567',
      prize: '$25,000',
      difficulty: 'Intermediate'
    },
    {
      id: 'backgammon',
      title: 'Backgammon',
      description: 'Ancient game combining strategy and luck. Race your pieces to victory.',
      image: 'https://www.superbetinyeniadresi.net/wp-content/uploads/2020/10/Tavla-Oynanan-Bahis-Siteleri.jpg',
      players: '6,892',
      prize: '$30,000',
      difficulty: 'Advanced'
    },
    {
      id: 'tic-tac-toe',
      title: 'Tic-Tac-Toe',
      description: 'Quick matches with instant rewards. Perfect for beginners and pros alike.',
      image: 'https://media.printables.com/media/prints/996434/images/7583870_392cdefa-1c3e-4318-9225-1bc12ed72a34_47a94660-c70d-4554-8a25-288442c379ea/tictac-2_configuration_no-configuration.png',
      players: '12,445',
      prize: '$5,000',
      difficulty: 'Beginner'
    },
    {
      id: 'bingo',
      title: 'Bingo',
      description: 'Is a popular game where players mark off numbers on a card as they are called out randomly by a host.',
      image: 'https://avatars.mds.yandex.net/i?id=abe8723d93205892f919d0635deafded_l-5341604-images-thumbs&n=13',
      players: '15,234',
      prize: '$50,000',
      difficulty: 'Beginner'
    },
    {
      id: 'domino',
      title: 'Domino',
      description: 'Is a classic tile-based game where players take turns matching tiles with identical numbers of dots',
      image: 'https://wallpapers.com/images/hd/domino-2858-x-2037-background-51j0j2sp58c1n3b1.jpg',
      players: '8,567',
      prize: '$25,000',
      difficulty: 'Advanced'
    },
    {
      id: 'durak',
      title: 'Durak',
      description: 'The game is typically played by 2 to 6 players, with the objective being to get rid of all your cards before your opponents.',
      image: 'https://play-lh.googleusercontent.com/iExl3GyKHtppXeORDO5YshBcrFD7xc6BSvj4NTl5wT-Zq53LBM93Nyx6AfrRUQTP77A=w1024-h500',
      players: '6,892',
      prize: '$30,000',
      difficulty: 'Expert'
    },
    {
      id: 'dice',
      title: 'Dice',
      description: 'Players take turns rolling the dice and trying to achieve specific combinations or highest scores based on the rules of the game.',
      image: 'https://i.pinimg.com/originals/18/fd/e1/18fde15323d44e0c2d6bcd23e6f2c93f.jpg',
      players: '12,445',
      prize: '$5,000',
      difficulty: 'Advanced'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-500';
      case 'Intermediate': return 'text-yellow-500';
      case 'Advanced': return 'text-orange-500';
      case 'Expert': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Choose Your Game
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master classic board games and compete for real money prizes. Each game offers unique challenges and rewards.
            </p>
          </div>
        </FadeInOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <FadeInOnScroll key={game.id} delay={index * 100} direction="up">
              <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(game.difficulty)} bg-gray-900/80 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    {game.difficulty}
                  </div>
                </div>
              
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300">{game.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm flex-grow">{game.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between group/stat hover:scale-105 transition-transform duration-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500 group-hover/stat:animate-bounce" />
                        <span className="text-sm text-gray-400">Players</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-400">
                        <CountUp
                          end={parseInt(game.players.replace(/,/g, ''))}
                          duration={2000 + index * 200}
                        />
                      </span>
                    </div>
                    <div className="flex items-center justify-between group/stat hover:scale-105 transition-transform duration-200">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500 group-hover/stat:animate-bounce" />
                        <span className="text-sm text-gray-400">Prize Pool</span>
                      </div>
                      <span className="text-sm font-semibold text-green-400">
                        {game.prize.startsWith('$') ? (
                          <span>
                            $<CountUp
                              end={parseInt(game.prize.replace(/[$,]/g, ''))}
                              duration={2500 + index * 200}
                            />
                          </span>
                        ) : (
                          game.prize
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <a href="https://platform.skillgame.pro/register" className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto">
                    <Crown className="w-4 h-4 group-hover/btn:animate-bounce" />
                      Play Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameSelection;