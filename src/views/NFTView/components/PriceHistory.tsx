import styled from 'styled-components'

import { Box } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  font-family: 'Avenir';
`

export default function PriceHistory() {
  return (
    <Container>
      <Text>Price History</Text>
    </Container>
  )
}
