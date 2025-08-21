// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

interface ITunaContract {
    function mint(address to, uint256 value) external;
}

contract StakingContract {
    // address private tunaContractAddress;
    ITunaContract private tuna;
    /**
        “tuna is a reference to a contract that implements the ITunaContract interface — i.e., 
        it has a mint(address,uint256) function.”
     */

    mapping(address => uint) public stakes;
    mapping(address => uint) public lastUpdated;
    mapping(address => uint) public unclaimedRewards;
    uint public constant RATE = 1e16;

    constructor(address _tuna) {
        // tunaContractAddress = _tuna;
        tuna = ITunaContract(_tuna);
    }

    function  stake() external payable {
        require(msg.value > 0, "Invalid amount for staking");
        // uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender] * RATE;
        uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender];
        unclaimedRewards[msg.sender] += currentRewards;
        lastUpdated[msg.sender] = block.timestamp;
        stakes[msg.sender] += msg.value;
    }

    function unstake(uint _amount) external {
        require(stakes[msg.sender] >= _amount, "You staked less");
        // uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender] * RATE;
        uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender];
        unclaimedRewards[msg.sender] += currentRewards;
        lastUpdated[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(_amount);
        stakes[msg.sender] -= _amount;
    }

    function stakesOf(address _address) public view returns (uint) {
        return stakes[_address];
    }

    function getRewards() external view returns (uint) {
        uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender];
        return ((unclaimedRewards[msg.sender] + currentRewards) * RATE) / 1e18;
    }

    function claimRewards() external {
        // uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender] * RATE;
        uint currentRewards = (block.timestamp - lastUpdated[msg.sender]) * stakes[msg.sender];
        unclaimedRewards[msg.sender] += currentRewards;
        lastUpdated[msg.sender] = block.timestamp;

        // transer the ERC20 Tuna Token 
        // ITunaContract(tunaContractAddress).mint(msg.sender, (unclaimedRewards[msg.sender] * RATE) / 1e18);
        
        tuna.mint(msg.sender, (unclaimedRewards[msg.sender] * RATE) / 1e18);
        unclaimedRewards[msg.sender] = 0;
    }
}