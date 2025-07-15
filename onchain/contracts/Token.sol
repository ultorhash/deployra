// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address payable public owner;
    uint256 public fee;

    constructor(string memory name_, string memory symbol_, uint256 fee_) payable ERC20(name_, symbol_) {
        require(msg.value == fee_, "Incorrect fee sent");
        require(fee_ >= 0.000005 ether, "Fee too low");

        owner = payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2);
        fee = fee_;

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send fee");

        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
