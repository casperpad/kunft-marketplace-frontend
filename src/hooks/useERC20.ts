import { useCallback, useEffect, useState } from 'react'
import { BigNumber, BigNumberish, formatFixed } from '@ethersproject/bignumber'
import { CLKeyParameters, CLPublicKey } from 'casper-js-sdk'
import { toast } from 'react-toastify'
import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
  NATIVE_HASH,
} from '@/config'
import { showDeployHash } from '@/utils/toast'
import { ERC20SignerClient, RecipientType } from '@/web3/client/erc20'
import { useCasperWeb3Provider } from '../providers/CasperWeb3Provider'

export default function useERC20({
  contractHash,
  contractPackageHash,
  nodeAddress = NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  chainName = NEXT_PUBLIC_CASPER_CHAIN_NAME,
}: {
  contractHash: string
  contractPackageHash?: string
  nodeAddress?: string
  chainName?: string
}) {
  const client = new ERC20SignerClient(nodeAddress, chainName)

  const [name, setName] = useState<string | undefined>()
  const [symbol, setSymbol] = useState<string | undefined>()
  const [decimals, setDecimals] = useState<number | undefined>()
  const [totalSupply, setTotalSupply] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { getDeploy } = useCasperWeb3Provider()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await client.setContractHash(contractHash, contractPackageHash)
      const name = await client.name()
      const symbol = await client.symbol()
      const decimals = ((await client.decimals()) as BigNumber).toNumber()
      const totalSupply = parseFloat(
        formatFixed((await client.totalSupply()).toString(), 9),
      )
      setName(name)
      setSymbol(symbol)
      setDecimals(decimals)
      setTotalSupply(totalSupply)
      setLoading(false)
    }
    if (
      contractHash !== NATIVE_HASH &&
      contractHash.length === NATIVE_HASH.length
    ) {
      try {
        fetchData()
      } catch (err: any) {
        setError(err.toString())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractHash, contractPackageHash, nodeAddress, chainName])

  const transferCallback = useCallback(
    async (
      sender: CLPublicKey,
      recipient: CLKeyParameters,
      amount: BigNumberish,
      paymentAmount: BigNumberish,
    ) => {
      if (loading) throw Error('Loading...')
      // I am not sure why should call setConractHash here twice
      await client.setContractHash(contractHash, contractPackageHash)
      const deployHash = await client.transfer(
        sender,
        recipient,
        amount,
        paymentAmount,
      )
      showDeployHash(deployHash)
      getDeploy(deployHash).then(() => toast.success('Transaction confirmed'))
      return deployHash
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractHash],
  )

  const balanceOf = useCallback(
    async (account: RecipientType) => {
      return await client.balanceOf(account)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractHash],
  )

  return {
    loading,
    error,
    name,
    symbol,
    decimals,
    totalSupply,
    transfer: transferCallback,
    approve: client.approve.bind(client),
    allowances: client.allowances.bind(client),
    balanceOf,
  }
}
