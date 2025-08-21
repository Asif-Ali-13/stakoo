import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { useStake } from '../hooks/useStakingActions.ts';
import { useStakedBalance } from '../hooks/useStakingReads.ts';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

export default function Stake() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const stake = useStake();
  const { data: balance } = useStakedBalance();

  const onStake = async () => {
    if (!amount || !address) return;
    setLoading(true);
    try {
      await stake(amount);
      setAmount('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Stake ETH</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Amount to Stake (ETH)</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.1" step="0.01" min="0" className="w-full" />
        </div>

        <Button onClick={onStake} disabled={loading || !amount || !address} className="w-full">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Staking...</span>
            </div>
          ) : (
            'Stake ETH'
          )}
        </Button>

        <div className="stat-card">
          <p className="text-sm text-white/70 mb-1">Your Staked Amount</p>
          <p className="text-2xl font-bold text-green-400">{balance ? formatEther(balance as bigint) : '0'} ETH</p>
        </div>
      </div>
    </Card>
  );
} 