import Image from 'next/image'
import styled from 'styled-components'

import { Flex, Text } from '@/components'

export default function About() {
  return (
    <Flex flexDirection="column" alignItems="center" mb="60px">
      <Title>ABOUT KUNFT</Title>
      <Description>
        Our goal is to serve as a platform for NFT creators to exhibit their
        unique work, & to bridge between creatives and collectors. Hop on board,
        push the boundaries and start creating!
      </Description>
      <ImageContainer>
        <Image src="/images/Home/About_1.png" alt="" width={320} height={320} />
        <Image src="/images/Home/About_2.png" alt="" width={320} height={320} />
        <Image src="/images/Home/About_3.png" alt="" width={320} height={320} />
      </ImageContainer>
    </Flex>
  )
}

const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;

  font-size: 45px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 80px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 110px;
  }
`

const Description = styled(Text)`
  font-family: 'Avenir';
  text-align: center;
  margin-bottom: 100px;
  width: 90%;

  font-size: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 28px;
    width: 80%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 28px;
    width: 66%;
  }
`

const ImageContainer = styled(Flex)`
  flex-direction: column;
  width: 85%;
  gap: 40px;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`
