import { RainbowKitChain } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext';
import {
  base, optimism, unichain, soneium, sonic, polygon, sei, scroll, lens, linea, morph,
  berachain, abstract, mantle, sepolia, monadTestnet, riseTestnet, somniaTestnet,
  ink, mode, orderly, apeChain, zksync, hemi, lisk, taiko, mint, blast, polygonZkEvm,
  manta, fraxtal, bob, story, avalanche, canto, bsc, moonbeam, moonriver, astar,
  confluxESpace, beam, chiliz, worldchain, shibarium, flare, degen, xai, kava,
  aurora, zetachain
} from 'wagmi/chains';

export const supportedChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  base, optimism, unichain, soneium, sonic, polygon, sei, scroll, lens, linea, morph,
  berachain, abstract, mantle, sepolia, monadTestnet, riseTestnet, somniaTestnet, ink,
  mode, orderly, apeChain, zksync, hemi, lisk, taiko, mint, blast, polygonZkEvm,
  manta, fraxtal, bob, story, avalanche, canto, bsc, moonbeam, moonriver, astar,
  confluxESpace, beam, chiliz, worldchain, shibarium, flare, degen, xai, kava,
  aurora, zetachain
];
