import { useCallback, useEffect, useRef } from "react";
import { useWalletStore } from "../store/wallet";
import { useEthereumWallet, useStarknetWallet } from "./";
import {
  StarknetConnectorId,
  starknetConnectorMeta,
  starknetConnectors,
} from "@/lib/connectors";
// import { SiweMessage } from "siwe";

const generateNonce = () => {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
};

const authenticateWithSignature = async (
  address: string,
  message: string,
  signature: string,
  provider: "ethereum" | "starknet" = "ethereum"
) => {
  try {
    const csrfTokenResponse = await fetch("/api/auth/csrf");
    const { csrfToken } = await csrfTokenResponse.json();

    const nonceMatch = message.match(/Nonce:\s*(.?)(?:\n|$)/);
    const nonce = nonceMatch ? nonceMatch[1].trim() : null;

    if (!nonce) {
      throw new Error("Failed to extract nonce from message");
    }

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
        provider,
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

  // Refs to track the last authenticated addresses to prevent duplicate authentication
  const lastAuthenticatedEthAddress = useRef<string | null>(null);
  const lastAuthenticatedStrkAddress = useRef<string | null>(null);
  // Refs to track if authentication is in progress
  const isEthAuthenticating = useRef(false);
  const isStrkAuthenticating = useRef(false);

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

  // Separate effect for authentication that runs when Ethereum address changes
  useEffect(() => {
    // Only authenticate if we have an address and it's not the same as the last authenticated address
    const shouldAuthenticate =
      ethWallet.address &&
      ethWallet.address !== lastAuthenticatedEthAddress.current &&
      !isEthAuthenticating.current;

    if (shouldAuthenticate) {
      const authenticateUser = async () => {
        try {
          isEthAuthenticating.current = true;

          const nonce = generateNonce();
          const message = `Sign this message to authenticate with ZeroXBridge.\nNonce: ${nonce}`;

          const signer = await ethWallet.getSigner?.();
          if (!signer) {
            console.error("No signer available");
            isEthAuthenticating.current = false;
            return;
          }

          const signature = await signer.signMessage(message);

          await authenticateWithSignature(
            ethWallet.address!,
            message,
            signature,
            "ethereum"
          );

          // Update the last authenticated address after successful authentication
          lastAuthenticatedEthAddress.current = ethWallet.address || null;
          console.log("Successfully authenticated with Ethereum wallet");
        } catch (signError) {
          console.error("Ethereum signature error:", signError);
        } finally {
          isEthAuthenticating.current = false;
        }
      };

      authenticateUser();
    }
  }, [ethWallet.address, ethWallet.getSigner]);

  useEffect(() => {
    setStrkWallet({
      address: strkWallet.account?.address || null,
      connected: strkWallet.status === "connected",
      connecting: strkWallet.status === "connecting",
    });
  }, [strkWallet.account?.address, strkWallet.status, setStrkWallet]);

  // Separate effect for Starknet authentication that runs when Starknet address changes
  useEffect(() => {
    const strkAddress = strkWallet.account?.address;

    // Only authenticate if we have an address, it's connected, and it's not the same as the last authenticated address
    const shouldAuthenticate =
      strkAddress &&
      strkWallet.status === "connected" &&
      strkAddress !== lastAuthenticatedStrkAddress.current &&
      !isStrkAuthenticating.current;

    if (shouldAuthenticate && strkWallet.account) {
      const authenticateStarknetUser = async () => {
        try {
          isStrkAuthenticating.current = true;

          const nonce = generateNonce();
          const message = `Sign this message to authenticate with ZeroXBridge.\nNonce: ${nonce}`;

          const signature = await strkWallet.account?.signMessage({
            message: { message },
            types: {},
            primaryType: "",
            domain: {
              name: "ZeroXBridge",
              version: "1",
            },
          });

          // Properly serialize the signature based on its type
          // Starknet signatures can come in different formats depending on the wallet implementation
          let serializedSignature: string;

          if (Array.isArray(signature)) {
            // If it's an array of hex strings (like [r, s] format), stringify it as JSON
            serializedSignature = JSON.stringify(signature);
          } else if (typeof signature === "object" && signature !== null) {
            // If it's an object (like { r, s } or other format), stringify it as JSON
            serializedSignature = JSON.stringify(signature);
          } else if (typeof signature === "string") {
            // If it's already a string, use it directly
            serializedSignature = signature;
          } else if (signature === undefined || signature === null) {
            throw new Error("Signature is null or undefined");
          } else {
            // Fallback: convert to string representation
            serializedSignature = String(signature);
          }

          await authenticateWithSignature(
            strkAddress,
            message,
            serializedSignature,
            "starknet"
          );

          // Update the last authenticated address after successful authentication
          lastAuthenticatedStrkAddress.current = strkAddress;
          console.log("Successfully authenticated with Starknet wallet");
        } catch (signError) {
          console.error("Starknet signature error:", signError);
        } finally {
          isStrkAuthenticating.current = false;
        }
      };

      authenticateStarknetUser();
    }
  }, [strkWallet.account, strkWallet.status]);

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

        // Authentication is now handled by the separate effect that watches ethWallet.address
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
      // Reset the last authenticated address on disconnect
      lastAuthenticatedEthAddress.current = null;
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

        // Authentication is now handled by the separate effect that watches strkWallet.account?.address
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
      // Reset the last authenticated address on disconnect
      lastAuthenticatedStrkAddress.current = null;
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
