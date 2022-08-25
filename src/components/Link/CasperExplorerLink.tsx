import React from 'react'
import { CasperIcon } from '@kunftmarketplace/uikit'
import ExternalIconLink from './ExternalIconLink'

export default function CasperExplorerLink({ href }: { href: string }) {
  return (
    <ExternalIconLink
      icon={<CasperIcon width={32} height={32} />}
      href={href}
    />
  )
}
