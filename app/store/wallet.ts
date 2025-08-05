import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WalletState {
  isWalletModalOpen: boolean;
  ethAddress: string | null;
  ethConnected: boolean;
  ethConnecting: boolean;
  ethChainId: number | null;
  strkAddress: string | null;
  strkConnected: boolean;
  strkConnecting: boolean;
  error: string | null;
}

export interface WalletActions {
  openWalletModal: () => void;
  closeWalletModal: () => void;
  setEthWallet: (data: {
    address: string | null;
    connected: boolean;
    connecting: boolean;
    chainId: number | null;
  }) => void;
  setStrkWallet: (data: {
    address: string | null;
    connected: boolean;
    connecting: boolean;
  }) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetWallet: (type: "ETH" | "STRK") => void;
}

export type WalletStore = WalletState & WalletActions;

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      isWalletModalOpen: false,
      activeNetwork: null,
      ethAddress: null,
      ethConnected: false,
      ethConnecting: false,
      ethChainId: null,
      strkAddress: null,
      strkConnected: false,
      strkConnecting: false,
      error: null,

      openWalletModal: () => set({ isWalletModalOpen: true }),
      closeWalletModal: () => set({ isWalletModalOpen: false }),

      setEthWallet: (data) =>
        set({
          ethAddress: data.address,
          ethConnected: data.connected,
          ethConnecting: data.connecting,
          ethChainId: data.chainId,
        }),

      setStrkWallet: (data) =>
        set({
          strkAddress: data.address,
          strkConnected: data.connected,
          strkConnecting: data.connecting,
        }),

      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      resetWallet: (type) => {
        if (type === "ETH") {
          set({
            ethAddress: null,
            ethConnected: false,
            ethConnecting: false,
            ethChainId: null,
          });
        } else {
          set({
            strkAddress: null,
            strkConnected: false,
            strkConnecting: false,
          });
        }
      },
    }),
    {
      name: "wallet-storage", // we need this for localStorage persistence
      partialize: (state) => ({
        ethAddress: state.ethAddress,
        ethConnected: state.ethConnected,
        ethChainId: state.ethChainId,
        strkAddress: state.strkAddress,
        strkConnected: state.strkConnected,
      }),
    },
  ),
);
