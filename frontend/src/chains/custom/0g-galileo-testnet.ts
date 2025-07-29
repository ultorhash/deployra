import { defineChain } from "viem";

const sourceId = 1;

export const OgGalileoTestnet = defineChain({
  id: 16601,
  name: '0G Galileo Testnet',
  nativeCurrency: { name: 'A0GI', symbol: 'A0GI', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: 'chainscan galileo',
      url: 'https://chainscan-galileo.0g.ai'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/0glabs.png",
  iconBackground: 'transparent',
  sourceId
});
