'use client'
import React from 'react';
import AboutTech from '../components/about-technology';
import AboutUs from '../components/about';
import AboutTeam from '../components/about-team';
import AboutCoreProblems from "../components/about-core-problems";
import HomeNav from '../components/HomeNav';
import Footer from '../components/footer';



const AboutPage = () => {
  return (
    <main className="min-h-screen bg-dark-bg relative items-center max-w-[1800px] mx-auto justify-center">
     <HomeNav />
      <AboutUs />
      <AboutCoreProblems />
      <AboutTeam />
      <AboutTech />
      <Footer />
    </main>
  );
};

export default AboutPage;
