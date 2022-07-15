import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { Text } from '@components/Text'

export const Title = styled(Text)`
  font-size: 30px;
  margin-bottom: 60px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 60px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 90px;
  }
`

export const SubTitle = styled(Text)`
  font-size: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 30px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
  }
`

export const Description = styled(Text)`
  font-family: 'Avenir';
  font-size: 14px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 17px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 28px;
  }
`

export const TextContainer = styled(Box)`
  margin-top: 40px;
`

export const CollectionContainer = styled(Flex)`
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ImageContainer = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 150px;
  height: 150px;
  cursor: pointer;
`

export const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 100%;
  &:hover {
    border-radius: 0px;
  }
`
