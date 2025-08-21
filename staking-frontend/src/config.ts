import { createConfig, http, injected } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  connectors: [injected()],
  chains: [mainnet, sepolia],    // this mainnet is the ethereum mainnet
  transports: {
    [mainnet.id]: http(import.meta.env.MAINNET_ID),
    [sepolia.id]: http(import.meta.env.SEPOLIA_ID),
  },
})
