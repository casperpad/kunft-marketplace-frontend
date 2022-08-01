import Image from 'next/image'
import styled from 'styled-components'

import { Flex, StyledButton, Layout, Text } from '@/components'

const StrollButton = styled(StyledButton)`
  position: absolute;
  bottom: 115px;
  right: 0px;
  z-index: 3;
`

const LandingImage = styled(Image)`
  box-shadow: ${({ theme }) => theme.shadows.base};
  z-index: 2;
`

const LandingImageContainer = styled(Flex)`
  position: absolute;
  width: 140px;
  height: 140px;
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 170px;
    height: 170px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 200px;
    height: 200px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    width: 235px;
    height: 235px;
  }
`

const TitleContainer = styled(Flex)`
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  font-size: 33px;
  height: 580px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 50px;
    height: 650px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 80px;
    height: 710px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    font-size: 110px;
    height: 780px;
  }
`

const ImageContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 150px;
  height: 150px;
`

const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  &:hover {
    border-radius: 0px;
  }
`

const TopsContainer = styled(Flex)`
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  height: 320px;
  overflow: hidden;
`

interface LandingProps {
  tops: string[]
}

export default function Landing({ tops }: LandingProps) {
  return (
    <Layout>
      <LandingImageContainer right="0px" top="253px">
        <LandingImage
          src="/assets/images/Home/Landing_2.png"
          alt=""
          width={235}
          height={235}
        />
      </LandingImageContainer>
      <TitleContainer>
        <LandingImageContainer left="37%" top="55px">
          <LandingImage
            src="/assets/images/Home/Landing_1.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <LandingImageContainer left="60%" bottom="30px">
          <LandingImage
            src="/assets/images/Home/Landing_3.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <LandingImageContainer left="0px" bottom="58px">
          <LandingImage
            src="/assets/images/Home/Landing_4.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <Text>WHERE ART AND</Text>
        <Text>THE FUTURE COLLIDE</Text>
        <StrollButton text="Go on a Stroll" />
      </TitleContainer>
      <TopsContainer>
        {tops.map((item) => {
          return (
            <ImageContainer key={item}>
              <StyledImage src={item} alt="" width={150} height={150} />
            </ImageContainer>
          )
        })}
      </TopsContainer>
    </Layout>
  )
}
