const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("CA", function () {
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
  
      const CA = await ethers.getContractFactory("CA", {
        libraries: {
          SolRsaVerify: verifyContract.address,
        },
      });
      const ca = await CA.deploy();
      /// later: console.log(await libTest.testLibFunc());

      // add public m and public e:
        const exponent = "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
    //   const modulos = "B63ECEEF1274E06DE62ED04ED45B72B736C1BD080608C1D94C95CBFD50C3AED6C4604264F2B1B5AA387E80FC0D47F921017E4BD7E4F4A4A82F4171E719398A4904EF862EFE140411D58001F5DEB1198128C694279F63D8AD7303E110091AAED7A6C8A08D7585DBB29FCD30D12F5757EEDBE48C40E8AF9CF3A009126832048D6F"
    //   await ca.setRSAKey("0x" + exponent, "0x" + modulos)
    // const m  = "AE714CBE34A62C7B3FB779F07BD705370B83D9C34F2570DD696EE38231FB4350BBADC2A54CA14A525DE03018989FFB044BD87B4F0733A73DBBDA4AFDAC127A6B7C18A06237EB07611BF1ED1C5CE4AA9F71EE694F4A2F7249B5D8F045265FFB6C24B52D5291B539FA5DADE402C7328CB03B736948FE141D1F130040E2DF9E93ED"
    const m  = "0xDF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D"

      await ca.addPubKey(exponent, m)
  
      return { ca, owner, otherAccount };
    }
    
  
    describe("Deployment", function () {
    
    //   it("employee_certificate should be signed by ca_cert", async function () {
    //     const { ca, owner, otherAccount } = await loadFixture(deployFixture);
    //     console.log("hey")
  
    //     const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
    //     //const certificate_data = web3.utils.asciiToHex("Version: 1 (0x0)\n        Serial Number:\n            24:c4:dd:33:81:df:52:32:e1:6d:b4:15:e0:25:4c:cd:02:61:05:bf\n        Signature Algorithm: sha256WithRSAEncryption\n        Issuer: C = CH, ST = Some-State, O = CoffeeInc\n        Validity\n            Not Before: Apr 15 11:06:46 2023 GMT\n            Not After : Apr 12 11:06:46 2033 GMT\n        Subject: C = CH, ST = Some-State, O = CoffeeInc\n        Subject Public Key Info:\n            Public Key Algorithm: rsaEncryption\n                Public-Key: (1024 bit)\n                Modulus:\n                    00:c1:41:9c:70:9d:96:de:36:c9:0a:4b:d4:27:c6:\n                    70:3d:bc:17:f9:d1:1c:18:28:fb:5a:91:5d:8b:98:\n                    f4:f3:db:de:a0:d1:c5:47:cd:87:a0:4f:42:90:02:\n                    bf:20:33:b4:1f:7a:1b:53:54:7f:31:a5:25:7e:88:\n                    e5:25:3b:b8:56:91:86:db:04:e1:68:d2:b8:17:bb:\n                    00:52:59:97:de:f7:09:a0:bf:96:11:98:42:45:b2:\n                    1c:8f:97:67:ed:2f:5c:9f:5d:70:ca:ff:cd:cd:58:\n                    ac:d5:36:26:af:44:b0:6c:2d:74:0c:75:08:89:a7:\n                    c0:b9:ae:3a:3f:23:2b:37:25\n                Exponent: 65537 (0x10001)")
    //     //const fingerprint_cert = "75:CC:B2:E6:EB:86:4F:F7:0D:1E:F5:6B:E4:EA:F1:B8:0B:4B:E3:EB:B7:FB:D6:ED:57:6A:06:16:AA:B5:5A:1A"
    //     let fingerprint_cert = "3031300d0609608648016503040201050004204572513206af5e699facc48d806629443082249df85f57bedc06e37a7e1430d1"
    //     //fingerprint_cert = fingerprint_cert.split(":").join("")
    //     let S = "61:23:1c:bd:bd:a8:15:cb:21:ad:e2:35:1c:65:fe:b9:c6:b8:95:28:08:a9:ba:9e:3f:55:2f:a6:53:a9:a6:64:72:e4:e3:17:e0:c7:2f:bc:67:56:dd:00:90:85:47:9e:a7:f0:7e:08:7a:16:a9:81:ee:66:b7:46:6c:5c:3b:35:2c:ce:7b:8e:9f:b1:f9:03:0f:a7:ba:e3:d3:d1:b4:e2:c4:af:31:d8:ad:68:77:a7:84:14:d2:c0:3a:ac:26:4b:fe:1d:9f:d6:ba:01:07:d3:41:ed:06:70:59:fd:3b:26:85:d0:9b:8c:60:90:19:e8:6e:ef:7f:99:04:a9:59:c1"
    //     S = S.split(":").join("")
    //     console.log(fingerprint_cert)
    //     console.log(S)
    //     const nn  = "AE714CBE34A62C7B3FB779F07BD705370B83D9C34F2570DD696EE38231FB4350BBADC2A54CA14A525DE03018989FFB044BD87B4F0733A73DBBDA4AFDAC127A6B7C18A06237EB07611BF1ED1C5CE4AA9F71EE694F4A2F7249B5D8F045265FFB6C24B52D5291B539FA5DADE402C7328CB03B736948FE141D1F130040E2DF9E93ED"
  
    //     const res = await ca.verifyX509certificate("0x"+fingerprint_cert, "0x"+S)
    //     console.log("Res: ", res)
    //   })

    it("should approve a verified message", async function () {
        const { ca, owner, otherAccount } = await loadFixture(deployFixture);
        
        const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
        const Msg = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("hello world"));
        const S   = "079bed733b48d69bdb03076cb17d9809072a5a765460bc72072d687dba492afe951d75b814f561f253ee5cc0f3d703b6eab5b5df635b03a5437c0a5c179309812f5b5c97650361c645bc99f806054de21eb187bc0a704ed38d3d4c2871a117c19b6da7e9a3d808481c46b22652d15b899ad3792da5419e50ee38759560002388"
        const nn  = "DF3EDDE009B96BC5B03B48BD73FE70A3AD20EAF624D0DC1BA121A45CC739893741B7CF82ACF1C91573EC8266538997C6699760148DE57E54983191ECA0176F518E547B85FE0BB7D9E150DF19EEE734CF5338219C7F8F7B13B39F5384179F62C135E544CB70BE7505751F34568E06981095AEEC4F3A887639718A3E11D48C240D"

        await ca.verifyTx(Msg, "0x"+S, "0x"+e, "0x"+nn)
    })

    });
  
  });