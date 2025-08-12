import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FadeInOnScroll, FloatingParticles, TypeWriter } from '../components/animations';
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, Shield } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account, games, or technical issues',
      contact: 'support@skillgame.pro',
      response: 'Response within 24 hours'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our comprehensive FAQ and guides',
      contact: 'Self-service portal',
      response: 'Available 24/7'
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
            colors={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']}
            className="opacity-20"
          />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <FadeInOnScroll direction="down" duration={800}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  <TypeWriter
                    text="Contact Us"
                    speed={120}
                    delay={500}
                    showCursor={true}
                    cursorChar="█"
                  />
                </h1>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={200} duration={800}>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  We're here to help! Reach out to our support team for assistance with your gaming experience.
                </p>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {contactMethods.map((method, index) => (
                <FadeInOnScroll key={index} delay={index * 200} direction="up">
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 text-center hover:scale-105 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">{method.title}</h3>
                    <p className="text-gray-400 mb-3 text-sm">{method.description}</p>
                    <div className="text-blue-400 font-semibold mb-1">
                      {method.contact === 'Self-service portal' ? (
                        <Link
                          to="/faq"
                          className="hover:text-blue-300 transition-colors underline decoration-dotted underline-offset-4 hover:scale-105 inline-block transform transition-transform duration-200"
                        >
                          {method.contact}
                        </Link>
                      ) : method.contact === 'support@skillgame.pro' ? (
                        <a
                          href="mailto:support@skillgame.pro"
                          className="hover:text-blue-300 transition-colors underline decoration-dotted underline-offset-4 hover:scale-105 inline-block transform transition-transform duration-200"
                        >
                          {method.contact}
                        </a>
                      ) : (
                        method.contact
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">{method.response}</div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <FadeInOnScroll delay={400}>
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Contact Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FadeInOnScroll delay={600} direction="up">
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full hover:scale-105 group">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">Headquarters</h4>
                          </div>
                          <div className="flex-grow">
                            <p className="text-gray-400 leading-relaxed">
                              Archiepiskopou Makariou III<br />
                              Larnaca, 84 Office 1 6017<br />
                              Cyprus
                            </p>
                          </div>
                        </div>
                      </div>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={700} direction="up">
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full hover:scale-105 group">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">Email Support</h4>
                          </div>
                          <div className="flex-grow space-y-2">
                            <div className="text-gray-400 hover:scale-105 transition-transform duration-200">
                              <span className="text-gray-300 font-medium">General:</span><br />
                              <a href="mailto:support@skillgame.pro" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-dotted underline-offset-2">support@skillgame.pro</a>
                            </div>
                            <div className="text-gray-400 hover:scale-105 transition-transform duration-200">
                              <span className="text-gray-300 font-medium">Technical:</span><br />
                              <a href="mailto:tech@skillgame.pro" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-dotted underline-offset-2">tech@skillgame.pro</a>
                            </div>
                            <div className="text-gray-400 hover:scale-105 transition-transform duration-200">
                              <span className="text-gray-300 font-medium">Business:</span><br />
                              <a href="mailto:business@skillgame.pro" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-dotted underline-offset-2">business@skillgame.pro</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeInOnScroll>

                    <FadeInOnScroll delay={800} direction="up">
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full md:col-span-2 lg:col-span-1 hover:scale-105 group">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">Business Hours</h4>
                          </div>
                          <div className="flex-grow space-y-2">
                            <div className="text-gray-400 hover:scale-105 transition-transform duration-200">
                              <span className="text-gray-300 font-medium">Monday - Friday:</span><br />
                              9:00 AM - 6:00 PM PST
                            </div>
                            <div className="text-gray-400 hover:scale-105 transition-transform duration-200">
                              <span className="text-gray-300 font-medium">Saturday:</span><br />
                              10:00 AM - 4:00 PM PST
                            </div>
                            <div className="text-gray-400 hover:scale-105 transition-transform duration-200">
                              <span className="text-gray-300 font-medium">Sunday:</span><br />
                              Closed
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeInOnScroll>
                  </div>

                  <FadeInOnScroll delay={900}>
                    <div className="mt-8 pt-8 border-t border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300">
                          <p className="text-blue-400 text-sm">
                            <strong>Pro Tip:</strong> Include your username and any relevant game/tournament IDs to help us assist you faster.
                          </p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 hover:bg-green-500/20 hover:scale-105 transition-all duration-300">
                          <p className="text-green-400 text-sm">
                            <strong>Average Response Time:</strong> Email support responds within 2-4 hours during business hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeInOnScroll>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;