import { defineChain } from "viem";

const sourceId = 1;

export const megaETHTimothy = defineChain({
  id: 6343,
  name: 'MegaETH Timothy',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://timothy.megaeth.com/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'MegaETH V2 Scan',
      url: 'https://megaeth-testnet-v2.blockscout.com/'
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0
    }
  },
  iconUrl: "/assets/chains/megaeth.png",
  iconBackground: 'transparent',
  sourceId,
});
