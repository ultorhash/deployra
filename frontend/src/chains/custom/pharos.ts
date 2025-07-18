import { defineChain } from "viem";

const sourceId = 1;

export const pharos = defineChain({
  id: 688688,
  name: 'Pharos Testnet',
  nativeCurrency: { name: 'Pharos', symbol: 'PHRS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.dplabs-internal.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'pharosscan',
      url: 'https://testnet.pharosscan.xyz'
    },
  },
  iconUrl: "/assets/chains/pharos.png",
  iconBackground: 'transparent',
  sourceId,
});
