import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { useUnstake } from '../hooks/useStakingActions.ts';

export default function Unstake() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const unstake = useUnstake();

  const onUnstake = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      await unstake(amount);
      setAmount('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Unstake ETH</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Amount to Unstake (ETH)</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.1" step="0.01" min="0" className="w-full" />
        </div>

        <Button variant="outline" onClick={onUnstake} disabled={loading || !amount} className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Unstaking...</span>
            </div>
          ) : (
            'Unstake ETH'
          )}
        </Button>
      </div>
    </Card>
  );
} 