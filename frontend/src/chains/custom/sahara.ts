import { defineChain } from "viem";

const sourceId = 1;

export const sahara = defineChain({
  id: 3132023,
  name: 'Sahara AI',
  nativeCurrency: { name: 'SAHARA', symbol: 'SAHARA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.saharalabs.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Saharascan',
      url: 'https://saharalabs.ai'
    },
  },
  iconUrl: "/assets/chains/sahara.png",
  iconBackground: 'transparent',
  sourceId,
});
