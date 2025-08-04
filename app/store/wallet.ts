import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
  isWalletModalOpen: boolean;
}

export interface WalletActions {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setAddress: (address: string | null) => void;
  setChainId: (chainId: number | null) => void;
  setConnecting: (isConnecting: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  openWalletModal: () => void;
  closeWalletModal: () => void;
}

export type WalletStore = WalletState & WalletActions;

const generateMockAddress = (): string => {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      isConnected: false,
      address: null,
      chainId: null,
      isConnecting: false,
      error: null,

      connectWallet: async () => {
        const { isConnected, isConnecting } = get();
        if (isConnected || isConnecting) return;

        set({ isConnecting: true, error: null });

        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const mockAddress = generateMockAddress();
          const mockChainId = 1;

          set({
            isConnected: true,
            address: mockAddress,
            chainId: mockChainId,
            isConnecting: false,
            error: null,
          });
        } catch (error) {
          set({
            isConnecting: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to connect wallet",
          });
        }
      },

      disconnectWallet: () => {
        set({
          isConnected: false,
          address: null,
          chainId: null,
          isConnecting: false,
          error: null,
        });
      },

      setAddress: (address) => set({ address }),
      setChainId: (chainId) => set({ chainId }),
      setConnecting: (isConnecting) => set({ isConnecting }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      isWalletModalOpen: false,
      openWalletModal: () => set({ isWalletModalOpen: true }),
      closeWalletModal: () => set({ isWalletModalOpen: false }),
    }),
    {
      name: "wallet-storage", // we need this for localStorage persistence
      partialize: (state) => ({
        isConnected: state.isConnected,
        address: state.address,
        chainId: state.chainId,
      }),
    },
  ),
);

export const selectWalletConnection = (state: WalletStore) => ({
  isConnected: state.isConnected,
  isConnecting: state.isConnecting,
});

export const selectWalletAddress = (state: WalletStore) => ({
  address: state.address,
  shortAddress: state.address
    ? `${state.address.slice(0, 4)}...${state.address.slice(-6)}`
    : null,
});

export const selectWalletError = (state: WalletStore) => state.error;
