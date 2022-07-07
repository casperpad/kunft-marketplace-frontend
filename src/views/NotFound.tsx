import styled from 'styled-components'
import { CustomLink } from '@components/Link'
import { Text } from '@components/Text'

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
      <CustomLink href="/">
        <Text color="primary" fontSize="30px">
          Back Home
        </Text>
      </CustomLink>
    </StyledNotFound>
  )
}
