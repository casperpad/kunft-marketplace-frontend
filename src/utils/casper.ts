import { CSPR_EXPLORER_URL } from '@/config'

type OpenType = 'deploy' | 'contract' | 'account'

export const openCsprExplorer = (value: string, openType?: OpenType) => {
  window
    .open(`${CSPR_EXPLORER_URL}/${openType || 'deploy'}/${value}`, '_blank')
    ?.focus()
}
