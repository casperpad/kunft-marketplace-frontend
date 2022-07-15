import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Text } from '@components/Text'
import useCEP47 from '@hooks/useCEP47'

const StyledContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
`

interface SubmitProps {
  contractPackageHash: string
  contractHash: string
}

export default function AddCollection() {
  const [contractPackageHash, setContractPackageHash] = useState<
    string | undefined
  >()
  const [contractHash, setContractHash] = useState<string | undefined>()
  const { loading, name, symbol, totalSupply } = useCEP47(
    contractHash,
    contractPackageHash,
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>()

  const onSubmit = handleSubmit(
    async ({ contractHash, contractPackageHash }) => {
      console.log(contractHash, contractPackageHash)
    },
  )

  return (
    <StyledContainer onSubmit={onSubmit}>
      <Input
        {...register('contractPackageHash')}
        value={contractPackageHash}
        onChange={(e) => setContractPackageHash(e.target.value)}
      />

      <Input
        {...register('contractHash', { required: true })}
        value={contractHash}
        onChange={(e) => setContractHash(e.target.value)}
      />
      {errors.contractHash && <span>This field is required</span>}
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <Text>{name}</Text>
          <Text>{symbol}</Text>
          <Text>{totalSupply.toString()}</Text>
        </>
      )}

      <Button type="submit" onClick={onSubmit}>
        Add Collection
      </Button>
    </StyledContainer>
  )
}
