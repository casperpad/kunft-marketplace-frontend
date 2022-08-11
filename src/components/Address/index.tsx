import React, { useEffect, useMemo, useState } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { useCasperWeb3Provider } from '@/hooks'
import { shortenHash } from '@/utils/hash'

export default function Address({ address, ...props }: { address: string }) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tooltip, showTooltip] = useState(false)
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
        <StyledAddress
          data-tip
          data-for="react-tooltip"
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false)
          }}
          {...props}
        >
          {isOwner ? 'Me' : shortenHash(address)}
        </StyledAddress>
      </CopyToClipboard>

      {mounted && tooltip && (
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
