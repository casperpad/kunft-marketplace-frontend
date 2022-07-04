import { useCallback } from 'react'

import { Signer } from 'casper-js-sdk'
import { useCasperWeb3Provider } from 'src/provider/CasperWeb3Provider'
import { api, auth } from 'src/service'

export default function useAuth() {
  const { currentAccount } = useCasperWeb3Provider()

  const signUp = useCallback(async () => {
    if (currentAccount === undefined) throw Error(`Wallet not connected`)
    const message = `Signup with KUNFT with ${currentAccount}`

    const signature = await Signer.signMessage(message, currentAccount)
    const result = await api.post('/auth/signup', {
      signature,
      publicKey: currentAccount,
    })
  }, [currentAccount])

  const signIn = useCallback(async () => {
    if (currentAccount === undefined) throw Error(`Wallet not connected`)

    const nonce = await auth.getNonce(currentAccount)

    const message = `Signin KUNFT with\n public key: ${currentAccount}\nnonce: ${nonce}`
    const signature = await Signer.signMessage(message, currentAccount)

    const result = await auth.signIn(currentAccount, signature)
    return result
  }, [currentAccount])

  const checkAuth = useCallback(async () => {
    const result = await auth.checkAuth()
    return result
  }, [])

  return { signUp, signIn, checkAuth }
}
