import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { ProfileFilter } from '@components/Filter'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const ImageContainer = styled(Box)`
  width: 235px;
  height: 235px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
`

const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 100%;
  &:hover {
    border-radius: 0px;
  }
`

const NameContainer = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 37px 34px;
  height: 100%;

  display: none;

  ${({ theme }) => theme.mediaQueries.xxl} {
    display: block;
  }
`

interface ProfileProps {
  avatar?: string
  NFTs: string[]
}

export default function Profile({ avatar, NFTs = [] }: ProfileProps) {
  const profileAvatar =
    avatar ||
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/eWX3j4ulh4LK8RXC2VSIyF1Lwd-dKZIymXBuGiKsEpY'

  return (
    <Layout>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ImageContainer>
          <StyledImage src={profileAvatar} alt="" width={235} height={235} />
        </ImageContainer>
        <NameContainer>
          <Text fontSize="27px">Insert Name Here</Text>
        </NameContainer>
        <ProfileFilter />
      </Flex>
      <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-around">
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
      </Flex>
    </Layout>
  )
}
