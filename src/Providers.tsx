import React from 'react'

import CasperWeb3Provider from './provider/CasperWeb3Provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CasperWeb3Provider>{children}</CasperWeb3Provider>
}
