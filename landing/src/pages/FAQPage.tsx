import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FadeInOnScroll, FloatingParticles } from '../components/animations';
import { ChevronDown, HelpCircle, Shield, CreditCard, Trophy, Users } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is Skill Game and how does it work?",
      answer: "Skill Game is a competitive online gaming platform where players can participate in skill-based board game tournaments for real money prizes. Players compete against each other in games like Chess, Checkers, Backgammon, and more. Winners receive cash prizes based on their performance and tournament structure.",
      category: "General"
    },
    {
      id: 2,
      question: "How do I create an account and start playing?",
      answer: "Creating an account is simple! Click the 'Sign Up' button, provide your email address, create a secure password, and verify your email. Once registered, you can browse available tournaments, deposit funds, and start competing immediately. New players receive a welcome bonus to get started.",
      category: "Getting Started"
    },
    {
      id: 3,
      question: "What games are available on the platform?",
      answer: "We offer a variety of classic board games including Chess, Checkers, Backgammon, Tic-Tac-Toe, Bingo, Domino, Dice games, and Durak. Each game has different tournament formats, entry fees, and prize pools. New games are regularly added based on community feedback.",
      category: "Games"
    },
    {
      id: 4,
      question: "How do deposits and withdrawals work?",
      answer: "We support various payment methods including credit/debit cards, bank transfers, and digital wallets. Deposits are processed instantly, while withdrawals typically take 1-3 business days. All transactions are secured with bank-level encryption and comply with international financial regulations.",
      category: "Payments"
    },
    {
      id: 5,
      question: "Is the platform fair and secure?",
      answer: "Absolutely! We use advanced anti-cheat systems, random number generators for games requiring chance elements, and employ strict security measures. All games are monitored in real-time, and we have a zero-tolerance policy for cheating. Our platform is regularly audited by third-party security firms.",
      category: "Security"
    },
    {
      id: 6,
      question: "What are the tournament formats and entry fees?",
      answer: "We offer various tournament formats: Head-to-Head matches, Multi-table tournaments, Sit & Go events, and Scheduled tournaments. Entry fees range from $1 to $100+ depending on the tournament. Prize pools are distributed among top performers, with detailed payout structures shown before entry.",
      category: "Tournaments"
    },
    {
      id: 7,
      question: "Can I play for free or practice before entering paid tournaments?",
      answer: "Yes! We offer free practice games and freeroll tournaments where you can win real money without entry fees. This allows new players to familiarize themselves with the platform and improve their skills before participating in paid events.",
      category: "Getting Started"
    },
    {
      id: 8,
      question: "What happens if there's a technical issue during a game?",
      answer: "If technical issues occur during gameplay, our system automatically saves game states and can resume matches when connectivity is restored. In case of platform-wide issues, affected tournaments may be canceled with entry fees refunded. Our support team is available 24/7 to assist with any technical problems.",
      category: "Technical"
    },
    {
      id: 9,
      question: "Are there age restrictions and geographical limitations?",
      answer: "Players must be 18 years or older to participate in real money games. We operate in compliance with local laws and regulations. Some regions may have restrictions on online gaming. Please check our Terms of Service for a complete list of supported countries and any applicable restrictions.",
      category: "Legal"
    },
    {
      id: 10,
      question: "How can I improve my chances of winning?",
      answer: "Success comes through practice, study, and strategic thinking. We provide game tutorials, strategy guides, and statistics tracking to help you improve. Many professional players share tips in our community forums. Remember, while these are skill-based games, outcomes can vary and responsible gaming is important.",
      category: "Strategy"
    }
  ];

  const categories = [
    { name: "General", icon: HelpCircle, color: "blue" },
    { name: "Getting Started", icon: Users, color: "green" },
    { name: "Games", icon: Trophy, color: "purple" },
    { name: "Payments", icon: CreditCard, color: "yellow" },
    { name: "Security", icon: Shield, color: "red" },
    { name: "Tournaments", icon: Trophy, color: "indigo" },
    { name: "Technical", icon: Shield, color: "gray" },
    { name: "Legal", icon: Shield, color: "orange" },
    { name: "Strategy", icon: Trophy, color: "pink" }
  ];

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat?.color || 'gray';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat?.icon || HelpCircle;
  };

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <FloatingParticles
            count={30}
            colors={['#facc15', '#3b82f6', '#8b5cf6', '#06b6d4']}
            className="opacity-20"
          />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <FadeInOnScroll direction="down" duration={600}>
                <HelpCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-bounce" />
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={200} direction="down" duration={800}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h1>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={400} duration={800}>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                  Find answers to common questions about Skill Game, tournaments, payments, and more.
                  Can't find what you're looking for? Contact our support team.
                </p>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqData.map((faq, index) => {
                const isOpen = openAccordion === faq.id;
                const CategoryIcon = getCategoryIcon(faq.category);
                const colorClass = getCategoryColor(faq.category);
                
                return (
                  <FadeInOnScroll key={faq.id} delay={index * 50} direction="up">
                    <div className="bg-gray-900 rounded-xl border border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 overflow-hidden group">
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-inset group-hover:bg-gray-800/50 transition-colors duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-10 h-10 bg-${colorClass}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <CategoryIcon className={`w-5 h-5 text-${colorClass}-400`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 bg-${colorClass}-500/20 text-${colorClass}-400 text-xs font-semibold rounded-full group-hover:scale-105 transition-transform duration-300`}>
                                  {faq.category}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-yellow-400 transition-colors duration-300">
                                {faq.question}
                              </h3>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 flex-shrink-0 group-hover:text-yellow-500 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </button>
                    
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <div className="ml-14 pt-2 border-t border-gray-700">
                            <p className="text-gray-300 leading-relaxed mt-4 transform transition-transform duration-300">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories Overview */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInOnScroll>
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Help Categories
              </h2>
            </FadeInOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category, index) => {
                const questionCount = faqData.filter(faq => faq.category === category.name).length;
                return (
                  <FadeInOnScroll key={index} delay={index * 100} direction="up">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 text-center hover:scale-105 group">
                      <div className={`w-16 h-16 bg-${category.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <category.icon className={`w-8 h-8 text-${category.color}-400`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300">{category.name}</h3>
                      <p className="text-gray-400">
                        {questionCount} question{questionCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll delay={300}>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                <HelpCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-pulse hover:scale-110 transition-transform duration-300" />
                <h2 className="text-4xl font-bold mb-6 text-white">Still Have Questions?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Our support team is available 24/7 to help you with any questions or issues you may have.
                  Get in touch and we'll respond as quickly as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Support
                  </a>
                  <a
                    href="https://platform.skillgame.pro/register"
                    className="px-8 py-4 border border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
                  >
                    Start Playing Now
                  </a>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;