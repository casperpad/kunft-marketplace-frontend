import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button, Input, Text } from '@/components'
import useCEP47 from '@/hooks/useCEP47'

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
      console.info(contractHash, contractPackageHash)
    },
  )

  return (
    <StyledContainer onSubmit={onSubmit}>
      <NextSeo nofollow noindex />
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
