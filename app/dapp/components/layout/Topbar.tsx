import Logo from "../ui/Logo";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import ConnectWalletButton from "../ui/ConnectWalletButton";
import HamburgerIcon from "@/svg/HamburgerIcon";
import { X } from "lucide-react";
import { useConnection } from "@/app/context/ConnectionContext";

function Topbar({
  onMenuClick,
  isSidebarOpen,
}: {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}) {
  const { isConnected } = useConnection();
  return (
    <div className="px-6 py-4 lg:px-10 lg:py-6 lg:border-b-primary-border lg:border-b-[1px] flex items-center font-light justify-between z-[50]">
      <div className="flex gap-x-3 items-center ">
        <button onClick={onMenuClick} className="lg:hidden text-foreground">
          {!isSidebarOpen ? <HamburgerIcon /> : <X />}
        </button>
        <Logo />
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {isConnected ? <AddressBar /> : <ConnectWalletButton />}
      </div>
    </div>
  );
}

export default Topbar;
