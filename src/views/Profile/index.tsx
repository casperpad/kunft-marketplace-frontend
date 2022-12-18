import React, { useCallback } from 'react'
import { useModal } from '@kunftmarketplace/uikit'
import { CLPublicKey } from 'casper-js-sdk'
import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'
import { AddButton, ImportTokenModal, StyledButton } from '@/components'

import { tokenApis, userApis } from '@/service'
import { useAppSelector } from '@/store'
import Tokens from '@/views/Tokens'

import {
  StyledImage,
  AvatarWrapper,
  Title,
  Description,
  NameContainer,
  UserInfo,
  Container,
} from './Profile.styles'

export interface ProfileProps {
  slug: string
  publicKey: string
  accountHash: string
  verified: boolean
  name?: string
  avatar?: string
  description?: string
  ownedTokens: number
}

export default function Profile({
  publicKey,
  accountHash,
  name,
  avatar,
  description,
}: ProfileProps) {
  const { user } = useAppSelector((state) => state.user)

  const isMyProfile = user?.publicKey === publicKey

  const profileAvatar = avatar || '/images/Avatar/Default.svg'

  const handleImportToken = useCallback(
    async (contractHash: string, tokenId: string) => {
      const _ = await userApis.addToken(contractHash, tokenId)
    },
    [],
  )

  const handleImportAllToken = useCallback(async () => {
    const { result } = await tokenApis.addUserToken(
      CLPublicKey.fromHex(user!.publicKey).toAccountHashStr().slice(13),
    )
    toast.success(result)
  }, [user])

  const [onPresentImportModal] = useModal(
    <ImportTokenModal onImport={handleImportToken} />,
  )

  return (
    <Container>
      <NextSeo nofollow noindex />
      <UserInfo>
        <AvatarWrapper>
          <StyledImage src={profileAvatar} alt="" width={235} height={235} />
        </AvatarWrapper>
        <NameContainer>
          <Title>{name || (isMyProfile ? 'Please set name.' : '')}</Title>
          <Description mt="25px">
            {description || (isMyProfile ? 'You can write your bio.' : '')}
          </Description>
        </NameContainer>
      </UserInfo>
      <Tokens
        where={{
          owner: accountHash,
        }}
      />
      {isMyProfile ? (
        <>
          <AddButton onClick={() => onPresentImportModal()} />
          <StyledButton
            text="Import all token(*experimental)"
            link={false}
            onClick={() =>
              toast.promise(handleImportAllToken, {
                pending: 'Adding tokens...',
              })
            }
          />
        </>
      ) : null}
    </Container>
  )
}
