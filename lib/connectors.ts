import { InjectedConnector } from "@starknet-react/core";

export const starknetConnectorMeta = {
  braavos: {
    id: "braavos",
    name: "Braavos",
    icon: "/wallet-logos/braavos.svg",
  },
  argentX: {
    id: "argentX",
    name: "ArgentX",
    icon: "/wallet-logos/ready.svg",
  },
} as const;

// they're basically wallets. but i chose to call it providers based on how
// we're accessing them from the window object
export type StarknetProviders = {
  id: string;
  name: string;
  icon: string;
};

export type StarknetConnectorId = keyof typeof starknetConnectorMeta;

export const starknetConnectors = {
  braavos: new InjectedConnector({ options: { id: "braavos" } }),
  argentX: new InjectedConnector({ options: { id: "argentX" } }),
};
