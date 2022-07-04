import React from 'react'

import CasperWeb3Provider from './provider/CasperWeb3Provider'
import Theme from './provider/ThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CasperWeb3Provider>
      <Theme>{children}</Theme>
    </CasperWeb3Provider>
  )
}
