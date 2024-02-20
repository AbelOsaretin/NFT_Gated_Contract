import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import exp from "constants";
import { title } from "process";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [addr1, addr2] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    const NFTContract = await NFT.deploy();

    await NFTContract.waitForDeployment();

    const GatedEvent = await ethers.getContractFactory("GatedEvent");
    const gatedEventContract = await GatedEvent.deploy(NFTContract.target);

    return { gatedEventContract, NFTContract, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should deploy contracts", async function () {
      const { gatedEventContract, NFTContract } = await loadFixture(
        deployFixture
      );

      expect(console.log(`NFT Contract Address: ${NFTContract.target}`));
      expect(
        console.log(
          `Gated Event Contract Address : ${gatedEventContract.target}`
        )
      );
    });
  });

  describe("Create Event", function () {
    it("Should create new event", async function () {
      const { gatedEventContract, addr1 } = await loadFixture(deployFixture);

      const Title = "Web3 Bridge Cohort X Graduation Party";
      const Desc = "Graduation Ceremony of Web3Bride Cohort X finalist.";
      const Host = "Web3Bridge";
      const DateTime = "May 2023, 8AM";
      const Location = "Lagos";

      const tx = await gatedEventContract.CreateEvent(
        Title,
        Desc,
        Host,
        DateTime,
        Location
      );

      await tx.wait();

      const createdEvent = await gatedEventContract.ViewEvent(1);
      expect(createdEvent.Title).to.equal(Title);
      expect(createdEvent.Details).to.equal(Desc);
      expect(createdEvent.Host).to.equal(Host);
      expect(createdEvent.DateTime).to.equal(DateTime);
      expect(createdEvent.Location).to.equal(Location);
    });
  });
});
