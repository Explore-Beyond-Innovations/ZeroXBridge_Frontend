import { useAccount, useConnect, useDisconnect } from "wagmi";

export const useEthereumWallet = () => {
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId, status } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();

  const connectEthereumWallet = async (connectorId: string) => {
    const connector = connectors.find(
      (connector) => connector.id === connectorId,
    );
    if (!connector)
      throw new Error(`Connector with id ${connectorId} not found`);
    connect({ connector });
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
    };
};
