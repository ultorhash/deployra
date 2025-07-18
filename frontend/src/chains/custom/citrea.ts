import { defineChain } from "viem";

const sourceId = 1;

export const citrea = defineChain({
  id: 5115,
  name: 'Citrea Testnet',
  nativeCurrency: { name: 'Citrea Testnet', symbol: 'cBTC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.citrea.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'explorer testnet citrea',
      url: 'https://explorer.testnet.citrea.xyz'
    },
  },
  iconUrl: "/assets/chains/citrea.png",
  iconBackground: 'transparent',
  sourceId,
});
