// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import "forge-std/Test.sol";

import "../src/TunaContract.sol";
import "../src/StakingContract.sol";

contract DeployScript is Script {

    function setUp() public {}

    function run() public {
        uint privateKey = vm.envUint("PRIVATE_KEY");
        address account = vm.addr(privateKey);

        console.log(account);

        vm.startBroadcast(privateKey);

        TunaCoinContract tuna = new TunaCoinContract();
        StakingContract staking = new StakingContract(address(tuna));
        tuna.setStakingContract(address(staking));

        vm.stopBroadcast();
    }
}

