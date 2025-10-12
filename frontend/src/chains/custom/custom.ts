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
import { giwaTestnet } from "./giwa-testnet";
import { neuraTestnet } from "./neura-testnet";
import { katana } from "./katana";
import { kiteai } from "./kiteai-testnet";
import { kiiTestnet } from "./kii-testnet";
import { mezo } from "./mezo";
import { juchain } from "./juchain";
import { mitosis } from "./mitosis";
import { nitrographTestnet } from "./nitrograph-testnet";
import { sahara } from "./sahara";

export const customChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  hyperevm, pharos, citrea, botanix, mocaTestnet, ogGalileoTestnet, xosTestnet,
  blockchainTestnet, fluentTestnet, giwaTestnet, neuraTestnet, katana, kiteai,
  kiiTestnet, mezo, juchain, mitosis, nitrographTestnet, sahara
];
