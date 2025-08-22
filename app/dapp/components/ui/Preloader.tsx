"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<"loading" | "exiting">("loading");
  const [logoRotation, setLogoRotation] = useState(0);
  const [logoScale, setLogoScale] = useState(1);
  const { theme } = useTheme();

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setProgress(100);
      const timer = setTimeout(() => {
        handleComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const animateLogoRotation = (newRotation: number, isLastRotation = false) => {
      if (isLastRotation) {
        // Final rotation: -25 degrees then back to 0
        setLogoRotation(-25);
        setLogoScale(1.3);
        setTimeout(() => {
          setLogoRotation(0);
          setLogoScale(1);
        }, 300);
      } else {
        setLogoRotation(newRotation);
        setLogoScale(1.3);
        setTimeout(() => setLogoScale(1), 200);
      }
    };

    const progressStages = [
      { progress: 30, delay: 1000 },
      { progress: 89, delay: 1000 },
      { progress: 100, delay: 1500 }
    ];

    const timeoutIds: NodeJS.Timeout[] = [];
    let totalDelay = 0;

    progressStages.forEach((stage, index) => {
      totalDelay += stage.delay;
      const timeoutId = setTimeout(() => {
        setProgress(stage.progress);
        const isLastRotation = stage.progress === 100;
        animateLogoRotation((index + 1) * 90, isLastRotation);
        
        if (stage.progress === 100) {
          setTimeout(() => {
            setAnimationPhase("exiting");
            setTimeout(() => handleComplete(), 300);
          }, 800);
        }
      }, totalDelay);
      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [handleComplete]);


  const logoColor = theme === "dark" ? "#FFFFFF" : "#ffffff";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-[9999] bg-[url('/preloader-background.svg')] bg-cover bg-no-repeat"
        aria-hidden="true"
      >
        {/* Logo centered on screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            className="relative z-40 h-[88px] w-[88px] py-[12px] px-[24px] bg-black flex items-center justify-center border-[1px] border-black rounded-[16px] shadow-md shadow-white/40"
          >
            <motion.svg
              width="60"
              height="45"
              viewBox="0 0 31 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                scale: animationPhase === "exiting" ? 0.8 : logoScale,
                rotate: logoRotation,
                transition: animationPhase === "exiting" 
                  ? { duration: 0.4, ease: "easeInOut" }
                  : { type: "spring", bounce: 0.65 }
              }}
            >
              <motion.path
                d="M24.1939 0.675781H8.06457C7.99082 0.675824 7.91873 0.697643 7.85733 0.738503C7.79593 0.779363 7.74797 0.837444 7.71945 0.905459C7.69094 0.973474 7.68314 1.0484 7.69705 1.12082C7.71095 1.19325 7.74593 1.25996 7.7976 1.31259L11.2787 4.84795C11.3484 4.91812 11.3876 5.01307 11.3876 5.11204C11.3876 5.21101 11.3484 5.30595 11.2787 5.37612L0.385924 16.2446C0.333604 16.2969 0.297978 16.3636 0.283549 16.4362C0.269121 16.5089 0.276536 16.5841 0.304858 16.6525C0.33318 16.7209 0.381138 16.7794 0.442674 16.8205C0.504209 16.8617 0.57656 16.8836 0.650586 16.8837H7.46937C7.94182 16.8841 8.4097 16.7911 8.84606 16.6101C9.28243 16.429 9.67867 16.1634 10.012 15.8285L24.4586 1.3149C24.5109 1.26253 24.5465 1.19583 24.5609 1.12322C24.5754 1.05062 24.5679 0.975364 24.5396 0.906971C24.5113 0.838577 24.4633 0.780113 24.4018 0.738964C24.3403 0.697815 24.2679 0.675828 24.1939 0.675781Z"
                fill={logoColor}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.2, ease: "easeInOut" }
                }}
              />
              <motion.path
                d="M6.91301 23.0297H23.0377C23.1115 23.0297 23.1836 23.0078 23.245 22.967C23.3064 22.9261 23.3543 22.868 23.3828 22.8C23.4114 22.732 23.4191 22.6571 23.4052 22.5847C23.3913 22.5122 23.3564 22.4455 23.3047 22.3929L19.8236 18.8575C19.7538 18.7874 19.7147 18.6924 19.7147 18.5935C19.7147 18.4945 19.7538 18.3995 19.8236 18.3294L30.7187 7.46553C30.771 7.41317 30.8066 7.34647 30.821 7.27386C30.8355 7.20125 30.8281 7.126 30.7997 7.05761C30.7714 6.98921 30.7235 6.93075 30.6619 6.8896C30.6004 6.84845 30.528 6.82646 30.454 6.82642H23.6352C23.1628 6.82597 22.6949 6.91897 22.2585 7.10006C21.8222 7.28115 21.4259 7.54676 21.0926 7.8816L6.64604 22.3952C6.59515 22.4479 6.56084 22.5145 6.54738 22.5865C6.53393 22.6585 6.5419 22.7329 6.57032 22.8005C6.59875 22.868 6.64637 22.9258 6.70728 22.9665C6.7682 23.0073 6.83973 23.0292 6.91301 23.0297Z"
                fill={logoColor}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" }
                }}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Progress Bar rising from bottom */}
        <motion.div
          initial={{ height: "0%" }}
          animate={{ 
            height: `${progress}%`,
            transition: { duration: 0.1, ease: "linear" }
          }}
          className="absolute bottom-0 left-[50%] w-[2px] mx-auto bg-[#737373] backdrop-blur-sm"
        >
          {/* Progress percentage at top of bar */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 text-white text-[14px] font-[500]"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: progress > 5 ? 1 : 0,
              transition: { duration: 0.3 }
            }}
          >
            {Math.round(progress)}%
          </motion.div>
          
          {/* Subtle glow effect at the top edge */}
          <div 
            className="absolute top-0 left-0 w-full h-1"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.8), transparent)",
              boxShadow: "0 0 10px rgba(96, 165, 250, 0.6)"
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}