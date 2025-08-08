import React from 'react';
import Hero from '../components/Hero';
import GameSelection from '../components/GameSelection';
import Tournaments from '../components/Tournaments';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <GameSelection />
      <Tournaments />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default HomePage;