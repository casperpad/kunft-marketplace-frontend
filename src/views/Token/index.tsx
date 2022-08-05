import { useState } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import { Box, Text } from '@/components'
import { useCasperWeb3Provider, useWindowSize } from '@/hooks'
import { Token as IToken } from '@/types'
import {
  Buy,
  Name,
  Offer,
  OfferListing,
  PriceHistory,
  SaleListing,
  Description,
  Tabs,
} from './components'
import {
  RowContainer,
  PriceContainer,
  ImageContainer,
  StyledImage,
  HistoryContainer,
  DescriptionContainer,
  Layout,
} from './NFTView.styles'

export default function Token({ token: _token }: { token: IToken }) {
  const [token, setToken] = useState(_token)
  const [active, setActive] = useState(0)
  const { currentAccount } = useCasperWeb3Provider()
  const size = useWindowSize()

  return (
    <Layout>
      <RowContainer>
        <PriceContainer>
          <Box mb="36px">
            <Text fontSize="20px" color="primary">
              {token.collection.name}
            </Text>
          </Box>
          <Box mb="40px">
            <Name token={token} setToken={setToken} />
          </Box>
          {currentAccount &&
          CLPublicKey.fromHex(currentAccount).toAccountHashStr().slice(13) ===
            token.owner ? (
            <>You have owned this token</>
          ) : (
            <>
              <Box mb="10px">
                <Offer />
              </Box>
              <Buy token={token} setToken={setToken} />
            </>
          )}
        </PriceContainer>
        <ImageContainer>
          <StyledImage
            src={token.metadata.image || token.collection.image || ''}
            alt={token.name}
            width={405}
            height={405}
          />
        </ImageContainer>
      </RowContainer>
      <RowContainer>
        {(size[0] >= 1280 && (
          <>
            <HistoryContainer>
              <PriceHistory />
              <SaleListing token={token} />
              <OfferListing token={token} />
            </HistoryContainer>
            <DescriptionContainer>
              <Description token={token} />
            </DescriptionContainer>
          </>
        )) || (
          <>
            <Tabs active={active} setActive={setActive} />
            {(active === 0 && (
              <HistoryContainer>
                <PriceHistory />
                <SaleListing token={token} />
                <OfferListing token={token} />
              </HistoryContainer>
            )) || (
              <DescriptionContainer>
                <Description token={token} />
              </DescriptionContainer>
            )}
          </>
        )}
      </RowContainer>
    </Layout>
  )
}
