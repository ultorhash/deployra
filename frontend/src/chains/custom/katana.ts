import { defineChain } from "viem";

const sourceId = 1;

export const katana = defineChain({
  id: 747474,
  name: 'Katana',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.katana.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Katanascan',
      url: 'https://explorer.katanarpc.com'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/katana.svg",
  iconBackground: 'transparent',
  sourceId,
});
