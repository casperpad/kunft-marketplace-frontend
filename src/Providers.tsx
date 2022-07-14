import React from 'react'

import { Provider } from 'react-redux'
import { Store } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import CasperWeb3Provider from './provider/CasperWeb3Provider'
import { light } from './theme'

const StyledThemeProvider = (props: any) => {
  return <ThemeProvider theme={light} {...props} />
}

interface ProvdersProps {
  children: React.ReactNode
  store: Store
}

export default function Providers({ children, store }: ProvdersProps) {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <CasperWeb3Provider>
          <StyledThemeProvider>{children}</StyledThemeProvider>
        </CasperWeb3Provider>
      </PersistGate>
    </Provider>
  )
}
