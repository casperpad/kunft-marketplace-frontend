import { Text } from '@components/Text'

import { Container, TitleContainer } from './styles'

export default function PriceHistory() {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Price History</Text>
      </TitleContainer>
    </Container>
  )
}
