import styled from 'styled-components'
import { Link, Text } from '@/components'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

export default function NotFound() {
  return (
    <StyledNotFound>
      <Text mb="20px" fontSize="50px">
        Page Not Found.
      </Text>
      <Link href="/">
        <Text color="primary" fontSize="30px">
          Back Home
        </Text>
      </Link>
    </StyledNotFound>
  )
}
