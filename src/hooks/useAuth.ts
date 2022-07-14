import { useCallback } from 'react'

import axios, { AxiosError } from 'axios'
import { Signer } from 'casper-js-sdk'
import { useCasperWeb3Provider } from 'src/provider/CasperWeb3Provider'
import { auth } from 'src/service'
import { userActions } from '@store/actions'
import { useAppSelector, useAppDispatch } from '../store'

export default function useAuth() {
  const { currentAccount, connect } = useCasperWeb3Provider()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const signUp = useCallback(async () => {
    if (currentAccount === undefined) {
      connect()
      throw Error(`Wallet not connected`)
    }
    const message = `Signup with KUNFT with ${currentAccount}`

    const signature = await Signer.signMessage(message, currentAccount)
    const { expire: _, ...newUser } = await auth.signUp(
      currentAccount,
      signature,
    )
    dispatch(userActions.setUser(newUser))
  }, [currentAccount, dispatch, connect])

  const signIn = useCallback(async () => {
    if (currentAccount === undefined) {
      connect()
      throw Error(`Wallet not connected`)
    }
    try {
      const nonce = await auth.getNonce(currentAccount)

      const message = `Signin KUNFT with\n public key: ${currentAccount}\nnonce: ${nonce}`
      const signature = await Signer.signMessage(message, currentAccount)

      const { expire: _, ...newUser } = await auth.signIn(
        currentAccount,
        signature,
      )
      dispatch(userActions.setUser(newUser))
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const parsedError = error as AxiosError<{ message: string }>
        if (parsedError.response?.data.message.startsWith(`Not exist user`)) {
          await signUp()
        }
      }
    }
  }, [currentAccount, dispatch, connect, signUp])

  const checkAuth = useCallback(async () => {
    const result = await auth.checkAuth()
    return result
  }, [])

  const signOut = useCallback(async () => {
    try {
      await auth.signOut()
      dispatch(userActions.setUser())
    } catch (err: any) {
      console.error(err)
    }
  }, [dispatch])

  return { signUp, signIn, signOut, checkAuth, user }
}
