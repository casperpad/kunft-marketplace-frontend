import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { NFTCard } from '@components/Card/NFT'
import useWindowSize from '@hooks/useWindowResize'

import Filter from './Filter'

import {
  StyledImage,
  ImageContainer,
  Title,
  Description,
  NameContainer,
  DataContainer,
  NFTContainer,
  CustomLayout,
  Container,
} from './Profile.styles'

interface ProfileProps {
  avatar?: string
  NFTs: string[]
}

export default function Profile({ avatar, NFTs = [] }: ProfileProps) {
  const profileAvatar =
    avatar ||
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/eWX3j4ulh4LK8RXC2VSIyF1Lwd-dKZIymXBuGiKsEpY'

  const [rating, setRating] = useState(0)
  const size = useWindowSize()

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  return (
    <Container>
      <CustomLayout>
        <DataContainer>
          <ImageContainer>
            <StyledImage src={profileAvatar} alt="" width={235} height={235} />
          </ImageContainer>
          <NameContainer>
            <Title>Insert Name Here</Title>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              size={15}
              fillColor="#FA5F0C"
            />
            <Description mt="25px">
              User profile bio here is written here. User profile bio here is
              written here. User profile bio here is written here. User profile
              bio here is written here.
            </Description>
          </NameContainer>
          {size[0] >= 1280 && <Filter />}
        </DataContainer>
        {size[0] < 1280 && <Filter />}
        <NFTContainer>
          {NFTs.map((item) => {
            return (
              <NFTCard
                key={item}
                type={
                  Math.random() > 0.5
                    ? Math.random() > 0.5
                      ? 'Sale'
                      : 'NoneSale'
                    : 'Upcoming'
                }
                image={item}
                name="KUNFT"
                price={Math.random() * 10000}
                stars={Math.floor(Math.random() * 100)}
                userStarred={Math.random() > 0.5}
              />
            )
          })}
        </NFTContainer>
      </CustomLayout>
    </Container>
  )
}
