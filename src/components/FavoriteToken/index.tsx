import React, { useCallback, useEffect, useMemo } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import styled from 'styled-components'

import { useAuth, useFavoriteToken } from '@/hooks'
import { Token } from '@/types'

import { Flex } from '../Box'
import { DefaultButton } from '../Button'
import { Text } from '../Text'

export const StarsButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.primary};
`

interface FavoriteTokenProps {
  token: Token
  setToken: React.Dispatch<React.SetStateAction<Token>>
}

export default function FavoriteToken({ token, setToken }: FavoriteTokenProps) {
  const {
    favoriteTokenMutation,
    data: favoriteTokenMutationData,
    loading: favoriteTokenMutationLoading,
  } = useFavoriteToken()
  const { user } = useAuth()

  const handleStarClick = useCallback(() => {
    if (!user) return
    favoriteTokenMutation({
      variables: {
        slug: token.collection.slug,
        tokenId: token.id,
        publicKey: user.publicKey,
      },
    })
  }, [favoriteTokenMutation, token.id, token.collection.slug, user])

  useEffect(() => {
    if (favoriteTokenMutationLoading || !favoriteTokenMutationData) return
    setToken(favoriteTokenMutationData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteTokenMutationLoading])

  const userStarred = useMemo(() => {
    if (!user) return false
    return token.favoritedUsers.includes(user.id)
  }, [user, token.favoritedUsers])

  return (
    <Flex flexDirection="row" alignItems="center">
      <StarsButton color="transparent" onClick={handleStarClick}>
        {userStarred ? <BsHeartFill /> : <BsHeart />}
      </StarsButton>
      <Text ml="4px" color="primary">
        {token.favoritedUsers.length}
      </Text>
    </Flex>
  )
}
