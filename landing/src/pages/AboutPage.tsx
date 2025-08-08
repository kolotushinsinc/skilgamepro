import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, Trophy, Shield, Globe, Heart, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former chess grandmaster turned entrepreneur, passionate about bringing competitive gaming to everyone.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Tech veteran with 15+ years in gaming platforms and secure payment systems.'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Security',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Cybersecurity expert ensuring fair play and protecting our gaming community.'
    },
    {
      name: 'David Kim',
      role: 'Game Director',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Professional game designer with expertise in competitive board game mechanics.'
    }
  ];

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
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                About Skill Game
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                We're revolutionizing competitive board gaming by creating the world's premier platform for skill-based tournaments with real money prizes.
              </p>
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

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
                  <div className="text-gray-400">Active Players</div>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-green-400 mb-2">$2M+</div>
                  <div className="text-gray-400">Prizes Awarded</div>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
                  <div className="text-gray-400">Countries</div>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                    <p className="text-yellow-400 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Our Journey
            </h2>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 to-yellow-600"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2 text-white">{milestone.event}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full border-4 border-gray-900"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
              <Heart className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6 text-white">Join Our Community</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Become part of a growing community of strategic gamers from around the world.
                Whether you're a casual player or a competitive champion, there's a place for you at Skill Game.
              </p>
              <a href='https://cabinetsklg.koltech.dev/register' className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200">
                Start Playing Today
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;