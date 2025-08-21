import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { useStakesOf } from '../hooks/useStakingReads.ts';
import { formatEther } from 'viem';

export default function StakesOf() {
  const [target, setTarget] = useState('');
  const { data: stakes, refetch, isFetching } = useStakesOf(target as `0x${string}`);

  return (
    <Card className="p-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Check Stakes</h3>
      </div>

      <div className="space-y-4">
        <Input type="text" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Enter wallet address (0x...)" className="w-full" />

        <Button onClick={() => refetch()} disabled={isFetching || !target} className="w-full">
          {isFetching ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Fetching...</span>
            </div>
          ) : (
            'Check Stakes'
          )}
        </Button>

        {stakes !== undefined && stakes !== null && (
          <div className="stat-card">
            <p className="text-sm text-white/70 mb-1">Staked Amount</p>
            <p className="text-2xl font-bold text-primary-400">{formatEther(stakes as bigint)} ETH</p>
          </div>
        )}
      </div>
    </Card>
  );
} 