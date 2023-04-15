pragma solidity <= 0.8.0;

import "./SolRsaVerify.sol";


contract CA {
    //bytes public RSAPublicKey;
    bytes public public_e; //exponent
    bytes public public_m; //modulus

    function setRSAKey(bytes memory _public_e, bytes memory _public_m) public {
        public_e = _public_e;
        public_m = _public_m;
    }

    // verifies that a certificate was signed by CA
    function verifyX509certificate(bytes32 sha256fFingerprintCertificate, bytes memory signature) public view returns (uint) {
        return SolRsaVerify.pkcs1Sha256Verify(sha256fFingerprintCertificate, signature, public_e, public_m);
    }

    // verifies that a payload was signed by certificate
    function verifyPayloadSignature(bytes memory payload, bytes memory signature, bytes memory _e, bytes memory _m) public view returns (uint) {
        // we need to verifiy that _e and _m comes from a valid certificate. Todo
        return SolRsaVerify.pkcs1Sha256VerifyRaw(payload, signature, _e, _m);
    }


}