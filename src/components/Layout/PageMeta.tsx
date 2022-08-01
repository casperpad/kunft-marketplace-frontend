import Head from 'next/head'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from '@/config/constants/meta'

const PageMeta: React.FC<{ symbol?: string }> = ({ symbol }) => {
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname)
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  let pageTitle = title
  if (symbol) {
    pageTitle = [symbol, title].join(' - ')
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default PageMeta
