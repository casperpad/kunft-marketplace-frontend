import styled from 'styled-components'

import { Flex, Text } from '@/components'

export const Container = styled(Flex)`
  flex-direction: column;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 26px 32px;
  font-family: 'Avenir';
`

export const StyledText = styled(Text)`
  font-weight: 500;
  font-size: 25px;
`

export const DataContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`

export const NameContainer = styled(Flex)`
  font-size: 17px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
`

export const ValueContainer = styled(Flex)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`
