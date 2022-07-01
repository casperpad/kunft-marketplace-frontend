import React from 'react'
import CasperWeb3Provider from './provider/CasperWeb3Provider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CasperWeb3Provider>{children}</CasperWeb3Provider>
    </>
  )
}

export default Providers
