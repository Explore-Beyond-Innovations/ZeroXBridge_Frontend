"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

interface EthereumContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  address: string | null;
}

const EthereumContext = createContext<EthereumContextType>({
  provider: null,
  signer: null,
  isConnected: false,
  connectWallet: async () => {},
  address: null,
});

export const EthereumProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          
          setProvider(provider);
          setSigner(signer);
          setAddress(address);
          setIsConnected(true);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        checkConnection();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", checkConnection);
      }
    };
  }, []);

  return (
    <EthereumContext.Provider
      value={{
        provider,
        signer,
        isConnected,
        connectWallet,
        address,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => {
  const context = useContext(EthereumContext);
  if (context === undefined) {
    throw new Error("useEthereum must be used within an EthereumProvider");
  }
  return context;
}; 