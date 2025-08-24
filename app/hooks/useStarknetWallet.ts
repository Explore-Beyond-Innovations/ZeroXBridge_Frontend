import {
  ConnectVariables,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";

export const useStarknetWallet = () => {
  const { account, status } = useAccount();
  const { disconnect } = useDisconnect({});
  const { connect } = useConnect({});

  const connectStarknetWallet = (connector: ConnectVariables) => {
    connect(connector);
  };

  return {
    account,
    status,
    connectStarknetWallet,
    disconnectStarknetWallet: disconnect,
  };
};
