import { useCallback, useEffect } from "react";
import { useWalletStore } from "../store/wallet";
import { useEthereumWallet, useStarknetWallet } from "./";
import {
  StarknetConnectorId,
  starknetConnectorMeta,
  starknetConnectors,
} from "@/lib/connectors";
// import { SiweMessage } from "siwe";

const generateNonce = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const authenticateWithSignature = async (
  address: string,
  message: string,
  signature: string
) => {
  try {
    const csrfTokenResponse = await fetch("/api/auth/csrf");
    const { csrfToken } = await csrfTokenResponse.json();

    const nonce = message.split("Nonce: ")[1];

    const response = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        message,
        signature,
        nonce,
        csrfToken,
        callbackUrl: window.location.origin,
        redirect: false,
        provider: "ethereum",
      }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

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
        const provider = (window as unknown as { ethereum?: EthereumProvider })
          .ethereum;
        const platformName = provider?.isMetaMask
          ? "MetaMask"
          : provider?.isCoinbaseWallet
          ? "Coinbase Wallet"
          : "Ethereum Wallet";

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

        if (ethWallet.address) {
          try {
            const nonce = generateNonce();
            const message = `Sign this message to authenticate with ZeroXBridge.\nNonce: ${nonce}`;

            const signer = await ethWallet.getSigner?.();
            if (!signer) {
              console.error("No signer available");
              return;
            }

            const signature = await signer.signMessage(message);

            await authenticateWithSignature(
              ethWallet.address,
              message,
              signature
            );

            console.log("Successfully authenticated with Ethereum wallet");
          } catch (signError) {
            console.error("Signature error:", signError);
          }
        }
      } catch (error) {
        resetWallet("ETH");
        store.setError(String(error));
        throw error;
      }
    },
    [ethWallet, clearError, resetWallet, setWalletPlatform, store]
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

        setTimeout(async () => {
          if (strkWallet.account?.address) {
            try {
              const nonce = generateNonce();
              const message = `Sign this message to authenticate with ZeroXBridge.\nNonce: ${nonce}`;

              const signature = await strkWallet.account.signMessage({
                message: { message },
                types: {},
                primaryType: "",
                domain: {
                  name: "ZeroXBridge",
                  version: "1",
                },
              });

              const signatureStr = Array.isArray(signature)
                ? signature.join(",")
                : typeof signature === "object"
                ? JSON.stringify(signature)
                : signature;

              await authenticateWithSignature(
                strkWallet.account.address,
                message,
                signatureStr
              );

              console.log("Successfully authenticated with Starknet wallet");
            } catch (signError) {
              console.error("Starknet signature error:", signError);
            }
          }
        }, 500);
      } catch (error) {
        resetWallet("STRK");
        store.setError(String(error));
        throw error;
      }
    },
    [strkWallet, clearError, resetWallet, setWalletPlatform, store]
  );

  const disconnectStrkWallet = useCallback(() => {
    try {
      strkWallet.disconnectStarknetWallet();
      resetWallet("STRK");
    } catch (error) {
      store.setError(String(error));
    }
  }, [strkWallet, resetWallet, store]);

  const isConnected = store.strkConnected || store.ethConnected;

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
