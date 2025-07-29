import { defineChain } from "viem";

const sourceId = 1;

export const mocaTestnet = defineChain({
  id: 5151,
  name: 'Moca Chain Testnet',
  nativeCurrency: { name: 'Moca', symbol: 'MOCA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.mechain.tech'],
    },
  },
  blockExplorers: {
    default: {
      name: 'scan mocachain',
      url: 'https://devnet-scan.mocachain.org/'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/moca.png",
  iconBackground: 'transparent'
});
