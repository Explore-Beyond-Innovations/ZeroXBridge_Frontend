"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Token } from "@/types/token";
// import { useTheme } from "@/app/hooks/useTheme";

interface TokenSelectDropdownProps {
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
  loadingToken?: boolean;
}



export function TokenSelectDropdown({
  selectedToken,
  onTokenSelect,
  tokens,
}: TokenSelectDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-between px-0 h-auto dark:text-[#fff] text-gray-900 focus:outline-none focus-visible:outline-none`}
        >
          <div className="flex items-center gap-3">
            {selectedToken ? (
              <>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#F6F6F6] dark:bg-[#272727]`}
                >
                  <span className="text-white text-sm font-bold">
                    {selectedToken.symbol.slice(0, 2)}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-sm dark:text-[#737373] text-[#C1C1C1]">
                    Lock
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#505050] dark:text-white">
                      {selectedToken.symbol}
                    </span>
                    <span
                      className={
                        selectedToken.riskLevel === "High Risk"
                          ? "text-[#B23232] dark:bg-[#FF60600F] bg-[#FF60600F] p-1 rounded-sm text-xs"
                          : "text-[#32B289] dark:bg-[#C9FFEE0F] bg-[#C9FFEE5C] p-1 rounded-sm text-xs"
                      }
                    >
                      {selectedToken.riskLevel}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-full dark:bg-[#272727] bg-[#F6F6F6]`}
                >
                  <div
                    className={`w-4 h-4 rounded-full dark:bg-[#414141] bg-[#E1E1E1]`}
                  ></div>
                </div>
                <div className="text-left">
                  <div
                    className={`font-medium dark:text-[#737373] text-[#C1C1C1] text-[14px] sm:text-[16px]`}
                  >
                    Lock
                  </div>
                  <div className={`dark:text-[#AFAFAF] text-[#646464]`}>
                    - Select Token -
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={`dark:border-[#292929] border p-3 rounded-full`}>
            <ChevronDown
              className={`h-6 w-6 dark:text-[#989898] text-gray-400`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-64 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200`}
      >
        {
        tokens.map((token) => (
            <DropdownMenuItem
              key={token.symbol}
              onClick={() => onTokenSelect(token)}
              className={`flex items-center gap-3 p-3 dark:text-white hover:bg-gray-50 text-gray-900`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center dark:bg-gray-600 bg-gray-800`}
              >
                <span className="text-white text-sm font-bold">
                  {token.symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="font-medium">{token.symbol}</div>
                <div className={`text-sm dark:text-gray-400 text-gray-500`}>
                  {token.name}
                </div>
              </div>
              <div className="ml-auto">
                <span
                  className={
                    token.riskLevel === "High Risk"
                      ? "text-[#B23232] dark:bg-[#FF60600F] bg-[#FF60600F] p-1 rounded-sm text-sm"
                      : "text-[#32B289] dark:bg-[#C9FFEE0F] bg-[#C9FFEE5C] p-1 rounded-sm text-sm"
                  }
                >
                  {token.riskLevel}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
