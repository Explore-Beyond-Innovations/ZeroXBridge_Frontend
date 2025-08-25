import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useWalletClient,
} from "wagmi";

export const useEthereumWallet = () => {
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId, status } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { data: walletClient } = useWalletClient();
  const { signMessageAsync } = useSignMessage();

  const connectEthereumWallet = async (connectorId: string) => {
    const connector = connectors.find(
      (connector) => connector.id === connectorId
    );
    if (!connector)
      throw new Error(`Connector with id ${connectorId} not found`);
    connect({ connector });
  };

  // Get signer to sign messages
  const getSigner = async () => {
    if (!walletClient) {
      throw new Error("Wallet client not available");
    }
    return {
      signMessage: async (message: string) => {
        return await signMessageAsync({ message });
      },
    };
  };

  return {
    address,
    chainId,
    isConnected,
    status,
    isConnecting,
    connectors,
    connectEthereumWallet,
    disconnectEthereumWallet: disconnect,
    getSigner,
  };
};
