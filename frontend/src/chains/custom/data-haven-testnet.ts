import { defineChain } from "viem";

const sourceId = 1;

export const dataHavenTestnet = defineChain({
  id: 55931,
  name: 'DataHaven Testnet',
  nativeCurrency: { name: 'Mock', symbol: 'MOCK', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.walletconnect.org/v1/?chainId=eip155:55931&projectId=e319343105b8f1e7a3a824855698dac7'],
    },
  },
  blockExplorers: {
    default: {
      name: 'DH scan',
      url: 'https://testnet.dhscan.io'
    },
  },
  iconUrl: "/assets/chains/datahaven.jpg",
  iconBackground: 'transparent',
  sourceId,
});
