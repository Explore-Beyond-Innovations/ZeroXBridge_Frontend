"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GlowingProtractorSVG from "./rippleSVG";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  content: string;
  author: {
    name: string;
    image: string;
  };
}

// Move testimonials inside the component where t is available

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: t("testimonial.content"),
      author: {
        name: t("testimonial.author"),
        image: "/images/testimonial-card-profile.png",
      },
    },
    {
      id: 2,
      content: t("testimonial.content"),
      author: {
        name: t("testimonial.author"),
        image: "/images/testimonial-card-profile.png",
      },
    },
    {
      id: 3,
      content: t("testimonial.content"),
      author: {
        name: t("testimonial.author"),
        image: "/images/testimonial-card-profile.png",
      },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleManualNavigation = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full relative py-12 md:py-[4rem] px-4 md:px-6">
      {/* Background Glow Effect */}
      <div className="absolute -top-[100px] hidden sm:block md:-top-[280px] bg-blend-normal left-0 z-0">
        <Image
          src="/images/ellipse.png"
          alt="Glow Effect"
          width={500}
          height={500}
          className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] z-30"
        />
      </div>

      {/* Main Container */}
      <div className="relative bg-[#09050E] rounded-t-[20px] pt-6 md:bg-transparent w-full md:w-[90%] min-h-[500px] md:min-h-[547px] mx-auto rounded-3xl z-10">
        {/* Header */}
        <div className="text-center pb-8 space-y-6 w-full md:w-[550px] mx-auto px-4 relative z-20">
          <h2 className="text-3xl md:text-5xl font-bold bg-howitworks text-transparent leading-tight md:leading-[65px] font-manrope bg-clip-text">
            {t("testimonial.title")}
          </h2>
          <p className="text-[#D4D4D4] text-sm font-semibold sm:text-xl sm:font-normal font-roboto-serif">
            {t("testimonial.subtitle")}
          </p>
        </div>

        {/* Glowing SVG Lines */}
        <div
          className="absolute top-[35%] sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 
    
          w-full sm:w-auto flex justify-center items-center"
        >
          <GlowingProtractorSVG />
        </div>

        {/* Testimonial Cards */}
        <div className="absolute bottom-16 w-full mx-auto px-4 md:px-16 2xl:px-20 z-30">
          <div className="relative h-[250px] md:h-64 flex justify-center items-center">
            {testimonials.map((testimonial, index) => {
              const offset =
                (index - currentSlide + testimonials.length) %
                testimonials.length;
              let translateX = "0%";
              let zIndex = 0;
              let opacity = 1;
              let visibilityClass = "block"; // Default visible

              if (offset === 0) {
                zIndex = 3;
              } else if (offset === 1 || offset === testimonials.length - 1) {
                translateX = offset === 1 ? "105%" : "-105%";
                zIndex = 2;
                opacity = 0.7;
              } else {
                translateX = offset === 2 ? "210%" : "-210%";
                zIndex = 1;
                opacity = 0.4;
              }

              // Hide side cards on mobile
              if (offset !== 0) {
                visibilityClass = "hidden sm:block";
              }

              return (
                <motion.div
                  key={testimonial.id}
                  className={`absolute w-[90%] md:w-[35%] h-[250px] md:h-[243px] border-[0.4px] border-[#8B8B8B] py-4 px-6 md:px-8 bg-grid-pattern rounded-2xl font-roboto-serif ${visibilityClass} ${
                    offset === 0 ? "bg-[#2F1F4C]" : "bg-[#09050E] bg-opacity-60"
                  } backdrop-blur-sm`}
                  initial={false}
                  animate={{
                    x: translateX,
                    zIndex,
                    opacity,
                  }}
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.3,
                    },
                    opacity: { duration: 0.5 },
                  }}
                >
                  <Image
                    alt="quotes icon"
                    src={"/images/quotes.svg"}
                    width={32}
                    height={32}
                    className="mt-1 top-4 left-1 absolute"
                  />
                  <div className="text-[#D4D4D4] font-normal text-xs md:text-sm mt-[30px] leading-relaxed">
                    {testimonial.content}
                  </div>
                  <div className="flex items-center bottom-2 absolute gap-2">
                    <Image
                      src={
                        testimonial.author.image ||
                        "/images/testimonial-card-profile.png"
                      }
                      alt={testimonial.author.name}
                      width={35}
                      height={37}
                      className="rounded-full"
                    />
                    <span className="text-gray-300 text-xs font-normal">
                      {testimonial.author.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Lines */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`w-8 md:w-12 h-[2px] bg-gray-700`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="h-full bg-[#A26DFF]"
                initial={{ width: index === currentSlide ? "100%" : "0%" }}
                animate={{ width: index === currentSlide ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
