"use client"

import { Info, X } from "lucide-react";

export default function LockSummary() {

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        target.value = target.value.replace(/[^0-9.]/g, ""); 
      };

  return (
    <div className=" w-full h-full fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center p-5 ">
      <div className=" min-w-[340px] min-h-[400px] md:w-[563px] relative md:h-[540px] bg-[#21192F] rounded-[20px] flex flex-col items-center justify-center gap-6 px-[30px] py-[35px] ">
        <button className=" absolute top-[35px] left-[30px] text-[#D4D4D4]  ">
          <X
            size={25}
            className="transform  hover:scale-125 transition duration-300 ease-in-out "
          />
        </button>
        <h1 className="text-center text-[#D4D4D4] font-bold text-xl ">
          Lock Summary
        </h1>

        <label htmlFor="amount" className="w-full block ">
          <div className=" flex flex-row items-center justify-between mb-2">
            {" "}
            <p className="text-[#D4D4D4] text-sm font-medium ">
              Amount to Lock
            </p>{" "}
            <p className=" text-[#D4D4D4] text-base font-medium ">MAX</p>{" "}
          </div>
          <input
            type="text"
            id="amount"
            placeholder="Enter Token Amount"
            onInput={handleInputChange}
            className="w-full bg-[#1F1333] border-[0.4px] border-[#8B8B8B] py-5 px-[30px] rounded-[8.81px] text-[#8B8B8B] font-normal text-sm  placeholder:text-[#8B8B8B] placeholder:font-normal placeholder:ext-sm  outline-none "
          />
        </label>

        <div className="w-full  flex flex-col items-start gap-3 my-3 ">
          <div className="w-full flex items-center justify-between gap-6 ">
            <p className=" text-[#8B8B8B] text-base font-normal ">Token</p>
            <p className="text-[#D4D4D4] text-base font-medium ">USDC</p>
          </div>

          <div className="w-full flex items-center justify-between gap-6 ">
            <p className=" text-[#8B8B8B] text-base font-normal ">
              xZB to Receive
            </p>
            <p className="text-[#D4D4D4] text-base font-medium ">0 xZB</p>
          </div>

          <div className="w-full flex items-center justify-between gap-6 ">
            <p className=" text-[#8B8B8B] text-base font-normal ">Token</p>
            <p className="text-[#3ECD96] text-sm font-medium ">Low Risk</p>
          </div>

          <div className="w-full bg-[#53436D]  border-dashed border-[0.4px] mt-2 rounded-[8.81px] border-[#E6E6E6] flex items-center justify-center text-center py-[23px] px-[30px] ">
            <p className="text-[#B9B9B9] text-xs font-normal ">
              Assets remain securely Locked on Ethereum while you use xZB on
              Starknet
            </p>
          </div>

          <div className="w-full flex items-center gap-1 text-[#8B8B8B] font-semibold text-xs ">
            <Info size={14} />
            <p>Requires signatures from both Ethereum and Starknet wallets</p>
          </div>
        </div>

        <button className=" w-full max-w-[426px] h-[52px] bg-gradient-to-t from-[#09050E] to-[#A26DFF] border-b-[0.7px] border-[#A26DFF]  text-center text-base font-bold text-[#D4D4D4] rounded-[30px] ">
          LOCK TOKEN{" "}
        </button>
      </div>
    </div>
  );
}
