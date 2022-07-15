import styled from 'styled-components'

import { Flex } from '@components/Box'
import { StyledButton } from '@components/Button'
import { Text } from '@components/Text'

const PriceContainer = styled(Flex)`
  flex-direction: column;
  font-family: 'Avenir';
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    align-items: start;
  }
`

const ButtonContainer = styled(Flex)`
  justify-content: center;
`

const Container = styled(Flex)`
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 20px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export default function Buy() {
  return (
    <Container>
      <PriceContainer>
        <Text fontSize="16px">Current Price</Text>
        <Text fontSize="30px" fontWeight={700} mt="-10px">
          50,531 KNFT
        </Text>
      </PriceContainer>
      <ButtonContainer>
        <StyledButton text="Buy Now" link={false} fontSize="20px" height={44} />
      </ButtonContainer>
    </Container>
  )
}
