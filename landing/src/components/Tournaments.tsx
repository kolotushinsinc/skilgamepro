import React from 'react';
import { Calendar, Trophy, Users, Clock, Star } from 'lucide-react';
import { FadeInOnScroll, CountUp } from './animations';

const Tournaments: React.FC = () => {
  const tournaments = [
    {
      id: 1,
      title: 'Grand Chess Championship',
      game: 'Chess',
      prize: '$100,000',
      participants: '2,567',
      startDate: '2024-02-15',
      duration: '7 days',
      status: 'upcoming',
      featured: true
    },
    {
      id: 2,
      title: 'Speed Checkers Masters',
      game: 'Checkers',
      prize: '$25,000',
      participants: '1,234',
      startDate: '2024-02-10',
      duration: '3 days',
      status: 'live',
      featured: false
    },
    {
      id: 3,
      title: 'Backgammon World Series',
      game: 'Backgammon',
      prize: '$50,000',
      participants: '867',
      startDate: '2024-02-20',
      duration: '5 days',
      status: 'upcoming',
      featured: true
    },
    {
      id: 4,
      title: 'Lightning Tic-Tac-Toe',
      game: 'Tic-Tac-Toe',
      prize: '$5,000',
      participants: '3,456',
      startDate: '2024-02-08',
      duration: '1 day',
      status: 'live',
      featured: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500';
      case 'upcoming': return 'bg-yellow-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live Now';
      case 'upcoming': return 'Upcoming';
      case 'ended': return 'Ended';
      default: return 'Unknown';
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll direction="up" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300">
              Tournaments
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto hover:text-gray-200 transition-colors duration-300">
              Join competitive tournaments with massive prize pools. Prove your skills against the best players worldwide.
            </p>
          </div>
        </FadeInOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tournaments.map((tournament, index) => (
            <FadeInOnScroll
              key={tournament.id}
              direction="up"
              delay={200 + index * 150}
              duration={600}
            >
              <div className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl group ${tournament.featured ? 'border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-800/50 hover:shadow-yellow-500/20' : 'border-gray-700 hover:border-yellow-500 hover:shadow-blue-500/10'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="w-8 h-8 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                      {tournament.featured && (
                        <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">{tournament.title}</h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{tournament.game}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(tournament.status)} group-hover:scale-105 transition-transform duration-300`}>
                    {getStatusText(tournament.status)}
                  </div>
                </div>
              
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-4 group-hover:bg-gray-700/70 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-green-500 group-hover:animate-bounce" />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Prize Pool</span>
                    </div>
                    <p className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      {tournament.prize.startsWith('$') ? (
                        <span>
                          $<CountUp
                            end={parseInt(tournament.prize.replace(/[$,]/g, ''))}
                            duration={2000}
                          />
                        </span>
                      ) : (
                        tournament.prize
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 group-hover:bg-gray-700/70 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-500 group-hover:animate-pulse" />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Participants</span>
                    </div>
                    <p className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      <CountUp
                        end={parseInt(tournament.participants.replace(/,/g, ''))}
                        duration={2500}
                      />
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 group-hover:bg-gray-700/70 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-500 group-hover:animate-spin" style={{animationDuration: '2s'}} />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Start Date</span>
                    </div>
                    <p className="text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">{tournament.startDate}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 group-hover:bg-gray-700/70 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-500 group-hover:animate-pulse" />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Duration</span>
                    </div>
                    <p className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors duration-300">{tournament.duration}</p>
                  </div>
                </div>
              
                <a href='https://platform.skillgame.pro/register' className={`w-full flex justify-center py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  tournament.status === 'live'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-green-500/25'
                    : tournament.status === 'upcoming'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700 hover:shadow-yellow-500/25'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}>
                  {tournament.status === 'live' ? 'Join Now' : tournament.status === 'upcoming' ? 'Register' : 'View Results'}
                </a>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tournaments;