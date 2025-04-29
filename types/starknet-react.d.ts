declare module '@starknet-react/core' {
  import { Provider } from 'starknet';

  export function useAccount(): {
    address: string | undefined;
    isConnected: boolean;
  };

  export function useStarknet(): {
    connect: () => Promise<void>;
    disconnect: () => void;
    isConnected: boolean;
    library: Provider | undefined;
  };
} 