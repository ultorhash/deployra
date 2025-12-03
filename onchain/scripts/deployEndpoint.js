const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ReferralRegistryEndpoint with account:", deployer.address);

  const AXELAR_GATEWAY_ADDRESS = "";
  const REGISTRY_ADDRESS = "0x..."; // ReferralRegistry address

  const ReferralRegistryEndpoint = await hre.ethers.getContractFactory("ReferralRegistryEndpoint");
  const endpoint = await ReferralRegistryEndpoint.deploy(
    AXELAR_GATEWAY_ADDRESS,
    REGISTRY_ADDRESS
  );
  await endpoint.waitForDeployment();

  console.log("ReferralRegistryEndpoint deployed to:", await endpoint.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
