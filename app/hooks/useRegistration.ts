import { useState } from 'react';
import { useAccount as useStarknetAccount } from "@starknet-react/core";
import { useAccount as useEthereumAccount, useSignMessage, useWriteContract } from "wagmi";

const BRIDGE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BRIDGE_CONTRACT_ADDRESS;

const BRIDGE_ABI = [
  {
    inputs: [
      { name: "signature", type: "bytes" },
      { name: "starknetPubKey", type: "uint256" }
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "starknetPubKey", type: "uint256", indexed: false }
    ],
    name: "UserRegistered",
    type: "event"
  }
] as const;

export const useRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { address: starknetAddress } = useStarknetAccount();
  const { address: ethereumAddress } = useEthereumAccount();
  const { signMessageAsync } = useSignMessage();

  const { data: hash, writeContract } = useWriteContract();
  
 

  const registerUser = async () => {
    if (!starknetAddress || !ethereumAddress) {
      setError("Please connect both Ethereum and Starknet wallets");
      return;
    }

    try {
      setIsRegistering(true);
      setError(null);

      // 1. Get Starknet public key
      const starknetPubKey = BigInt(starknetAddress);

      // 2. Create message to sign
      const message = `Register Starknet wallet ${starknetAddress} for Ethereum wallet ${ethereumAddress}`;
      
      // 3. Sign with Ethereum wallet
      const signature = await signMessageAsync({ message });

      writeContract ({
        address: `0x${BRIDGE_CONTRACT_ADDRESS}`,
        abi: BRIDGE_ABI,
        functionName: 'registerUser',
        args: [`0x${signature}`, starknetPubKey],
        });

      // 4. Call bridge contract
      const tx = hash;


      // 6. Register in database
      const dbResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          eth_address: ethereumAddress,
          starknet_address: starknetAddress 
        }),
      });

      if (!dbResponse.ok) {
        throw new Error('Failed to register in database');
      }

      return tx;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : "Failed to register");
      throw err;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    registerUser,
    isRegistering,
    error,
    isReady: Boolean(starknetAddress && ethereumAddress)
  };
};