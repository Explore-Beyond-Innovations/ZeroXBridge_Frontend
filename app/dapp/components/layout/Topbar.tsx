import Logo from "../ui/Logo";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { ConnectWalletButton } from "../ui/ConnectWalletButton";
import HamburgerIcon from "@/svg/HamburgerIcon";
import { X } from "lucide-react";
import { useWallet } from "@/app/hooks";
import { shortenAddress } from "@/lib/utils";

function Topbar({
  onMenuClick,
  isSidebarOpen,
}: {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}) {
  const { openWalletModal, ethConnected, strkConnected, strkAddress, ethAddress } =
    useWallet();
  const isWalletConnected = strkConnected || ethConnected;
  const walletAddress = ethAddress || strkAddress
  return (
    <div className="px-6 py-4 lg:px-10 lg:py-6 lg:border-b-primary-border lg:border-b-[1px] flex items-center font-light justify-between z-[50]">
      <div className="flex gap-x-3 items-center ">
        <button onClick={onMenuClick} className="lg:hidden md:hidden text-foreground">
          {!isSidebarOpen ? <HamburgerIcon /> : <X />}
        </button>
        <Logo />
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        <ConnectWalletButton
          withGradient
          action={openWalletModal}
          isConnected={isWalletConnected}
          showBrokenLink
          walletAddress={shortenAddress(walletAddress as string) ?? "0x0fq0...6vfa"}
        />
      </div>
    </div>
  );
}

export default Topbar;
