import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import styled, { ThemeProvider } from 'styled-components'
import { ModalProvider, BaseModalBackground } from 'styled-react-modal'

import { Spinner } from '@/components'
import CasperWeb3Provider from './provider/CasperWeb3Provider'
import { persistor } from './store'
import { light } from './theme'

const StyledThemeProvider = (props: any) => {
  return <ThemeProvider theme={light} {...props} />
}

interface ProvdersProps {
  children: React.ReactNode
  store: Store
}

const BlurBackground = styled(BaseModalBackground)`
  backdrop-filter: blur(3px);
  background-color: rgb(0, 0, 0, 0);
`

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export default function Providers({ children, store }: ProvdersProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner />}>
        <ApolloProvider client={client}>
          <CasperWeb3Provider>
            <StyledThemeProvider>
              <ModalProvider backgroundComponent={BlurBackground}>
                {children}
              </ModalProvider>
            </StyledThemeProvider>
          </CasperWeb3Provider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  )
}
