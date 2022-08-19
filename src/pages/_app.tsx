import React, { useEffect, Fragment } from 'react'

import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import Router, { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import type { AppProps } from 'next/app'

import { Navbar, Footer, Spinner } from '@/components'
import { meta } from '@/config'
import { useAuth } from '@/hooks'
import GlobalStyle, { ResetCSS } from '@/styles/Global'
import Providers from '../Providers'
import { useStore, persistor } from '../store'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
// eslint-disable-next-line import/order
import '../styles/react-toastify.css'
// eslint-disable-next-line import/order
import 'react-loading-skeleton/dist/skeleton.css'
// eslint-disable-next-line import/order
import 'nprogress/nprogress.css'

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

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

function MyApp(props: AppProps) {
  const { pageProps } = props
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
      <PersistGate loading={null} persistor={persistor}>
        <App {...props} />
      </PersistGate>
    </Providers>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  mp?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const ProductionErrorBoundary =
  process.env.NODE_ENV === 'production' ? Fragment : Fragment

const App = ({ Component, pageProps, ...appProps }: AppPropsWithLayout) => {
  return (
    <ProductionErrorBoundary>
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
    </ProductionErrorBoundary>
  )
}

export default MyApp
