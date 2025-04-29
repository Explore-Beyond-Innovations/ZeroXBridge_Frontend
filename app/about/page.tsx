'use client'
import React from 'react';
import AboutTech from '../components/about-technology';
import AboutTeam from '../components/about-team';
import AboutCoreProblems from "../components/about-core-problems";
import HomeNav from '../components/HomeNav';
import Footer from '../components/footer';
import AboutHeader from '../components/about-header';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#09050E] relative items-center justify-center">
     <HomeNav />
     <div className='max-w-[1800px] mx-auto pt-12'>
     <AboutHeader />
      <AboutCoreProblems />
      <AboutTeam />
      <AboutTech />
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
