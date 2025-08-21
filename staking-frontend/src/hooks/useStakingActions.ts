import { useAccount, useWriteContract } from 'wagmi';
import { stakingABI } from '../ABI/staking.ts';
import { STAKING_CONTRACT_ADDRESS } from '../constants.ts';
import { parseEther } from 'viem';

export function useStake() {
  const { writeContractAsync } = useWriteContract();
  return async (amountEth: string) => {
    const value = parseEther(amountEth);
    return writeContractAsync({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingABI,
      functionName: 'stake',
      args: [],
      value,
    });
  };
}

export function useUnstake() {
  const { writeContractAsync } = useWriteContract();
  return async (amountEth: string) => {
    const value = parseEther(amountEth);
    return writeContractAsync({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingABI,
      functionName: 'unstake',
      args: [value],
    });
  };
}

export function useClaimRewards() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  return async () => {
    return writeContractAsync({
      address: STAKING_CONTRACT_ADDRESS,
      abi: stakingABI,
      functionName: 'claimRewards',
      account: address,
    });
  };
} 