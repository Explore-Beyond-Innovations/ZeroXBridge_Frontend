'use client'
import AboutUs from "./components/about";
import FAQ from "./components/FAQ";
import Footer from "./components/footer";
import Header from "./components/header";
import HomeNav from "./components/HomeNav";
import HowItWorks from "./components/how-it-works";
import JoinCommunity from "./components/join-community";
import Testimonial from "./components/testimonial";


export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full max-w-[1800px] mx-auto">
      <HomeNav />
      <Header />
      <HowItWorks />
      <AboutUs />
      <JoinCommunity />
      <FAQ />
      <Testimonial />
      <Footer />
    </div>
  );
}
