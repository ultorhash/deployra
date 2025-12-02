const hre = require("hardhat");

async function main() {
  const AXELAR_GATEWAY_ADDRESS = "0xe432150cce91c13a887f7D836923d5597adD8E31";

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const ReferralRegistryEndpoint = await hre.ethers.getContractFactory("ReferralRegistryEndpoint");
  const endpoint = await ReferralRegistryEndpoint.deploy(
    AXELAR_GATEWAY_ADDRESS,
    hre.ethers.ZeroAddress
  );
  await endpoint.waitForDeployment();

  await new Promise(resolve => setTimeout(resolve, 10000));

  const ReferralRegistry = await hre.ethers.getContractFactory("ReferralRegistry");
  const registry = await ReferralRegistry.deploy(endpointAddress);
  await registry.waitForDeployment();

  console.log("Deploy success!");
  console.log("  Registry:", registryAddress);
  console.log("  Endpoint:", endpointAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
