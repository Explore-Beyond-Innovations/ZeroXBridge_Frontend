import { useCallback, useEffect } from "react";
import { useWalletStore } from "../store/wallet";
import { useEthereumWallet, useStarknetWallet } from "./";
import {
  StarknetConnectorId,
  starknetConnectorMeta,
  starknetConnectors,
} from "@/lib/connectors";

export const useWallet = () => {
  const {
    setEthWallet,
    setStrkWallet,
    clearError,
    resetWallet,
    setWalletPlatform,
    ...store
  } = useWalletStore();

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

        type EthereumProvider = {
          isMetaMask?: boolean;
          isCoinbaseWallet?: boolean;
        };
        const provider = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
        const platformName = provider?.isMetaMask
          ? "MetaMask"
          : provider?.isCoinbaseWallet
          ? "Coinbase Wallet"
          : "Ethereum Wallet";

        // we can add support for more later
        const platformLogo =
          platformName === "MetaMask"
            ? "/wallet-logos/metamask.svg"
            : platformName === "Coinbase Wallet"
              ? "/wallet-logos/coinbase.svg"
              : "/wallet-logos/default-eth.svg";

        setWalletPlatform({
          network: "ETH",
          platformName,
          platformLogo,
        });
      } catch (error) {
        resetWallet("ETH");
        store.setError(String(error));
        throw error;
      }
    },
    [ethWallet, clearError, resetWallet, setWalletPlatform, store],
  );

  const disconnectEthWallet = useCallback(() => {
    try {
      ethWallet.disconnectEthereumWallet();
      resetWallet("ETH");
    } catch (error) {
      store.setError(String(error));
    }
  }, [ethWallet, resetWallet, store]);

  const connectStrkWallet = useCallback(
    async (connectorId: StarknetConnectorId) => {
      clearError();
      try {
        strkWallet.connectStarknetWallet({
          connector: starknetConnectors[connectorId],
        });

        const { name, icon } = starknetConnectorMeta[connectorId];

        setWalletPlatform({
          network: "STRK",
          platformName: name,
          platformLogo: icon,
        });
      } catch (error) {
        resetWallet("STRK");
        store.setError(String(error));
        throw error;
      }
    },
    [strkWallet, clearError, resetWallet, setWalletPlatform, store],
  );

  const disconnectStrkWallet = useCallback(() => {
    try {
      strkWallet.disconnectStarknetWallet();
      resetWallet("STRK");
    } catch (error) {
      store.setError(String(error));
    }
  }, [strkWallet, resetWallet, store]);

  const isConnected = store.strkConnected || store.ethConnected

  return {
    ethAddress: store.ethAddress,
    ethConnected: store.ethConnected,
    ethConnecting: store.ethConnecting,
    ethChainId: store.ethChainId,

    strkAddress: store.strkAddress,
    strkConnected: store.strkConnected,
    strkConnecting: store.strkConnecting,

    strkPlatformName: store.strkPlatformName,
    strkPlatformLogo: store.strkPlatformLogo,
    ethPlatformName: store.ethPlatformName,
    ethPlatformLogo: store.ethPlatformLogo,

    isWalletModalOpen: store.isWalletModalOpen,
    error: store.error,
    isConnected,

    openWalletModal: store.openWalletModal,
    closeWalletModal: store.closeWalletModal,
    connectEthWallet,
    disconnectEthWallet,
    connectStrkWallet,
    disconnectStrkWallet,
    setError: store.setError,
  };
};
