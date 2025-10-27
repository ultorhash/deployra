import { defineChain } from "viem";

const sourceId = 1;

export const pharosAtlantic = defineChain({
  id: 688689,
  name: 'Pharos Atlantic Testnet',
  nativeCurrency: { name: 'Pharos', symbol: 'PHRS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://atlantic.dplabs-internal.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Pharos Atlantic Scan',
      url: 'https://atlantic.pharosscan.xyz'
    },
  },
  iconUrl: "/assets/chains/pharos.png",
  iconBackground: 'transparent',
  sourceId,
});
