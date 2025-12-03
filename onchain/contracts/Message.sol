// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IReferralRegistry {
    function referredBy(address user) external view returns (address);
}

contract Message {
    string public message;
    address public owner;
    uint256 public fee;
    IReferralRegistry public registry;

    constructor(
        string memory message_,
        uint256 fee_
    ) payable {
        require(msg.value == fee_, "Incorrect fee sent");
        require(fee_ >= 0.000005 ether, "Fee too low");

        owner = payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2);
        message = message_;
        fee = fee_;
        registry = IReferralRegistry(0x2529b8f3b1D0Bd4cC0971b0A9a44e817A9bbA1D0);

        address referrer = registry.referredBy(msg.sender);

        uint256 refShare = 0;
        uint256 ownerShare = msg.value;

        if (referrer != address(0)) {
            refShare = (msg.value * 25) / 100; // 25%
            ownerShare = msg.value - refShare;

            (bool success, ) = payable(referrer).call{value: refShare}("");
            if (!success) {
                ownerShare = msg.value;
            }
        }

        (bool sent, ) = payable(owner).call{value: ownerShare}("");
        require(sent, "Failed to send fee");
    }
}
