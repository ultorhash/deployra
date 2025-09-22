import { defineChain } from "viem";

const sourceId = 1;

export const giwaTestnet = defineChain({
  id: 91342,
  name: 'Giwa Testnet',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rpc.giwa.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Giwascan',
      url: 'https://sepolia-explorer.giwa.io'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/giwa.jpg",
  iconBackground: 'transparent',
  sourceId
});
