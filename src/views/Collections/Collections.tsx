import { Flex, Layout } from '@/components'

import {
  Title,
  SubTitle,
  Description,
  TextContainer,
  CollectionContainer,
  StyledImage,
  ImageContainer,
} from './Collections.styles'

interface CollectionsProps {
  collections: string[]
}

export default function Collections({ collections = [] }: CollectionsProps) {
  return (
    <Layout>
      <Flex flexDirection="column">
        <TextContainer>
          <Title>DISCOVER NTFs</Title>
          <SubTitle>COLLECTION XYZ</SubTitle>
          <Description fontFamily="Avenir" fontSize="28px" mb="70px">
            This is a short and brief description about the featured collection.
          </Description>
        </TextContainer>
        <Flex justifyContent="center">
          <CollectionContainer>
            {collections.map((collection, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <ImageContainer key={collection + index}>
                  <StyledImage
                    src={collection}
                    alt=""
                    width={150}
                    height={150}
                  />
                </ImageContainer>
              )
            })}
          </CollectionContainer>
        </Flex>
      </Flex>
    </Layout>
  )
}
