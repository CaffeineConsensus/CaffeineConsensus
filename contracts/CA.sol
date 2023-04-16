pragma solidity <= 0.8.0;

import "./SolRsaVerify.sol";


contract CA {
    //bytes public RSAPublicKey;

    // struct RSAPubKey {
    //     bytes e; // exponent
    //     bytes n; // modulos
    // }

    function calcHash(bytes memory _e, bytes memory _n) public view returns (bytes32) {
        bytes memory pubKeyBytes = abi.encodePacked(_e, _n);
        return keccak256(pubKeyBytes);
    }

    // RSAPubKey public CAPubKey;

    mapping(bytes32 => bool) isApproved;

    // function setRSAKey(bytes memory _e, bytes memory _m) public {
    //     CAPubKey.e = _e;
    //     CAPubKey.m = _m;
    // }

    function addPubKey(bytes memory _e, bytes memory _m) public {
        bytes32 hsh = calcHash(_e, _m);
        isApproved[hsh] = true;
    }

    function isPubKeyApproved(bytes memory _e, bytes memory _m) public returns(bool) {
        bytes32 hsh = calcHash(_e, _m);
        return isApproved[hsh];
    }

    function verifyTx(bytes memory payload, bytes memory signature, bytes memory _e, bytes memory _m) public {
        require(isPubKeyApproved(_e, _m), "Public key was not approved by CA");
        require(SolRsaVerify.pkcs1Sha256VerifyRaw(payload, signature, _e, _m) == 0, "");
    }

    // verifies that a certificate was signed by CA
    // function verifyX509certificate(bytes memory fingerprintCertificate, bytes memory signature) public view returns (uint) {
    //     return SolRsaVerify.pkcs1Sha256VerifyRaw(fingerprintCertificate, signature, public_e, public_m);
    // }

    // verifies that a payload was signed by certificate
    // function verifyPayloadSignature(bytes memory payload, bytes memory signature, bytes memory _e, bytes memory _m) public view returns (uint) {
    //     // we need to verifiy that _e and _m comes from a valid certificate. Todo
    //     return SolRsaVerify.pkcs1Sha256VerifyRaw(payload, signature, _e, _m);
    // }


}