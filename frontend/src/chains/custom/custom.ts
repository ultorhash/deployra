import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";
import { hyperevm } from "./hyperevm";

export const customChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  hyperevm
];
