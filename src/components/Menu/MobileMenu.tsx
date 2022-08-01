import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Flex } from '@/components/Box'
import { CustomLink } from '@/components/Link'
import { Text } from '@/components/Text'
import { navLinks } from '@/config/constants/data'

const StyledText = styled(Text)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const MenuItem = styled(Flex)`
  width: 100%;
  padding: 15px 30px 10px;
  border: 1px solid ${({ theme }) => `${theme.colors.border}44`};
  border-top: 0px;
  border-left: 0px;
`

const Container = styled(Flex)<{ show: boolean }>`
  position: fixed;
  top: 65px;
  right: 0;
  transform: ${({ show }) => (show ? 'translate(0%)' : 'translateX(100%)')};
  flex-direction: column;
  font-size: 17px;
  width: 200px;
  transition: transform 0.3s;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

interface MobileMenuProps {
  show: boolean
}

export default function MobileMenu({ show }: MobileMenuProps) {
  const { pathname } = useRouter()

  return (
    <Container show={show}>
      {navLinks.map((item) => {
        const active = pathname.indexOf(item.path) > -1
        return (
          <CustomLink key={item.name} href={item.path}>
            <MenuItem>
              <StyledText active={active}>{item.name}</StyledText>
            </MenuItem>
          </CustomLink>
        )
      })}
    </Container>
  )
}
