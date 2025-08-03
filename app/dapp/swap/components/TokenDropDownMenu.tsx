"use client";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Image from "next/image";
import { useThemeContext } from "@/app/hooks/context";

interface Token {
  logo: string;
  name: string;
  symbol: string;
  currentPrice: number;
}

interface TokenSelectDropdownProps {
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}

export function TokenSelectDropdown({
  onTokenSelect,
  tokens,
}: TokenSelectDropdownProps) {
  const { isDark } = useThemeContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-[35px] h-[35px] rounded-full border-[#E9E9E9] dark:border-[#292929] border-[1.11px] flex justify-center items-center text-[#5C5C5C] dark:text-[#989898] focus:outline-none">
          <ChevronDown className="h-4.5 w-4.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-40 lg:w-64 bg-card border-card-border border-[0.5px] -ml-[40px] lg:ml-[150px]`}
      >
        {tokens.map((token) => (
          <DropdownMenuItem
            key={token.symbol}
            onClick={() => onTokenSelect(token)}
            className={`flex items-center gap-2 cursor-pointer`}
          >
            <div className="lg:w-11 w-9 h-9 p-1 lg:h-11 flex justify-center items-center bg-[#F6F6F6] dark:bg-[#272727] rounded-full">
              <Image
                width={18}
                height={18}
                className="w-auto h-auto"
                src={token.logo}
                alt="token logo"
              />
            </div>
            <div>
              <div className="font-medium text-sm">{token.name}</div>
              <div
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {token.symbol}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
