import { defineChain } from "viem";

const sourceId = 1;

export const raylsTestnet = defineChain({
  id: 123123,
  name: 'Rayls Testnet',
  nativeCurrency: { name: 'USDgas', symbol: 'USDgas', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://devnet-rpc.rayls.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Rayls Explorer',
      url: 'https://devnet-explorer.rayls.com/'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/rayls.jpg",
  iconBackground: 'transparent',
  sourceId,
});
