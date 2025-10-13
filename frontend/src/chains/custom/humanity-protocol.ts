import { defineChain } from "viem";

const sourceId = 1;

export const humanityProtocol = defineChain({
  id: 6985385,
  name: 'Humanity Protocol',
  nativeCurrency: { name: 'H', symbol: 'H', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://humanity-mainnet.g.alchemy.com/public'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Humanity Protocol scan',
      url: 'https://humanity-mainnet.explorer.alchemy.com'
    },
  },
  iconUrl: "/assets/chains/humanityprotocol.jpg",
  iconBackground: 'transparent',
  sourceId,
});
