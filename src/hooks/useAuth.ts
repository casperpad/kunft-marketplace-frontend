import { useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { Signer } from 'casper-js-sdk'

import { userActions } from '@/store/actions'
import { User } from '@/types'
import { useCasperWeb3Provider } from '../provider/CasperWeb3Provider'
import { authApis } from '../service'
import { useAppSelector, useAppDispatch } from '../store'

export default function useAuth() {
  const { currentAccount, connect } = useCasperWeb3Provider()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const setUser = useCallback(
    (user?: User) => {
      if (user) dispatch(userActions.setUser(user))
      else dispatch(userActions.setUser())
    },
    [dispatch],
  )

  const signUp = useCallback(async () => {
    if (currentAccount === undefined) {
      connect()
      throw Error(`Wallet not connected`)
    }
    const message = `Signup with KUNFT with ${currentAccount}`

    const signature = await Signer.signMessage(message, currentAccount)
    const { expire: _, ...newUser } = await authApis.signUp(
      currentAccount,
      signature,
    )
    setUser(newUser)
  }, [currentAccount, connect, setUser])

  const signIn = useCallback(async () => {
    if (currentAccount === undefined) {
      connect()
      throw Error(`Wallet not connected`)
    }
    try {
      const nonce = await authApis.getNonce(currentAccount)

      const message = `Signin KUNFT with\n public key: ${currentAccount}\nnonce: ${nonce}`
      const signature = await Signer.signMessage(message, currentAccount)

      const { expire: _, ...newUser } = await authApis.signIn(
        currentAccount,
        signature,
      )
      setUser(newUser)
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const parsedError = error as AxiosError<{ message: string }>
        if (parsedError.response?.data.message.startsWith(`Not exist user`)) {
          await signUp()
        }
      }
    }
  }, [currentAccount, connect, signUp, setUser])

  const checkAuth = useCallback(async () => {
    const result = await authApis.checkAuth()
    return result
  }, [])

  const signOut = useCallback(async () => {
    try {
      await authApis.signOut()
      setUser()
    } catch (err: any) {
      console.error(err)
    }
  }, [setUser])

  return { signUp, signIn, signOut, checkAuth, setUser, user }
}
