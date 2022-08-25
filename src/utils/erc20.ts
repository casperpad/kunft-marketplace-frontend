import { acceptableTokens, NEXT_PUBLIC_CASPER_CHAIN_NAME } from '@/config'

export const getERC20Logo = (contractPackageHash: string) => {
  return `/images/tokens/erc20/${NEXT_PUBLIC_CASPER_CHAIN_NAME}/${contractPackageHash.slice(
    5,
  )}.webp`
}

export const findAcceptableTokens = ({
  contractHash,
  contractPackageHash,
}: {
  contractHash?: string
  contractPackageHash?: string
}) => {
  return acceptableTokens.find(
    (token) =>
      token.contractHash === contractHash ||
      token.contractPackageHash === contractPackageHash,
  )
}
