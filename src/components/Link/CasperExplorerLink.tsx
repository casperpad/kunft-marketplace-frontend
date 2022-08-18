import React from 'react'
import Image from 'next/image'
import { Casper } from '../Svg/Casper'
import ExternalIconLink from './ExternalIconLink'

export default function CasperExplorerLink({ href }: { href: string }) {
  return (
    <ExternalIconLink
      icon={<Image src="/images/cspr-logo.svg" width={32} height={32} />}
      // icon={<Casper />}
      href={href}
    />
  )
}
