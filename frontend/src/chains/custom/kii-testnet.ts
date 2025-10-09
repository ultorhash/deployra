import { defineChain } from "viem";

const sourceId = 1;

export const kiiTestnet = defineChain({
  id: 1336,
  name: 'Kii Testnet',
  nativeCurrency: { name: 'KII', symbol: 'KII', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://json-rpc.uno.sentry.testnet.v3.kiivalidator.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kiiscan',
      url: 'https://explorer.kiichain.io/testnet'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/kii.jpg",
  iconBackground: 'transparent',
  sourceId
});
