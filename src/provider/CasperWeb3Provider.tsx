import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Signer } from 'casper-js-sdk'

import CasperWeb3Context from '../context/CasperWeb3'

export default function CasperWeb3Provider({
  children,
}: {
  children: React.ReactNode
}) {
  const [detected, setDetected] = useState(false)
  const [connected, setConnected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()

  const handleWalletStateChange = useCallback(async () => {
    try {
      const address = await Signer.getActivePublicKey()
      setCurrentAccount(address)
      setConnected(true)
    } catch (error: any) {
      console.error(error)
      // Signer.sendConnectionRequest()
    }
  }, [])

  const connect = useCallback(() => {
    Signer.sendConnectionRequest()
  }, [])
  const disconnect = useCallback(() => {
    Signer.disconnectFromSite()
  }, [])

  useEffect(() => {
    if (window.casperlabsHelper) {
      setDetected(true)
    } else {
      setDetected(false)
      return
    }
    Signer.isConnected().then((_connected) => {
      if (_connected) {
        handleWalletStateChange()
        setConnected(true)
      }
    })
    window.addEventListener('signer:disconnected', () => {
      setCurrentAccount(undefined)
      setConnected(false)
    })
    window.addEventListener('signer:locked', () => {
      setCurrentAccount(undefined)
      setConnected(false)
    })
    window.addEventListener('signer:connected', handleWalletStateChange)
    window.addEventListener('signer:unlocked', handleWalletStateChange)
    window.addEventListener('signer:activeKeyChanged', handleWalletStateChange)

    return () => {
      window.removeEventListener('signer:disconnected', handleWalletStateChange)
      window.removeEventListener('signer:locked', handleWalletStateChange)
      window.removeEventListener('signer:connected', handleWalletStateChange)
      window.removeEventListener('signer:unlocked', handleWalletStateChange)
      window.removeEventListener(
        'signer:activeKeyChanged',
        handleWalletStateChange,
      )
    }
  }, [handleWalletStateChange])

  const providerValues = useMemo(
    () => ({
      detected,
      connected,
      currentAccount,
      connect,
      disconnect,
    }),
    [connect, connected, currentAccount, detected, disconnect],
  )

  return (
    <CasperWeb3Context.Provider value={providerValues}>
      {children}
    </CasperWeb3Context.Provider>
  )
}

export function useCasperWeb3Provider() {
  const context = React.useContext(CasperWeb3Context)
  if (context === undefined) {
    throw new Error('CasperWeb3Context is not initialized')
  }
  return context
}
