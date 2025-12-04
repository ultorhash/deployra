// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Message {
    address payable public immutable owner;
    string public message;
    uint256 public fee;

    event FeeDistributed(address indexed user, address indexed referrer, uint256 refShare);

    constructor(string memory message_, uint256 fee_, address referrer) payable {
        require(msg.value == fee_, "Incorrect fee sent");
        require(fee_ >= 0.000005 ether, "Fee too low");

        owner = payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2);
        message = message_;
        fee = fee_;

        uint256 refShare = (referrer != address(0)) ? (msg.value * 25) / 100 : 0;
        uint256 ownerShare = msg.value - refShare;

        if (refShare > 0) {
            (bool rs, ) = payable(referrer).call{value: refShare}("");
            if (!rs) {
                ownerShare = msg.value;
                refShare = 0;
            }
        }

        (bool os, ) = owner.call{value: ownerShare}("");
        require(os, "Failed to send fee");

        emit FeeDistributed(msg.sender, referrer, refShare);
    }
}
