import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";
import { hyperevm } from "./hyperevm";
import { pharos } from "./pharos";
import { citrea } from "./citrea";
import { botanix } from "./botanix";
import { mocaTestnet } from "./moca-testnet";
import { ogGalileoTestnet } from "./0g-galileo-testnet";
import { xosTestnet } from "./xos-testnet";
import { blockchainTestnet } from "./block-chain-testnet";
import { fluentTestnet } from "./fluent-testnet";

export const customChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  hyperevm, pharos, citrea, botanix, mocaTestnet, ogGalileoTestnet, xosTestnet,
  blockchainTestnet, fluentTestnet
];
