import { RainbowKitChain } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext';
import {
  base, optimism, unichain, soneium, sonic, polygon, sei, scroll, lens, linea, morph,
  berachain, abstract, mantle, sepolia, monadTestnet, riseTestnet, somniaTestnet,
  ink, mode, orderly, apeChain, zksync, hemi, lisk, taiko, mint, blast, polygonZkEvm,
  manta, fraxtal, bob, story, avalanche, canto, bsc, moonbeam, moonriver, astar,
  confluxESpace, beam, chiliz, worldchain, shibarium, flare, degen, xai, kava,
  aurora, zetachain, cronos
} from 'wagmi/chains';

const soneiumUX = { ...soneium, iconUrl: "/assets/chains/soneium.svg", iconBackground: 'transparent' };
const sonicUX = { ...sonic, iconUrl: "/assets/chains/sonic.svg", iconBackground: 'transparent' };
const seiUX = { ...sei, iconUrl: "/assets/chains/sei.svg", iconBackground: 'transparent' };
const lensUX = { ...lens, iconUrl: "/assets/chains/lens.svg", iconBackground: 'transparent' };
const morphUX = { ...morph, iconUrl: "/assets/chains/morph.svg", iconBackground: 'transparent' };
const abstractUX = { ...abstract, iconUrl: "/assets/chains/abstract.png", iconBackground: 'transparent' };
const monadTestnetUX = { ...monadTestnet, iconUrl: "/assets/chains/monad.png", iconBackground: 'transparent' };
const riseTestnetUX = { ...riseTestnet, iconUrl: "/assets/chains/rise.svg", iconBackground: 'transparent' };
const somniaTestnetUX = { ...somniaTestnet, iconUrl: "/assets/chains/somnia.svg", iconBackground: 'transparent' };
const modeUX = { ...mode, iconUrl: "/assets/chains/mode.svg", iconBackground: 'transparent' };
const orderlyUX = { ...orderly, iconUrl: "/assets/chains/orderly.svg", iconBackground: 'transparent' };
const hemiUX = { ...hemi, iconUrl: "/assets/chains/hemi.svg", iconBackground: 'transparent' };
const liskUX = { ...lisk, iconUrl: "/assets/chains/lisk.svg", iconBackground: 'transparent' };
const taikoUX = { ...taiko, iconUrl: "/assets/chains/taiko.svg", iconBackground: 'transparent' };
const mintUX = { ...mint, iconUrl: "/assets/chains/mint.svg", iconBackground: 'transparent' };
const polygonZkEvmUX = { ...polygonZkEvm, iconUrl: "/assets/chains/polygonzkevm.svg", iconBackground: 'transparent' };
const fraxtalUX = { ...fraxtal, iconUrl: "/assets/chains/fraxtal.svg", iconBackground: 'transparent' };
const bobUX = { ...bob, iconUrl: "/assets/chains/bob.svg", iconBackground: 'transparent' };
const storyUX = { ...story, iconUrl: "/assets/chains/story.svg", iconBackground: 'transparent' };
const cantoUX = { ...canto, iconUrl: "/assets/chains/canto.svg", iconBackground: 'transparent' };
const moonbeamUX = { ...moonbeam, iconUrl: "/assets/chains/moonbeam.svg", iconBackground: 'transparent' };
const moonriverUX = { ...moonriver, iconUrl: "/assets/chains/moonriver.svg", iconBackground: 'transparent' };
const astarUX = { ...astar, iconUrl: "/assets/chains/astar.svg", iconBackground: 'transparent' };
const confluxESpaceUX = { ...confluxESpace, iconUrl: "/assets/chains/conflux.svg", iconBackground: 'transparent' };
const beamUX = { ...beam, iconUrl: "/assets/chains/beam.svg", iconBackground: 'transparent' };
const chilizUX = { ...chiliz, iconUrl: "/assets/chains/chiliz.svg", iconBackground: 'transparent' };
const worldchainUX = { ...worldchain, iconUrl: "/assets/chains/worldchain.svg", iconBackground: 'transparent' };
const shibariumUX = { ...shibarium, iconUrl: "/assets/chains/shibarium.svg", iconBackground: 'transparent' };
const flareUX = { ...flare, iconUrl: "/assets/chains/flare.svg", iconBackground: 'transparent' };
const xaiUX = { ...xai, iconUrl: "/assets/chains/xai.svg", iconBackground: 'transparent' };
const kavaUX = { ...kava, iconUrl: "/assets/chains/kava.svg", iconBackground: 'transparent' };
const auroraUX = { ...aurora, iconUrl: "/assets/chains/aurora.svg", iconBackground: 'transparent' };

export const supportedChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  base, optimism, unichain, soneiumUX, sonicUX, polygon, seiUX, scroll, lensUX, linea, morphUX,
  berachain, abstractUX, mantle, sepolia, monadTestnetUX, riseTestnetUX, somniaTestnetUX, ink,
  modeUX, orderlyUX, apeChain, zksync, hemiUX, liskUX, taikoUX, mintUX, blast, polygonZkEvmUX,
  manta, fraxtalUX, bobUX, storyUX, avalanche, cantoUX, bsc, moonbeamUX, moonriverUX, astarUX,
  confluxESpaceUX, beamUX, chilizUX, worldchainUX, shibariumUX, flareUX, degen, xaiUX, kavaUX,
  auroraUX, zetachain, cronos
];
