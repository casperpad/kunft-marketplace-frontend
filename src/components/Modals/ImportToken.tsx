import React, { useState } from 'react'
import { Modal, InjectedModalProps } from '@kunftmarketplace/uikit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { Box } from '@/components/Box'
import { CardButton } from '@/components/Button'
import { ModalInput } from '@/components/Input'
import { Text } from '@/components/Text'
import { isValidHash } from '../../web3/utils'

const InputContainer = styled(Box)`
  margin-top: 12px;
  font-family: 'Avenir';
`

const SaveButton = styled(CardButton)`
  position: absolute;
  width: 100%;
  bottom: 0px;
  left: 0px;
  transform: translateY(100%);
`

interface ImportTokenProps extends InjectedModalProps {
  onImport: any
}

interface SubmitProps {
  contractPackageHash: string
  contractHash: string
  tokenId: string
}

export default function ImportToken({ onImport, ...props }: ImportTokenProps) {
  const [contractHash, setContractHash] = useState<string | undefined>()
  const [tokenId, setTokenId] = useState<string | undefined>()
  const [loading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>()

  const onSubmit = handleSubmit(() => {
    if (isValidHash(contractHash!)) onImport(contractHash, tokenId)
    else toast.error('Invalid hash')
  })

  return (
    <Modal title="Import token" {...props}>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Text fontSize="15px" color="background">
            CONTRACT HASH
          </Text>
          <ModalInput
            {...register('contractHash', { required: true })}
            placeholder="Input Contract Hash"
            backgroundColor="inputSecondary"
            value={contractHash || ''}
            onChange={(e) => setContractHash(e.target.value)}
          />
          {errors.contractHash && <span>This field is required</span>}
        </InputContainer>
        <InputContainer>
          <Text fontSize="15px" color="background">
            TOKEN ID
          </Text>
          <ModalInput
            {...register('tokenId', { required: true })}
            placeholder="Input Token ID"
            value={tokenId || ''}
            onChange={(e) => setTokenId(e.target.value)}
          />
          {errors.tokenId && <span>This field is required</span>}
        </InputContainer>
        <SaveButton
          type="submit"
          text="IMPORT"
          onClick={onSubmit}
          disabled={loading}
        />
      </form>
    </Modal>
  )
}
