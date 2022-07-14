import React from 'react'
import styled from 'styled-components'

import { Flex, Grid } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { DiscoverFilter } from '@components/Filter'
import { Layout } from '@components/Layout'

const Container = styled(Flex)`
  position: relative;
  flex-direction: row;
`

const Filter = styled.div`
  /* position: sticky; */
  height: max-content;
  left: 0px;
  top: 120px;
`

const FilterContainer = styled(Flex)`
  position: sticky;
  left: 0;
  top: 64px;
  /* padding: 120px 0px 120px 86px; */
  height: max-content;

  display: none;

  ${({ theme }) => theme.mediaQueries.xl} {
    display: block;
  }
`

const DiscoverContainer = styled(Grid)`
  grid-column-gap: 20px;
  grid-row-gap: 80px;
  grid-template-columns: repeat(1, 1fr);
  height: 2000px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    grid-template-columns: repeat(4, 1fr);
  }
`

interface DiscoverProps {
  NFTs: string[]
}

export default function Discover({ NFTs = [] }: DiscoverProps) {
  return (
    <Container>
      <FilterContainer>
        <Filter>
          <DiscoverFilter />
        </Filter>
      </FilterContainer>
      <Layout>
        <DiscoverContainer>
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
      </Layout>
    </Container>
  )
}
