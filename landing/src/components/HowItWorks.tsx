import React from 'react';
import { UserPlus, Search, Gamepad2, Trophy, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up in seconds with your email. Verify your identity and add payment method for secure transactions.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: 2,
      icon: Search,
      title: 'Find Opponents',
      description: 'Use our smart matchmaking system to find players of similar skill level. Choose from casual or ranked matches.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: 3,
      icon: Gamepad2,
      title: 'Play & Compete',
      description: 'Enter tournaments or 1v1 matches. Enjoy fair gameplay with our advanced anti-cheat protection.',
      color: 'from-green-500 to-green-600'
    },
    {
      step: 4,
      icon: Trophy,
      title: 'Win & Withdraw',
      description: 'Claim your prizes and withdraw winnings instantly. Track your progress and climb the leaderboards.',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started in minutes and begin your journey to becoming a gaming champion. It's simple, secure, and rewarding.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 relative`}>
                      <step.icon className="w-8 h-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">{step.step}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-yellow-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Start Your Journey?</h3>
            <p className="text-gray-300 mb-6">Join thousands of players competing for real money prizes every day.</p>
            <a href='https://cabinetsklg.koltech.dev/register' className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200">
              Create Free Account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;