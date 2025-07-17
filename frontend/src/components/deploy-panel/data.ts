import type { DeployOption } from "@app-types";

export const deployOptions: DeployOption[] = [
  { chain: "Base", chainId: 8453, type: "mainnet", icon: "base.png", fee: 0.000015 },
  { chain: "Optimism", chainId: 10, type: "mainnet", icon: "optimism.png", fee: 0.000015 },
  { chain: "Unichain", chainId: 130, type: "mainnet", icon: "unichain.png", fee: 0.000015 },
  { chain: "Soneium", chainId: 1868, type: "mainnet", icon: "soneium.svg", fee: 0.000015 },
  { chain: "Sonic", chainId: 146, type: "mainnet", icon: "sonic.svg", fee: 0.000015 },
  { chain: "Polygon", chainId: 137, type: "mainnet", icon: "polygon.svg", fee: 0.000015 },
  { chain: "Sei", chainId: 1329, type: "mainnet", icon: "sei.svg", fee: 0.000015 },
  { chain: "Scroll", chainId: 534352, type: "mainnet", icon: "scroll.png", fee: 0.000015 },
  { chain: "Lens", chainId: 232, type: "mainnet", icon: "lens.svg", fee: 0.000015 },
  { chain: "Linea", chainId: 59144, type: "mainnet", icon: "linea.png", fee: 0.000015 },
  { chain: "Morph", chainId: 2818, type: "mainnet", icon: "morph.svg", fee: 0.000015 },
  { chain: "Berachain", chainId: 80085, type: "mainnet", icon: "berachain.svg", fee: 0.000015 },
  { chain: "Abstract", chainId: 2741, type: "mainnet", icon: "abstract.png", fee: 0.000015 },
  { chain: "Mantle", chainId: 5000, type: "mainnet", icon: "mantle.svg", fee: 0.000015 },
  { chain: "Sepolia Testnet", chainId: 11155111, type: "testnet", icon: "sepolia.png", fee: 0.0005 },
  { chain: "Monad Testnet", chainId: 10143, type: "testnet", icon: "monad.png", fee: 0.0005 },
  { chain: "Rise Testnet", chainId: 11155931, type: "testnet", icon: "rise.svg", fee: 0.0005 }
];
