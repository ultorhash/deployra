import { defineChain } from "viem";

const sourceId = 1;

export const fluentTestnet = defineChain({
  id: 20994,
  name: 'Fluent Testnet',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.fluent.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Fluentscan',
      url: 'https://testnet.fluentscan.xyz'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/fluent.jpg",
  iconBackground: 'transparent',
  sourceId
});
