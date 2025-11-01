import { defineChain } from "viem";

const sourceId = 1;

export const iopnTesntet = defineChain({
  id: 984,
  name: 'IOPn Testnet',
  nativeCurrency: { name: 'OPN', symbol: 'OPN', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.iopn.tech'],
    },
  },
  blockExplorers: {
    default: {
      name: 'IOPn scan',
      url: 'https://testnet.iopn.tech'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/iopn.jpg",
  iconBackground: 'transparent',
  sourceId,
});
