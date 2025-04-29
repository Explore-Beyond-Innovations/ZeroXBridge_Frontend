import { Contract } from 'starknet';
import { useAccount } from '@starknet-react/core';

// Contract ABIs
const ZERO_X_BRIDGE_L1_ABI = [
  {
    name: "claim",
    type: "function",
    inputs: [
      { name: "amount", type: "felt" },
      { name: "asset", type: "felt" }
    ],
    outputs: [],
    state_mutability: "external"
  }
];

const ZERO_X_BRIDGE_L2_ABI = [
  {
    name: "burn",
    type: "function",
    inputs: [
      { name: "amount", type: "felt" },
      { name: "asset", type: "felt" }
    ],
    outputs: [],
    state_mutability: "external"
  }
];

// Contract addresses (replace with actual addresses)
const L1_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_L1_CONTRACT_ADDRESS || '';
const L2_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_L2_CONTRACT_ADDRESS || '';

export const useZeroXBridge = () => {
  const { address, isConnected } = useAccount();

  const burnTokens = async (amount: string, asset: string) => {
    if (!isConnected || !window.starknet?.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new Contract(ZERO_X_BRIDGE_L2_ABI, L2_CONTRACT_ADDRESS, window.starknet.provider);
      const tx = await contract.invoke('burn', [amount, asset]);
      return tx;
    } catch (error) {
      console.error('Error burning tokens:', error);
      throw error;
    }
  };

  const claimTokens = async (amount: string, asset: string) => {
    if (!isConnected || !window.starknet?.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new Contract(ZERO_X_BRIDGE_L1_ABI, L1_CONTRACT_ADDRESS, window.starknet.provider);
      const tx = await contract.invoke('claim', [amount, asset]);
      return tx;
    } catch (error) {
      console.error('Error claiming tokens:', error);
      throw error;
    }
  };

  return {
    burnTokens,
    claimTokens
  };
}; 