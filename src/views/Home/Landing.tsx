import Image from 'next/image'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const Title = styled(Text)`
  transform: translateY(-10%);
  text-align: center;
  margin-top: 234px;
  width: 100%;
  z-index: 5;

  font-size: 33px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 90%;
    font-size: 50px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 85%;
    font-size: 80px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    width: 95%;
    font-size: 110px;
  }
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
  justify-content: center;
  /* align-items: center; */
  font-size: 50px;

  height: 580px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 650px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 710px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
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
  /* overflow: hidden; */
`

interface LandingProps {
  tops: string[]
}

export default function Landing({ tops }: LandingProps) {
  return (
    <Layout>
      <TitleContainer>
        <LandingImageContainer left="45%" top="15px">
          <LandingImage
            src="/assets/images/Home/Landing_1.png"
            alt=""
            width={235}
            height={235}
          />
        </LandingImageContainer>
        <LandingImageContainer right="-80px" top="63px">
          <LandingImage
            src="/assets/images/Home/Landing_2.png"
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
        <Title textAlign="center">WHERE ART AND THE FUTURE COLLIDE</Title>
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
