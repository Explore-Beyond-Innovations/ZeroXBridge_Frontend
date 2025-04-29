"use client";
import AboutUs from "./components/about";
import FAQ from "./components/FAQ";
import Footer from "./components/footer";
import Header from "./components/header";
import HomeNav from "./components/HomeNav";
import HowItWorks from "./components/how-it-works";
import Testimonial from "./components/testimonial";

export default function Home() {
  return (
    <div className=" h-full bg-[#09050E] flex flex-col items-center w-full overflow-x-hidden">
      <HomeNav />
      <Header />
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
        <HowItWorks />
        <AboutUs />
        <FAQ />
        <Testimonial />
      </div>
      <Footer />
    </div>
  );
}