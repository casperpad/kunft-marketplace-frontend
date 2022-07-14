import Image from 'next/image'
import styled from 'styled-components'

import { Flex, Grid, Box } from '@components/Box'

export const ImageContainer = styled(Box)`
  width: 235px;
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

export const NameContainer = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 37px 34px;
  height: 100%;

  display: none;

  ${({ theme }) => theme.mediaQueries.xl2} {
    display: block;
  }
`

export const DataContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`

export const NFTContainer = styled(Grid)`
  grid-column-gap: 20px;
  grid-row-gap: 70px;

  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`
