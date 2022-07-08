import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { Text } from '@components/Text'

export const UserMenuDivider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  margin-top: 5px;
  width: 100%;
`

export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.15s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const StyledIcon = styled(Box)`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.15s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const UserProfile = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 17px 30px;
  font-family: 'Avenir';
  width: 100%;
  cursor: pointer;
  transition: color 0.15s;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const ItemContainer = styled(UserProfile)`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    ${StyledText} {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const StyledImage = styled(Image)`
  border-radius: 100%;
`

export const UserMenuContainer = styled(Box)`
  border-radius: 10px 0px 0px 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  width: 330px;
  font-size: 14px;
  padding-bottom: 5px;
`
