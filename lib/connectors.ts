import { InjectedConnector } from "@starknet-react/core";

export const starknetConnectors = {
  braavos: new InjectedConnector({ options: { id: "braavos" } }),
  argentX: new InjectedConnector({ options: { id: "argentX" } }),
};
