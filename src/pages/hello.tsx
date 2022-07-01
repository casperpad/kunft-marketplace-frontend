import React, { useEffect } from 'react'
import { useCasperWeb3Provider } from '../provider/CasperWeb3Provider'
import { Signer } from 'casper-js-sdk'
export default function Hello() {
  const { connected, currentAccount, detected, connect, disconnect } = useCasperWeb3Provider()

  useEffect(() => {
    Signer.sendConnectionRequest()
  }, [])

  console.log(connected, currentAccount, detected)

  return (
    <div>
      <button className="w-12 h-5" onClick={connected ? disconnect : connect}>
        {connected ? currentAccount : 'Connect'}
      </button>
    </div>
  )
}
