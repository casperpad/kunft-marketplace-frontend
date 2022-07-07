import React from 'react'
import styled from 'styled-components'
import type { AppProps } from 'next/app'
import { PageMeta } from '@components/Layout'
import { Navbar, Footer } from '@components/Menu'

import Providers from '../Providers'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
import '../styles/globals.css'

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  top: 64px;
  min-height: calc(100vh - 64px);
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <PageMeta symbol="" />
      <Navbar logo="/assets/images/Logo/KUNFTLogo.png" loggedIn={false} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </Providers>
  )
}

export default MyApp
