import type { DeployOption } from "@app-types";

export const deployOptions: DeployOption[] = [
  {
    chain: "Base",
    chainId: 8453,
    type: "mainnet",
    icon: "base.png",
    fee: 0.000015
  },
  {
    chain: "Optimism",
    chainId: 10,
    type: "mainnet",
    icon: "optimism.png",
    fee: 0.000015
  },
  {
    chain: "Unichain",
    type: "mainnet",
    chainId: 130,
    icon: "unichain.png",
    fee: 0.000015
  },
  {
    chain: "Soneium",
    type: "mainnet",
    chainId: 1868,
    icon: "soneium.svg",
    fee: 0.000015
  },
  {
    chain: "Sonic",
    type: "mainnet",
    chainId: 146,
    icon: "sonic.svg",
    fee: 0.000015
  },
  {
    chain: "Polygon",
    type: "mainnet",
    chainId: 137,
    icon: "polygon.svg",
    fee: 0.000015
  },
  {
    chain: "Sei",
    type: "mainnet",
    chainId: 1329,
    icon: "sei.svg",
    fee: 0.000015
  },
  {
    chain: "Scroll",
    type: "mainnet",
    chainId: 534352,
    icon: "scroll.png",
    fee: 0.000015
  },
  {
    chain: "Lens",
    type: "mainnet",
    chainId: 232,
    icon: "lens.svg",
    fee: 0.000015
  },
  {
    chain: "Linea",
    type: "mainnet",
    chainId: 59144,
    icon: "linea.png",
    fee: 0.000015
  },
  {
    chain: "Morph",
    type: "mainnet",
    chainId: 2818,
    icon: "morph.svg",
    fee: 0.000015
  },
  {
    chain: "Berachain",
    type: "mainnet",
    chainId: 80085,
    icon: "berachain.svg",
    fee: 0.000015
  },
  {
    chain: "Abstract",
    type: "mainnet",
    chainId: 2741,
    icon: "abstract.png",
    fee: 0.000015
  },
  {
    chain: "Mantle",
    type: "mainnet",
    chainId: 5000,
    icon: "mantle.svg",
    fee: 0.000015
  },
  {
    chain: "Sepolia Testnet",
    type: "testnet",
    chainId: 11155111,
    icon: "sepolia.png",
    fee: 0.0005
  }
];
