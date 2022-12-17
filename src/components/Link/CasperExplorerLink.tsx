import React from 'react'
import { CasperIcon, useTooltip } from '@kunftmarketplace/uikit'
import styled from 'styled-components'

export default function CasperExplorerLink({ href }: { href: string }) {
  const { targetRef: targetRefFineTuned, tooltip } = useTooltip(
    'Show on explorer',
    {
      placement: 'top',
    },
  )
  return (
    <div ref={targetRefFineTuned}>
      <Link href={href} target="_none">
        <CasperIcon width={32} height={32} />
      </Link>
      {tooltip}
    </div>
  )
}

const Link = styled.a`
  width: 32px;
  height: 32px;
`
