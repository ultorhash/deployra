import { defineChain } from "viem";

const sourceId = 1;

export const stableTesntet = defineChain({
  id: 2201,
  name: 'Stable Testnet',
  nativeCurrency: { name: 'gUSDT', symbol: 'gUSDT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.stable.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Stablescan',
      url: 'https://testnet.stablescan.xyz'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/stable.jpg",
  iconBackground: 'transparent',
  sourceId,
});
