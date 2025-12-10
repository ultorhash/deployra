import { defineChain } from "viem";

const sourceId = 1;

export const ecoChainTestnet = defineChain({
  id: 10778,
  name: 'EcoChain Testnet',
  nativeCurrency: { name: 'X1T', symbol: 'X1T', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://maculatus-rpc.x1eco.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Maculatus Scan',
      url: 'https://maculatus-scan.x1eco.com'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/ecochain.png",
  iconBackground: 'transparent',
  sourceId,
});
