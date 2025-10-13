import { defineChain } from "viem";

const sourceId = 1;

export const somnia = defineChain({
  id: 5031,
  name: 'Somnia',
  nativeCurrency: { name: 'SOMI', symbol: 'SOMI', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Somnia scan',
      url: 'https://explorer.somnia.network'
    },
  },
  iconUrl: "/assets/chains/somnia.svg",
  iconBackground: 'transparent',
  sourceId,
});
