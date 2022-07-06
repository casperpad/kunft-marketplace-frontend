import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'The-Swappery & KUNFT',
  description: 'KUNFT Marketplace',
  image:
    'https://gateway.pinata.cloud/ipfs/QmahHrFUGaTRS53Dag6BQ68WRxnGVM7joCK8fDtsRB5QFB',
}

export const getCustomMeta = (path: string): PageMeta => {
  let basePath
  if (path.startsWith('/collection')) {
    basePath = '/collection'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: 'Home',
      }
    default:
      return {
        title: '',
      }
  }
}
