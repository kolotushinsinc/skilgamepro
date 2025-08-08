import React from 'react';
import { Calendar, Trophy, Users, Clock, Star } from 'lucide-react';

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Tournaments
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join competitive tournaments with massive prize pools. Prove your skills against the best players worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 hover:transform hover:scale-105 ${tournament.featured ? 'border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-800/50' : 'border-gray-700 hover:border-yellow-500'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    {tournament.featured && (
                      <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{tournament.title}</h3>
                    <p className="text-gray-400 text-sm">{tournament.game}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(tournament.status)}`}>
                  {getStatusText(tournament.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-400">Prize Pool</span>
                  </div>
                  <p className="text-xl font-bold text-green-400">{tournament.prize}</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-400">Participants</span>
                  </div>
                  <p className="text-xl font-bold text-blue-400">{tournament.participants}</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-400">Start Date</span>
                  </div>
                  <p className="text-sm font-semibold text-purple-400">{tournament.startDate}</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-400">Duration</span>
                  </div>
                  <p className="text-sm font-semibold text-orange-400">{tournament.duration}</p>
                </div>
              </div>
              
              <a href='https://cabinetsklg.koltech.dev/register' className={`w-full flex justify-center py-3 rounded-lg font-semibold transition-all duration-200 ${
                tournament.status === 'live' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' 
                  : tournament.status === 'upcoming'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}>
                {tournament.status === 'live' ? 'Join Now' : tournament.status === 'upcoming' ? 'Register' : 'View Results'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tournaments;