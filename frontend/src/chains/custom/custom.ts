import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";
import { hyperevm } from "./hyperevm";
import { pharos } from "./pharos";
import { citrea } from "./citrea";

export const customChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  hyperevm, pharos, citrea
];
