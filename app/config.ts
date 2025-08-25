import { Metadata } from "next";

 const metadata: Metadata = {
  title: "ZeroXBridge - Secure Cross-Chain Liquidity with Zero-Knowledge Proofs",
  description:
    "Unlock liquidity on Starknet using ZK proofs. No centralized bridges needed. Lock ETH on Ethereum L1 and receive xZB tokens on Starknet for DeFi lending, trading, and staking.",
  keywords:
    "ZeroXBridge, cross-chain, liquidity, zero-knowledge proofs, ZK, Starknet, Ethereum, DeFi, xZB token, decentralized bridge, trustless",
  authors: [{ name: "ZeroXBridge Team" }],
  creator: "ZeroXBridge",
  publisher: "ZeroXBridge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zeroxbridge.xyz",
    siteName: "ZeroXBridge",
    title: "ZeroXBridge - Secure Cross-Chain Liquidity with Zero-Knowledge Proofs",
    description:
      "Unlock liquidity on Starknet using ZK proofs. No centralized bridges needed. Lock ETH on Ethereum L1 and receive xZB tokens on Starknet for DeFi.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ZeroXBridge - Cross-Chain Liquidity Protocol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZeroXBridge",
    creator: "@ZeroXBridge",
    title: "ZeroXBridge - Secure Cross-Chain Liquidity with Zero-Knowledge Proofs",
    description:
      "Unlock liquidity on Starknet using ZK proofs. No centralized bridges needed. Lock ETH on Ethereum L1 and receive xZB tokens on Starknet.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://zeroxbridge.xyz",
  },
  category: "DeFi",
}

export default metadata;