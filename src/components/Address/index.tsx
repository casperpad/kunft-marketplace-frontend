import React, { useEffect, useState } from 'react'
import { useTooltip } from '@kunftmarketplace/uikit'
import { CLPublicKey } from 'casper-js-sdk'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiCopy } from 'react-icons/fi'
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
  const [isOwner, setIsOwner] = useState(false)
  const { currentAccount } = useCasperWeb3Provider()

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1000)
  }, [copied])

  useEffect(() => {
    if (!currentAccount) {
      return setIsOwner(false)
    }
    setIsOwner(
      CLPublicKey.fromHex(currentAccount).toAccountHashStr().endsWith(address),
    )
  }, [currentAccount, address])

  const { targetRef: targetRefFineTuned, tooltip: tooltipFineTuned } =
    useTooltip(copied ? 'Copied' : 'Copy', {
      placement: 'top',
    })

  return (
    <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
      {variant === 'primary' ? (
        <StyledAddress ref={targetRefFineTuned} {...props}>
          {isOwner ? 'Me' : shortenHash(address)}
          {showTooltip && tooltipFineTuned}
        </StyledAddress>
      ) : (
        <StyledFlex alignItems="center" ref={targetRefFineTuned} {...props}>
          <Text mr="8px" fontSize="10px" color="input">
            {isOwner ? 'Me' : shortenHash(address)}
          </Text>
          <StyledIcon size={20} />
          {showTooltip && tooltipFineTuned}
        </StyledFlex>
      )}
    </CopyToClipboard>
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
