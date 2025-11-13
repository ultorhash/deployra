// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GM {
    string public message;
    address public owner;
    uint256 public fee;

    constructor(uint256 fee_) payable {
        require(msg.value == fee_, "Incorrect fee sent");
        require(fee_ >= 0.000005 ether, "Fee too low");

        owner = payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2);
        message = "GM";
        fee = fee_;

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send fee");
    }
}
