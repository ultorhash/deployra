import { defineChain } from "viem";

const sourceId = 1;

export const zora = defineChain({
  id: 7777777,
  name: 'Zora',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Zora energy',
      url: 'https://explorer.zora.energy'
    },
  },
  iconUrl: "/assets/chains/zora.jpg",
  iconBackground: 'transparent',
  sourceId,
});
