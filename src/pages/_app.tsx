import type { AppProps } from 'next/app'

import Providers from '../Providers'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
