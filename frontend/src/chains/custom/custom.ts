import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";
import { hyperevm } from "./hyperevm";
import { pharos } from "./pharos";
import { citrea } from "./citrea";
import { botanix } from "./botanix";
import { mocaTestnet } from "./moca-testnet";
import { OgGalileoTestnet } from "./0g-galileo-testnet";

export const customChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  hyperevm, pharos, citrea, botanix, mocaTestnet, OgGalileoTestnet
];
