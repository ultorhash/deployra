import { defineChain } from "viem";

const sourceId = 1;

export const neuraTestnet = defineChain({
  id: 267,
  name: 'Neura Testnet',
  nativeCurrency: { name: 'ANKR', symbol: 'ANKR', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.neuraprotocol.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://testnet-blockscout.infra.neuraprotocol.io/'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/neura.jpg",
  iconBackground: 'transparent',
  sourceId
});
