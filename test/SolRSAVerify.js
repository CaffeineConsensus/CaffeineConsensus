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
      // const Msg = ethers.utils.toUtf8bytes("hello world")
      const Msg = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("hello world"));
      console.log(Msg)
      const S   = "079bed733b48d69bdb03076cb17d9809072a5a765460bc72072d687dba492afe951d75b814f561f253ee5cc0f3d703b6eab5b5df635b03a5437c0a5c179309812f5b5c97650361c645bc99f806054de21eb187bc0a704ed38d3d4c2871a117c19b6da7e9a3d808481c46b22652d15b899ad3792da5419e50ee38759560002388"
      const nn  = "DF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D"
      
      let result = await verifyTestContract.pkcs1Sha256VerifyRaw(Msg, "0x"+S, "0x"+e, "0x"+nn)
      expect(result).to.equal(0)

    })
  });

});