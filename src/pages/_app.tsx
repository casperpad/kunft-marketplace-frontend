import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import type { AppProps } from 'next/app'

import { PageMeta } from '@components/Layout'
import { Navbar, Footer } from '@components/Menu'
import useAuth from '@hooks/useAuth'

import Providers from '../Providers'
import store from '../store'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
import '../styles/globals.css'

const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 65px;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 65px);
`

const Layout = styled.div`
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 1512px;
  }
`

function Auth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === undefined) {
      router.push('/')
    }
  }, [user, router])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers store={store}>
      <PageMeta symbol="" />
      <Navbar />
      <Page>
        <Layout>
          {pageProps.protected ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Page>
      <Footer />
    </Providers>
  )
}

export default MyApp
