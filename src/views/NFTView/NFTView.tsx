import { useState } from 'react'

import { Layout } from '@components/Layout'

import OfferListing from './OfferListing'
import PriceHistory from './PriceHistory'
import SaleListing from './SaleListing'

export default function NFTView() {
  const [sales] = useState<string[]>([])
  const [offers] = useState<string[]>([])

  return (
    <Layout>
      <PriceHistory />
      <SaleListing lists={sales} />
      <OfferListing lists={offers} />
    </Layout>
  )
}
