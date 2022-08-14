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
    cancelSellOrder: marketplaceClient.cancelSellOrder.bind(marketplaceClient),
    buySellOrderCspr:
      marketplaceClient.buySellOrderCspr.bind(marketplaceClient),
    buySellOrder: marketplaceClient.buySellOrder.bind(marketplaceClient),
    createBuyOrderCspr:
      marketplaceClient.createBuyOrderCspr.bind(marketplaceClient),
    createBuyOrder: marketplaceClient.createBuyOrder.bind(marketplaceClient),
    cancelBuyOrder: marketplaceClient.cancelBuyOrder.bind(marketplaceClient),
    acceptBuyOrder: marketplaceClient.acceptBuyOrder.bind(marketplaceClient),
  }
}
