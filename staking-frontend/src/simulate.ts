import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { stakingABI } from './ABI/staking.ts';
// import stakingABI from './stakingABI.json' assert { type: 'json' };

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/_oKVscmqHn_W3br1MYD_Xesg3ZUmjlWO"),
});

export async function main() {
  try {
    console.log(BigInt(1e9));
    const result = await publicClient.simulateContract({
      address: "0x9B04878CD401a1Ed5623f0d2Ed71D378927b7604",
      abi: stakingABI,
      functionName: "stake",
      args: [],
      value: BigInt(1e9),
      account: "0x6680136dCaC64e33eaD7A999cC9F430BA1c1782B"
    });
    console.log("result "+ result);
  } catch (err) {
    console.error("Simulation failed:", err);
  }
}

// main();
