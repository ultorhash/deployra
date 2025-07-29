import { defineChain } from "viem";

const sourceId = 1;

export const botanix = defineChain({
  id: 3637,
  name: 'Botanix Mainnet',
  nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/botanix_mainnet'],
    },
  },
  blockExplorers: {
    default: {
      name: 'botanixscan',
      url: 'https://botanixscan.io'
    },
  },
  iconUrl: "/assets/chains/botanix.png",
  iconBackground: 'transparent',
  sourceId,
});
