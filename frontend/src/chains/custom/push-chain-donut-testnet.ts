import { defineChain } from "viem";

const sourceId = 1;

export const pushChainDonutTestnet = defineChain({
  id: 42101,
  name: 'Push Chain Donut Testnet',
  nativeCurrency: { name: 'PC', symbol: 'PC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm.donut.rpc.push.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Push Chain Donut Explorer',
      url: 'https://donut.push.network'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/pushchain.jpg",
  iconBackground: 'transparent',
  sourceId,
});
