import { defineChain } from "viem";

const sourceId = 1;

export const xosTestnet = defineChain({
  id: 1267,
  name: 'XOS Testnet',
  nativeCurrency: { name: 'XOS', symbol: 'XOS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.x.ink'],
    },
  },
  blockExplorers: {
    default: {
      name: 'xoscan',
      url: 'https://testnet.xoscan.io'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/xos.png",
  iconBackground: 'transparent',
  sourceId
});
