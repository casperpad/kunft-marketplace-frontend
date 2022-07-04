import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.footer`
  border: solid 1px white;
  display: flex;
  flex-direction: row;
  height: 435px;
  padding: 103px 86px 70px;
`

const ImageContainer = styled.div`
  height: 60px;
  width: 160px;
`

export default function Footer() {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="/assets/images/Logo/KUNFTLogo.png"
          alt=""
          width={120}
          height={60}
        />
      </ImageContainer>
    </Container>
  )
}
