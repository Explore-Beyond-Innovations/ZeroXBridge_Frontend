import { useWallet } from "@/app/hooks";
import { DialogBase } from "../../components/ui/Dailog";

export const ConnectWalletModal = () => {
  const {
    isWalletModalOpen,
    isConnected,
    disconnectWallet,
    connectWallet,
    closeWalletModal,
  } = useWallet();

  return (
    <DialogBase isOpen={isWalletModalOpen} onClose={closeWalletModal}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Select a Network</h2>

        <div className="space-y-4">
          {/* ETH Wallet */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#F4F4F4] dark:bg-[#2E2E2E]">
            <span className="text-sm">ETH Wallet</span>
            <button
              onClick={isConnected ? disconnectWallet : connectWallet}
              className="py-1 px-3 rounded-lg bg-black text-white text-xs"
            >
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </DialogBase>
  );
};
