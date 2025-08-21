import { useState, useCallback, useRef } from 'react';
import { useConnect as useStarknetConnect } from '@starknet-react/core';
import { useConnect as useEthereumConnect } from 'wagmi';
import { WalletError, parseWalletError, createWalletError, WalletErrorType } from '@/app/utils/walletErrors';

export type WalletType = 'ethereum' | 'starknet';
export type ConnectionStep = 'idle' | 'connecting' | 'connected' | 'failed' | 'success';

interface WalletConnectionState {
  isConnecting: boolean;
  error: WalletError | null;
  connectionStep: ConnectionStep;
  connectedWallet: string | null;
  attemptCount: number;
  lastAttemptTimestamp: number | null;
}

const CONNECTION_TIMEOUT = 30000; // 30 seconds
const DEBOUNCE_DELAY = 1000; // 1 second between attempts

export const useWalletConnection = (walletType: WalletType) => {
  const [state, setState] = useState<WalletConnectionState>({
    isConnecting: false,
    error: null,
    connectionStep: 'idle',
    connectedWallet: null,
    attemptCount: 0,
    lastAttemptTimestamp: null
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const starknetConnect = useStarknetConnect();
  const ethereumConnect = useEthereumConnect();

  const updateState = useCallback((updates: Partial<WalletConnectionState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  const connectWallet = useCallback(async (connector: any) => {
    const now = Date.now();
    
    // Prevent rapid successive attempts (debouncing)
    if (state.lastAttemptTimestamp && (now - state.lastAttemptTimestamp) < DEBOUNCE_DELAY) {
      return;
    }

    // Prevent multiple concurrent connections
    if (state.isConnecting) {
      return;
    }

    try {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Update state for connection attempt
      updateState({
        isConnecting: true,
        error: null,
        connectionStep: 'connecting',
        connectedWallet: null,
        attemptCount: state.attemptCount + 1,
        lastAttemptTimestamp: now
      });

      // Set timeout for connection
      const timeoutPromise = new Promise((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(createWalletError(WalletErrorType.CONNECTION_FAILED));
        }, CONNECTION_TIMEOUT);
      });

      // Connection promise
      const connectionPromise = new Promise((resolve, reject) => {
        if (walletType === 'starknet') {
          starknetConnect.connect({ connector }, {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          });
        } else {
          ethereumConnect.connect({ connector }, {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          });
        }
      });

      // Race between connection and timeout
      const result = await Promise.race([connectionPromise, timeoutPromise]);

      // Clear timeout on success
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Success - first show success state briefly
      updateState({
        isConnecting: false,
        connectionStep: 'success',
        connectedWallet: connector.name || connector.id
      });

      // After a brief moment, transition to connected state
      setTimeout(() => {
        updateState({
          connectionStep: 'connected'
        });
      }, 1500);

      return result;

    } catch (error) {
      // Clear timeout on error
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const walletError = parseWalletError(error);
      
      updateState({
        isConnecting: false,
        error: walletError,
        connectionStep: 'failed'
      });

      throw walletError;
    }
  }, [walletType, starknetConnect, ethereumConnect, updateState, state.isConnecting, state.lastAttemptTimestamp, state.attemptCount]);

  const retryConnection = useCallback((connector: any) => {
    return connectWallet(connector);
  }, [connectWallet]);

  // Cleanup timeout on unmount
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    ...state,
    connectWallet,
    retryConnection,
    clearError,
    cleanup,
    isIdle: state.connectionStep === 'idle',
    isConnected: state.connectionStep === 'connected',
    isSuccess: state.connectionStep === 'success',
    hasFailed: state.connectionStep === 'failed',
    canRetry: !state.isConnecting && state.connectionStep === 'failed'
  };
};