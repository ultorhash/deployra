// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReferralRegistry {
    mapping(bytes6 => address) public refOwner;
    mapping(address => bytes6) public userRefCode;
    mapping(address => address) public referredBy;
    mapping(address => address[]) public referrals;

    bytes6[] public refCodes;

    event CodeCreated(address indexed user, bytes6 code);
    event Bound(address indexed user, address indexed referrer);

    function registerRefCode(bytes6 code) external {
        require(userRefCode[msg.sender] == 0x000000000000, "Already has code");
        require(_isValidCode(code), "Invalid code format");
        require(refOwner[code] == address(0), "Code already taken");

        refOwner[code] = msg.sender;
        userRefCode[msg.sender] = code;
        refCodes.push(code);

        emit CodeCreated(msg.sender, code);
    }

    function bindToRefCode(bytes6 code) external {
        require(referredBy[msg.sender] == address(0), "Already bound");
        address referrer = refOwner[code];
        require(referrer != address(0), "Invalid ref code");
        require(referrer != msg.sender, "Self-referral denied");
        require(!_createsLoop(msg.sender, referrer), "Loop denied");

        referredBy[msg.sender] = referrer;
        referrals[referrer].push(msg.sender);

        emit Bound(msg.sender, referrer);
    }

    function getRefCodes() external view returns (bytes6[] memory) {
        return refCodes;
    }

    function getReferralCount(address user) external view returns (uint256) {
        return referrals[user].length;
    }

    function _isValidCode(bytes6 code) internal pure returns (bool) {
        for (uint256 i = 0; i < 6; i++) {
            bytes1 c = code[i];

            bool isNum = (c >= 0x30 && c <= 0x39); // 0–9
            bool isAZ  = (c >= 0x41 && c <= 0x5A); // A–Z

            if (!isNum && !isAZ) return false;
        }

        return true;
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
