import styled from 'styled-components'

import { Box, BoxProps } from '@components/Box'

const Layout = styled(Box)<BoxProps>`
  width: 100%;
  padding: 68px 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 68px 44px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 68px 56px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 68px 76px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    padding: 80px 86px;
  }
`

export default Layout
