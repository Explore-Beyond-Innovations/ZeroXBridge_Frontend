import { useState, useCallback } from 'react';
import { useConnect as useStarknetConnect } from '@starknet-react/core';
import { useConnect as useEthereumConnect } from 'wagmi';
import { WalletError, parseWalletError } from '@/app/utils/walletErrors';

export type WalletType = 'ethereum' | 'starknet';
export type ConnectionStep = 'idle' | 'connecting' | 'connected' | 'failed';

interface WalletConnectionState {
  isConnecting: boolean;
  error: WalletError | null;
  connectionStep: ConnectionStep;
  connectedWallet: string | null;
}

export const useWalletConnection = (walletType: WalletType) => {
  const [state, setState] = useState<WalletConnectionState>({
    isConnecting: false,
    error: null,
    connectionStep: 'idle',
    connectedWallet: null
  });

  const starknetConnect = useStarknetConnect();
  const ethereumConnect = useEthereumConnect();

  const updateState = useCallback((updates: Partial<WalletConnectionState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  const connectWallet = useCallback(async (connector: any) => {
    try {
      // Reset state
      updateState({
        isConnecting: true,
        error: null,
        connectionStep: 'connecting',
        connectedWallet: null
      });

      let result;
      
      if (walletType === 'starknet') {
        result = await new Promise((resolve, reject) => {
          starknetConnect.connect({ connector }, {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          });
        });
      } else {
        result = await new Promise((resolve, reject) => {
          ethereumConnect.connect({ connector }, {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          });
        });
      }

      // Success
      updateState({
        isConnecting: false,
        connectionStep: 'connected',
        connectedWallet: connector.name || connector.id
      });

      return result;

    } catch (error) {
      const walletError = parseWalletError(error);
      
      updateState({
        isConnecting: false,
        error: walletError,
        connectionStep: 'failed'
      });

      throw walletError;
    }
  }, [walletType, starknetConnect, ethereumConnect, updateState]);

  const retryConnection = useCallback((connector: any) => {
    return connectWallet(connector);
  }, [connectWallet]);

  return {
    ...state,
    connectWallet,
    retryConnection,
    clearError,
    isIdle: state.connectionStep === 'idle',
    isConnected: state.connectionStep === 'connected',
    hasFailed: state.connectionStep === 'failed'
  };
};