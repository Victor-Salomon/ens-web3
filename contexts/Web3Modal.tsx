"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WC_ID ?? "";

// 2. Set chains
const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org/",
};

// 3. Create modal
const metadata = {
  name: "ENS Test",
  description: "Sepolia ESN connection",
  url: "", // origin must match your domain & subdomain
  icons: [""],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return children;
}
