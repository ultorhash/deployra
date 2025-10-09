import { defineChain } from "viem";

const sourceId = 1;

export const mitosis = defineChain({
  id: 124816,
  name: 'Mitosis',
  nativeCurrency: { name: 'MITO', symbol: 'MITO', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.mitosis.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'mitoscan',
      url: 'https://mitoscan.io/'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/mitosis.jpg",
  iconBackground: 'transparent',
  sourceId,
});
