// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/TunaContract.sol";

contract TunaContractTest is Test {
    TunaCoinContract c;
    address user;

    function setUp() public {
        c = new TunaCoinContract();
        user = address(0x1e228B160339Ee6acef2E767F265b656FF1a8c23);
        vm.deal(user, 10 ether);
    }

    function testInitialSupply() public view {
        assertEq(c.totalSupply(), 0);
    }

    function testSetStakingAddress() public {
        address staking = address(1);
        c.setStakingContract(staking);
    }

    function testSetStakingAddressReverts() public {
        address staking = address(1);
        vm.expectRevert();
        vm.prank(user);
        c.setStakingContract(staking);
    }

    function testMint() public {
        address staking = address(1);
        c.setStakingContract(staking);

        vm.prank(staking);
        c.mint(user, 1 ether);
        assertEq(c.balanceOf(user), 1 ether);
    }

    function testMintReverts() public {
        vm.expectRevert();
        c.mint(user, 1 ether);
    }
}
