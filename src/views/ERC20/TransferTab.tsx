import React, { useState, useEffect } from 'react'
import { BigNumberish, formatFixed, parseFixed } from '@ethersproject/bignumber'
import { Input, InputGroup, Text } from '@kunftmarketplace/uikit'
import { CLKeyParameters, CLPublicKey } from 'casper-js-sdk'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { TransactionButton } from '@/components'
import { useCasperWeb3Provider } from '@/hooks'
import { RecipientType } from '@/web3/client/erc20'

interface SubmitProps {
  recipient: string
  amount: string
}

interface TransferTabProps {
  transfer: (
    sender: CLPublicKey,
    recipient: CLKeyParameters,
    amount: BigNumberish,
    paymentAmount: BigNumberish,
  ) => Promise<string>
  balanceOf: (account: RecipientType) => Promise<any>
  decimals: number
}

export default function TransferTab({
  transfer,
  balanceOf,
  decimals,
}: TransferTabProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SubmitProps>({ reValidateMode: 'onChange' })
  const [balance, setBalance] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const { currentAccount } = useCasperWeb3Provider()

  const handleTransfer = handleSubmit(async () => {
    if (currentAccount === undefined) return
    const args = getValues()
    transfer(
      CLPublicKey.fromHex(currentAccount),
      CLPublicKey.fromHex(args.recipient),
      parseFixed(args.amount, decimals),
      '1000000000',
    )
  })

  useEffect(() => {
    async function fetchBalance() {
      if (currentAccount === undefined) return
      setLoading(true)
      const balance = await balanceOf(CLPublicKey.fromHex(currentAccount))
      setLoading(false)
      setBalance(formatFixed(balance, decimals))
    }
    fetchBalance()
  }, [currentAccount, balanceOf, decimals])

  return (
    <StyledForm onSubmit={handleTransfer}>
      <InputGroup error={errors.recipient?.message}>
        <Input
          scale="lg"
          type="text"
          placeholder="Recipient"
          {...register('recipient', {
            required: { value: true, message: 'This field is required' },
            // validate: (value) => {
            //   if (!isValidHash(value)) return 'Invalid hash'
            // },
          })}
        />
      </InputGroup>
      <InputGroup error={errors.amount?.message}>
        <Input
          scale="lg"
          type="text"
          placeholder="Amount"
          {...register('amount', { required: true })}
        />
      </InputGroup>
      {loading ? <Skeleton /> : <Text>{balance.toString()}</Text>}
      <TransactionButton onClick={handleTransfer} title="Transfer" />
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
