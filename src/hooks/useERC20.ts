import { useEffect, useState } from 'react'
import { BigNumber, BigNumberish, formatFixed } from '@ethersproject/bignumber'
import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
} from '@/config'
import { ERC20SignerClient } from '@/web3/client/erc20'

export default function useERC20({
  contractHash,
  contractPackageHash,
}: {
  contractHash: string
  contractPackageHash?: string
}) {
  const client = new ERC20SignerClient(
    NEXT_PUBLIC_CASPER_NODE_ADDRESS,
    NEXT_PUBLIC_CASPER_CHAIN_NAME,
  )

  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState<string | undefined>()
  const [decimals, setDecimals] = useState(0)
  const [totalSupply, setTotalSupply] = useState<BigNumberish>(0)

  const [loading, setLoading] = useState(false)

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
    if (contractHash.startsWith('hash-')) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractHash, contractPackageHash])

  return {
    loading,
    name,
    symbol,
    decimals,
    totalSupply,
    approve: client.approve.bind(client),
    allowances: client.allowances.bind(client),
    balanceOf: client.balanceOf.bind(client),
  }
}
