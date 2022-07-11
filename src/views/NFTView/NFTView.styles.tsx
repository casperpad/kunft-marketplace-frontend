import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'

export const PriceContainer = styled(Flex)`
  flex-direction: column;
`

export const StyledImage = styled(Image)`
  width: 405px;
  height: 405px;
`

export const ImageContainer = styled(Box)`
  width: 405px;
`

export const RowContainer = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 70px;
`

export const HistoryContainer = styled(Flex)`
  flex-direction: column;
  gap: 32px;
`

export const DescriptionContainer = styled(Flex)`
  width: 405px;
`
