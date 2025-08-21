import { useAccount, useConnectors, useDisconnect } from 'wagmi';
import Card from './ui/Card';
import Button from './ui/Button';

export default function WalletConnect() {
  const { address } = useAccount();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <Card className="p-6 text-center animate-fade-in">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-medium">Connected</span>
        </div>
        <div className="bg-dark-800/50 rounded-xl p-3 mb-4">
          <p className="text-sm text-white/70 mb-1">Wallet Address</p>
          <p className="font-mono text-sm text-primary-400 break-all">{address}</p>
        </div>
        <Button variant="outline" className="w-full" onClick={() => disconnect()}>
          Disconnect Wallet
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 text-center animate-fade-in">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-white/70">Choose your preferred wallet to start staking</p>
      </div>
      <div className="space-y-3">
        {connectors.map((connector) => (
          <Button key={connector.id} className="w-full" onClick={() => connector.connect()}>
            {connector.name}
          </Button>
        ))}
      </div>
    </Card>
  );
} 