import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
  contracts,
} from '../config'

import { MarketplaceClient } from '../web3/client/marketplace'

export default function useMarketplace() {
  const marketplaceClient = new MarketplaceClient(
    NEXT_PUBLIC_CASPER_NODE_ADDRESS,
    NEXT_PUBLIC_CASPER_CHAIN_NAME,
  )
  marketplaceClient.setContractHash(
    contracts.marketplace[NEXT_PUBLIC_CASPER_CHAIN_NAME].versions[0],
    contracts.marketplace[NEXT_PUBLIC_CASPER_CHAIN_NAME].contractPackageHash,
  )

  return {
    createSellOrder: marketplaceClient.createSellOrder.bind(marketplaceClient),
  }
}