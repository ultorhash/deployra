// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReferralRegistry {
    mapping(bytes6 => address) public refOwner;
    mapping(address => bytes6) public userRefCode;
    mapping(address => address) public referredBy;
    mapping(address => address[]) public referrals;

    bytes6[] public refCodes;

    address public axelarEndpoint;

    event CodeCreated(address indexed user, bytes6 code);
    event CodeBound(address indexed user, address indexed referrer);

    modifier onlyEndpoint() {
        require(msg.sender == axelarEndpoint, "Not Axelar endpoint");
        _;
    }

    constructor(address _endpoint) {
        axelarEndpoint = _endpoint;
    }

    function createRefCode(bytes6 code) external payable {
        uint256 fee = 0.000033 ether;
        require(msg.value == fee, "Fee required");

        require(userRefCode[msg.sender] == 0x000000000000, "Already has code");
        require(_isValidCode(code), "Invalid code format");
        require(refOwner[code] == address(0), "Code already exists");

        refOwner[code] = msg.sender;
        userRefCode[msg.sender] = code;
        refCodes.push(code);

        payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2).transfer(fee);

        emit CodeCreated(msg.sender, code);
    }

    function bindRefCode(bytes6 code) external {
        require(referredBy[msg.sender] == address(0), "Already bound");
        address referrer = refOwner[code];
        require(referrer != address(0), "Invalid code");
        require(referrer != msg.sender, "Self-referral denied");
        require(!_createsLoop(msg.sender, referrer), "Loop denied");

        referredBy[msg.sender] = referrer;
        referrals[referrer].push(msg.sender);

        emit CodeBound(msg.sender, referrer);
    }

    function axelarSync(address user, bytes6 code, address referrer) external onlyEndpoint {
        if (code != bytes6(0) && userRefCode[user] == 0x000000000000) {
            refOwner[code] = user;
            userRefCode[user] = code;
            refCodes.push(code);
            emit CodeCreated(user, code);
        }

        if (referrer != address(0) && referredBy[user] == address(0)) {
            referredBy[user] = referrer;
            referrals[referrer].push(user);
            emit CodeBound(user, referrer);
        }
    }

    function getRefCodes() external view returns (bytes6[] memory) {
        return refCodes;
    }

    function getReferralCount(address user) external view returns (uint256) {
        return referrals[user].length;
    }

    function getReferredByCode(address user) external view returns (bytes6) {
        address referrer = referredBy[user];
        if (referrer == address(0)) {
          return bytes6(0);
        }
        return userRefCode[referrer];
    }

    function _isValidCode(bytes6 code) internal pure returns (bool) {
        for (uint256 i = 0; i < 6; i++) {
            bytes1 c = code[i];
            bool isNum = (c >= 0x30 && c <= 0x39);
            bool isAZ  = (c >= 0x41 && c <= 0x5A);
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
