import { useCallback, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { NFTCard, AddButton, ImportTokenModal } from '@/components'
import { useWindowSize, useTokens } from '@/hooks'
import { userApis } from '@/service'
import { useAppSelector } from '@/store'
import { Token } from '../../types/nft.types'
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
  const [showImportTokenDialog, setShowImportTokenDialog] = useState(false)
  const { user } = useAppSelector((state) => state.user)
  const handleRating = (rate: number) => {
    setRating(rate)
  }
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const { data, loading, error } = useTokens(
    {
      owner: user!.publicKey,
    },
    page,
    limit,
  )
  const [tokens, setTokens] = useState<Token[]>([])
  const handleImportToken = useCallback(
    async (
      contractPackageHash: string,
      contractHash: string,
      tokenId: string,
    ) => {
      await userApis.addToken(contractPackageHash, contractHash, tokenId)
    },
    [],
  )

  useEffect(() => {
    // if (data === undefined) return
    // const tokens = data.getTokensOwnedBy!.tokens!.map((token) => {
    //   return {
    //     type: 'Owned',
    //     name: `${token.collectionNFT!.name} #${token.tokenId}`,
    //     id: token.tokenId,
    //     owner: user!.publicKey,
    //     viewed: token.viewed,
    //     metadata: token.metadata,
    //     contractHash: token.collectionNFT!.contractHash,
    //     collectionImage: token.collectionNFT!.image,
    //   } as unknown as Token
    // })
    // // setTokens((prev) => [...prev, tokens])
    // setTokens(tokens)
  }, [loading, data])

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
          {/* {tokens.map((token) => {
            return (
              <NFTCard
                key={token.id}
                type={token.type}
                image={token.metadata.image || token.collectionImage}
                name={token.name}
                price={Math.random() * 10000}
                stars={token.viewed}
                contractHash={token.contractHash}
                tokenId={token.id}
                userStarred
              />
            )
          })} */}
        </NFTContainer>
        <ImportTokenModal
          show={showImportTokenDialog}
          setShow={setShowImportTokenDialog}
          onImport={handleImportToken}
        />
        <AddButton onClick={() => setShowImportTokenDialog(true)} />
      </CustomLayout>
    </Container>
  )
}
