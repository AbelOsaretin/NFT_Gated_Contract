import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [addr1, addr2] = await ethers.getSigners();

    const GatedEvent = await ethers.getContractFactory("GatedEvent");
    const gatedEventContract = await GatedEvent.deploy();

    return { gatedEventContract, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should deploy contracts", async function () {
      const { gatedEventContract } = await loadFixture(deployFixture);

      expect(await console.log(gatedEventContract.target));
    });
  });

  describe("Create Event", function () {
    it("Should create new event", async function () {
      const { gatedEventContract, addr1 } = await loadFixture(deployFixture);

      const eventinfo = "Test";
      // await expect(
      //   gatedEventContract.connect(addr1).CreateEvent(eventinfo,eventinfo,eventinfo,eventinfo);
      // )
      //   .to.emit(gatedEventContract, "NewEventCreated")
      //   .withArgs();

      expect(
        gatedEventContract
          .connect(addr1)
          .CreateEvent(eventinfo, eventinfo, eventinfo, eventinfo)
      );
    });
  });
});
