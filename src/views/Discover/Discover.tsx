import React from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { DiscoverFilter } from '@components/Filter'
import { Layout } from '@components/Layout'

const Container = styled(Flex)`
  margin-left: 80px;
`

export default function Discover() {
  return (
    <Layout>
      <Flex flexDirection="row">
        <DiscoverFilter />
        <Container>
          <NFTCard
            type={
              Math.random() > 0.5
                ? Math.random() > 0.5
                  ? 'Sale'
                  : 'NoneSale'
                : 'Upcoming'
            }
            image="https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/eWX3j4ulh4LK8RXC2VSIyF1Lwd-dKZIymXBuGiKsEpY"
            name="KUNFT"
            price={Math.random() * 10000}
            stars={Math.floor(Math.random() * 100)}
            userStarred={Math.random() > 0.5}
          />
        </Container>
      </Flex>
    </Layout>
  )
}
