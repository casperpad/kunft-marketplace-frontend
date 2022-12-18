import React from 'react'

import { ProfileAvatar } from '@kunftmarketplace/uikit'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiLogoutBoxRLine } from 'react-icons/ri'

import Address from '@/components/Address'
import { Box } from '@/components/Box'
import Link from '@/components/Link'

import useAuth from '@/hooks/useAuth'
import {
  UserMenuContainer,
  UserProfile,
  ItemContainer as UserMenuItem,
  StyledText,
  UserMenuDivider,
} from './UserMenu.styles'

interface UserMenuProps {
  avatar?: string
  onSettingClick: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserMenu(props: UserMenuProps) {
  const { avatar, onSettingClick } = props
  const { signOut, user } = useAuth()

  return (
    <UserMenuContainer>
      <UserProfile>
        <ProfileAvatar src={avatar} width={73} height={74} />
        <Box>
          <Address variant="secondary" address={user!.publicKey} />
          <Link href={`/profile/${user.publicKey}`}>
            <StyledText fontSize="12px" color="textSecondary">
              Profile
            </StyledText>
          </Link>
        </Box>
      </UserProfile>
      <UserMenuDivider />
      <UserMenuItem onClick={() => onSettingClick(true)}>
        <StyledText>Settings</StyledText>
        <IoSettingsOutline size={23} />
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem onClick={signOut}>
        <StyledText>Log Out</StyledText>
        <RiLogoutBoxRLine size={23} />
      </UserMenuItem>
    </UserMenuContainer>
  )
}
