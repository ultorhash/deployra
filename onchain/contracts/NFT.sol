// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint256 private _tokenIds;

    address payable public owner;
    uint256 public fee;

    constructor(uint256 fee_) ERC721("NFT", "NFT") {
        require(fee_ >= 0.000005 ether, "Fee too low");
        owner = payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2);
        fee = fee_;
    }

    function mint(string memory tokenURI) external payable returns (uint256) {
        require(msg.value == fee, "Incorrect fee sent");

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send fee");

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
