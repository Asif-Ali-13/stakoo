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
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/_oKVscmqHn_W3br1MYD_Xesg3ZUmjlWO"),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/_oKVscmqHn_W3br1MYD_Xesg3ZUmjlWO"),
  },
})
