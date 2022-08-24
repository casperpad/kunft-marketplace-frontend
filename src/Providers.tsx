import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  ModalProvider,
  light,
  ThemeProvider as UIKitThemeProvider,
} from '@kunftmarketplace/uikit'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ThemeProvider } from 'styled-components'

import CasperWeb3Provider from './providers/CasperWeb3Provider'

const StyledThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <UIKitThemeProvider theme={light} {...props}>
      <ThemeProvider theme={light} {...props}>
        {children}
      </ThemeProvider>
    </UIKitThemeProvider>
  )
}

interface ProvdersProps {
  children: React.ReactNode
  store: Store
}

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export default function Providers({ children, store }: ProvdersProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <CasperWeb3Provider>
          <StyledThemeProvider>
            <SkeletonTheme baseColor="#aaaaaa40" highlightColor="#aaaaaa20">
              <ModalProvider>{children}</ModalProvider>
            </SkeletonTheme>
          </StyledThemeProvider>
        </CasperWeb3Provider>
      </ApolloProvider>
    </Provider>
  )
}
