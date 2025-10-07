export type DeployOption = {
  chain: string;
  chainId: number;
  type: "mainnet" | "testnet";
  icon: string;
  fee: number;
  color: string;
  textColor: string;
  tags: string[];
}
