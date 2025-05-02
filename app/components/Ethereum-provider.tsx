"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ZeroXBridgeL1 } from "../contracts/ZeroXBridgeL1";

interface EthereumContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  registerUser: (starknetPubKey: string) => Promise<void>;
  claimTokens: () => Promise<void>;
  depositAsset: (assetType: number, tokenAddress: string, amount: string) => Promise<string>;
}

const EthereumContext = createContext<EthereumContextType>({
  provider: null,
  signer: null,
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  registerUser: async () => {},
  claimTokens: async () => {},
  depositAsset: async () => "",
});

export function useEthereum() {
  return useContext(EthereumContext);
}

export function EthereumProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState<ZeroXBridgeL1 | null>(null);

  // Contract address - replace with your deployed contract address
  const contractAddress = "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Check if already connected
        window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
          if (accounts.length > 0) {
            handleConnect(provider);
          }
        });

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length === 0) {
            handleDisconnect();
          } else {
            handleConnect(provider);
          }
        });
      } catch (error) {
        console.error("Error initializing Ethereum provider:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  const handleConnect = async (provider: ethers.BrowserProvider) => {
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
      setIsConnected(true);

      // Initialize contract with signer
      const contract = new ZeroXBridgeL1(contractAddress, signer);
      setContract(contract);
    } catch (error) {
      console.error("Error in handleConnect:", error);
      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        });
      }
      throw error;
    }
  };

  const connect = async () => {
    if (!provider) {
      console.error("Ethereum provider not initialized");
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      await handleConnect(provider);
    } catch (error) {
      console.error("Error in connect:", error);
      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        });
      }
      throw error;
    }
  };

  const disconnect = () => {
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
    setContract(null);
  };

  const registerUser = async (starknetPubKey: string) => {
    if (!contract || !signer || !address) {
      throw new Error("Contract, signer or address not initialized");
    }

    try {
      // Create the message to sign
      const message = ethers.solidityPackedKeccak256(
        ["string", "address", "uint256"],
        ["UserRegistration", address, starknetPubKey]
      );

      // Sign the message
      const signature = await signer.signMessage(ethers.getBytes(message));
      
      // Convert signature to bytes
      const signatureBytes = ethers.getBytes(signature);

      // Call the contract
      const tx = await contract.registerUser(signatureBytes, starknetPubKey);
      await tx.wait();
    } catch (error) {
      console.error("Error registering user:", error);
      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        });
      }
      throw error;
    }
  };

  const claimTokens = async () => {
    if (!contract || !signer) {
      throw new Error("Contract or signer not initialized");
    }

    try {
      const tx = await contract.claim_tokens();
      await tx.wait();
    } catch (error) {
      console.error("Error claiming tokens:", error);
      throw error;
    }
  };

  const depositAsset = async (assetType: number, tokenAddress: string, amount: string) => {
    if (!provider) {
      throw new Error("Provider not initialized. Please connect your wallet first.");
    }

    try {
      // Get a fresh signer
      const currentSigner = await provider.getSigner();
      if (!currentSigner) {
        throw new Error("No signer available. Please connect your wallet first.");
      }

      // Initialize contract with fresh signer
      const contract = new ZeroXBridgeL1(contractAddress, currentSigner);
      
      // Convert amount to BigNumber
      const amountInWei = ethers.parseEther(amount);
      
      // For ETH deposits (assetType === 0), pass the same amount as both value and parameter
      // For ERC20 tokens, only pass the amount as parameter
      const tx = await contract.deposit_asset(
        assetType,
        tokenAddress,
        amountInWei,
        assetType === 0 ? { value: amountInWei } : {}
      );
      
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error depositing asset:", error);
      throw error;
    }
  };

  return (
    <EthereumContext.Provider
      value={{
        provider,
        signer,
        address,
        isConnected,
        connect,
        disconnect,
        registerUser,
        claimTokens,
        depositAsset,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
} 