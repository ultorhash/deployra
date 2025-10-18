import { defineChain } from "viem";

const sourceId = 1;

export const zeroNetwork = defineChain({
  id: 543210,
  name: 'Zero Network',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.zerion.io/v1/zero'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Zero Network scan',
      url: 'https://explorer.zero.network'
    },
  },
  iconUrl: "/assets/chains/zeronetwork.jpg",
  iconBackground: 'transparent',
  sourceId,
});
