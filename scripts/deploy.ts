import { ethers } from "hardhat";

async function main() {
  const NFTContract = await ethers.deployContract("NFT");
  await NFTContract.waitForDeployment();
  console.log(`NFT Contract address : ${NFTContract.target}`);

  const gatedEvent = await ethers.deployContract("GatedEvent", [
    NFTContract.target,
  ]);

  await gatedEvent.waitForDeployment();

  console.log(`NFT Gated Event Contract deployed to : ${gatedEvent.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
