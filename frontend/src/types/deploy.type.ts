import { DeployTypes } from "@app-enums";

type DeployOptionOptional = {
  deployType?: DeployTypes;
  args?: unknown[];
  description?: string;
}

export type DeployOption = DeployOptionOptional & {
  chain: string;
  chainId: number;
  type: "mainnet" | "testnet";
  icon: string;
  fee: number;
  backgroundColor: string;
  color: string;
  tags: string[];
}
