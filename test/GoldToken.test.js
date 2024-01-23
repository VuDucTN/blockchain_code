const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Token contract", function () {

  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("GoldToken");

    await hardhatToken.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { hardhatToken, owner, addr1, addr2 };
  }
  describe("Deployment", function () {
    it("Should set the right owner", async function(){
      const {hardhatToken, owner} = await loadFixture(deployTokenFixture);
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
  
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      await expect(hardhatToken.transfer(addr1.address, 50)).to.changeTokenBalances(hardhatToken, [owner,addr1], [-50,50]);
      await expect(hardhatToken.connect(addr1).transfer(addr2.address,50)).to.changeTokenBalances(hardhatToken, [addr1,addr2], [-50,50]);
    });

    it("Should emit Transfer events", async function(){
      const {hardhatToken, owner, addr1,addr2} = await loadFixture(deployTokenFixture);

      await expect(hardhatToken.transfer(addr1.address,50)).to.emit(hardhatToken,"Transfer").withArgs(owner.address, addr1.address, 50);
      await expect(hardhatToken.connect(addr1).transfer(addr2.address,50)).to.emit(hardhatToken,"Transfer").withArgs(addr1.address, addr2.address,50);
    });

    it("Should fail if sender don't have enough tokens", async function(){
      const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployTokenFixture);
      const initialOwnerBalance = await hardhatToken.balanceOf(addr2.address);

      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 1)).to.be.revertedWith("Not enough tokens");
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(initialOwnerBalance);
    });
  });

});