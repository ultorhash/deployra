// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";

interface IReferralRegistry {
    function axelarSync(address user, bytes6 code, address referrer) external;
}

contract ReferralRegistryEndpoint is AxelarExecutable {
    address public localRegistry;

    event ReceivedAndRelayed(
        string sourceChain,
        string sourceAddress,
        address user,
        bytes6 code,
        address referrer,
        bytes32 commandId
    );

    constructor(address gateway, address _localRegistry) AxelarExecutable(gateway) {
        localRegistry = _localRegistry;
    }

    function _execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal virtual override {
        (address user, bytes6 code, address referrer) = abi.decode(payload, (address, bytes6, address));

        IReferralRegistry(localRegistry).axelarSync(user, code, referrer);

        emit ReceivedAndRelayed(
            sourceChain,
            sourceAddress,
            user,
            code,
            referrer,
            commandId
        );
    }
}
