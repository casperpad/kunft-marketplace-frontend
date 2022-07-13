import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  font-family: 'Avenir';
`

const TitleContainer = styled(Flex)`
  font-family: 'Avenir';
  font-size: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 70px;
  padding-left: 33px;
  align-items: center;
`

export default function PriceHistory() {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Price History</Text>
      </TitleContainer>
    </Container>
  )
}
