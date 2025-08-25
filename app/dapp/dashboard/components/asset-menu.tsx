"use client";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Image from "next/image";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface AssetsMenuProps {
  currentAsset: Asset;
  assets: Asset[];
  onSelect: (id: string) => void;
}

export function AssetsMenu({
  currentAsset,
  assets,
  onSelect,
}: AssetsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 focus:outline-none">
          <Image
            src={currentAsset.icon}
            alt={currentAsset.name}
            width={24}
            height={24}
          />
          <span className="text-sm font-medium text-black dark:text-white">
            {currentAsset.name}{" "}
            <span className="text-[#696969]">
              ({currentAsset.symbol.toUpperCase()})
            </span>
          </span>
          <ChevronDown className="h-4 w-4 text-[#B9B9B9]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 lg:w-64 bg-card border-card-border border-[0.5px] mt-2">
        {assets.map((asset) => (
          <DropdownMenuItem
            key={asset.id}
            onClick={() => onSelect(asset.id)}
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-muted rounded-md"
          >
            <div className="w-9 h-9 lg:w-11 lg:h-11 p-1 flex justify-center items-center bg-[#F6F6F6] dark:bg-[#272727] rounded-full">
              <Image src={asset.icon} alt={asset.name} width={18} height={18} />
            </div>
            <div>
              <div className="font-medium text-sm">{asset.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {asset.symbol.toUpperCase()}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
