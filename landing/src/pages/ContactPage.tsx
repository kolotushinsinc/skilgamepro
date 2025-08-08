import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Shield } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account, games, or technical issues',
      contact: 'support@skillgame.com',
      response: 'Response within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 24/7',
      response: 'Instant response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support specialists',
      contact: '+1 (555) 123-4567',
      response: 'Mon-Fri 9AM-6PM PST'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our comprehensive FAQ and guides',
      contact: 'Self-service portal',
      response: 'Available 24/7'
    }
  ];

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'account', label: 'Account Issues' },
    { value: 'payment', label: 'Payment & Billing' },
    { value: 'tournament', label: 'Tournament Support' },
    { value: 'security', label: 'Security & Fair Play' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'press', label: 'Press & Media' }
  ];

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                We're here to help! Reach out to our support team for assistance with your gaming experience.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{method.title}</h3>
                  <p className="text-gray-400 mb-3 text-sm">{method.description}</p>
                  <div className="text-blue-400 font-semibold mb-1">{method.contact}</div>
                  <div className="text-gray-500 text-xs">{method.response}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Headquarters</h4>
                        <p className="text-gray-400">
                          123 Gaming Street<br />
                          San Francisco, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Business Hours</h4>
                        <p className="text-gray-400">
                          Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                          Saturday: 10:00 AM - 4:00 PM PST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Security Issues</h4>
                        <p className="text-gray-400">
                          For security-related concerns:<br />
                          security@skillgame.com<br />
                          Available 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4 text-white">Quick Response</h3>
                  <p className="text-gray-400 mb-4">
                    We typically respond to all inquiries within 24 hours. For urgent matters, please use our live chat feature for immediate assistance.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-400 text-sm">
                      <strong>Pro Tip:</strong> Include your username and any relevant game/tournament IDs to help us assist you faster.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;