/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { X } from "lucide-react";
import { 
//   useContract, 
  useAccount, 
  useBalance, 
//   useSendTransaction
} from "@starknet-react/core";
import { useTheme } from "../ThemeContext";
import { useEthereum } from "./Ethereum-provider";
// import { uint256 } from "starknet";

interface DepositProps {
  token: string;
  onClose: () => void;
}

const Deposit: React.FC<DepositProps> = ({ token, onClose }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { isDarkMode } = useTheme();

  // Starknet React Hooks
  const { account } = useAccount();
  
  // Ethereum hooks
  const { isConnected: isEthereumConnected, depositAsset, address: ethereumAddress } = useEthereum();
//   // Get contract instance
//   const { contract } = useContract({
//     address: `0x${contractAddress}`,
//     abi: [], // Add your contract ABI here
//   });

   // Get token balance
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: `0x${account?.address}`,
    token: `0x${token}`,
  });

//   // Add transaction to transaction manager
//   const { send } = useSendTransaction({
//     calls: [
//       {
//         contractAddress: contractAddress,
//         entrypoint: "deposit",
//         calldata: [],
//       },
//     ],
//   });

  const handleDeposit = async () => {
    try {
      setError("");
      setIsProcessing(true);

      if (!isEthereumConnected || !ethereumAddress) {
        setError("Please connect your Ethereum wallet");
        return;
      }

      if (!amount || parseFloat(amount) <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      // Determine asset type and token address
      const assetType = token === "ETH" ? 0 : 1;
      let tokenAddress;
      
      if (assetType === 0) {
        tokenAddress = "0x0000000000000000000000000000000000000000";
      } else {
        // For ERC20 tokens, you'd need to map token symbols to addresses
        // This is a placeholder - in production, you'd have a token registry
        const tokenAddresses: Record<string, string> = {
          USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        };
        tokenAddress = tokenAddresses[token];
        
        if (!tokenAddress) {
          setError(`Token ${token} not supported`);
          return;
        }
      }

      console.log("Initiating deposit:", {
        assetType,
        tokenAddress,
        amount,
        userAddress: ethereumAddress
      });

      const result = await depositAsset(assetType, tokenAddress, amount);
      
      if (!result.success) {
        throw new Error(result.error || "Deposit failed");
      }

      console.log("Deposit successful:", {
        transactionHash: result.transactionHash,
        commitmentHash: result.commitmentHash
      });

      // Store commitment hash for L2 use
      if (result.commitmentHash) {
        localStorage.setItem('latestCommitmentHash', result.commitmentHash);
        localStorage.setItem('latestDepositTx', result.transactionHash || '');
      }

      // Clear input and close modal on success
      setAmount("");
      onClose();

    } catch (err) {
      console.error("Deposit error:", err);
      setError(err instanceof Error ? err.message : "Failed to deposit");
    } finally {
      setIsProcessing(false);
    }
  };

   // Format balance for display
  const formattedBalance = balance 
    ? parseFloat(balance.toString()) / 10 ** 18
    : "0";

  return (
    <div className={`w-[350px] rounded-lg flex flex-col items-center py-4 px-5 absolute z-20 top-4 right-4 shadow-lg ${
        isDarkMode ? "bg-[#1F1333] text-white border border-[#8280FF]" : "bg-[#F8F4FF] text-black border border-[#ECE1FF]"
      }`}>
      {/* Header with close button */}
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Deposit {token}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div>
          <label htmlFor="token" className="block text-sm mb-1">
            Token
          </label>
          <input
            id="token"
            className="w-full px-3 py-2 rounded-md outline-none bg-white/10 text-black"
            type="text"
            readOnly
            value={token}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="amount" className="text-sm">
              Amount
            </label>
            <span className="text-sm text-gray-400">
              Balance: {isLoadingBalance ? "Loading..." : formattedBalance}
            </span>
          </div>
          <input
            id="amount"
            type="text"
            className="w-full px-3 py-2 rounded-md outline-none bg-white/10 text-black"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              // Only allow numbers and one decimal point
              const value = e.target.value.replace(/[^0-9.]/g, "");
              if (value.split(".").length <= 2) {
                setAmount(value);
              }
            }}
          />
          <button 
            className="text-sm text-blue-400 mt-1"
            onClick={() => setAmount(formattedBalance.toString())}
          >
            Max
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 w-full">{error}</p>
      )}

      <button
        onClick={handleDeposit}
        disabled={!isEthereumConnected || !amount || parseFloat(amount) <= 0 || isProcessing}
        className="mt-6 w-full py-2 px-4 bg-[#1F1333] text-white
                 disabled:bg-[#3B2A65] rounded-lg transition-colors"
      >
        {!isEthereumConnected 
          ? "Connect Ethereum Wallet" 
          : isProcessing
          ? "Processing..."
          : "Deposit"
        }
      </button>
    </div>
  );
};

export default Deposit;