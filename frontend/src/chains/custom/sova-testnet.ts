import { defineChain } from "viem";

const sourceId = 1;

export const sovaTestnet = defineChain({
  id: 120893,
  name: 'Sova Sepolia Testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.sova.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sovascan',
      url: 'https://explorer.testnet.sova.io'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/sova.png",
  iconBackground: 'transparent',
  sourceId
});
