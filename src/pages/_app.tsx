import type { AppProps } from 'next/app'
import { PageMeta } from '@components/Layout'
import { Navbar, Footer } from '@components/Menu'

import Providers from '../Providers'

// eslint-disable-next-line import/order
import '../assets/scss/main.scss'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const menuItems = [
    { text: 'Discover', link: '/discover' },
    { text: 'Create', link: '/create' },
    { text: 'Collections', link: '/collections' },
    { text: 'TopNFTs', link: '/topnfts' },
  ]

  return (
    <Providers>
      <PageMeta symbol="" />
      <Navbar
        menuItems={menuItems}
        logo="/assets/images/Logo/KUNFTLogo.png"
        loggedIn={false}
      />
      <Component {...pageProps} />
      <Footer />
    </Providers>
  )
}

export default MyApp
