import { useWalletStore } from "../store/wallet";

export const useWallet = () => {
  const store = useWalletStore();

  return {
    isConnected: store.isConnected,
    address: store.address,
    chainId: store.chainId,
    isConnecting: store.isConnecting,
    error: store.error,
    isWalletModalOpen: store.isWalletModalOpen,

    connectWallet: store.connectWallet,
    disconnectWallet: store.disconnectWallet,
    clearError: store.clearError,
    openWalletModal: store.openWalletModal,
    closeWalletModal: store.closeWalletModal,

    shortAddress: store.address
      ? `${store.address.slice(0, 4)}...${store.address.slice(-6)}`
      : null,
  };
};
