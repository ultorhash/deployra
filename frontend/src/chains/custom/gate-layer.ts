import { defineChain } from "viem";

const sourceId = 1;

export const gateLayer = defineChain({
  id: 10088,
  name: 'Gate Layer',
  nativeCurrency: { name: 'GT', symbol: 'GT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://gatelayer-mainnet.gatenode.cc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Gate Layer scan',
      url: 'https://www.gatescan.org/gatelayer'
    },
  },
  iconUrl: "/assets/chains/gatelayer.jpg",
  iconBackground: 'transparent',
  sourceId,
});
