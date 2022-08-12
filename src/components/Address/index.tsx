import React, { useEffect, useMemo, useState } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiCopy } from 'react-icons/fi'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { useCasperWeb3Provider } from '@/hooks'
import { shortenHash } from '@/utils/hash'
import { Flex } from '../Box'
import { Text } from '../Text'

interface AddressProps {
  variant?: 'primary' | 'secondary'
  showTooltip?: boolean
  address: string
}

export default function Address({
  variant = 'primary',
  showTooltip = true,
  address,
  ...props
}: AddressProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tooltip, setTooltip] = useState(false)
  const { currentAccount } = useCasperWeb3Provider()
  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1000)
  }, [copied])

  useEffect(() => {
    setMounted(true)
  }, [])

  const isOwner = useMemo(() => {
    if (!currentAccount) return false
    if (
      CLPublicKey.fromHex(currentAccount).toAccountHashStr().endsWith(address)
    )
      return true
    return false
  }, [currentAccount, address])

  return (
    <>
      <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
        {variant === 'primary' ? (
          <StyledAddress
            data-tip
            data-for="react-tooltip"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => {
              setTooltip(false)
            }}
            {...props}
          >
            {isOwner ? 'Me' : shortenHash(address)}
          </StyledAddress>
        ) : (
          <StyledFlex
            data-tip
            data-for="react-tooltip"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => {
              setTooltip(false)
            }}
            flexDirection="row"
            alignItems="center"
          >
            <Text mr="8px" fontSize="10px" color="input">
              {shortenHash(address)}
            </Text>
            <StyledIcon size={20} />
          </StyledFlex>
        )}
      </CopyToClipboard>
      {mounted && showTooltip && tooltip && (
        <ReactTooltip
          id="react-tooltip"
          place="top"
          type="dark"
          effect="float"
          getContent={() => (copied ? 'Copied' : 'Copy')}
        />
      )}
    </>
  )
}

const StyledAddress = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`

const StyledIcon = styled(FiCopy)`
  color: ${({ theme }) => theme.colors.primary};
`

const StyledFlex = styled(Flex)`
  &:hover {
    cursor: pointer;
  }

  svg {
    opacity: 0;
  }
  &:hover {
    svg {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }
`
