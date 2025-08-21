
import WalletConnect from './components/WalletConnect.tsx';
import Stake from './components/Stake.tsx';
import Unstake from './components/Unstake.tsx';
import StakesOf from './components/StakesOf.tsx';
import { Rewards, ClaimRewards } from './components/Rewards.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="floating mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
            Tuna Staking
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Stake your ETH and earn rewards with our innovative staking platform
          </p>
        </header>

        <WalletConnect />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-8">
            <Stake />
            <Unstake />
          </div>
          <div className="space-y-8">
            <Rewards />
            <ClaimRewards />
            <StakesOf />
          </div>
        </div>

        <footer className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-white/50">Built with ❤️ for the Web3 community</p>
        </footer>
      </div>
    </div>
  );
}

export default App;


