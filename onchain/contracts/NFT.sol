// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint256 private _tokenIds;

    address payable public immutable owner;
    uint256 public fee;

    event FeeDistributed(address indexed user, address indexed referrer, uint256 refShare);

    constructor(uint256 fee_) ERC721("NFT", "NFT") {
        require(fee_ >= 0.000005 ether, "Fee too low");
        owner = payable(0x3E5C1429e97F8cd9C4eF409e02D1542992c8eCa2);
        fee = fee_;
    }

    function mint(string memory tokenURI, address referrer) external payable returns (uint256) {
        require(msg.value == fee, "Incorrect fee sent");

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

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
