const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("SolRSAVerify", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const ONE_GWEI = 1_000_000_000;

    // const lockedAmount = ONE_GWEI;
    // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SolRsaVerify = await ethers.getContractFactory("SolRsaVerify");
    const verifyContract = await SolRsaVerify.deploy();

    const VerifyTest = await ethers.getContractFactory("TestSolRsaVerify", {
      libraries: {
        SolRsaVerify: verifyContract.address,
      },
    });
    const verifyTestContract = await VerifyTest.deploy();
    /// later: console.log(await libTest.testLibFunc());

    return { verifyContract, verifyTestContract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("sdfg", async function () {
      const { verifyContract, verifyTestContract, owner, otherAccount } = await loadFixture(deployFixture);
      console.log("hey")

      const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
      const Msg = web3.utils.asciiToHex("hello world")
      const S   = "7eb0cf1bc2133dd826b7c0748f837e124a58fe604a538144cb73297804c708ce99e98adb7b4c5abc66867b775a2379ca9881699d027f077648b257938f95af91f19adc11c8a0df7b7078569001ab688ddbd64c06eaddc4c5af988a3e0dc7bbe68941ffc9b2a1e3907b3feafc721842da01ed2fa53c080a09a2aee6114ba2b31b"
      const nn  = "DF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D"


    })
  });

});