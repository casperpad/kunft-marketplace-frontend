import { useState } from 'react'
import { Image } from '@kunftmarketplace/uikit'
import { CLPublicKey } from 'casper-js-sdk'
import { NextSeo } from 'next-seo'
import { Box, Text } from '@/components'
import { meta } from '@/config'
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
  Sell,
} from './components'
import {
  RowContainer,
  PriceContainer,
  HistoryContainer,
  DescriptionContainer,
  Layout,
} from './styles'

export default function Token({ token: _token }: { token: IToken }) {
  const [token, setToken] = useState(_token)
  const [active, setActive] = useState(0)
  const { currentAccount } = useCasperWeb3Provider()
  const size = useWindowSize()

  return (
    <>
      <NextSeo
        title={token.name}
        openGraph={{
          url: `${meta.SITE_URL}/token/${token.collection.slug}/${token.id}`,
          title: token.name,
          description: token.collection.description,
          images: [
            {
              url:
                token.metadata.image ||
                token.metadata.logo ||
                token.collection.logo ||
                '',
              width: 800,
              height: 600,
              alt: token.name,
            },
          ],
          site_name: meta.SITE_NAME,
        }}
      />
      <Layout>
        <RowContainer>
          <PriceContainer>
            <Text fontSize="20px" color="primary">
              {token.collection.name}
            </Text>
            <Name token={token} setToken={setToken} />
            {currentAccount &&
            CLPublicKey.fromHex(currentAccount).toAccountHashStr().slice(13) ===
              token.owner ? (
              <Sell token={token} />
            ) : (
              <>
                <Box mb="10px">
                  <Offer token={token} />
                </Box>
                <Buy token={token} setToken={setToken} />
              </>
            )}
          </PriceContainer>
          <Image
            src={
              token.metadata.image ||
              token.metadata.logo ||
              token.collection.logo
            }
            display="cover"
            alt={token.name}
            width={405}
            height={405}
          />
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
    </>
  )
}
