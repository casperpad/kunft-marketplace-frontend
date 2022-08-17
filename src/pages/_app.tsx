import React, { useEffect } from 'react'

import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'

import { Navbar, Footer, Spinner } from '@/components'
import { meta } from '@/config'
import { useAuth } from '@/hooks'
import GlobalStyle, { ResetCSS } from '@/styles/Global'
import Providers from '../Providers'
import { useStore } from '../store'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
// eslint-disable-next-line import/order
import '../styles/react-toastify.css'
// eslint-disable-next-line import/order
import 'react-loading-skeleton/dist/skeleton.css'

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
  const store = useStore(pageProps.initialReduxState)
  return (
    <Providers store={store}>
      <DefaultSeo
        description={meta.SITE_DESCRIPTION}
        title={`${meta.SITE_TITLE}`}
        titleTemplate={`%s | ${meta.SITE_TITLE}`}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: meta.SITE_URL,
          site_name: meta.SITE_NAME,
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      />
      <ResetCSS />
      <GlobalStyle />
      <Navbar />
      {pageProps.protected ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </Providers>
  )
}

export default MyApp
