import { defineChain } from "viem";

const sourceId = 1;

export const nitrographTestnet = defineChain({
  id: 200024,
  name: 'Nitro Graph Testnet',
  nativeCurrency: { name: 'NOS', symbol: 'NOS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.nitrograph.foundation'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Nitroscan',
      url: 'https://explorer-testnet.nitrograph.foundation'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/nitrograph.jpg",
  iconBackground: 'transparent',
  sourceId
});
