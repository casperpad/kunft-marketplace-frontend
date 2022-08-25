import { toast } from 'react-toastify'
import { DeployToast } from '@/components'

export const showDeployHash = (deployHash: string) => {
  toast(<DeployToast deployHash={deployHash} />, {
    type: 'info',
    // autoClose: false,
    closeOnClick: false,
  })
}
