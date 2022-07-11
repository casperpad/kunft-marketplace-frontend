import { BsHeart, BsEye } from 'react-icons/bs'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

const NameText = styled(Text)`
  font-size: 40px;
`

const Button = styled(Flex)`
  flex-direction: row;
  color: black;
  align-items: center;
`

const StarButton = styled(Button)`
  margin-right: 30px;
`

const ViewButton = styled(Button)``

const DataContainer = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  font-family: 'Avenir';
  font-size: 20px;
`

const Container = styled(Flex)`
  flex-direction: column;
`

export default function Name() {
  return (
    <Container>
      <NameText>NFT NAME #123</NameText>
      <DataContainer>
        <Flex flexDirection="row">
          <Text mr="4px">Owned by</Text>
          <Text color="primary">Profile Name</Text>
        </Flex>
        <Flex flexDirection="row">
          <StarButton color="transparent">
            <BsHeart />
            <Text color="primary">4</Text>
          </StarButton>
          <ViewButton color="transparent">
            <BsEye />
            <Text color="primary">2.3K</Text>
          </ViewButton>
        </Flex>
      </DataContainer>
    </Container>
  )
}
