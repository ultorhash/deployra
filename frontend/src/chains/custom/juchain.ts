import { defineChain } from "viem";

const sourceId = 1;

export const juchain = defineChain({
  id: 210000,
  name: 'JuChain',
  nativeCurrency: { name: 'JU', symbol: 'JU', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.juchain.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'juscan',
      url: 'https://juscan.io'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/juchain.jpg",
  iconBackground: 'transparent',
  sourceId,
});
