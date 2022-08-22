type CasperChainName = 'casper' | 'casper-test'

const NEXT_PUBLIC_CASPER_CHAIN_NAME = process.env
  .NEXT_PUBLIC_CASPER_CHAIN_NAME! as CasperChainName

export const SITE_URL =
  NEXT_PUBLIC_CASPER_CHAIN_NAME === 'casper'
    ? 'https://kunftmarketplace.io'
    : 'https://test.kunftmarketplace.io'
export const SITE_TITLE = 'KUNFT Marketplace'
export const SITE_NAME = 'KUNFT Marketplace'
export const SITE_DESCRIPTION =
  'The NFT Marketplace on Casper for creators and collectors'
