import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Flex)`
  flex-direction: column;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 26px 32px;
  font-family: 'Avenir';
  border-bottom-width: 0px;
`

export default function Collection() {
  return (
    <Container>
      <Text fontWeight={500} fontSize="25px">
        About This Collection
      </Text>
      <Text fontSize="20px">
        Here comes a description of the collection. The collection is very cool!
        description of the collection. The collection is very cool!
      </Text>
    </Container>
  )
}
