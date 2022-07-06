import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const MenuItemContainer = styled.div`
  margin-right: 32px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Castle';
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const NavbarContainer = styled.div`
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

const LogoContainer = styled.div``

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

interface MenuItem {
  text: string
  link: string
}

interface NavbarProps {
  logo: string
  menuItems: MenuItem[]
  avatar?: string
  loggedIn: boolean
}

function MenuItem({ item }: { item: MenuItem }) {
  return (
    <MenuItemContainer>
      <Link href={item.link}>{item.text}</Link>
    </MenuItemContainer>
  )
}

export default function Navbar(props: NavbarProps) {
  const { logo, menuItems, avatar, loggedIn } = props
  const menuAvatar = loggedIn
    ? avatar
      ? (avatar as string)
      : '/assets/images/Avatar/Default.svg'
    : '/assets/images/Avatar/NotConnectedWallet.svg'

  return (
    <NavbarContainer>
      <LogoContainer>
        <Image src={logo} alt="" width={101} height={57} />
      </LogoContainer>
      <MenuContainer>
        {menuItems.map((item) => {
          return <MenuItem item={item} key={item.text} />
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
