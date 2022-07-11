import Image from 'next/image'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const ImageContainer = styled(Flex)`
  flex-direction: row;
  width: 85%;
  gap: 40px;
  align-items: center;
  justify-content: center;
`

export default function About() {
  return (
    <Layout>
      <Flex flexDirection="column" alignItems="center" mb="60px">
        <Text fontSize="110px" textAlign="center" mb="50px">
          ABOUT KUNFT
        </Text>
        <Text
          fontFamily="Avenir"
          fontSize="28px"
          textAlign="center"
          mb="100px"
          width="66%"
        >
          Our goal is to serve as a platform for NFT creators to exhibit their
          unique work, & to bridge between creatives and collectors. Hop on
          board, push the boundaries and start creating!
        </Text>
        <ImageContainer>
          <Image
            src="/assets/images/About_1.png"
            alt=""
            width={320}
            height={320}
          />
          <Image
            src="/assets/images/About_2.png"
            alt=""
            width={320}
            height={320}
          />
          <Image
            src="/assets/images/About_3.png"
            alt=""
            width={320}
            height={320}
          />
        </ImageContainer>
      </Flex>
    </Layout>
  )
}
