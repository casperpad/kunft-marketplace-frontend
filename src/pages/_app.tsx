import React from 'react'
import styled from 'styled-components'
import type { AppProps } from 'next/app'
import { PageMeta } from '@components/Layout'
import { Navbar, Footer } from '@components/Menu'

import Providers from '../Providers'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
import '../styles/globals.css'

const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 65px;
  display: flex;
  justify-content: center;
`

const Layout = styled.div`
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 1512px;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <PageMeta symbol="" />
      <Navbar logo="/assets/images/Logo/KUNFTLogo.png" loggedIn={false} />
      <Page>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Page>
      <Footer />
    </Providers>
  )
}

export default MyApp
