import React, { useState } from 'react'

import styled from 'styled-components'

import { Flex, Grid, NFTCard, Layout } from '@components/index'
import useTokens from '@hooks/useTokens'

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

export default function CollectionExplorer({ slug }: { slug: string }) {
  // const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(20)
  // const { data, loading, error } = useTokens(slug, page, limit)
  // const [nfts, setNfts] = useState()

  return (
    <CustomLayout>
      <DiscoverContainer>
        {/* {hello} */}
        {/* <div>{slug}</div> */}
      </DiscoverContainer>
    </CustomLayout>
  )
}
