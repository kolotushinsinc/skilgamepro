import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy, Users, DollarSign } from 'lucide-react';
import links from '../../links.json';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Skill Game
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Compete in classic board games for real money. Join tournaments, challenge players worldwide, and prove your strategic mastery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link  to={{
                pathname: `${links.SIGN_IN_LINK}`,
            }} className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
              Sign In
            </Link>
            <Link to={{
                pathname: `${links.SIGN_UP_LINK}`,
            }} className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
              Sign Up
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <Users className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">50K+ Players</h3>
              <p className="text-gray-400">Active gaming community</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <DollarSign className="w-8 h-8 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">$2M+ Prizes</h3>
              <p className="text-gray-400">Total prize pool awarded</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <Trophy className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Daily Tournaments</h3>
              <p className="text-gray-400">Compete every day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;