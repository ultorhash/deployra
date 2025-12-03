const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying FeeCollector with account:", deployer.address);

  const FeeCollector = await hre.ethers.getContractFactory("FeeCollector");
  const feeCollector = await FeeCollector.deploy();
  await feeCollector.waitForDeployment();

  console.log("FeeCollector deployed to:", await feeCollector.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
