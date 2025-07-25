"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="w-full pb-8 relative">
      {/* OnlyDust Promotional Banner */}
      <section className="mb-16 relative py-16">
        <Image
          src="/border.svg"
          alt=""
          fill
          className="absolute inset-0 z-0 object-cover"
        />
        
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl"
    >

      {/* Content container with dark background */}
      <div className="relative z-10 bg-[#161616] m-[2px] rounded-3xl p-12 md:p-18 overflow-hidden">
        <div className="relative z-20 flex items-center justify-between">
          {/* Text content */}
          <div className="flex-1 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl lg:text-3xl font-normal text-white leading-tight"
            >
              We are building<br />
              open-source, join<br />
              at <span className="font-mono tracking-wide">ONLYDUST</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
                className="flex mt-8 md:mt-12"
            >
                <motion.a
                href="https://www.onlydust.com"
                target="_blank"
                rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#202020] hover:bg-[#252525] text-xs text-white rounded-full transition-all duration-300 shadow-lg "
                >
               
                  OnlyDust / ZeroXBridge
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                </svg>
                </motion.a>
            </motion.div>
          </div>

          {/* Logo on the right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden md:block absolute -right-12 -top-1"
          >
            <div className="relative w-96 h-96 lg:w-[20rem] lg:h-[20rem] opacity-40">
              <Image
                src="/Onlydust.png"
                alt="OnlyDust Logo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Newsletter Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Stay in the loop!
            </h3>
            <p className="text-white max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates, stories, and product announcements
            </p>
          </motion.div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter e-mail address"
                className="flex-1 px-2 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 transition-colors"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  isSubmitted
                    ? "bg-green-600 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Subscribed!
                  </span>
                ) : (
                  <>
                    Join Newsletter
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </section>

      {/* Community Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-start justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join our <span className="font-handwriting">Community!</span>
              </h3>
              <p className="text-white max-w-2xl">
                ZeroXBridge will enable the community to vote on which assets get whitelisted and help shape key protocol decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {/* Discord */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </motion.a>

              {/* Telegram */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Links and Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col gap-4 relative">
            {/* Background SVG */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 3840 658" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g clipPath="url(#clip0_383_3360)">
                  <rect width="3840" height="658" fill="#0A0A0A"/>
                  <g clipPath="url(#clip1_383_3360)">
                    <path d="M3581.44 -157.781H3050.55C3048.12 -157.78 3045.75 -157.062 3043.73 -155.717C3041.7 -154.372 3040.13 -152.46 3039.19 -150.221C3038.25 -147.983 3037.99 -145.517 3038.45 -143.133C3038.91 -140.749 3040.06 -138.553 3041.76 -136.821L3156.34 -20.4547C3158.63 -18.1452 3159.92 -15.0201 3159.92 -11.7625C3159.92 -8.50485 3158.63 -5.37971 3156.34 -3.07019L2797.8 354.664C2796.08 356.387 2794.91 358.583 2794.44 360.972C2793.96 363.362 2794.2 365.839 2795.14 368.09C2796.07 370.342 2797.65 372.266 2799.67 373.62C2801.7 374.975 2804.08 375.698 2806.52 375.7H3030.96C3046.51 375.715 3061.91 372.654 3076.27 366.693C3090.63 360.732 3103.67 351.99 3114.64 340.969L3590.15 -136.745C3591.87 -138.468 3593.05 -140.664 3593.52 -143.054C3594 -145.444 3593.75 -147.921 3592.82 -150.172C3591.89 -152.423 3590.31 -154.347 3588.28 -155.702C3586.26 -157.056 3583.88 -157.78 3581.44 -157.781Z" fill="white"/>
                    <path d="M3012.65 578.003H3543.39C3545.82 578.002 3548.19 577.283 3550.21 575.939C3552.24 574.594 3553.81 572.682 3554.75 570.443C3555.69 568.205 3555.95 565.739 3555.49 563.355C3555.03 560.971 3553.88 558.775 3552.18 557.043L3437.6 440.677C3435.31 438.367 3434.02 435.242 3434.02 431.984C3434.02 428.727 3435.31 425.601 3437.6 423.292L3796.21 65.7103C3797.93 63.9867 3799.11 61.7912 3799.58 59.4014C3800.06 57.0116 3799.81 54.5346 3798.88 52.2835C3797.95 50.0323 3796.37 48.1079 3794.34 46.7535C3792.32 45.3991 3789.94 44.6754 3787.5 44.6739H3563.06C3547.51 44.6591 3532.11 47.7201 3517.75 53.6807C3503.38 59.6413 3490.34 68.3838 3479.37 79.4049L3003.86 557.119C3002.19 558.854 3001.06 561.043 3000.62 563.415C3000.17 565.786 3000.44 568.235 3001.37 570.458C3002.31 572.682 3003.87 574.582 3005.88 575.923C3007.88 577.264 3010.24 577.987 3012.65 578.003Z" fill="white"/>
                  </g>
                  <g opacity="0.2">
                    <g style={{mixBlendMode: "difference"}} opacity="0.7" filter="url(#filter0_f_383_3360)">
                      <path d="M1013 -522.962L1966.79 -522.962L3840.5 265.735L1013 186.4V-522.962Z" fill="#16547D"/>
                    </g>
                    <g style={{mixBlendMode: "difference"}} opacity="0.7" filter="url(#filter1_f_383_3360)">
                      <path d="M1082.44 -399.863L3444.65 -321.112V311.335L2534.39 504.818L1082.44 -399.863Z" fill="#0A365F"/>
                    </g>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_f_383_3360" x="803.569" y="-732.393" width="3246.36" height="1207.56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="104.715" result="effect1_foregroundBlur_383_3360"/>
                  </filter>
                  <filter id="filter1_f_383_3360" x="895.718" y="-586.586" width="2735.66" height="1278.13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="93.3611" result="effect1_foregroundBlur_383_3360"/>
                  </filter>
                  <clipPath id="clip0_383_3360">
                    <rect width="3840" height="658" fill="white"/>
                  </clipPath>
                  <clipPath id="clip1_383_3360">
                    <rect width="1005.91" height="735.781" fill="white" transform="translate(2794 -157.781)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-white hover:text-gray-300 transition-colors">Apps</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 transition-colors">Docs</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 transition-colors">Community</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 transition-colors">Blog</a></li>
              </ul>
            </div>
            <p className="text-white text-sm">
              All Rights Reserved, © ZeroXBridge, 2025
            </p>
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              Use the App
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;