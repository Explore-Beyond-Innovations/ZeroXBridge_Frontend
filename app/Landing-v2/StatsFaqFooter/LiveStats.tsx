"use client";

import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

interface Transaction {
  id: string;
  type: string;
  from: string;
  amount: string;
  value: string;
  icon?: "swap" | "arrow";
}

const LiveStats = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "Swapped to STRK",
      from: "0x07296...cfede",
      amount: "+400 USDT",
      value: "$399.6",
      icon: "swap",
    },
    {
      id: "2",
      type: "Swapped to STRK",
      from: "0x07296...cfede",
      amount: "+400 USDT",
      value: "$399.6",
      icon: "arrow",
    },
  ];

  return (
    <section className="w-full px-8 lg:px-0 xl:px-[40px] 2xl:px-0 py-16 2xl:py-24 bg-[#0B0B0C] lg:h-[427px] 2xl:h-[818px] 2xl:max-w-[3359px] mx-auto">
      <div className="w-full lg:w-[95%] 2xl:w-[90%] mx-auto max-w-[3359px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <AutoFadeTextWrapper
            as="h2"
            className="font-mono font-[500] text-sm 2xl:text-[32px]  self-start px-2 uppercase  2xl:pl-[40px] "
          >
            LIVE STATS
          </AutoFadeTextWrapper>
        </motion.div>

        <div className="grid grid-cols-1 lg:flex lg::flex-row gap-3 2xl:gap-4  w-full items-center justify-center 2xl:justify-between 2xl:px-[2rem]">
          {/* Total Value Locked Card */}
          <div className='hover:bg-[url("/border1.svg")] bg-cover bg-no-repeat h-[180px] w-full  lg:w-[415px] 2xl:w-[892px] 2xl:h-[463.19] px[6px] py-[4px] rounded-[16px] 2xl:rounded-[42px] flex items-center justify-center group'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] border border-[#1f1f1f] rounded-[16px] 2xl:rounded-[42px] px-4 py-3 2xl:px-8 2xl:py-8 flex flex-col justify-between h-[176px] w-[99%]  lg:w-[402px] 2xl:w-[99.5%] 2xl:h-[458px] relative overflow-hidden"
            >
              <h3 className="text-[15.72px] 2xl:text-[42.11px] font-normal text-gray-400">
                Total Value Locked
              </h3>
              <div className="flex items-end ">
                <motion.div className="backdrop-blur-md 2xl:w-[422.39px] 2xl:h-[126.32px] 2xl:px-10 bg-[#1a1a1a] group-hover:bg-[#fff] transition-all duration-300 rounded-full px-5 py-3 flex items-center gap-2 group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
                 whileHover={{
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 1000,
                    damping: 5,
                  },
                }}
                >
                  <svg
                    className="group-hover:hidden w-[14.5px] 2xl:w-[38.16px] 2xl:h-[48.03px] h-[18.25px] text-[#fff]  transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="text-gray-300 group-hover:text-black text-sm 2xl:text-[42.11px] font-[500]">
                    Coming Soon
                  </span>
                </motion.div>
              </div>
              <svg
                className="absolute hidden group-hover:flex top-0 right-0 2xl:scale-[2.5] 2xl:right-[5rem] 2xl:top-[8rem]"
                width="110"
                height="172"
                viewBox="0 0 110 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M128.667 72.9167H64.334M128.667 72.9167C141.991 72.9167 152.792 83.7178 152.792 97.0417V137.25C152.792 150.574 141.991 161.375 128.667 161.375H64.334C51.0101 161.375 40.209 150.574 40.209 137.25V97.0417C40.209 83.7178 51.0101 72.9167 64.334 72.9167M128.667 72.9167V48.7917C128.667 31.0265 114.266 16.625 96.5007 16.625C78.7355 16.625 64.334 31.0265 64.334 48.7917V72.9167M96.5007 105.083V129.208"
                  stroke="#202020"
                  strokeWidth="16.0833"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* XZB Supply Card */}
          <div className='hover:bg-[url("/border1.svg")] bg-cover bg-no-repeat h-[180px] w-full  lg:w-[415px] 2xl:w-[892px] 2xl:h-[463.19] px[6px] py-[4px] rounded-[16px] 2xl:rounded-[42px] flex items-center justify-center group'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#141414] border border-[#1f1f1f] rounded-[16px] 2xl:rounded-[42px] px-4 py-3 2xl:px-8 2xl:py-8 flex flex-col justify-between h-[176px] w-[99%]  lg:w-[402px] 2xl:w-[99.5%] 2xl:h-[458px] relative"
            >
              <h3 className="text-[15.72px] 2xl:text-[42.11px] font-normal text-gray-400">
                xZB Supply
              </h3>
              <div className="flex items-end">
                <button className="backdrop-blur-md 2xl:w-[422.39px] 2xl:h-[126.32px] 2xl:px-10 bg-[#1a1a1a] group-hover:bg-[#fff] transition-all duration-300 rounded-full px-5 py-3 flex items-center gap-2 group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30">
                  <svg
                    className="group-hover:hidden w-[14.5px] h-[18.25px] 2xl:w-[38.16px] 2xl:h-[48.03px] text-[#fff]  transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="text-gray-300 2xl:text-[42.11px] group-hover:text-black text-sm font-[500]">
                    Coming Soon
                  </span>
                </button>
              </div>
              <svg
                className="absolute -right-1 -top-1 rounded-[16px] hidden group-hover:flex 2xl:scale-[2.56] 2xl:right-[6.5rem] 2xl:top-[8.5rem]"
                width="140"
                height="182"
                viewBox="0 0 140 176"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M204.605 -10.0918H66.6594C66.0287 -10.0914 65.4121 -9.90482 64.887 -9.55537C64.3619 -9.20591 63.9516 -8.70918 63.7078 -8.12748C63.4639 -7.54578 63.3972 -6.90501 63.5161 -6.28557C63.635 -5.66612 63.9342 -5.09558 64.3761 -4.64552L94.1478 25.5907C94.7448 26.1908 95.0798 27.0028 95.0798 27.8493C95.0798 28.6957 94.7448 29.5078 94.1478 30.1079L0.987769 123.06C0.540296 123.508 0.23561 124.079 0.112208 124.7C-0.0111951 125.321 0.0522222 125.964 0.294447 126.549C0.536672 127.134 0.946836 127.634 1.47312 127.986C1.9994 128.338 2.61818 128.526 3.25129 128.526H61.569C65.6096 128.53 69.6111 127.735 73.3431 126.186C77.0751 124.637 80.464 122.366 83.3145 119.502L206.869 -4.62575C207.316 -5.07362 207.621 -5.64408 207.745 -6.26504C207.868 -6.886 207.805 -7.52961 207.562 -8.11455C207.32 -8.69948 206.91 -9.1995 206.384 -9.55143C205.857 -9.90335 205.239 -10.0914 204.605 -10.0918Z"
                  fill="#202020"
                />
                <path
                  d="M56.8124 181.092H194.719C195.35 181.092 195.966 180.905 196.491 180.556C197.016 180.206 197.427 179.71 197.671 179.128C197.914 178.546 197.981 177.906 197.862 177.286C197.743 176.667 197.444 176.096 197.002 175.646L167.23 145.41C166.634 144.81 166.298 143.998 166.298 143.151C166.298 142.305 166.634 141.493 167.23 140.893L260.41 47.9797C260.858 47.5319 261.162 46.9614 261.286 46.3404C261.409 45.7195 261.346 45.0759 261.104 44.4909C260.861 43.906 260.451 43.406 259.925 43.0541C259.399 42.7021 258.78 42.5141 258.147 42.5137H199.829C195.788 42.5098 191.787 43.3052 188.055 44.854C184.323 46.4028 180.934 48.6744 178.084 51.5381L54.5291 175.666C54.0938 176.117 53.8004 176.686 53.6853 177.302C53.5702 177.918 53.6384 178.554 53.8815 179.132C54.1246 179.71 54.5319 180.203 55.0528 180.552C55.5738 180.9 56.1856 181.088 56.8124 181.092Z"
                  fill="#202020"
                />
              </svg>
            </motion.div>
          </div>

          {/* Latest Transactions Card */}
          <motion.div className='hover:bg-[url("/border1.svg")] bg-cover bg-no-repeat w-full overflow-hidden h-[180px lg:w-[542px] 2xl:w-[1426.41px] 2xl:h-[433.19]  px[6px] py-[4px] rounded-[16px] 2xl:rounded-[42px] flex items-center justify-center'
          animate={controls}
          onHoverStart={() => {
            setIsHovered(true);
            controls.start({
              scale: 1.01,
              transition: {
                type: "spring",
                stiffness: 1000,
                damping: 5,
              },
            });
          }}
          onHoverEnd={() => {
            setIsHovered(false);
            controls.start({
              scale: 0.99,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
              },
            });
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#141414] rounded-[16px] 2xl:rounded-[42px] px-4 py-3 2xl:px-8 2xl:py-8 w-[99%]  h-[176px]  2xl:w-[99.8%] 2xl:h-[458px]"
              
            >
              <h3 className="text-[15.72px] 2xl:text-[42.11px] font-normal text-gray-400 mb-4 2xl:mb-[4rem]">
                Lastest Transactions
              </h3>
              <div className="relative flex items-center">
                {mockTransactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    animate={
                      tx.icon === "swap"
                        ? {
                          top: isHovered ? "" : "0",
                            width: isHovered ? "88%" : "100%",
                            left: isHovered ? "": "", // Animate width shrink
                            transition: { duration: 0.4, ease: "easeInOut" },
                          }
                        : {
                          top: isHovered ? "0" : "",
                          width: isHovered ? "100%" : "88%",
                          left: isHovered ? "0" : "",
                          zIndex: isHovered? "30" : "",
                          transition: { duration: 0.4, ease: "easeInOut" },
                        }
                    }
                    className={`absolute 2xl:h-[168.69px] bg-[#1a1a1a] border border-[#252525] rounded-xl 2xl:rounded-[42.11px] p-3 flex items-center justify-between ${
                      tx.icon === "swap"
                        ? `w-[456px] md:w-full z-30  ${isHovered ? "top-8 2xl:top-[4.5rem] left-[2rem] 2xl:left-[4.5rem]" : "top-0 "}`
                        : `w-[456px] 2xl:w-[96%] z-20   left-[1.5rem] 2xl:left-[4.5rem] text-[#606060] ${isHovered ? "top-0" : "top-10 2xl:top-[6.5rem]"}`
                    }`}
                  >
                    <div className={`flex items-center gap-3 `}>
                      <div
                        className={`w-8 h-8 2xl:w-[105.27px] 2xl:h-[105.27px] ${
                          index === 0 ? "bg-white group-hover:bg-[#444444]" : "bg-[#444444] group-hover:bg-white"
                        } rounded-lg 2xl:rounded-[21.05px] flex items-center justify-center`}
                      >
                        {tx.icon === "swap" ? (
                          <svg
                            className={`w-4 h-4 2xl:w-[63.16px] 2xl:h-[63.16px] text-black group-hover:text-gray-300  ${
                              index === 0 ? "" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            className=" text-[#606060] group-hover:text-black w-4 h-4 2xl:w-[63.16px] 2xl:h-[63.16px]"
                            fill="none"
                            stroke="#606060"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.00012 4.00024C3.00012 3.44796 3.44784 3.00024 4.00012 3.00024H9.00012C9.55241 3.00024 10.0001 3.44796 10.0001 4.00024C10.0001 4.55253 9.55241 5.00024 9.00012 5.00024H6.41434L12.0001 10.586L17.5859 5.00024H15.0001C14.4478 5.00024 14.0001 4.55253 14.0001 4.00024C14.0001 3.44796 14.4478 3.00024 15.0001 3.00024H20.0001C20.5524 3.00024 21.0001 3.44796 21.0001 4.00024V9.00024C21.0001 9.55253 20.5524 10.0002 20.0001 10.0002C19.4478 10.0002 19.0001 9.55253 19.0001 9.00024V6.41446L13.0001 12.4145V20.0002C13.0001 20.5525 12.5524 21.0002 12.0001 21.0002C11.4478 21.0002 11.0001 20.5525 11.0001 20.0002V12.4145L5.00012 6.41446V9.00024C5.00012 9.55253 4.55241 10.0002 4.00012 10.0002C3.44784 10.0002 3.00012 9.55253 3.00012 9.00024V4.00024Z"
                              fill="#E4E4E4"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col 2xl:gap-6">
                        <div className=" text-sm 2xl:text-[42.11px] font-medium text-white group-hover:text-[#606060]">{tx.type}</div>
                        <div className="text-[#606060] 2xl:text-[36.84px] text-xs">
                          From {tx.from}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col 2xl:gap-6">
                      <div className=" text-sm 2xl:text-[42.11px] font-semibold text-white group-hover:text-[#606060]">{tx.amount}</div>
                      <div className=" text-[#606060] text-xs 2xl:text-[36.84px]">{tx.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
