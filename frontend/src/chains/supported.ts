import { RainbowKitChain } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext';
import {
  base, optimism, unichain, soneium, sonic, polygon, sei, scroll, lens, linea, morph,
  berachain, abstract, mantle, sepolia, monadTestnet, riseTestnet, somniaTestnet
} from 'wagmi/chains';

export const supportedChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  base, optimism, unichain, soneium, sonic, polygon, sei, scroll, lens, linea, morph,
  berachain, abstract, mantle, sepolia, monadTestnet, riseTestnet, somniaTestnet
];
