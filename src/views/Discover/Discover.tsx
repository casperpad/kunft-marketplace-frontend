import React from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { DiscoverFilter } from '@components/Filter'
import { Layout } from '@components/Layout'

const Container = styled(Flex)`
  flex-direction: row;
`

const DiscoverContainer = styled(Flex)`
  margin-left: 80px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

interface DiscoverProps {
  NFTs: string[]
}

export default function Discover({ NFTs = [] }: DiscoverProps) {
  return (
    <Layout>
      <Container>
        <DiscoverFilter />
        <DiscoverContainer width="100%">
          {NFTs.map((item) => {
            return (
              <NFTCard
                key={item}
                type={
                  Math.random() > 0.5
                    ? Math.random() > 0.5
                      ? 'Sale'
                      : 'NoneSale'
                    : 'Upcoming'
                }
                image={item}
                name="KUNFT"
                price={Math.random() * 10000}
                stars={Math.floor(Math.random() * 100)}
                userStarred={Math.random() > 0.5}
              />
            )
          })}
        </DiscoverContainer>
      </Container>
    </Layout>
  )
}
