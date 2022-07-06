import React from 'react'
import { ThemeProvider } from 'styled-components'

import CasperWeb3Provider from './provider/CasperWeb3Provider'
import { light } from './theme'

const StyledThemeProvider = (props: any) => {
  return <ThemeProvider theme={light} {...props} />
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CasperWeb3Provider>
      <StyledThemeProvider>{children}</StyledThemeProvider>
    </CasperWeb3Provider>
  )
}
