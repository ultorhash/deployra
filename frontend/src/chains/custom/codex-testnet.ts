import { defineChain } from "viem";

const sourceId = 1;

export const codexTestnet = defineChain({
  id: 812242,
  name: 'Codex Testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.codex-stg.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Codex explorer',
      url: 'https://explorer.codex-stg.xyz'
    },
  },
  iconUrl: "/assets/chains/codex.jpg",
  iconBackground: 'transparent',
  sourceId,
});
