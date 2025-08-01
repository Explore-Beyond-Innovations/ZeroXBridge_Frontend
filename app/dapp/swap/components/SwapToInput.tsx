import React from "react";
import { TokenSelectDropdown } from "./TokenDropDownMenu";
import { Token } from "@/types/tokens";
import { tokens_swap as tokens } from "@/utils/data";
import Image from "next/image";

interface SwapToInputProps {
  token: Token;
  setToken: (token: Token) => void;
  amount: string;
  isConnected: boolean;
}

function SwapToInput({
  token,
  setToken,
  amount,
  isConnected,
}: SwapToInputProps) {
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
              To
            </span>
            <span className="text-foreground">{token.symbol}</span>
          </div>
        </div>

        <TokenSelectDropdown
          onTokenSelect={setToken}
          tokens={tokens.filter((item) => item.name !== token.name)}
        />
      </div>

      <div className="flex items-center w-full space-x-2">
        <input
          placeholder="0.00"
          disabled={true}
          className={`text-[32px]/[106%] ${
            !isConnected
              ? " dark:text-[#353535] text-[#DDDDDD]"
              : "text-[#1E1E1E] dark:text-[#F4F4F4] placeholder:text-[#1E1E1E] dark:placeholder:text-[#F4F4F4]"
          } font-light -tracking-[4%] font-mono w-full focus:outline-none`}
          value={!isConnected ? "" : amount}
        />
      </div>
    </div>
  );
}

export default SwapToInput;
