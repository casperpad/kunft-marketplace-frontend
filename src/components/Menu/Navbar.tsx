import { useCallback, useEffect, useState } from 'react'
import { useWalletModal, useModal, Image } from '@kunftmarketplace/uikit'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { HiMenu } from 'react-icons/hi'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { Flex } from '@/components/Box'
import Link from '@/components/Link'
import { ProfileModal, ProfileSubmitProps } from '@/components/Modals'
import { navLinks } from '@/config/constants/data'
import { useCasperWeb3Provider, useAuth, useWindowSize } from '@/hooks'
import { authApis } from '@/service'

import MobileMenu from './MobileMenu'
import { UserMenu } from './UserMenu'

const ProfileMenu = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  transform: translateY(100%);
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
  background-color: white;
  z-index: ${({ theme }) => theme.zIndices.navbar};
`

export default function Navbar() {
  const { pathname } = useRouter()

  const [show, setShow] = useState(false)
  const [menuShow, setMenuShow] = useState(false)
  const [requestConnect, setRequestConnect] = useState(false)
  const { signIn, user, setUser } = useAuth()
  const { currentAccount, connect } = useCasperWeb3Provider()
  const size = useWindowSize()
  const { t } = useTranslation()

  const menuAvatar = user
    ? user.avatar
      ? user.avatar
      : '/images/Avatar/Default.svg'
    : '/images/Avatar/NotConnectedWallet.svg'

  const signInOnConnected = useCallback(() => {
    if (currentAccount === undefined) {
      connect()
      setRequestConnect(true)
    } else {
      signIn()
    }
  }, [connect, currentAccount, signIn])

  const connectWalletById = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (connectorId: string) => {
      signInOnConnected()
    },
    [signInOnConnected],
  )

  const { onPresentConnectModal } = useWalletModal(connectWalletById, t)

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

  const onSave = useCallback(
    async (info: ProfileSubmitProps) => {
      const user = await authApis.updateInfo(info)
      setUser(user)
      toast.success('User info updated successfully')
    },
    [setUser],
  )

  const [onPresentModal] = useModal(
    <ProfileModal onSave={onSave} user={user} />,
  )
  return (
    <NavbarContainer>
      <Link href="/">
        <Image
          src="/images/Logo/KUNFTLogo.png"
          alt="KUNFT"
          width={101}
          height={57}
        />
      </Link>

      <MenuContainer>
        <ShowMenu onClick={() => setMenuShow(!menuShow)}>
          <HiMenu size={25} />
        </ShowMenu>
        <MobileMenu show={menuShow} />
        <Menus>
          {navLinks.map((item) => {
            const active = pathname.indexOf(item.path) > -1
            return (
              <Link href={item.path} key={item.name} active={active}>
                {item.name}
              </Link>
            )
          })}
        </Menus>
        <ProfileAvatarWrapper
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={() => setShow(!show)}
        >
          <StyledAvatar
            src={menuAvatar}
            alt=""
            width={30}
            height={30}
            onClick={user ? undefined : onPresentConnectModal}
          />
        </ProfileAvatarWrapper>
      </MenuContainer>
      {user && show && (
        <ProfileMenu
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <UserMenu onSettingClick={onPresentModal} avatar={user.avatar} />
        </ProfileMenu>
      )}
    </NavbarContainer>
  )
}

const ProfileAvatarWrapper = styled(Flex)`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  margin-left: -20px;
  &:hover {
    cursor: pointer;
    img {
      transition: all 0.2s ease-in-out;
      box-shadow: ${({ theme }) => theme.shadows.focus};
    }
  }
`

const StyledAvatar = styled(Image)`
  border-radius: 50%;
  width: 30px;
  height: 30px;
`
