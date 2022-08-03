import { Chain } from './chain'

export default {
  marketplace: {
    [Chain.MAINNET]: {
      contractPackageHash:
        'hash-6db1ff432a74c4191eda03327b31c5875efa93891404456e30c3dc1a7b91148e',
      versions: [
        'hash-293a3700d587190b4a425dcbfb5ac04bf28680d65775bee72269a1478b19ce75',
      ],
    },
    [Chain.TESTNET]: {
      contractPackageHash:
        'hash-f6ed8863ffeedc7c79cacaaaa8e3164f6b26f569895076d0d6be8fb32230b8e2',
      versions: [
        'hash-c429e15c2a0e04727e0aa2461bea794d4b839078da888a7c767c5699d55867ec',
      ],
    },
  },
}
