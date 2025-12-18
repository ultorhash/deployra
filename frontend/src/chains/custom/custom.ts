import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";
import { hyperevm } from "./hyperevm";
import { pharos } from "./pharos";
import { citrea } from "./citrea";
import { botanix } from "./botanix";
import { mocaTestnet } from "./moca-testnet";
import { OG } from "./0g";
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
import { somnia } from "./somnia";
import { plasma } from "./plasma";
import { gateLayer } from "./gate-layer";
import { zeroNetwork } from "./zero-network";
import { humanityProtocol } from "./humanity-protocol";
import { zora } from "./zora";
import { sovaTestnet } from "./sova-testnet";
import { pharosAtlantic } from "./pharos-atlantic-testnet";
import { arcTestnet } from "./arc-testnet";
import { iopnTesntet } from "./iopn-testnet";
import { stableTestnet } from "./stable-testnet";
import { stable } from "./stable";
import { raylsTestnet } from "./rayls-testnet";
import { megaETHTimothy } from "./megaeth-testnet";
import { monad } from "./monad";
import { codexTestnet } from "./codex-testnet";
import { x1EcoChainTestnet } from "./x1-ecochain-testnet";
import { pushChainDonutTestnet } from "./push-chain-donut-testnet";
import { dataHavenTestnet } from "./data-haven-testnet";

export const customChains: [RainbowKitChain, ...RainbowKitChain[]] = [
  hyperevm, pharos, citrea, botanix, mocaTestnet, OG, xosTestnet, zeroNetwork,
  blockchainTestnet, fluentTestnet, giwaTestnet, neuraTestnet, katana, kiteai,
  kiiTestnet, mezo, juchain, mitosis, nitrographTestnet, sahara, somnia, plasma,
  gateLayer, humanityProtocol, zora, sovaTestnet, pharosAtlantic, arcTestnet,
  iopnTesntet, stableTestnet, raylsTestnet, megaETHTimothy, monad, codexTestnet,
  stable, x1EcoChainTestnet, pushChainDonutTestnet, dataHavenTestnet
];
