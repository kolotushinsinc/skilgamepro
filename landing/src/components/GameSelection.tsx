import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown, Users, DollarSign } from 'lucide-react';

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Choose Your Game
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master classic board games and compete for real money prizes. Each game offers unique challenges and rewards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <div key={game.id} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(game.difficulty)} bg-gray-900/80`}>
                  {game.difficulty}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{game.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{game.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-400">Players</span>
                    </div>
                    <span className="text-sm font-semibold text-blue-400">{game.players}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-400">Prize Pool</span>
                    </div>
                    <span className="text-sm font-semibold text-green-400">{game.prize}</span>
                  </div>
                </div>
                
                <a href='https://cabinetsklg.koltech.dev/register' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2 group">
                  <Crown className="w-4 h-4" />
                    Play Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameSelection;