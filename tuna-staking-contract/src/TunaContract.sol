// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TunaCoinContract is ERC20, Ownable { 
    address private stakingContractAddress;

    constructor() ERC20("Tuna", "TUNA") Ownable(msg.sender) {}

    function setStakingContract(address _stakingAddress) external onlyOwner {
        stakingContractAddress = _stakingAddress;
    }

    function mint(address to, uint256 value) external {
        require(msg.sender == stakingContractAddress, "Only staking contract can mint");
        _mint(to, value);
    }
}
