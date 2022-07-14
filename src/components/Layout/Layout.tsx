import styled from 'styled-components'

import { Box, BoxProps } from '@components/Box'

const Layout = styled(Box)<BoxProps>`
  width: 100%;
  padding: 18px 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 18px 30px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 44px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 48px 56px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 68px 76px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    padding: 80px 86px;
  }
`

export default Layout
