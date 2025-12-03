const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ReferralRegistryEndpoint with account:", deployer.address);

  const AXELAR_GATEWAY_ADDRESS = "0x0077777d7EBA4688BDeF3E311b846F25870A19B9";
  const REGISTRY_ADDRESS = "0x2529b8f3b1D0Bd4cC0971b0A9a44e817A9bbA1D0";

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
