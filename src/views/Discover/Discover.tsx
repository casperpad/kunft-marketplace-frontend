import React from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { DiscoverFilter } from '@components/Filter'
import { Layout } from '@components/Layout'

const Container = styled(Flex)`
  flex-direction: row;
`

const Filter = styled.div`
  position: sticky;
  height: max-content;
  left: 0px;
  top: 120px;
`

const FilterContainer = styled(Flex)`
  position: relative;
  padding: 120px 0px 120px 86px;
`

const DiscoverContainer = styled(Layout)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
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
    </Container>
  )
}
