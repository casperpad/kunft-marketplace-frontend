import Image from 'next/image'
import styled from 'styled-components'

import { Flex, StyledButton, Layout } from '@/components'

const StrollButton = styled(StyledButton)`
  position: absolute;
  bottom: 115px;
  right: 0px;
  z-index: 3;
`

const LandingImage = styled(Image)`
  box-shadow: ${({ theme }) => theme.shadows.base};
  z-index: 2;

  @keyframes float-image {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(10px);
    }
  }
  animation: float-image 3s ease-in-out infinite alternate;
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

export default function Landing() {
  return (
    <Layout>
      <LandingImageContainer right="0px" top="253px">
        <LandingImage
          src="/images/Home/Landing_2.png"
          alt=""
          width={235}
          height={235}
        />
      </LandingImageContainer>
      <TitleContainer>
        <LandingImageContainer left="37%" top="55px">
          <LandingImage
            src="/images/Home/Landing_1.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <LandingImageContainer left="60%" bottom="30px">
          <LandingImage
            src="/images/Home/Landing_3.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <LandingImageContainer left="0px" bottom="58px">
          <LandingImage
            src="/images/Home/Landing_4.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <h1>
          WHERE ART AND
          <br />
          THE FUTURE COLLIDE
        </h1>
        <StrollButton text="Go on a Stroll" />
      </TitleContainer>
    </Layout>
  )
}
