import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { shortenHash } from '@/utils/hash'

export default function Address({ address, ...props }: { address: string }) {
  const [copied, setCopied] = useState(false)

  const [tooltip, showTooltip] = useState(true)
  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1000)
  }, [copied])

  return (
    <>
      <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
        <StyledAddress
          data-tip="react-tooltip"
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false)
            setTimeout(() => showTooltip(true), 50)
          }}
          {...props}
        >
          {shortenHash(address)}
        </StyledAddress>
      </CopyToClipboard>
      {tooltip && (
        <ReactTooltip
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
