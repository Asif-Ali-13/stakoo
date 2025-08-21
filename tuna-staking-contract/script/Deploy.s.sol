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

// tuna contract address -> 0x801C43dE6cB535c12044c6AB227D863cfc2456E3
// staking contract address -> 0xd0282fD7E7300907Ae4cc71B86dB466A9a6F36bA

/***

{
    1. forge clean : to remove the out and cache
    2. forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvv : to deploy the smart contract with verification 
    3. forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL : not actual deploy but to simulate 
    4. forge script script/TunaContract.s.sol:TunaScript : to run and compile the script 
    5. sourc .env : to push the env variables 
}


    Successfully deployed - 
    tuna add -> 0xf5232195C0EfeBDf6FA93d5456D3CED85af816Ba
    staking add -> 0x9B04878CD401a1Ed5623f0d2Ed71D378927b7604
 */