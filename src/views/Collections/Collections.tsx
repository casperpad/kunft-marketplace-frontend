import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const ImageContainer = styled(Box)`
  width: 150px;
  height: 150px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
`

const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 100%;
  &:hover {
    border-radius: 0px;
  }
`

interface CollectionsProps {
  collections: string[]
}

export default function Collections({ collections = [] }: CollectionsProps) {
  return (
    <Layout>
      <Box>
        <Text fontSize="90px" mb="70px">
          DISCOVER NTFs
        </Text>
        <Text fontSize="60px">COLLECTION XYZ</Text>
        <Text fontFamily="Avenir" fontSize="28px" mb="70px">
          This is a short and brief description about the featured collection.
        </Text>
        <Flex
          flexDirection="row"
          justifyContent="space-around"
          flexWrap="wrap"
          width="100%"
        >
          {collections.map((collection) => {
            return (
              <ImageContainer key={collection}>
                <StyledImage src={collection} alt="" width={150} height={150} />
              </ImageContainer>
            )
          })}
        </Flex>
      </Box>
    </Layout>
  )
}
