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
  const endpointAddress = await endpoint.getAddress();

  await new Promise(resolve => setTimeout(resolve, 10000));

  const ReferralRegistry = await hre.ethers.getContractFactory("ReferralRegistry");
  const registry = await ReferralRegistry.deploy(endpointAddress);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();

  await new Promise(resolve => setTimeout(resolve, 5000));

  const FeeCollector = await hre.ethers.getContractFactory("FeeCollector");
  const feeCollector = await FeeCollector.deploy();
  await feeCollector.waitForDeployment();
  const feeCollectorAddress = await feeCollector.getAddress();

  console.log("Deploy success!");
  console.log("  Endpoint:", endpointAddress);
  console.log("  Registry:", registryAddress);
  console.log("  FeeCollector:", feeCollectorAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
