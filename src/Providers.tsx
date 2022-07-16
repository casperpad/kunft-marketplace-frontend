import React from 'react'

import { Provider } from 'react-redux'
import { Store } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import styled, { ThemeProvider } from 'styled-components'
import { ModalProvider, BaseModalBackground } from 'styled-react-modal'

import { Spinner } from '@components/Spinner'
import CasperWeb3Provider from './provider/CasperWeb3Provider'
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

export default function Providers({ children, store }: ProvdersProps) {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner />}>
        <CasperWeb3Provider>
          <StyledThemeProvider>
            <ModalProvider backgroundComponent={BlurBackground}>
              {children}
            </ModalProvider>
          </StyledThemeProvider>
        </CasperWeb3Provider>
      </PersistGate>
    </Provider>
  )
}
