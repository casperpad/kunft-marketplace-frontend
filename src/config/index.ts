/* eslint-disable prefer-destructuring */
const NEXT_PUBLIC_CASPER_NODE_ADDRESS =
  process.env.NEXT_PUBLIC_CASPER_NODE_ADDRESS!
const NEXT_PUBLIC_CASPER_EVENT_STREAM_ADDRESS =
  process.env.NEXT_PUBLIC_CASPER_EVENT_STREAM_ADDRESS!

type CasperChainName = 'casper' | 'casper-test'

const NEXT_PUBLIC_CASPER_CHAIN_NAME = process.env
  .NEXT_PUBLIC_CASPER_CHAIN_NAME! as CasperChainName

const CSPR_EXPLORER_URL =
  NEXT_PUBLIC_CASPER_CHAIN_NAME === 'casper'
    ? 'https://cspr.live'
    : 'https://testnet.cspr.live'

export const FAST_INTERVAL = 10000
export const SLOW_INTERVAL = 60000

export { default as contracts } from './contracts'
export * from './acceptableTokens'
export * as meta from './meta'

export {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
  NEXT_PUBLIC_CASPER_EVENT_STREAM_ADDRESS,
  CSPR_EXPLORER_URL,
}
