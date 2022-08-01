import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { HiMenu } from 'react-icons/hi'
import styled from 'styled-components'

import { Flex } from '@/components/Box'
import { CustomLink } from '@/components/Link'
import { ProfileModal as Modal } from '@/components/Modal'
import { navLinks } from '@/config/constants/data'
import { useCasperWeb3Provider, useAuth, useWindowSize } from '@/hooks/index'
import MobileMenu from './MobileMenu'
import { UserMenu } from './UserMenu'

const ProfileMenu = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  transform: translateY(100%);
`

const MenuItem = styled(CustomLink)``

const StyledAvatar = styled(Image)`
  cursor: pointer;
`

const Menus = styled(Flex)`
  gap: 32px;
  flex-direction: column;
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const ShowMenu = styled(Flex)`
  display: flex;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const MenuContainer = styled(Flex)`
  flex-direction: row;
  align-items: center;
  gap: 32px;
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

export default function Navbar() {
  const { pathname } = useRouter()
  const { signIn, user } = useAuth()
  const { currentAccount, connect } = useCasperWeb3Provider()
  const [requestConnect, setRequestConnect] = useState(false)
  const size = useWindowSize()

  const [modalShow, setModalShow] = useState(false)
  const [show, setShow] = useState(false)
  const [menuShow, setMenuShow] = useState(false)
  const menuAvatar = user
    ? user.avatar
      ? user.avatar
      : '/assets/images/Avatar/Default.svg'
    : '/assets/images/Avatar/NotConnectedWallet.svg'

  const signInOnConnected = useCallback(() => {
    if (currentAccount === undefined) {
      connect()
      setRequestConnect(true)
    } else {
      signIn()
    }
  }, [connect, currentAccount, signIn])

  useEffect(() => {
    setMenuShow(false)
  }, [size])

  useEffect(() => {
    if (currentAccount !== undefined && requestConnect) {
      signIn().then(() => {
        setRequestConnect(false)
      })
    }
  }, [currentAccount, requestConnect, signIn])

  return (
    <>
      <NavbarContainer>
        <CustomLink href="/">
          <Image
            src="/assets/images/Logo/KUNFTLogo.png"
            alt="KUNFT"
            width={101}
            height={57}
          />
        </CustomLink>
        <MenuContainer>
          <ShowMenu onClick={() => setMenuShow(!menuShow)}>
            <HiMenu size={25} />
          </ShowMenu>
          <MobileMenu show={menuShow} />
          <Menus>
            {navLinks.map((item) => {
              const active = pathname.indexOf(item.path) > -1
              return (
                <MenuItem href={item.path} key={item.name} active={active}>
                  {item.name}
                </MenuItem>
              )
            })}
          </Menus>
          <Flex
            width="70px"
            height="70px"
            justifyContent="center"
            alignItems="center"
            ml="-20px"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => setShow(!show)}
          >
            <StyledAvatar
              src={menuAvatar}
              alt=""
              width={30}
              height={30}
              onClick={user ? undefined : signInOnConnected}
            />
          </Flex>
        </MenuContainer>
        {user && show && (
          <ProfileMenu
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <UserMenu onSettingClick={setModalShow} />
          </ProfileMenu>
        )}
      </NavbarContainer>
      <Modal setShow={setModalShow} show={modalShow} />
    </>
  )
}
