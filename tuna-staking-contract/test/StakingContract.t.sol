// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/StakingContract.sol";
import "../src/TunaContract.sol";

contract StakingContractTest is Test {
    TunaCoinContract public tuna;
    StakingContract c;
    address user;
    
    function setUp() public {
        user = address(0x1e228B160339Ee6acef2E767F265b656FF1a8c23);
        vm.deal(user, 10 ether); 

        vm.prank(user);
        tuna = new TunaCoinContract();
        
        c = new StakingContract(address(tuna));
    }

    // STAKE

    function testStake() public {
        uint amount = 1e7;
        vm.prank(user);
        c.stake{value: amount}();

        uint stakedAmount = c.stakes(user);
        assert(stakedAmount == amount);
    }

    function testStakeTwice() public {
        vm.prank(user);
        c.stake{value: 1 ether}();
        assertEq(c.stakes(user), 1 ether);

        vm.prank(user);
        c.stake{value: 2 ether}();
        assertEq(c.stakes(user), 3 ether);
    }

    function testZeroStakeReverts() public {
        vm.expectRevert();   
        vm.prank(user);
        c.stake{value: 0 ether}();
    }

    // // UNSTAKE

    function testUnstake() public {
        vm.prank(user);
        c.stake{value: 2 ether}();
        assertEq(c.stakes(user), 2 ether);

        vm.prank(user);
        c.unstake(1 ether);
        assertEq(c.stakes(user), 1 ether);
    }

    function testUnstakeAll() public {
        vm.prank(user);
        c.stake{value: 2 ether}();
        assertEq(c.stakes(user), 2 ether);

        vm.prank(user);
        c.unstake(2 ether);
        assertEq(c.stakes(user), 0 ether);
    }

    function testUnstakeMoreThanBalanceReverts() public {
        vm.prank(user);
        c.stake{value: 2 ether}();
        assertEq(c.stakes(user), 2 ether);

        vm.expectRevert();
        vm.prank(user);
        c.unstake(3 ether);
    }

    function testUnstakeWithZeroBalanceReverts() public {
        vm.expectRevert();
        vm.prank(user);
        c.unstake(3 ether);
    }

    // // STAKES_OF

    function testStakeOf() public {
        vm.prank(user);
        c.stake{value: 1 ether}();
        assertEq(c.stakesOf(user), 1 ether);
    }

    // // GET_REWARDS

    function testGetRewards() public {
        vm.startPrank(user);
        c.stake{value: 2 ether}();

        vm.warp(block.timestamp + 1);
        uint rewards = c.getRewards();
        assertEq(rewards, 0.02 ether);
        vm.stopPrank();
    }

    function testComplexGetRewards() public {
        vm.startPrank(user);

        c.stake{value: 2 ether}();
        vm.warp(block.timestamp + 1);
        assertEq(c.getRewards(), 0.02 ether);

        c.stake{value: 2 ether}();
        vm.warp(block.timestamp + 1);
        assertEq(c.getRewards(), 0.06 ether);
        
        vm.stopPrank();
    }

    // // CLAIM_REWARDS

    function testClaimRewards() public {
        vm.startPrank(user);
        tuna.setStakingContract(address(c));

        c.stake{value: 2 ether}();
        vm.warp(block.timestamp + 1);
        assertEq(c.getRewards(), 0.02 ether);

        c.claimRewards();
        assertEq(c.getRewards(), 0);
        
        vm.stopPrank();
    }
}
