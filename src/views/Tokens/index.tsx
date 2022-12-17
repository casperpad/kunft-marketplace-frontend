import React, { useCallback, useEffect, useState } from 'react'
import uniqWith from 'lodash/uniqWith'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { NFTCard } from '@/components'
import { GetTokensInput, useGetTokensLazy } from '@/hooks'
import { Token } from '@/types'
import { isEqual } from '@/utils/token'

export interface TokensProps {
  where: GetTokensInput
}

export default function Tokens({ where }: TokensProps) {
  const { query } = useRouter()
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const { loading, getTokens } = useGetTokensLazy()
  const [tokens, setTokens] = useState<Token[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [refetch, setRefetch] = useState(true)

  const fetchTokens = useCallback(async () => {
    const { data } = await getTokens(where, page, limit)
    if (data) {
      setTokens((prev) => uniqWith([...prev, ...data.tokens], isEqual))
      if (data.paginationInfo.hasNext) {
        setPage(data.paginationInfo.currentPage + 1)
      } else {
        setHasMore(false)
      }
    }
  }, [getTokens, where, page, limit])

  useEffect(() => {
    setTokens([])
    setPage(1)
    setHasMore(true)
    // Since 18 setState triggers are all handled by one time we need a refetch flag.
    setRefetch((prev) => !prev)
  }, [query])

  useEffect(() => {
    fetchTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  return (
    <StyledInfiniteScroll
      dataLength={tokens.length}
      next={fetchTokens}
      hasMore={!loading && hasMore}
      loader={<h4>Loading...</h4>}
    >
      {tokens.map((token) => (
        <NFTCard
          key={`${token.collection.contractPackageHash}-${token.id}`}
          {...token}
        />
      ))}
    </StyledInfiniteScroll>
  )
}

// @ts-ignore
const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: grid;
  height: 100%;
  gap: 20px;
  padding-bottom: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`
