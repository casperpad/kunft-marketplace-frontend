import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { CustomLink } from '@components/Link'
import { navLinks } from '@config/constants/data'

const MenuItem = styled(CustomLink)`
  margin-right: 32px;
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

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

interface NavbarProps {
  logo: string
  avatar?: string
  loggedIn: boolean
}

export default function Navbar(props: NavbarProps) {
  const { pathname } = useRouter()

  const { logo, avatar, loggedIn } = props
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
          if (pathname.indexOf(item.path) > -1)
            return (
              <MenuItem href={item.path} key={item.name} active>
                {item.name}
              </MenuItem>
            )
          return (
            <MenuItem href={item.path} key={item.name}>
              {item.name}
            </MenuItem>
          )
        })}
        <Image
          src={menuAvatar}
          alt=""
          width={30}
          height={30}
          className="rounded-full overflow-hidden"
        />
      </MenuContainer>
    </NavbarContainer>
  )
}
