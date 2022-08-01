import React from 'react'
import { CasperClient, DeployUtil } from 'casper-js-sdk'
import { NEXT_PUBLIC_CASPER_NODE_ADDRESS } from '@/config'
import { signDeploy } from '../web3/utils'

interface CasperWeb3ContextProps {
  detected: boolean
  connected: boolean
  currentAccount?: string
  casperClient: CasperClient
  connect: () => void
  disconnect: () => void
  getDeploy: (deployHash: string) => Promise<any>
  signDeploy: (
    deploy: DeployUtil.Deploy,
    publicKeyHex: string,
  ) => Promise<DeployUtil.Deploy>
}

const CasperWeb3Context = React.createContext<CasperWeb3ContextProps>({
  detected: false,
  connected: false,
  currentAccount: undefined,
  casperClient: new CasperClient(NEXT_PUBLIC_CASPER_NODE_ADDRESS),
  connect: () => {
    console.info(`Signer not detected`)
  },
  disconnect: () => {
    console.info(`Signer not detected`)
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getDeploy: async () => {},
  signDeploy,
})

export default CasperWeb3Context
