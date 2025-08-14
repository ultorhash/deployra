import { defineChain } from "viem";

const sourceId = 1;

export const blockchainTestnet = defineChain({
  id: 6231991,
  name: 'Block Chain Testkek',
  nativeCurrency: { name: 'Bitcoin', symbol: 'BITCOIN', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://block-chain-testkek.alt.technology'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Block Chain',
      url: 'https://explorer.block-chain.lol'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/blockchain.jpg",
  iconBackground: 'transparent',
  sourceId
});
