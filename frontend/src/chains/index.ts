import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";
import { customChains } from "./custom/custom";
import { supportedChains } from "./supported";

export const chains: [RainbowKitChain, ...RainbowKitChain[]] = [...supportedChains, ...customChains];
