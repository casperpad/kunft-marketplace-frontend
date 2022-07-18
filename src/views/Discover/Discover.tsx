import React, { useState } from 'react'
import styled from 'styled-components'

import { Flex, Grid } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { Layout } from '@components/Layout'
import useTokens from '@hooks/useTokens'
import Filter from './Filter'

const CustomLayout = styled(Layout)`
  padding-left: 50px;
  padding-right: 50px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 56px;
    padding-right: 56px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 76px;
    padding-right: 76px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    padding-left: 86px;
    padding-right: 86px;
  }
`

const Container = styled(Flex)`
  position: relative;
  flex-direction: row;
  height: 100%;
  padding-top: 40px;
`

const DiscoverContainer = styled(Grid)`
  grid-column-gap: 20px;
  grid-row-gap: 80px;
  grid-template-columns: repeat(1, 1fr);

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

export default function Discover({ NFTs }: { NFTs: string[] }) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const { data, loading, error } = useTokens('KUNFT', page, limit)
  const [nfts, setNfts] = useState()
  return (
    <Container>
      <Filter />
      <CustomLayout>
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
      </CustomLayout>
    </Container>
  )
}
