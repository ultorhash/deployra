// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReferralRegistry {
    mapping(bytes6 => address) public refOwner;
    mapping(address => bytes6) public userRefCode;
    mapping(address => address) public referredBy;

    bytes32 private constant GLOBAL_SALT = keccak256("DEPLOYRA_UNIVERSAL_REF");

    event CodeRegistered(address indexed user, bytes6 code);
    event Bound(address indexed user, address indexed referrer);

    function registerRefCode() external {
        require(userRefCode[msg.sender] == 0x000000000000, "Already has code");

        bytes6 code = _derive(msg.sender);
        require(refOwner[code] == address(0), "Collision");

        refOwner[code] = msg.sender;
        userRefCode[msg.sender] = code;

        emit CodeRegistered(msg.sender, code);
    }

    function bindToRefCode(bytes6 code) external {
        require(referredBy[msg.sender] == address(0), "Already bound");
        address referrer = refOwner[code];
        require(referrer != address(0), "Invalid ref code");
        require(referrer != msg.sender, "Self-referral denied");
        require(!_createsLoop(msg.sender, referrer), "Loop denied");

        referredBy[msg.sender] = referrer;

        emit Bound(msg.sender, referrer);
    }

    function _derive(address user) internal pure returns (bytes6) {
        return bytes6(keccak256(abi.encodePacked(user, GLOBAL_SALT)));
    }

    function _createsLoop(address user, address referrer) internal view returns (bool) {
        address current = referrer;
        while (current != address(0)) {
            if (current == user) return true;
            current = referredBy[current];
        }
        return false;
    }
}
