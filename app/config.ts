import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia} from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
})

// Bridge contract addresses
export const BRIDGE_CONTRACTS: Record<number, string> = {
  [sepolia.id]: '0x8F25bFe32269632dfd8D223D51FF145414d8107b',
  // Add other networks as needed
}