import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { CasperClient, Signer } from 'casper-js-sdk'

import { NEXT_PUBLIC_CASPER_NODE_ADDRESS } from '@config/index'
import CasperWeb3Context from '../context/CasperWeb3'
import { getDeploy as _getDeploy, signDeploy } from '../web3/utils'

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

  const getDeploy = useCallback(async (deployHash: string) => {
    return await _getDeploy(NEXT_PUBLIC_CASPER_NODE_ADDRESS, deployHash)
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
      getDeploy,
      signDeploy,
      casperClient: new CasperClient(NEXT_PUBLIC_CASPER_NODE_ADDRESS),
    }),
    [connect, connected, currentAccount, detected, disconnect, getDeploy],
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
