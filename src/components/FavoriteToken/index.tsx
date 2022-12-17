import React, { useCallback, useEffect, useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { useAuth, useFavoriteToken } from '@/hooks'
import { Token } from '@/types'

import { DefaultButton } from '../Button'
import { Text } from '../Text'

export const StarsButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-weight: 300;
  font-size: 20px;
  z-index: 1;
  &:disabled {
    background-color: transparent;
    cursor: not-allowed;
  }
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
  const [userStarred, setUserStarred] = useState(false)
  const handleStarClick = useCallback(async () => {
    if (!user) return
    await favoriteTokenMutation({
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

  useEffect(() => {
    if (!user) setUserStarred(false)
    else setUserStarred(token.favoritedUsers.includes(user.id))
  }, [user, token.favoritedUsers])

  return (
    <StarsButton
      color="transparent"
      onClick={() =>
        toast.promise(handleStarClick, {
          pending: 'Saving...',
          success: 'Completed',
        })
      }
      disabled={!user}
    >
      {userStarred ? <BsHeartFill /> : <BsHeart />}
      <Text color="primary">{token.favoritedUsers.length}</Text>
    </StarsButton>
  )
}
