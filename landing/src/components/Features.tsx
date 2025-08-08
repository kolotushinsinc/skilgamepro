import React from 'react';
import { Shield, Zap, Trophy, Users, DollarSign, Star, Lock, CheckCircle } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Fair Play',
      description: 'Advanced anti-cheat systems and secure payment processing ensure fair competition for all players.',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Matches',
      description: 'Instant matchmaking with players of similar skill levels. No waiting, just pure gaming action.',
      color: 'text-yellow-500'
    },
    {
      icon: DollarSign,
      title: 'Real Money Prizes',
      description: 'Compete for actual cash prizes. Withdraw your winnings instantly to your preferred payment method.',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Join a worldwide community of strategic gamers. Make friends, form teams, and compete together.',
      color: 'text-purple-500'
    },
    {
      icon: Trophy,
      title: 'Ranked Competitions',
      description: 'Climb the leaderboards and earn prestigious titles. Prove your strategic mastery to the world.',
      color: 'text-orange-500'
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Enjoy ad-free gaming with premium features, exclusive tournaments, and VIP support.',
      color: 'text-pink-500'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Players' },
    { value: '$2M+', label: 'Prizes Awarded' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Why Choose Skill Game Arena?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the ultimate competitive gaming platform with cutting-edge features designed for serious players.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-white">Platform Statistics</h3>
            <p className="text-gray-400">Join thousands of players in the ultimate gaming experience</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-gray-900 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Security & Trust</h3>
              <p className="text-gray-400">Your safety is our top priority</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">SSL Encrypted Transactions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">Anti-Fraud Protection</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">24/7 Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;