import Image from 'next/image'
import styled from 'styled-components'

import { Grid } from '@components/Box'
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

const Container = styled(Grid)`
  gap: 20px;
  grid-template-columns: repeat(8, 1fr);
`

interface LandingProps {
  tops: string[]
}

export default function Landing({ tops }: LandingProps) {
  return (
    <Layout>
      <Container>
        {tops.map((item) => {
          return (
            <ImageContainer key={item}>
              <StyledImage src={item} alt="" width={150} height={150} />
            </ImageContainer>
          )
        })}
      </Container>
    </Layout>
  )
}
