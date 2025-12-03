const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const registryAddress = "0x..."; // ReferralRegistry
  const endpointAddress = "0x..."; // ReferralRegistryEndpoint

  const ReferralRegistry = await hre.ethers.getContractFactory("ReferralRegistry");
  const registry = ReferralRegistry.attach(registryAddress);

  const tx = await registry.setEndpoint(endpointAddress);
  await tx.wait();

  console.log("Endpoint set to:", endpointAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
