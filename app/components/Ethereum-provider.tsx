"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { BRIDGE_CONTRACTS } from "../config";

interface DepositResult {
  success: boolean;
  commitmentHash?: string;
  transactionHash?: string;
  error?: string;
}

interface EthereumContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  address: string | null;
  depositAsset: (assetType: number, tokenAddress: string, amount: string) => Promise<DepositResult>;
}

const EthereumContext = createContext<EthereumContextType>({
  provider: null,
  signer: null,
  isConnected: false,
  connectWallet: async () => {},
  address: null,
  depositAsset: async () => ({ success: false, error: "Not implemented" }),
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

  const depositAsset = async (
    assetType: number,
    tokenAddress: string,
    amount: string
  ): Promise<DepositResult> => {
    try {
      if (!signer || !provider || !address) {
        return { success: false, error: "Wallet not connected" };
      }

      const network = await provider.getNetwork();
      const bridgeAddress = BRIDGE_CONTRACTS[Number(network.chainId)];
      
      if (!bridgeAddress) {
        return { success: false, error: `Bridge not supported on network ${network.chainId}` };
      }

      // Bridge contract ABI (simplified - includes only depositAsset function)
      const bridgeABI = [
        "function depositAsset(uint256 assetType, address tokenAddress, uint256 amount, address user) external payable returns (bytes32)"
      ];

      const bridgeContract = new ethers.Contract(bridgeAddress, bridgeABI, signer);
      const amountInWei = ethers.parseEther(amount);

      let tx;
      
      if (assetType === 0) {
        // ETH deposit
        tx = await bridgeContract.depositAsset(
          assetType,
          tokenAddress,
          amountInWei,
          address,
          { value: amountInWei }
        );
      } else {
        // ERC20 deposit - first check and handle approval
        const erc20ABI = [
          "function allowance(address owner, address spender) view returns (uint256)",
          "function approve(address spender, uint256 amount) returns (bool)"
        ];
        
        const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
        const allowance = await tokenContract.allowance(address, bridgeAddress);
        
        if (allowance < amountInWei) {
          const approvalTx = await tokenContract.approve(bridgeAddress, amountInWei);
          await approvalTx.wait();
        }
        
        tx = await bridgeContract.depositAsset(assetType, tokenAddress, amountInWei, address);
      }

      const receipt = await tx.wait();
      
      // Extract commitment hash from logs
      let commitmentHash: string | undefined;
      for (const log of receipt.logs) {
        try {
          const parsedLog = bridgeContract.interface.parseLog({
            topics: log.topics,
            data: log.data,
          });
          
          if (parsedLog && parsedLog.args && parsedLog.args.length > 0) {
            commitmentHash = parsedLog.args[0];
            break;
          }
        } catch (error) {
          console.warn("Could not parse log:", error);
        }
      }

      return {
        success: true,
        commitmentHash,
        transactionHash: receipt.hash,
      };
    } catch (error) {
      console.error("Deposit error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
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
        depositAsset,
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