import { DeployTypes } from "@app-enums";

type DeployOptionOptional = {
  deployType?: DeployTypes;
}

export type DeployOption = DeployOptionOptional & {
  chain: string;
  chainId: number;
  type: "mainnet" | "testnet";
  icon: string;
  fee: number;
  color: string;
  textColor: string;
  tags: string[];
}
