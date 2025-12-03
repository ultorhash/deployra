const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const REGISTRY_ADDRESS = "0x2529b8f3b1D0Bd4cC0971b0A9a44e817A9bbA1D0";
  const ENDPOINT_ADDRESS = "0x07F08c0fD61D089b69824a17014280BAdfeAa749";

  const ReferralRegistry = await hre.ethers.getContractFactory("ReferralRegistry");
  const registry = ReferralRegistry.attach(REGISTRY_ADDRESS);

  const tx = await registry.setEndpoint(ENDPOINT_ADDRESS);
  await tx.wait();

  console.log("Endpoint set to:", ENDPOINT_ADDRESS);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
