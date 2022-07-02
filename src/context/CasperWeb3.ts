import React from 'react'

interface CasperWeb3ContextProps {
  detected: boolean
  connected: boolean
  currentAccount?: string
  connect: () => void
  disconnect: () => void
}

const CasperWeb3Context = React.createContext<CasperWeb3ContextProps>({
  detected: false,
  connected: false,
  currentAccount: undefined,
  connect: () => {
    console.info(`Signer not detected`)
  },
  disconnect: () => {
    console.info(`Signer not detected`)
  },
})

export default CasperWeb3Context
