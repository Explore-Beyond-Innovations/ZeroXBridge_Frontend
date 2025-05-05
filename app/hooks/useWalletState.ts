import { useAccount as useStarknetAccount, useDisconnect as useStarknetDisconnect } from '@starknet-react/core';
import { useAccount as useEthereumAccount, useDisconnect as useEthereumDisconnect } from 'wagmi';

export const useWalletState = () => {
  const { address: starknetAddress, isConnected: isStarknetConnected } = useStarknetAccount();
  const { address: ethereumAddress, isConnected: isEthereumConnected } = useEthereumAccount();
  const { disconnect: disconnectStarknet } = useStarknetDisconnect();
  const { disconnect: disconnectEthereum } = useEthereumDisconnect();

  const disconnectAll = () => {
    if (isStarknetConnected) disconnectStarknet();
    if (isEthereumConnected) disconnectEthereum();
  };

  const getDisplayAddress = () => {
    if (starknetAddress && ethereumAddress) {
      return `${starknetAddress.substring(0, 6)}...${starknetAddress.slice(-4)}`;
    }
    if (starknetAddress) {
      return `${starknetAddress.substring(0, 6)}...${starknetAddress.slice(-4)}`;
    }
    if (ethereumAddress) {
      return `${ethereumAddress.substring(0, 6)}...${ethereumAddress.slice(-4)}`;
    }
    return "Connect Wallet";
  };

  return {
    starknetAddress,
    ethereumAddress,
    isStarknetConnected,
    isEthereumConnected,
    disconnectAll,
    getDisplayAddress,
    isAnyWalletConnected: isStarknetConnected || isEthereumConnected,
    isAllConnected: isStarknetConnected && isEthereumConnected
  };
};