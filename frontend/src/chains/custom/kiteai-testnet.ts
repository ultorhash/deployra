import { defineChain } from "viem";

const sourceId = 1;

export const kiteai = defineChain({
  id: 2368,
  name: 'KiteAI',
  nativeCurrency: { name: 'KITE', symbol: 'KITE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.gokite.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KiteAI scan',
      url: 'https://testnet.kitescan.ai'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/kiteai.jpg",
  iconBackground: 'transparent',
  sourceId,
});
