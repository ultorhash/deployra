import { defineChain } from "viem";

const sourceId = 1;

export const mezo = defineChain({
  id: 31612,
  name: 'Mezo',
  nativeCurrency: { name: 'BTC', symbol: 'BTC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-internal.mezo.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mezoscan',
      url: 'https://explorer.mezo.org'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/mezo.jpg",
  iconBackground: 'transparent',
  sourceId,
});
