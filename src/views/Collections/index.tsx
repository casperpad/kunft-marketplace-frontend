import { useState } from 'react'
import Collections from './Collections'

export default function CollectionsPage() {
  const [collections] = useState<string[]>([
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/eWX3j4ulh4LK8RXC2VSIyF1Lwd-dKZIymXBuGiKsEpY',
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/8-ybozau-7aLDlpkDw_NCB1rlDjbpQkM68x6dXP3PDU',
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/J2RB3OlMdBDvZcAnBqCtHYI8pfb5oTX8RcJ_OvJyzNU',
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/6ZblxHYuELA179gLjEZ9UIQI4piSkMvt9WEuXRLDa4g',
  ])

  return <Collections collections={collections} />
}
