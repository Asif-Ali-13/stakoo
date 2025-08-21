import Card from './ui/Card';
import Button from './ui/Button';
import { useRewards } from '../hooks/useStakingReads.ts';
import { useClaimRewards } from '../hooks/useStakingActions.ts';
import { useState } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

export function Rewards() {
  const { address } = useAccount();
  const { data: rewards, refetch, isFetching } = useRewards();

  return (
    <Card className="p-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Your Rewards</h3>
      </div>

      <div className="space-y-4">
        <Button onClick={() => refetch()} disabled={isFetching || !address} variant="secondary" className="w-full">
          {isFetching ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Fetching...</span>
            </div>
          ) : (
            'Check Rewards'
          )}
        </Button>

        <div className="stat-card">
          <p className="text-sm text-white/70 mb-1">Available Rewards</p>
          <p className="text-2xl font-bold text-yellow-400">{rewards ? formatEther(rewards as bigint) : '0'} ETH</p>
        </div>
      </div>
    </Card>
  );
}

export function ClaimRewards() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const claim = useClaimRewards();

  const onClaim = async () => {
    if (!address) return;
    setLoading(true);
    try {
      await claim();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Claim Rewards</h3>
      </div>

      <Button onClick={onClaim} disabled={loading || !address} variant="secondary" className="w-full">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Claiming...</span>
          </div>
        ) : (
          'Claim Rewards'
        )}
      </Button>
    </Card>
  );
} 