import React, { useEffect } from 'react'
import { Signer } from 'casper-js-sdk'

import { useAuth, useCasperWeb3Provider } from '@/hooks'

export default function Hello() {
  const { connected, connect } = useCasperWeb3Provider()
  const { signUp, signIn, checkAuth } = useAuth()

  useEffect(() => {
    Signer.sendConnectionRequest()
  }, [])

  return (
    <div>
      <button
        type="button"
        className="w-12 h-5"
        onClick={connected ? signUp : connect}
      >
        {connected ? 'SignUp[' : 'Connect'}
      </button>

      <button
        type="button"
        className="w-12 h-5"
        onClick={connected ? signIn : connect}
      >
        {connected ? 'SignIn' : 'Connect'}
      </button>

      <button
        type="button"
        className="w-12 h-5"
        onClick={connected ? checkAuth : connect}
      >
        {connected ? 'check' : 'Connect'}
      </button>
    </div>
  )
}
