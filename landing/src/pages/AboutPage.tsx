import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CountUp, FadeInOnScroll, FloatingParticles } from '../components/animations';
import { Users, Trophy, Shield, Globe, Heart, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: '2020', event: 'Skill Game founded', description: 'Started with a vision to revolutionize online board gaming' },
    { year: '2021', event: 'First tournament launched', description: 'Hosted our inaugural chess championship with $10,000 prize pool' },
    { year: '2022', event: '10,000 players milestone', description: 'Reached our first major player milestone across all games' },
    { year: '2023', event: '$1M in prizes awarded', description: 'Distributed over one million dollars to winning players' },
    { year: '2024', event: 'Global expansion', description: 'Launched in 25+ countries with localized support' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Fair Play',
      description: 'We maintain the highest standards of integrity with advanced anti-cheat systems and transparent gameplay.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our players are at the heart of everything we do. We build features based on community feedback and needs.'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect - from game quality to customer service and platform reliability.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making competitive gaming accessible to players worldwide, regardless of skill level or background.'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <FloatingParticles
            count={40}
            colors={['#facc15', '#3b82f6', '#8b5cf6', '#06b6d4']}
            className="opacity-20"
          />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <FadeInOnScroll direction="down" duration={800}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  About Skill Game
                </h1>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={200} duration={800}>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                  We're revolutionizing competitive board gaming by creating the world's premier platform for skill-based tournaments with real money prizes.
                </p>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  To create the ultimate competitive gaming experience where strategy meets opportunity. We believe that classic board games deserve a modern platform that rewards skill, fosters community, and provides fair competition for players worldwide.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Since our founding in 2020, we've been dedicated to building a secure, transparent, and exciting environment where players can test their skills against others and earn real rewards for their strategic mastery.
                </p>
              </div>

              <FadeInOnScroll delay={400} direction="left">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 hover:scale-105 group">
                    <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={50} suffix="K+" />
                    </div>
                    <div className="text-gray-400">Active Players</div>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 group">
                    <div className="text-3xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      $<CountUp end={2} suffix="M+" />
                    </div>
                    <div className="text-gray-400">Prizes Awarded</div>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 group">
                    <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={25} suffix="+" />
                    </div>
                    <div className="text-gray-400">Countries</div>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group">
                    <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <CountUp end={99.9} suffix="%" decimals={1} />
                    </div>
                    <div className="text-gray-400">Uptime</div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInOnScroll>
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Our Values
              </h2>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <FadeInOnScroll key={index} delay={index * 150} direction="up">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 text-center hover:scale-105 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <value.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll delay={200}>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                <Heart className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-pulse hover:scale-110 transition-transform duration-300" />
                <h2 className="text-4xl font-bold mb-6 text-white">Join Our Community</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Become part of a growing community of strategic gamers from around the world.
                  Whether you're a casual player or a competitive champion, there's a place for you at Skill Game.
                </p>
                <a href='https://platform.skillgame.pro/register' className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300">
                  Start Playing Today
                </a>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;