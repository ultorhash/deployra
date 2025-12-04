const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ReferralRegistry with account:", deployer.address);

  const ReferralRegistry = await hre.ethers.getContractFactory("ReferralRegistry");
  const registry = await ReferralRegistry.deploy();
  await registry.waitForDeployment();

  console.log("ReferralRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
