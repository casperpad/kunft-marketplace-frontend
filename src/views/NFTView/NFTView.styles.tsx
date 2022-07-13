import Image from 'next/image'
import styled from 'styled-components'

import { Flex, Grid } from '@components/Box'
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

export const RowContainer = styled(Grid)`
  gap: 105px;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const HistoryContainer = styled(Grid)`
  grid-column: 1/3;
  flex-direction: column;
  gap: 32px;
  grid-template-rows: repeat(3, 1fr);
`

export const DescriptionContainer = styled(Flex)`
  grid-column: 3/4;
`

export const Layout = styled(_Layout)`
  display: flex;
  flex-direction: column;
  gap: 74px;
`
