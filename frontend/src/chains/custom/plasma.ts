import { defineChain } from "viem";

const sourceId = 1;

export const plasma = defineChain({
  id: 9745,
  name: 'Plasma',
  nativeCurrency: { name: 'XPL', symbol: 'XPL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://plasma.drpc.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Plasmascan',
      url: 'https://plasmascan.to'
    },
  },
  iconUrl: "/assets/chains/plasma.jpg",
  iconBackground: 'transparent',
  sourceId,
});
