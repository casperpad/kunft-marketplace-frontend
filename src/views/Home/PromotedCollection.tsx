import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

import { Box, Grid, NFTCard, Text } from '@/components'
import { useGetTokens } from '@/hooks'

interface PromotedCollection {
  slug?: string
}

export default function PromotedCollection({ slug: _ }: PromotedCollection) {
  const { data, loading } = useGetTokens({ promoted: true })
  return (
    <Box>
      <Title>{loading ? <Skeleton /> : data?.tokens[0].collection.name}</Title>
      <Description>
        {loading ? <Skeleton /> : data?.tokens[0].collection.description}
      </Description>
      <Container>
        {loading ? (
          <Skeleton count={5} />
        ) : (
          data?.tokens.map((token) => {
            return <NFTCard key={token.id} {...token} />
          })
        )}
      </Container>
    </Box>
  )
}

const Title = styled.h1`
  font-size: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 60px;
  }
`

const Description = styled(Text)`
  font-family: 'Avenir';
  font-size: 20px;
  margin-bottom: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 28px;
    margin-bottom: 60px;
  }
`

const Container = styled(Grid)`
  grid-template-columns: repeat(1, 1fr);

  grid-column-gap: 20px;
  grid-row-gap: 80px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    grid-template-columns: repeat(4, 1fr);
  }
`
