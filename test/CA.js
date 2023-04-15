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
      const exponent = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
      const modulos = "A103F40FDAC0066B5C5E855C83006B4E71AD842C07CC219EB0F69FF91A99EA274AA4D85B73DE3E3EC1B65C9A42C9DA05377B53127CC62808F550581214B08F2086482B32E6BA722FBE18A646CB1C441D44FB3620EE42CC8C7935D04F5801DEA1A20676A4998DF84B51B4F46149C3C3859821464F3016697AEFFB5CB45D04A72F"
      await ca.setRSAKey("0x" + exponent, "0x" + modulos)
  
      return { ca, owner, otherAccount };
    }
    
  
    describe("Deployment", function () {
    
      it("employee_certificate should be signed by ca_cert", async function () {
        const { ca, owner, otherAccount } = await loadFixture(deployFixture);
        console.log("hey")
  
        const e   = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
        //const certificate_data = web3.utils.asciiToHex("Version: 1 (0x0)\n        Serial Number:\n            24:c4:dd:33:81:df:52:32:e1:6d:b4:15:e0:25:4c:cd:02:61:05:bf\n        Signature Algorithm: sha256WithRSAEncryption\n        Issuer: C = CH, ST = Some-State, O = CoffeeInc\n        Validity\n            Not Before: Apr 15 11:06:46 2023 GMT\n            Not After : Apr 12 11:06:46 2033 GMT\n        Subject: C = CH, ST = Some-State, O = CoffeeInc\n        Subject Public Key Info:\n            Public Key Algorithm: rsaEncryption\n                Public-Key: (1024 bit)\n                Modulus:\n                    00:c1:41:9c:70:9d:96:de:36:c9:0a:4b:d4:27:c6:\n                    70:3d:bc:17:f9:d1:1c:18:28:fb:5a:91:5d:8b:98:\n                    f4:f3:db:de:a0:d1:c5:47:cd:87:a0:4f:42:90:02:\n                    bf:20:33:b4:1f:7a:1b:53:54:7f:31:a5:25:7e:88:\n                    e5:25:3b:b8:56:91:86:db:04:e1:68:d2:b8:17:bb:\n                    00:52:59:97:de:f7:09:a0:bf:96:11:98:42:45:b2:\n                    1c:8f:97:67:ed:2f:5c:9f:5d:70:ca:ff:cd:cd:58:\n                    ac:d5:36:26:af:44:b0:6c:2d:74:0c:75:08:89:a7:\n                    c0:b9:ae:3a:3f:23:2b:37:25\n                Exponent: 65537 (0x10001)")
        //const fingerprint_cert = "75:CC:B2:E6:EB:86:4F:F7:0D:1E:F5:6B:E4:EA:F1:B8:0B:4B:E3:EB:B7:FB:D6:ED:57:6A:06:16:AA:B5:5A:1A"
        let fingerprint_cert = "75:CC:B2:E6:EB:86:4F:F7:0D:1E:F5:6B:E4:EA:F1:B8:0B:4B:E3:EB:B7:FB:D6:ED:57:6A:06:16:AA:B5:5A:1A"
        fingerprint_cert = fingerprint_cert.split(":").join("")
        let S = "9d:c5:cc:f2:9d:3e:32:05:b1:a2:b5:3e:29:f4:fe:24:13:22:e5:c4:5d:a1:34:62:48:9c:e7:97:fd:88:42:80:f5:1d:96:64:24:c4:90:1d:b5:fa:1f:b7:c8:59:17:17:3a:87:2e:ab:96:24:ef:8d:2c:51:70:88:59:87:f8:3a:7c:6d:fb:99:74:4e:d8:1a:cf:a5:3b:8d:9b:3b:6a:80:71:67:19:26:79:49:77:38:98:a9:af:35:46:03:28:bb:d1:bf:44:52:ca:22:7e:54:25:d5:1c:2a:34:ef:d2:71:22:9c:89:20:b6:22:5f:26:48:8e:94:79:22:1e:fb:72"
        S = S.split(":").join("")
        console.log(S)
        const nn  = "C1419C709D96DE36C90A4BD427C6703DBC17F9D11C1828FB5A915D8B98F4F3DBDEA0D1C547CD87A04F429002BF2033B41F7A1B53547F31A5257E88E5253BB8569186DB04E168D2B817BB00525997DEF709A0BF9611984245B21C8F9767ED2F5C9F5D70CAFFCDCD58ACD53626AF44B06C2D740C750889A7C0B9AE3A3F232B3725"
  
        const res = await ca.verifyX509certificate("0x"+fingerprint_cert, "0x"+S)
        console.log("Res: ", res)
      })
    });
  
  });