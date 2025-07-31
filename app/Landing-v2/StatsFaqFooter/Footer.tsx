"use client";

import { easeInOut, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
      <section className=" relative py-8 bg-[url('/border1.svg')] bg-cover 2xl:h-[1146px]">

        <div className="max-w-[3359px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Content container with dark background */}
            <div className="relative w-full md:w-[82%] mx-auto h-[462px] md:h-[410.08px] 2xl:h-[914.97px] 2xl:p-[4rem] 2xl:mt-[5rem] z-10 bg-[#161616] rounded-3xl 2xl:rounded-[42.11px] p-6 md:p-[40px] overflow-hidden group">
              <div className="relative z-20 flex flex-col gap-4 md:flex-row items-start justify-between h-full ">
                {/* Text content */}
                <div className=" max-w-2/3 md:max-w-[255px] lg:max-w-[400px] 2xl:max-w-[700px] 2xl:h-[324px]">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-[26.8px] md:text-2xl lg:text-[40.7px] 2xl:text-[72px] font-[500] text-[#eeeeee] leading-[2rem] 2xl:leading-[4.5rem] relative "
                  >
                    We are building {" "}
                    open-source, join
                    at{" "}
                    <span
                      className={`font-parmanent_marker tracking-wide leading-normal  relative text-[#eeeeee] group-hover:text-white`}
                    >
                      ONLYDUST{" "}
                      <svg
                        className="absolute -bottom-2 hidden group-hover:flex w-full right-0"
                        width="203"
                        height="12"
                        viewBox="0 0 203 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.63867 5.11889C2.06285 5.65232 6.9537 6.08292 9.98879 5.17674C10.7573 4.94727 11.6999 4.47621 12.9837 4.52923C14.6972 4.6 16.0927 6.18576 17.6464 6.45729C18.9776 6.68994 20.2702 5.9801 21.8753 4.96143C24.4111 3.35213 26.3757 5.65232 28.0885 6.40106C31.2767 7.79479 35.3734 6.83487 37.2998 6.40588C39.2324 5.97552 40.4088 5.76158 41.3712 5.97367C43.2246 6.38208 44.0496 7.90173 45.3896 8.2777C46.9964 8.72852 49.1847 6.41712 51.4904 5.22815C55.0728 3.38076 58.2916 6.61636 60.864 6.61957C62.5454 6.62167 63.6516 5.22815 67.4451 5.17192C70.5141 5.12642 73.2919 5.01606 74.5789 4.47781C75.2023 4.21708 76.2901 4.15486 77.6799 4.31393C80.0479 4.58495 80.6861 6.61636 81.3271 6.99072C81.6393 7.17298 81.9682 7.25904 82.5563 7.04856C86.3979 5.67355 89.0378 2.97874 90.9112 2.60277C91.8045 2.42351 92.5758 2.65419 93.2169 2.9209C94.593 3.49344 97.1614 6.80916 99.5891 8.54442C99.9089 8.77299 100.285 8.65368 100.661 8.49461C103.661 7.22517 106.602 3.62143 108.318 3.24546C109.899 2.89925 111.423 4.25769 113.139 5.3824C114.645 6.36949 116.031 6.61636 117.371 6.99233C120.649 7.91215 125.562 10.1511 127.811 10.0483C131.657 9.8725 133.705 3.19726 135.257 2.17699C136.553 1.32475 138.309 1.26277 139.593 1.36881C141.269 1.50723 142.381 3.1844 144.092 3.77889C147.339 4.90694 148.808 4.57904 150.095 5.06426C150.401 5.17982 150.736 5.11889 150.953 4.90681C152.019 3.86379 151.812 2.55136 152.132 2.01632C152.931 0.679749 155.556 1.7962 157.11 2.59795C158.74 3.43906 160.267 4.79112 162.089 5.86441C164.733 7.42196 167.336 8.22308 169.8 8.27931C171.557 8.31944 173.442 7.26547 177.025 6.19379C179.298 5.51397 183.172 5.44024 185.868 5.17352C188.01 4.96161 189.509 4.79755 191.172 4.47781C192.688 4.18641 194.117 3.088 195.563 2.17699C196.045 1.90867 196.682 1.59054 197.646 1.42665C198.61 1.26277 199.882 1.26277 201.836 1.90545"
                          stroke="url(#paint0_linear_307_180)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_307_180"
                            x1="1.63867"
                            y1="5.69078"
                            x2="201.836"
                            y2="5.69078"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E8B7FD" />
                            <stop offset="1" stopColor="#FFC1A6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex md:absolute bottom-0 mt-4 group-hover:bg-[url('/border1.svg')] bg-cover bg-no-repeat rounded-full px-[2px] py-[2px] w-fit 2xl:w-[516.89px] 2xl:h-[107.12px] "
                  >
                    <motion.a
                      href="https://www.onlydust.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-4 md:px-8 py-2 md:py-4 bg-[#202020] hover:bg-[#252525] text-xs 2xl:text-[35.71px] text-white rounded-full transition-all duration-300 w-full "
                    >
                      OnlyDust / ZeroXBridge
                      <svg
                        className="w-4 h-4 2xl:w-[53.56px] 2xl:h-[53.56px] transform group-hover:translate-x-1 transition-transform duration-200"
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
                  transition={{ duration: 0.6, delay: 0.3, ease: easeInOut }}
                  viewport={{ once: true }}
                  className="flex md:absolute group-hover:-right-0 group-hover:-top-[3rem] md:-right-[4rem] md:top-[3rem] 2xl:-right-[8rem] 2xl:top-[7rem] mx-auto"
                >
                  <div className="relative w-[303.31px] h-96 2xl:w-[999.26px] 2xl:h-[959.41px] lg:w-[449.92px] lg:h-[430px] group-hover:lg:w-[314px] group-hover:2xl:w-[759px] group-hover:opacity-100 opacity-20 mx-auto">
                    <Image
                      src="/onlydust.svg"
                      alt="OnlyDust Logo"
                      fill
                      className="object-contain "
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#0B0B0C] 2xl:h-[732px] flex items-center">
        <div className="w-fit mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 flex flex-col gap-4"
          >
            <h3 className="text-[32px] md:text-[48px] font-[400] text-white">
              Stay in the loop!
            </h3>
            <p className="text-white font-[300] text-[14px] md:text-[16px] max-w-[70%] md:max-w-[350px] mx-auto 2xl:mt-3">
              Subscribe to our newsletter for the latest updates, stories, and
              product announcements
            </p>
          </motion.div>

          <form onSubmit={handleNewsletterSubmit} className="w-fit mx-auto">
            <div className="flex flex-col sm:flex-row gap-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter e-mail address"
                className="flex-1 px-4 py-3 bg-[#1A1A1A] w-[400px] h-[48px] 2xl:w-[992px] 2xl:h-[78px]  rounded-[12px] 2xl:rounded-[19.53px] text-white placeholder-[#97A1A4] focus:outline-none transition-colors"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 2xl:px-10 py-3 font-[400] 2xl:h-[78px] w-fit 2xl:w-[279.05px] text-[16px] 2xl:text-[24px] text-center mx-auto rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isSubmitted ? "" : "bg-white text-black hover:bg-gray-100"
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
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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
      <section className="relative bg-[#0F0F0F] h-[790px] md:h-fit lg:h-[431px] 2xl:h-[732px] flex flex-col md:flex-row items-center justify-between w-full">
        <div className="relative z-10 w-full 2xl-w-[97%] px-4 sm:px-6 lg:px-8 py-16  flex items-center justify-center ">
          <div className="max-w-[3359px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 2xl:gap-[4rem]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="2xl:w-[1073px] flex-1 text-center lg:text-left"
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl 2xl:text-[94.96px] font-normal text-white mb-4 w-full ">
                Join our
                <br className="2xl:hidden" />
                <span className="font-parmanent_marker text-2xl 2xl:pl-6 2xl:text-[94.96px] md:text-3xl lg:text-4xl relative">
                  <svg
                    className="absolute -left-[3rem] top-0 hidden md:block 2xl:hidden"
                    width="36"
                    height="55"
                    viewBox="0 0 36 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4668 9.28125C12.8091 9.28125 14.1833 9.28125 16.9395 9.62351C18.4978 9.96577 20.3802 10.6503 22.6335 11.2596C24.8867 11.8689 27.4536 12.3823 30.0983 12.9113"
                      stroke="#383838"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.5039 46.0998C14.8781 45.5865 17.6421 44.2019 19.2886 42.5632C20.235 41.7853 21.2773 41.2615 22.3119 40.8311C22.8331 40.5718 23.3465 40.2296 23.8754 39.877"
                      stroke="#383838"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11.4297 26.9126H25.4312"
                      stroke="#383838"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Community!
                  <svg
                    className="absolute -right-[4rem] top-0 hidden md:flex 2xl:hidden"
                    width="61"
                    height="40"
                    viewBox="0 0 61 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4346 14.31C15.9671 14.0437 16.7741 13.6402 20.5766 12.3713C29.838 9.63791 36.9429 7.85463 38.7544 7.78806C39.634 7.72149 40.4328 7.58835 41.2559 7.45117"
                      stroke="#383838"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15.8379 25.6064C17.7019 25.6064 19.5658 25.6064 24.1209 25.1404C28.6759 24.6744 35.8656 23.7425 40.4347 23.2623C45.0039 22.7822 46.7347 22.7822 48.518 22.7822"
                      stroke="#383838"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.6445 34.8862C17.4434 34.8862 18.2422 34.8862 21.25 34.8862C24.2578 34.8862 29.4503 34.8862 32.7244 34.9528C35.9984 35.0194 37.1967 35.1525 38.4313 35.2897"
                      stroke="#383838"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>
              <p className="text-gray-400 text-base md:text-[16px] 2xl:text-[35.61px] 2xl:mt-12 2xl:leading-[2.5rem] w-[290px] 2xl:w-full mx-auto lg:mx-0">
                ZeroXBridge will enable the community
                <br className="hidden sm:block" />
                to vote on which assets get whitelisted
                <br className="hidden sm:block" />
                and help shape key protocol decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 w-full 2xl:w-[1658.68px] lg:h-[534px] items-center"
            >
              {/* Discord */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group flex-1 w-full md:w-[310px] lg:w-[400px] 3xl:w-[814px] 2xl:h-[429.56px] h-[257px] md:h-[280px] rounded-[16px] bg-[#161616]"
              >
                <div className="relative w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden">
                  <motion.svg
                    className="absolute z-20 hidden group-hover:block transition-all ease-linear overflow-hidden w-full h-full"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.3, ease: 'easeOut' }}
                    viewBox="0 0 400 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.19"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M181.297 94.8592L34.537 -135.772L-75.7716 -25.463L154.859 121.297L-111.996 62.0056L-112.008 217.994L154.853 158.697L-75.7716 305.463L34.537 415.772L181.297 185.141L122.006 451.996L277.994 452.008L218.697 185.147L365.463 415.772L475.772 305.463L245.141 158.703L511.996 217.994L512.008 62.0056L245.141 121.297L475.772 -25.463L365.463 -135.772L218.703 94.8592L277.994 -171.996L122.006 -172.008L181.297 94.8592Z"
                      fill="url(#paint0_radial_174_914)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_174_914"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(200 140) rotate(-45) scale(295.901)"
                      >
                        <stop stopColor="white" stopOpacity="0.4" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </motion.svg>

                  <div className="relative z-30 w-[94px] h-[94px] bg-[#282828] group-hover:bg-[#5865F2]  rounded-2xl flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-20 h-20 text-gray-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full group-hover:md:flex items-center justify-between h-fit absolute py-3 -bottom-12 hidden">
                  <p className="w-fit text-[16px]">Discord</p>
                  <ArrowUpRight className="text-white w-[24px] h-[24px]" />
                </div>
              </motion.a>

              {/* Telegram */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group flex-1 w-full md:w-[310px] lg:w-[400px] 3xl:w-[814px] 2xl:h-[429.56px] h-[257px] md:h-[280px] rounded-[16px] bg-[#161616]"
              >
                <div className="relative w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden">
                <motion.svg
                    className="absolute z-20 hidden group-hover:block transition-all ease-linear overflow-hidden w-full h-full"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.3, ease: 'easeOut' }}
                    viewBox="0 0 400 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.19"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M181.297 94.8592L34.537 -135.772L-75.7716 -25.463L154.859 121.297L-111.996 62.0056L-112.008 217.994L154.853 158.697L-75.7716 305.463L34.537 415.772L181.297 185.141L122.006 451.996L277.994 452.008L218.697 185.147L365.463 415.772L475.772 305.463L245.141 158.703L511.996 217.994L512.008 62.0056L245.141 121.297L475.772 -25.463L365.463 -135.772L218.703 94.8592L277.994 -171.996L122.006 -172.008L181.297 94.8592Z"
                      fill="url(#paint0_radial_174_915)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_174_915"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(200 140) rotate(-45) scale(295.901)"
                      >
                        <stop stopColor="white" stopOpacity="0.4" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </motion.svg>
                  <div className="relative z-30 w-[94px] h-[94px] bg-[#282828] group-hover:bg-[#37AEE2] group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-20 h-20 transition-colors duration-300"
                      viewBox="0 0 80 71"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.5352 58.1719C27.5156 58.1719 27.6992 57.4375 27.1484 55.6016L21.2734 36.3242L66.2539 9.88672"
                        className="fill-[#BCBCBC] group-hover:fill-white transition-colors duration-300"
                      />
                      <path
                        d="M29.5352 58.1719C30.8203 58.1719 31.5547 57.4375 32.4727 56.7031L40.7344 48.8086L30.4531 42.5664"
                        className="fill-[#444444] group-hover:fill-gray-300 transition-colors duration-300"
                      />
                      <path
                        d="M30.4531 42.5664L55.2382 60.7422C57.8085 62.3945 60.0117 61.4766 60.746 58.1719L70.8437 10.8047C71.7617 6.76564 69.1913 4.9297 66.4374 6.21486L7.50384 28.9805C3.64837 30.4492 3.64837 32.8359 6.76947 33.7539L22.0077 38.5274L56.8906 16.3125C58.5429 15.3945 60.0117 15.7617 58.9101 17.0469"
                        className="fill-[#696969] group-hover:fill-gray-200 transition-colors duration-300"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full group-hover:md:flex items-center justify-between h-fit absolute py-3 -bottom-12 hidden">
                  <p className="w-fit text-[16px]">Telegram</p>
                  <ArrowUpRight className="text-white w-[24px] h-[24px]" />
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Links and Copyright */}
      <div className="w-full h-[383px] hidden md:flex justify-between items-center px-[4rem] relative bg-[#070707]">
        <div className="w-1/3 ">
          <h4 className="text-white font-[700] mb-2 2xl:text-[20px]">Quick Links</h4>
          <ul className="space-y-2 text-[#B2B2B2] text-[14px] 2xl:text-[20px]">
            <li>
              <a
                href="#"
                className=" transition-colors"
              >
                Apps
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" transition-colors"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" transition-colors"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" transition-colors"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-[url('/footer.svg')] bg-cover bg-no-repeat opacity-60 bg-blend-screen w-1/3 h-[300px] absolute bottom-0 right-0"></div>
        <svg
          className="absolute top-0 right-0"
          width="581"
          height="318"
          viewBox="0 0 581 318"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_307_309)">
            <path
              d="M476.243 -127H155.158C153.69 -126.999 152.255 -126.565 151.032 -125.751C149.81 -124.938 148.855 -123.782 148.288 -122.428C147.72 -121.074 147.565 -119.582 147.842 -118.141C148.118 -116.699 148.815 -115.371 149.843 -114.323L219.14 -43.945C220.53 -42.5482 221.31 -40.6582 221.31 -38.688C221.31 -36.7178 220.53 -34.8277 219.14 -33.4309L2.30008 182.926C1.25854 183.969 0.549351 185.296 0.262117 186.742C-0.0251161 188.187 0.122495 189.685 0.6863 191.047C1.2501 192.408 2.20481 193.572 3.42978 194.391C4.65476 195.21 6.09504 195.648 7.56867 195.649H143.309C152.714 195.658 162.028 193.807 170.715 190.202C179.402 186.597 187.29 181.309 193.925 174.644L481.511 -114.277C482.553 -115.32 483.262 -116.647 483.549 -118.093C483.836 -119.538 483.689 -121.036 483.125 -122.398C482.561 -123.759 481.606 -124.923 480.382 -125.742C479.157 -126.561 477.716 -126.999 476.243 -127Z"
              fill="white"
            />
            <path
              d="M132.238 318.002H453.231C454.699 318.001 456.134 317.567 457.356 316.753C458.579 315.94 459.534 314.784 460.101 313.43C460.669 312.076 460.824 310.584 460.547 309.142C460.27 307.701 459.574 306.373 458.546 305.325L389.249 234.947C387.859 233.55 387.079 231.66 387.079 229.69C387.079 227.72 387.859 225.83 389.249 224.433L606.135 8.16768C607.176 7.12521 607.886 5.79741 608.173 4.35205C608.46 2.90669 608.312 1.40862 607.749 0.0471182C607.185 -1.31438 606.23 -2.47824 605.005 -3.29738C603.78 -4.11653 602.34 -4.55421 600.866 -4.55514H465.125C455.72 -4.56409 446.407 -2.71279 437.72 0.892176C429.033 4.49715 421.145 9.78459 414.51 16.4502L126.924 305.371C125.911 306.421 125.228 307.745 124.96 309.179C124.692 310.613 124.851 312.094 125.416 313.439C125.982 314.784 126.93 315.933 128.143 316.744C129.355 317.555 130.779 317.992 132.238 318.002Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_307_309">
              <rect
                width="608.372"
                height="445"
                fill="white"
                transform="translate(0 -127)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="w-full bg-[#0B0B0C] mt-2  md:bg-[#0F0F0F] h-[90px] md:h-[78px] flex justify-between items-center">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-[40px]">
          <div className="flex flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[#D0D0D0] max-w-[35%] md:max-w-full text-[14px] 2xl:text-[20px]">
              All Rights Reserved, © ZeroXBridge, 2025
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 md:px-6 py-2 h-[37px] 2xl:w-[182px] 2xl:h-[44px] bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#D0D0D0] font-[400] text-[12px] md:text-[14px] 2xl:text-[20px] rounded-full transition-all duration-300 flex items-center gap-2"
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
