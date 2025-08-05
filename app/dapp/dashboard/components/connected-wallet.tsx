import { CircleMinus, Copy } from "lucide-react";
import Image from "next/image";

interface ConnectedWalletProps {
  address: string;
  walletPlatform: string;
  walletPlatformLogo: string;
  onCopy?: () => void;
  onDisconnect?: () => void;
}

export const ConnectedWallet = ({
  address,
  walletPlatform,
  walletPlatformLogo,
  onCopy,
  onDisconnect,
}: ConnectedWalletProps) => {
  return (
    <div className="flex items-center gap-x-3 justify-between bg-[#fff] dark:bg-[#1D1D1D] p-1 rounded-[8px]">
      <div className="flex items-center gap-x-2">
        <Image
          src={walletPlatformLogo}
          height={17}
          width={17}
          alt={walletPlatform}
          className="rounded"
        />
        <span className="text-[#1E1E1E] dark:text-[#bdbdbd] text-sm font-mono">
          {address}
        </span>
      </div>
      <div className="flex gap-x-2">
        <button onClick={onCopy} className="p-1 hover:bg-[#f4f4f4] dark:hover:bg-[#303030] rounded">
          <Copy size={16} className="text-[#444444]" />
        </button>
        <div className="border-[0.8px] border-r-[#EFEFEF] dark:border-r-[#303030]" />
        <button
          onClick={onDisconnect}
          className="p-1 hover:bg-gray-100 rounded dark:hover:bg-[#303030]"
        >
          <CircleMinus size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};
