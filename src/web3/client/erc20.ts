import { BigNumber, BigNumberish, parseFixed } from '@ethersproject/bignumber'
import { ERC20Client } from 'casper-erc20-js-client'
import {
  RuntimeArgs,
  CLValueBuilder,
  CLPublicKey,
  Contracts,
  CasperClient,
  CLKeyParameters,
  CLKey,
  CLAccountHash,
  CLByteArray,
} from 'casper-js-sdk'
import { signDeploy } from '../utils'

const { Contract } = Contracts

type RecipientType = CLAccountHash | CLPublicKey | CLByteArray

export class ERC20SignerClient extends Contract {
  client: ERC20Client

  chainName: string

  constructor(_nodeAddress: string, _chainName: string) {
    const casperClient = new CasperClient(_nodeAddress)
    super(casperClient)
    this.client = new ERC20Client(_nodeAddress, _chainName)
    this.chainName = _chainName
  }

  async setContractHash(contractHash: string, contractPackageHash?: string) {
    super.setContractHash(contractHash, contractPackageHash)
    await this.client.setContractHash(contractHash.slice(5))
  }

  async name() {
    return await this.client.name()
  }

  async symbol() {
    return await this.client.symbol()
  }

  async totalSupply() {
    return await this.client.totalSupply()
  }

  async decimals() {
    return await this.client.decimals()
  }

  async balanceOf(account: RecipientType) {
    let balance
    // if (!this.client.contractHash) throw Error('Invalid Conract Hash')
    try {
      balance = await this.client.balanceOf(account)
      balance = parseFixed(balance)
    } catch (err) {
      // exception when no tokens in user account
      balance = BigNumber.from(0)
    }
    return balance
  }

  async approve(
    spender: CLKeyParameters,
    amount: BigNumberish,
    sender: CLPublicKey,
    paymentAmount: BigNumberish,
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      spender: new CLKey(spender),
      amount: CLValueBuilder.u256(amount),
    })

    const deploy = this.callEntrypoint(
      'approve',
      runtimeArgs,
      sender,
      this.chainName,
      paymentAmount.toString(),
    )

    const signedDeploy = await signDeploy(deploy, sender.toHex())

    const deployHash = await this.casperClient!.putDeploy(signedDeploy)
    return deployHash
  }

  async allowances(owner: RecipientType, spender: RecipientType) {
    try {
      if (!this.client.contractHash) throw Error('Invalid Conract Hash')
      const allowances = await this.client.allowances(owner, spender)
      return allowances
    } catch (err: any) {
      return 0
    }
  }
}
