import styled from 'styled-components'
import { Flex } from '@/components'

export default function Create() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <StyledIntro>Coming Soon!</StyledIntro>
    </Flex>
  )
}

const StyledIntro = styled.h1`
  font-size: 90px;
  text-align: center;
`
