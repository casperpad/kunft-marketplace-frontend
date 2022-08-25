import { CSPR_EXPLORER_URL } from '@/config'

type OpenType = 'deploy' | 'contract' | 'contract-package' | 'account'

export const openCsprExplorer = (value: string, openType?: OpenType) => {
  window.open(getCsprExplorer(value, openType), '_blank')?.focus()
}

export const getCsprExplorer = (value: string, openType?: OpenType) => {
  return `${CSPR_EXPLORER_URL}/${openType || 'deploy'}/${value}`
}

export const getNFTExplorerUrl = (
  contractPackageHash: string,
  tokenId: string,
) => {
  return `${CSPR_EXPLORER_URL}/contracts/${contractPackageHash}/nfts/${tokenId}`
}
