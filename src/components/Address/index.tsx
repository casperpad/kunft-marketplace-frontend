import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { shortenHash } from '@/utils/hash'

export default function Address({ address, ...props }: { address: string }) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tooltip, showTooltip] = useState(false)
  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1000)
  }, [copied])

  useEffect(() => {
    setMounted(true)
  }, [])

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
          {shortenHash(address)}
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

const StyledAddress = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`
