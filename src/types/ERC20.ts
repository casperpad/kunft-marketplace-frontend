import { BigNumberish } from '@ethersproject/bignumber'

export interface ERC20 {
  name: string
  symbol: string
  decimals: BigNumberish
  totalSupply?: BigNumberish
  contractPackageHash: string
  contractHash: string
}
