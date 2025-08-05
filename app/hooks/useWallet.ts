import { useCallback, useEffect } from "react";
import { useWalletStore } from "../store/wallet";
import { useEthereumWallet, useStarknetWallet } from "./";
import { starknetConnectors } from "@/lib/connectors";

export const useWallet = () => {
  const { setEthWallet, setStrkWallet, clearError, resetWallet, ...store } =
    useWalletStore();

  const ethWallet = useEthereumWallet();
  const strkWallet = useStarknetWallet();

  // we should sync wallet states when they change
  useEffect(() => {
    setEthWallet({
      address: ethWallet.address || null,
      connected: ethWallet.isConnected,
      connecting: ethWallet.isConnecting,
      chainId: ethWallet.chainId || null,
    });
  }, [
    ethWallet.address,
    ethWallet.isConnected,
    ethWallet.isConnecting,
    ethWallet.chainId,
    setEthWallet,
  ]);

  useEffect(() => {
    setStrkWallet({
      address: strkWallet.account?.address || null,
      connected: strkWallet.status === "connected",
      connecting: strkWallet.status === "connecting",
    });
  }, [strkWallet.account?.address, strkWallet.status, setStrkWallet]);

  const connectEthWallet = useCallback(
    async (connectorId: string) => {
      clearError();
      try {
        await ethWallet.connectEthereumWallet(connectorId);
      } catch (error) {
        resetWallet("ETH");
        store.setError(String(error));
        throw error;
      }
    },
    [ethWallet, clearError, resetWallet, store.setError],
  );

  const disconnectEthWallet = useCallback(() => {
    try {
      ethWallet.disconnectEthereumWallet();
      resetWallet("ETH");
    } catch (error) {
      store.setError(String(error));
    }
  }, [ethWallet, resetWallet, store.setError]);

  const connectStrkWallet = useCallback(
    async (connectorId: "braavos" | "argentX") => {
      clearError();
      try {
        strkWallet.connectStarknetWallet({
          connector: starknetConnectors[connectorId],
        });
      } catch (error) {
        resetWallet("STRK");
        store.setError(String(error));
        throw error;
      }
    },
    [strkWallet, clearError, resetWallet, store.setError],
  );

  const disconnectStrkWallet = useCallback(() => {
    try {
      strkWallet.disconnectStarknetWallet();
      resetWallet("STRK");
    } catch (error) {
      store.setError(String(error));
    }
  }, [strkWallet, resetWallet, store.setError]);

  return {
    ethAddress: store.ethAddress,
    ethConnected: store.ethConnected,
    ethConnecting: store.ethConnecting,
    ethChainId: store.ethChainId,

    strkAddress: store.strkAddress,
    strkConnected: store.strkConnected,
    strkConnecting: store.strkConnecting,

    isWalletModalOpen: store.isWalletModalOpen,
    error: store.error,

    openWalletModal: store.openWalletModal,
    closeWalletModal: store.closeWalletModal,
    connectEthWallet,
    disconnectEthWallet,
    connectStrkWallet,
    disconnectStrkWallet,
    setError: store.setError,
  };
};
