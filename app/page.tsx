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
    <div className="min-h-screen bg-black flex flex-col items-center w-full">
      <HomeNav />
      <Header />
      <HowItWorks />
      <AboutUs />
      <FAQ />
      <JoinCommunity />
      <Testimonial />
      <Footer />
    </div>
  );
}
