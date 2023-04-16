pragma solidity ^0.6.0;

import "./SolRsaVerify.sol";

contract TestSolRsaVerify {
    function pkcs1Sha256Verify(bytes32 _sha256, bytes calldata _s, bytes calldata _e, bytes calldata _m) external view returns (uint) {
        return SolRsaVerify.pkcs1Sha256Verify(_sha256, _s, _e, _m);
    }

    function pkcs1Sha256VerifyRaw(bytes calldata _data, bytes calldata _s, bytes calldata _e, bytes calldata _m) external view returns (uint) {
        return SolRsaVerify.pkcs1Sha256VerifyRaw(_data, _s, _e, _m);
    }
}