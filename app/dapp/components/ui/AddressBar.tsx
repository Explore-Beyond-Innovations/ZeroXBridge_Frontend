import { useConnection } from "@/app/context/ConnectionContext";
import DisconnectIcon from "@/svg/DisconnectIcon";
import WalletIcon from "@/svg/WalletIcon";

function AddressBar({ className }: { className?: string }) {
  const address =
    "0x05Bf8ed99e91Cb65e1d8D1A30fF7588bfe289FfA2c6E5bBcdF2Ffa0AEdb1e3E6";
  const { setIsConnected } = useConnection();
  return (
    <div
      className={`flex gap-x-2 justify-center items-center px-3 py-[10px] rounded-[8px] font-medium text-primary-text border border-wallet-border shadow-sm-connect-shadow ${className}`}
      style={{
        backgroundImage: "var(--linear-primary-gradient)",
      }}
    >
      <WalletIcon />
      <span className="inline-block">{`${address.slice(0, 2)}...${address.slice(
        -7
      )}`}</span>

      <div className="w-[1px] h-[13px] bg-[#EFEFEF] dark:bg-[#414141]"></div>
      <button onClick={() => setIsConnected((prev: boolean) => !prev)}>
        <DisconnectIcon />
      </button>
    </div>
  );
}

export default AddressBar;
