import { NextSeo } from 'next-seo'

import dynamic from 'next/dynamic'
import { meta } from '@/config'
import { Token as IToken } from '@/types'

const TokenInfo = dynamic(() => import('./TokenInfo'), {
  ssr: false,
})

export default function Token({ token }: { token: IToken }) {
  return (
    <>
      <NextSeo
        title={token.name}
        openGraph={{
          url: `${meta.SITE_URL}/token/${token.collection.slug}/${token.id}`,
          title: token.name,
          description: token.collection.description,
          images: [
            {
              url:
                token.metadata.image ||
                token.metadata.logo ||
                token.collection.logo ||
                '',
              width: 800,
              height: 600,
              alt: token.name,
            },
          ],
          site_name: meta.SITE_NAME,
        }}
      />
      <TokenInfo token={token} />
    </>
  )
}
