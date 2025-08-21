import { useAccount, useReadContract } from 'wagmi';
import { stakingABI } from '../ABI/staking.ts';
import { STAKING_CONTRACT_ADDRESS } from '../constants.ts';

export function useStakedBalance() {
  const { address } = useAccount();
  return useReadContract({
    abi: stakingABI,
    functionName: 'stakesOf',
    address: STAKING_CONTRACT_ADDRESS,
    args: address ? [address] : undefined,
  });
}

export function useRewards() {
  const { address } = useAccount();
  return useReadContract({
    abi: stakingABI,
    functionName: 'getRewards',
    address: STAKING_CONTRACT_ADDRESS,
    account: address,
  });
}

export function useStakesOf(address?: `0x${string}`) {
  return useReadContract({
    abi: stakingABI,
    functionName: 'stakesOf',
    address: STAKING_CONTRACT_ADDRESS,
    args: address ? [address] : undefined,
  });
} 