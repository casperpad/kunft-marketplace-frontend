import Image from 'next/image'

import { Flex } from '@components/Box'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

export default function About() {
  return (
    <Layout>
      <Flex flexDirection="column" alignItems="center" mb="60px">
        <Text fontSize="110px" textAlign="center" mb="50px">
          ABOUT KUNFT
        </Text>
        <Text fontFamily="Avenir" fontSize="28px" textAlign="center" mb="100px">
          Our goal is to serve as a platform for NFT creators to exhibit their
          unique work, & to bridge between creatives and collectors. Hop on
          board, push the boundaries and start creating!
        </Text>
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
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
        </Flex>
      </Flex>
    </Layout>
  )
}
