import { CSPR_EXPLORER_URL } from '@/config'

export const shortenHash = (hash: string) => {
  return `${hash.slice(0, 7)}...${hash.slice(-7)}`
}
export const openCsprExplorer = (value: string) => {
  window.open(`${CSPR_EXPLORER_URL}/search/${value}`, '_blank')?.focus()
}
