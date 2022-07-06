import Image from 'next/image'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Layout } from '@components/Layout'

const ImageContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 150px;
  height: 150px;
  margin: 10px;
`

const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  &:hover {
    border-radius: 0px;
  }
`

interface LandingProps {
  tops: string[]
}

export default function Landing({ tops }: LandingProps) {
  return (
    <Layout>
      <Flex justifyContent="center">
        {tops.map((item) => {
          return (
            <ImageContainer key="item">
              <StyledImage src={item} alt="" width={150} height={150} />
            </ImageContainer>
          )
        })}
      </Flex>
    </Layout>
  )
}
