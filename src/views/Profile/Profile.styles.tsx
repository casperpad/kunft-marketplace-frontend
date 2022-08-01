import Image from 'next/image'
import styled from 'styled-components'

import { Flex, Grid, Box, Text, Layout } from '@/components'

export const ImageContainer = styled(Box)`
  min-width: 235px;
  height: 235px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
`

export const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 100%;
  &:hover {
    border-radius: 0px;
  }
`

export const Title = styled(Text)`
  font-size: 27px;

  ${({ theme }) => theme.mediaQueries.xl2} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 27px;
  }
`

export const Description = styled(Text)`
  font-family: 'Avenir';
  font-size: 12px;
`

export const NameContainer = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 34px 34px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 235px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    max-width: 405px;
  }

  .star-svg {
    display: inline;
  }
`

export const DataContainer = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

export const NFTContainer = styled(Grid)`
  grid-column-gap: 20px;
  grid-row-gap: 70px;

  grid-template-columns: repeat(1, 1fr);

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

export const CustomLayout = styled(Layout)`
  position: relative;
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

export const Container = styled(Flex)`
  padding-top: 40px;
`
