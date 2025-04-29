import { Provider, Account } from 'starknet';

declare global {
  interface Window {
    starknet?: {
      provider: Provider;
      account: Account;
      isConnected: boolean;
      enable: () => Promise<void>;
    };
  }
} 