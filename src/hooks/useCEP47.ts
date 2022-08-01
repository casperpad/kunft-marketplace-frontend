/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import { CEP47Client } from 'casper-cep47-js-client'
import { CLKeyParameters, CLPublicKey, Keys } from 'casper-js-sdk'

import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
} from '@/config'

export default function useCEP47(
  contractHash?: string,
  contractPackageHash?: string,
) {
  const cep47Client = useMemo(() => {
    return new CEP47Client(
      NEXT_PUBLIC_CASPER_NODE_ADDRESS!,
      NEXT_PUBLIC_CASPER_CHAIN_NAME!,
    )
  }, [contractHash, contractPackageHash])
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState<BigNumberish>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const _name = await cep47Client.name()

      setName(_name as string)
      const _symbol = await cep47Client.symbol()
      setSymbol(_symbol as string)
      const _totalSupply = await cep47Client.totalSupply()
      setTotalSupply(_totalSupply as BigNumberish)

      setLoading(false)
    }
    if (contractHash !== undefined) {
      const preferContractHash = contractHash.startsWith('hash-')
        ? contractHash
        : `hash-${contractHash}`
      const preferContractPackageHash =
        contractPackageHash === undefined
          ? undefined
          : contractPackageHash.startsWith('hash-')
          ? contractPackageHash
          : `hash-${contractPackageHash}`
      if (preferContractHash.length === 69) {
        cep47Client.setContractHash(
          preferContractHash,
          preferContractPackageHash,
        )
        fetchData()
      }
    }
  }, [cep47Client])

  const balanceOf = useCallback(
    async (account: CLPublicKey) => {
      return await cep47Client.balanceOf(account)
    },
    [cep47Client],
  )

  const getOwnerOf = useCallback(
    async (tokenId: string) => {
      return await cep47Client.getOwnerOf(tokenId)
    },
    [cep47Client],
  )

  const getTokenMeta = useCallback(
    async (tokenId: string) => {
      return await cep47Client.getTokenMeta(tokenId)
    },
    [cep47Client],
  )

  const getTokenByIndex = useCallback(
    async (owner: CLPublicKey, index: string) => {
      return await cep47Client.getTokenByIndex(owner, index)
    },
    [cep47Client],
  )

  const getIndexByToken = useCallback(
    async (owner: CLKeyParameters, tokenId: string) => {
      return await cep47Client.getIndexByToken(owner, tokenId)
    },
    [cep47Client],
  )

  const getAllowance = useCallback(
    async (owner: CLKeyParameters, tokenId: string) => {
      return await cep47Client.getAllowance(owner, tokenId)
    },
    [cep47Client],
  )

  const approve = useCallback(
    async (
      spender: CLKeyParameters,
      ids: string[],
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.approve(
        spender,
        ids,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  const mint = useCallback(
    async (
      recipient: CLKeyParameters,
      ids: string[],
      metas: Map<string, string>[],
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.mint(
        recipient,
        ids,
        metas,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  const mintCopies = useCallback(
    async (
      recipient: CLKeyParameters,
      ids: string[],
      meta: Map<string, string>,
      count: number,
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.mintCopies(
        recipient,
        ids,
        meta,
        count,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  const burn = useCallback(
    async (
      owner: CLKeyParameters,
      ids: string[],
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.burn(
        owner,
        ids,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  const transferFrom = useCallback(
    async (
      recipient: CLKeyParameters,
      owner: CLKeyParameters,
      ids: string[],
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.transferFrom(
        recipient,
        owner,
        ids,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  const transfer = useCallback(
    async (
      recipient: CLKeyParameters,
      ids: string[],
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.transfer(
        recipient,
        ids,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  const updateTokenMeta = useCallback(
    async (
      id: string,
      meta: Map<string, string>,
      paymentAmount: string,
      deploySender: CLPublicKey,
      keys?: Keys.AsymmetricKey[],
    ) => {
      return await cep47Client.updateTokenMeta(
        id,
        meta,
        paymentAmount,
        deploySender,
        keys,
      )
    },
    [cep47Client],
  )

  return {
    loading,
    name,
    symbol,
    totalSupply,
    balanceOf,
    getOwnerOf,
    getTokenMeta,
    getTokenByIndex,
    getIndexByToken,
    getAllowance,
    approve,
    mint,
    mintCopies,
    burn,
    transferFrom,
    transfer,
    updateTokenMeta,
  }
}
