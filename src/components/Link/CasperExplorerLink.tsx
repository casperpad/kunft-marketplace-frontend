import React from 'react'
import { useTooltip } from '@kunftmarketplace/uikit'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const CasperIcon = dynamic(
  () => import('@kunftmarketplace/uikit').then((mod) => mod.CasperIcon),
  {
    ssr: false,
  },
)

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
