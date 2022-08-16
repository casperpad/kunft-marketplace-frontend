import { useCallback, useEffect, useState } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import uniqWith from 'lodash/uniqWith'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'
import {
  NFTCard,
  AddButton,
  ImportTokenModal,
  StyledButton,
  Flex,
} from '@/components'
import { useGetTokens } from '@/hooks'
import { tokenApis, userApis } from '@/service'
import { useAppSelector } from '@/store'
import { isEqual } from '@/utils/token'
import { Token } from '../../types/Token'
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
} from './Profile.styles'

export default function Profile() {
  const [rating, setRating] = useState(0)
  const [showImportTokenDialog, setShowImportTokenDialog] = useState(false)
  const { user } = useAppSelector((state) => state.user)
  const profileAvatar = user?.avatar || '/assets/images/Avatar/Default.svg'

  const handleRating = (rate: number) => {
    setRating(rate)
  }
  const [page] = useState(1)
  const [limit] = useState(20)
  const [tokens, setTokens] = useState<Token[]>([])
  const { data, loading } = useGetTokens(
    {
      owner: CLPublicKey.fromHex(user!.publicKey).toAccountHashStr().slice(13),
    },
    page,
    limit,
  )
  const handleImportToken = useCallback(
    async (contractHash: string, tokenId: string) => {
      const _ = await userApis.addToken(contractHash, tokenId)
      setShowImportTokenDialog(false)
    },
    [],
  )

  const handleImportAllToken = useCallback(async () => {
    const { result } = await tokenApis.addUserToken(
      CLPublicKey.fromHex(user!.publicKey).toAccountHashStr().slice(13),
    )
    toast.success(result)
  }, [user])

  useEffect(() => {
    if (loading || !data) return
    setTokens((prev) => {
      return uniqWith([...prev, ...data.tokens], isEqual)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <CustomLayout>
      <DataContainer>
        <ImageContainer>
          <StyledImage src={profileAvatar} alt="" width={235} height={235} />
        </ImageContainer>
        <NameContainer>
          <Title>{user!.name || 'Please set name.'}</Title>
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            size={15}
            fillColor="#FA5F0C"
          />
          <Description mt="25px">
            {user!.description || 'You can write your bio.'}
          </Description>
        </NameContainer>
      </DataContainer>
      <Flex flexDirection="row">
        <Filter />
        <NFTContainer>
          {tokens.map((token) => (
            <NFTCard
              key={`${token.collection.contractPackageHash}_${token.id}`}
              {...token}
            />
          ))}
          {loading ? 'Loading...' : null}
        </NFTContainer>
      </Flex>

      <AddButton onClick={() => setShowImportTokenDialog(true)} />
      <StyledButton
        text="Import all token(*experimental)"
        link={false}
        onClick={() =>
          toast.promise(handleImportAllToken, {
            pending: 'Adding tokens...',
          })
        }
      />
      <ImportTokenModal
        show={showImportTokenDialog}
        setShow={setShowImportTokenDialog}
        onImport={handleImportToken}
      />
    </CustomLayout>
  )
}
