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
import { Token } from "@/types/tokens";

interface TokenSelectDropdownProps {
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
  isLoading?: boolean;
}

function TokenSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 cursor-default">
      <div className="lg:w-11 w-9 h-9 lg:h-11 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1 w-16" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-10" />
      </div>
    </div>
  );
}

export function TokenSelectDropdown({
  onTokenSelect,
  tokens,
  isLoading = false,
}: TokenSelectDropdownProps) {
  const { isDark } = useThemeContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="w-[35px] h-[35px] rounded-full border-[#E9E9E9] dark:border-[#292929] border-[1.11px] flex justify-center items-center text-[#5C5C5C] dark:text-[#989898] focus:outline-none disabled:opacity-50"
          disabled={isLoading}
        >
          <ChevronDown className="h-4.5 w-4.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-40 lg:w-64 bg-card border-card-border border-[0.5px] -ml-[40px] lg:ml-[150px]`}
      >
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="px-1 py-1">
                <TokenSkeleton />
              </div>
            ))}
          </>
        ) : (
          tokens.map((token) => (
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
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}