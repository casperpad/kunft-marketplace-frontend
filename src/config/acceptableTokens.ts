import { ERC20 } from '@/types'

export const NATIVE_HASH =
  'hash-0000000000000000000000000000000000000000000000000000000000000000'

export const acceptableTokens: ERC20[] = [
  {
    name: 'CSPR',
    symbol: 'CSPR',
    decimals: 9,
    contractHash: NATIVE_HASH,
    contractPackageHash: NATIVE_HASH,
  },
  {
    name: 'KUNFT Token',
    symbol: 'KNFT',
    decimals: 9,
    contractHash:
      'hash-a3834fc5ebb9ae5e83bc3cf3b94a27728150bb4a19946fa64f4f663113d5f882',
    contractPackageHash:
      'hash-fb731c367f66ed5b8e4191e8c46c44dfb3c9b4f1b0b34e9df29c0697e5a9733e',
  },
]
