
import React from "react";
import { TokenSelectDropdown } from "./TokenDropDownMenu";
import { Token } from "@/types/tokens";
import { tokens_swap as tokens } from "@/utils/data";
import Image from "next/image";

interface SwapFromInputProps {
  token: Token;
  setToken: (token: Token) => void;
  amount: string;
  setAmount: (amount: string) => void;
  balance?: string;
  isConnected: boolean;
  isLoading?: boolean;
}

const numberRegex = /^[0-9]*[.,]?[0-9]*$/;

function SwapFromInput({
  setToken,
  token,
  amount,
  setAmount,
  balance,
  isConnected,
  isLoading = false,
}: SwapFromInputProps) {
  return (
    <div
      className="bg-card border-[1.1px] border-card-border p-4 font-light rounded-[16px]"
      style={{
        boxShadow: "0px 0px 14px 0px #00000014",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-3">
          <div className="w-11 h-11 flex justify-center items-center bg-[#F6F6F6] dark:bg-[#272727] rounded-full">
            <Image
              width={18}
              height={18}
              className="w-auto h-auto"
              src={token.logo}
              alt="token logo"
            />
          </div>

          <div className="flex flex-col space-y-0.5">
            <span className="text-[#C1C1C1] dark:text-[#737373] capitalize">
              From
            </span>
            <span className="text-foreground">{token.symbol}</span>
          </div>
        </div>
        <TokenSelectDropdown
          onTokenSelect={setToken}
          tokens={tokens.filter((item) => item.name !== token.name)}
          isLoading={isLoading}
        />
      </div>

      <div className="flex items-center mb-[14px] w-full space-x-2">
        <input
          placeholder="0.00"
          disabled={!isConnected || isLoading}
          className="text-[32px]/[106%] text-[#1E1E1E] dark:text-[#F4F4F4] disabled:text-[#DDDDDD] dark:disabled:text-[#353535] font-light -tracking-[4%] font-mono w-full focus:outline-none"
          value={!isConnected || !amount ? "" : amount}
          onChange={(e) => {
            const value = e.target.value;
            if (numberRegex.test(value)) {
              setAmount(value);
            }
          }}
        />

        <button
          className="py-[7px] px-[13.4px] bg-[#F4F4F4] dark:bg-[#232323] border-[1.11px] dark:border-none border-[#EEEEEE] rounded-full text-[#737373] dark:text-[#F5F5F5] disabled:text-[#737373] disabled:opacity-45 leading-[112%] whitespace-nowrap"
          disabled={!isConnected || isLoading}
          onClick={() => balance && setAmount(balance)}
        >
          Max
        </button>
      </div>

      <div className="flex items-center justify-between pt-[14.4px] border-t-[#F1F1F1] dark:border-t-[#232323] border-t-[1px] text-[13.3px]/[113%]">
        <span className="text-[#737373] tracking-[-2%]">
          Available Balance:
        </span>
        <span className="text-[#000000] dark:text-[#737373] tracking-[-2%]">
          {!isConnected ? "--" : balance} {token.symbol}
        </span>
      </div>
    </div>
  );
}

export default SwapFromInput;