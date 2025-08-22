"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#09050E] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative w-48 h-48 flex items-center justify-center">

        {/* Shape 1 - Bottom Right (normal) */}
        <motion.img
          src="/preloader/image.png"
          alt=""
          className="absolute w-24 h-24 bottom-5 right-5"
          initial={{
            x: "39vw", // Start from right edge of viewport
            y: "39vh", // Start from bottom edge of viewport
            opacity: 1
          }}
          animate={{
            x: -13,  // Move to final position
            y: -13,  // Move to final position  
            opacity: [1, 1, 0] // Fade out when phase 2 starts
          }}
          transition={{
            x: { duration: 0.5, ease: "easeOut" },
            y: { duration: 0.5, ease: "easeOut" },
            opacity: { 
              duration: 1.2, 
              times: [0, 0.7, 1], 
              ease: "easeOut" 
            }
          }}
        />

        {/* Shape 2 - Top Left (rotated 180deg) */}
        <motion.img
          src="/preloader/image.png"
          alt=""
          className="absolute w-24 h-24 top-5 left-5"
          style={{ rotate: "180deg" }}
          initial={{
            x: "-39vw", // Start from left edge of viewport
            y: "-39vh", // Start from top edge of viewport
            opacity: 1
          }}
          animate={{
            x: 13,   // Move to final position
            y: 13,   // Move to final position
            opacity: [1, 1, 0] // Fade out when phase 2 starts
          }}
          transition={{
            x: { duration: 0.5, ease: "easeOut" },
            y: { duration: 0.5, ease: "easeOut" },
            opacity: { 
              duration: 1.2, 
              times: [0, 0.7, 1], 
              ease: "easeOut" 
            }
          }}
        />

        {/* Combined logo that appears and rotates */}
        <motion.div
          className="absolute w-24 h-24"
          style={{
            transform: "translate(-13px, -13px)"
          }}
          initial={{
            opacity: 0,
            rotate: 0
          }}
          animate={{
            opacity: [0, 0, 1, 1],
            rotate: [0, 0, 0, 360]
          }}
          transition={{
            duration: 4.0,
            times: [0, 0.3, 0.4, 1],
          }}
        >
          {/* Final Z logo formed by combining shapes */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <img 
              src="/preloader/image.png" 
              alt="ZeroX Logo" 
              className="w-24 h-24 absolute"
              style={{
                top: "13px",    // Match shape 2's final y position  
                left: "13px"    // Match shape 2's final x position
              }}
            />
            <img 
              src="/preloader/image.png" 
              alt="ZeroX Logo" 
              className="w-24 h-24 absolute" 
              style={{ 
                transform: 'rotate(180deg)',
                bottom: "13px",  // Match shape 1's final y position
                right: "13px"    // Match shape 1's final x position  
              }}
            />
          </div>
        </motion.div>

        {/* Circle completion border */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "160px",   // Bigger circle around the logo
            height: "160px",
            transform: "translate(-45px, -45px)", // Center around logo position
            border: "2px solid transparent"
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: [0, 0, 0, 1, 1]
          }}
          transition={{
            duration: 4.0,
            times: [0, 0.2, 0.3, 0.4, 1],
            ease: "easeOut"
          }}
        >
          {/* SVG circle that draws itself */}
          <svg 
            width="160" 
            height="160" 
            className="absolute inset-0 -rotate-90"
            style={{ overflow: 'visible' }}
          >
            <motion.circle
              cx="45"
              cy="125"
              r="100"
              fill="transparent"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{
                pathLength: 0
              }}
              animate={{
                pathLength: [0, 0, 0, 1]
              }}
              transition={{
                duration: 4.0,
                times: [0, 0.2, 0.3, 1],
                ease: "easeOut"
              }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}