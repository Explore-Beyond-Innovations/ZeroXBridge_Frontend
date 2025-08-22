"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#09050E] flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient Effects */}
      <motion.div
        className="absolute w-[250px] h-[200px] bg-[#a26dff] backdrop-blur-[150px] filter blur-[130px] opacity-20 pointer-events-none"
        style={{
          right: "-70px",
          top: "40%",
          transform: "rotate(-114.2deg)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[250px] h-[200px] bg-[#a26dff] backdrop-blur-[150px] filter blur-[130px] opacity-20 pointer-events-none"
        style={{
          left: "-50px",
          bottom: "-150px",
          transform: "rotate(-114.2deg)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
        {/* Error Icon with Rotation Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8,
          }}
          className="mb-8 flex justify-center"
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/error-404-500.png"
              alt="500 Error Icon"
              width={200}
              height={200}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              priority
            />
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 border-2 border-[#a26dff] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Floating dots animation */}
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-[#a26dff] rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#907DBD] rounded-full"
              animate={{
                y: [0, 8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#a26dff] mb-4 font-manrope"
        >
          500
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f0f0f0] mb-4 font-manrope"
        >
          Server Error
        </motion.h2>

        {/* Descriptive Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.6,
          }}
          className="text-[#d4d4d4] text-lg sm:text-xl mb-8 max-w-md mx-auto font-geist-sans"
        >
          Something went wrong on our end. Don't worry, our team has been notified and is working to fix the issue.
        </motion.p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
            }}
            className="mb-6 p-4 bg-[#1e1e1e] rounded-lg border border-[#a26dff] text-left"
          >
            <p className="text-[#a26dff] text-sm font-semibold mb-2">Error Details (Development):</p>
            <p className="text-[#d4d4d4] text-sm font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-[#907DBD] text-xs mt-2">Error ID: {error.digest}</p>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            duration: 0.6,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={reset}
            className="px-8 py-3 bg-[#a26dff] text-white rounded-full hover:bg-[#907DBD] transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
          
          <Link href="/">
            <div className="transform transition-transform hover:scale-105 active:scale-95">
              <Button
                variant="gradientPrimary"
                className="w-full sm:w-auto"
              >
                <span>
                  Back to Home
                </span>
              </Button>
            </div>
          </Link>
        </motion.div>

        {/* Additional Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.6,
          }}
          className="mt-8 text-[#907DBD] text-sm"
        >
          <p>If the problem persists, please{" "}
            <Link href="/about" className="text-[#a26dff] hover:underline">
              contact our support team
            </Link>
            {" "}or check our{" "}
            <Link href="/dashboard" className="text-[#a26dff] hover:underline">
              status page
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-[#a26dff] rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-3 h-3 bg-[#907DBD] rounded-full opacity-60"
        animate={{
          y: [0, 15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Additional floating elements for 500 page */}
      <motion.div
        className="absolute top-1/2 left-20 w-1 h-1 bg-[#a26dff] rounded-full opacity-40"
        animate={{
          x: [0, 10, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-20 w-2 h-2 bg-[#907DBD] rounded-full opacity-40"
        animate={{
          x: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
}
