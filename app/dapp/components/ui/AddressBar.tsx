import { useConnection } from "@/app/context/ConnectionContext";
import DisconnectIcon from "@/svg/DisconnectIcon";
import WalletIcon from "@/svg/WalletIcon";

function AddressBar({ className }: { className?: string }) {
  const { walletAddress,  setIsConnected  } = useConnection();
    
   const shortenedAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Not connected";

  // ✅ define handleDisconnect
  const handleDisconnect = () => {
    setIsConnected(false);
  };


  return (
    <div
      className={`flex gap-x-2 justify-center items-center px-3 py-[10px] rounded-[8px] font-medium text-primary-text border border-wallet-border shadow-sm-connect-shadow ${className}`}
      style={{
        backgroundImage: "var(--linear-primary-gradient)",
      }}
    >
      <WalletIcon />
      <span className="inline-block">{shortenedAddress}</span>

      <div className="w-[1px] h-[13px] bg-[#EFEFEF] dark:bg-[#414141]"></div>
       <button 
     onClick={handleDisconnect}
      aria-label="Disconnect wallet"
     >
         <DisconnectIcon />
       </button>
    </div>
  );
}

export default AddressBar;
