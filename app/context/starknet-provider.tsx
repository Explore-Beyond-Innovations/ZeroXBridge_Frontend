import { ReactNode } from "react";
import { sepolia } from "@starknet-react/chains";
import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { starknetConnectors } from "@/lib/connectors";

export const StarknetProvider = ({ children }: { children: ReactNode }) => {
  const provider = publicProvider();
  const chains = [sepolia];

  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={Object.values(starknetConnectors)}
    >
      {children}
    </StarknetConfig>
  );
};
