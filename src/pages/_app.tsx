import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'

import { Navbar, Footer, Spinner, PageMeta } from '@components/index'
import { useAuth, useMarketplace } from '@hooks/index'
import Providers from '../Providers'
import store from '../store'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
import '../styles/globals.css'

function Auth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === undefined) {
      router.push('/')
    }
  }, [user, router])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (user) return <>{children}</>
  return <Spinner />
}

function MyApp({ Component, pageProps }: AppProps) {
  const _ = useMarketplace()
  return (
    <Providers store={store}>
      <PageMeta symbol="" />
      <Navbar />
      {pageProps.protected ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}

      <Footer />
    </Providers>
  )
}

export default MyApp
