import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { Layout as _Layout } from '@components/Layout'

export const PriceContainer = styled(Flex)`
  grid-column: 1/3;
  flex-direction: column;
`

export const StyledImage = styled(Image)``

export const ImageContainer = styled(Flex)`
  grid-column: 3/4;
  justify-content: center;
  align-items: end;
`

export const RowContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;

  ${({ theme }) => theme.mediaQueries.xl2} {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
  }

  ${({ theme }) => theme.mediaQueries.xl3} {
    gap: 75px;
  }
`

export const ColumnContainer = styled(Flex)`
  flex-direction: column;
`

export const HistoryContainer = styled(Flex)`
  grid-column: 1/3;
  width: 100%;
  flex-direction: column;
  gap: 32px;
`

export const DescriptionContainer = styled(Flex)`
  grid-column: 3/4;
`

export const Layout = styled(_Layout)`
  display: flex;
  flex-direction: column;
  gap: 74px;
`
