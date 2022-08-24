import React, { useState } from 'react'
import {
  Modal,
  InjectedModalProps,
  Text,
  Button,
  Box,
  Flex,
  ProfileAvatar,
} from '@kunftmarketplace/uikit'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { ModalInput } from '@/components/Input'
import { User } from '@/types'

export type SubmitProps = {
  name: string
  avatar?: string
  description?: string
  email: string
}

interface ProfileProps extends InjectedModalProps {
  onSave: (user: SubmitProps) => Promise<void>
  user: User
}

export default function ProfileSettings({
  onSave,
  user,
  ...props
}: ProfileProps) {
  const profileAvatar = user.avatar || '/images/Avatar/Default.svg'
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [avatar, setAvatar] = useState(user.avatar)
  const [description, setDescription] = useState(user.description || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>()

  const onSubmit = handleSubmit(async () => {
    const newUser: SubmitProps = {
      name: name!,
      email: email!,
      avatar,
      description,
    }
    await onSave(newUser)
    // eslint-disable-next-line no-unused-expressions
    props.onDismiss && props.onDismiss()
  })

  return (
    <Modal title="Profile Settings" {...props}>
      <form>
        <Flex
          flexDirection="row"
          alignItems="center"
          mb="9px"
          gap={16}
          justifyContent="space-between"
          width={300}
        >
          <ProfileAvatar src={profileAvatar} alt="" width={100} height={100} />
          <Flex flexDirection="column">
            <InputContainer>
              <Text fontSize="15px">USERNAME</Text>
              <ModalInput
                placeholder="Input Username"
                value={name}
                {...register('name', { required: true })}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <StyledError>This field is required</StyledError>}
            </InputContainer>
            <InputContainer>
              <Text fontSize="15px">WALLET ADDRESS</Text>
              <ModalInput
                placeholder="Wallet Address"
                readOnly
                backgroundColor="inputSecondary"
                value={user.publicKey}
              />
            </InputContainer>
          </Flex>
        </Flex>

        <InputContainer>
          <Text fontSize="15px">EMAIL ADDRESS</Text>
          <ModalInput
            placeholder="Input Email Address"
            type="email"
            value={email}
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <StyledError>
              {errors.email.message || 'This field is required'}
            </StyledError>
          )}
        </InputContainer>
        <InputContainer>
          <Flex flexDirection="row" alignItems="end">
            <Text fontSize="15px">DISPLAY PICTURE NFT</Text>
            <Text fontSize="8px">Optional</Text>
          </Flex>
          <ModalInput
            placeholder="Input NFT URL"
            value={avatar}
            {...register('avatar')}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Flex flexDirection="row" alignItems="end">
            <Text fontSize="15px">PROFILE BIO</Text>
            <Text fontSize="8px">Optional</Text>
          </Flex>
          <ModalInput
            placeholder="Tell the world something about yourself"
            value={description}
            {...register('description')}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
        <SaveButton type="submit" onClick={onSubmit}>
          SAVE
        </SaveButton>
      </form>
    </Modal>
  )
}

const StyledError = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 10px;
`

const InputContainer = styled(Box)`
  margin-top: 12px;
  font-family: 'Avenir';
`

const SaveButton = styled(Button).attrs({
  width: '100%',
  py: '16px',
})`
  margin-top: 16px;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`
