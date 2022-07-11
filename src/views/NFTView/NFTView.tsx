import { useState } from 'react'

import { Box } from '@components/Box'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

import {
  Buy,
  Name,
  Offer,
  OfferListing,
  PriceHistory,
  SaleListing,
  Description,
} from './components'
import {
  RowContainer,
  PriceContainer,
  ImageContainer,
  StyledImage,
  HistoryContainer,
  DescriptionContainer,
} from './NFTView.styles'

export default function NFTView() {
  const [sales] = useState<string[]>([])
  const [offers] = useState<string[]>([])

  return (
    <Layout>
      <RowContainer>
        <PriceContainer>
          <Box mb="36px">
            <Text fontSize="20px" color="primary">
              NFT COLLECTION NAME
            </Text>
          </Box>
          <Box mb="40px">
            <Name />
          </Box>
          <Box mb="10px">
            <Offer />
          </Box>
          <Buy />
        </PriceContainer>
        <ImageContainer>
          <StyledImage
            src="https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/eWX3j4ulh4LK8RXC2VSIyF1Lwd-dKZIymXBuGiKsEpY"
            alt=""
            width={405}
            height={405}
          />
        </ImageContainer>
      </RowContainer>
      <RowContainer>
        <HistoryContainer>
          <PriceHistory />
          <SaleListing lists={sales} />
          <OfferListing lists={offers} />
        </HistoryContainer>
        <DescriptionContainer>
          <Description />
        </DescriptionContainer>
      </RowContainer>
    </Layout>
  )
}
