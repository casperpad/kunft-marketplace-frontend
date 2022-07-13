import React from 'react'

import { FiCopy } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiLogoutBoxRLine } from 'react-icons/ri'

import { Box, Flex } from '@components/Box'
import { CustomLink } from '@components/Link'
import { Text } from '@components/Text'

import {
  UserMenuContainer,
  UserProfile,
  ItemContainer as UserMenuItem,
  StyledText,
  StyledIcon,
  UserMenuDivider,
  StyledImage,
} from './UserMenu.styles'

interface UserMenuProps {
  avatar?: string
  onSettingClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserMenu(props: UserMenuProps) {
  const { avatar, onSettingClick } = props

  const profileAvatar = avatar
    ? (avatar as string)
    : '/assets/images/Avatar/Default.svg'

  return (
    <UserMenuContainer>
      <UserProfile>
        <StyledImage src={profileAvatar} alt="" width={73} height={74} />
        <Box>
          <Flex flexDirection="row" alignItems="center">
            <Text mr="8px" fontSize="10px" color="input">
              0202994438940...8cf93739c45
            </Text>
            <StyledIcon>
              <FiCopy size={20} />
            </StyledIcon>
          </Flex>
          <CustomLink href="/profile">
            <StyledText fontSize="12px" color="textSecondary">
              Profile
            </StyledText>
          </CustomLink>
        </Box>
      </UserProfile>
      <UserMenuDivider />
      <UserMenuItem onClick={() => onSettingClick(true)}>
        <StyledText>Settings</StyledText>
        <IoSettingsOutline size={23} />
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem>
        <StyledText>Log Out</StyledText>
        <RiLogoutBoxRLine size={23} />
      </UserMenuItem>
    </UserMenuContainer>
  )
}
