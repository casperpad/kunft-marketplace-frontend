import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { CustomLink } from '@components/Link'
import { navLinks } from '@config/constants/data'
import { UserMenu } from './UserMenu'

const ProfileMenu = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  transform: translateY(100%);
`

const MenuItem = styled(CustomLink)`
  margin-right: 32px;
`

const StyledAvatar = styled(Image)`
  cursor: pointer;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const NavbarContainer = styled.nav`
  position: fixed;
  height: 65px;
  width: 100vw;
  top: 0px;
  left: 0px;
  padding: 4px 36px;
  border-bottom: 1px solid black;
  font-family: 'Castle';
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 100;
`

interface NavbarProps {
  logo: string
  avatar?: string
  loggedIn: boolean
}

export default function Navbar(props: NavbarProps) {
  const { pathname } = useRouter()
  const { logo, avatar, loggedIn } = props

  const [show, setShow] = useState(false)
  const menuAvatar = loggedIn
    ? avatar
      ? (avatar as string)
      : '/assets/images/Avatar/Default.svg'
    : '/assets/images/Avatar/NotConnectedWallet.svg'

  return (
    <NavbarContainer>
      <CustomLink href="/">
        <Image src={logo} alt="" width={101} height={57} />
      </CustomLink>
      <MenuContainer>
        {navLinks.map((item) => {
          const active = pathname.indexOf(item.path) > -1
          return (
            <MenuItem href={item.path} key={item.name} active={active}>
              {item.name}
            </MenuItem>
          )
        })}
        <Flex
          width="70px"
          height="70px"
          justifyContent="center"
          alignItems="center"
          ml="-20px"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <StyledAvatar
            src={menuAvatar}
            alt=""
            width={30}
            height={30}
            className="rounded-full overflow-hidden"
          />
        </Flex>
      </MenuContainer>
      {show && (
        <ProfileMenu
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <UserMenu />
        </ProfileMenu>
      )}
    </NavbarContainer>
  )
}