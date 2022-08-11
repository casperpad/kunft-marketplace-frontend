import { BigNumberish } from '@ethersproject/bignumber'
import { types } from 'casper-js-client-helper'
import {
  CLValue,
  CLPublicKey,
  CLMap,
  RuntimeArgs,
  CasperClient,
  Contracts,
  Keys,
  CLKeyParameters,
  CLValueBuilder,
  CLValueParsers,
  CLTypeTag,
  CLStringType,
  CLKeyType,
  encodeBase16,
  CLU32Type,
  CLU256Type,
  CLKey,
} from 'casper-js-sdk'
import { Some, None } from 'ts-results'
import { isValidHash, signDeploy } from '../utils'

const { Contract } = Contracts
type RecipientType = types.RecipientType

export interface MarketplaceInstallArgs {
  feeWallet: RecipientType
  acceptableTokens: Map<string, number>
  contractName: string
}

export enum MarketplaceEvents {
  SellOrderCreated = 'SellOrderCreated',
  SellOrderCanceled = 'SellOrderCanceled',
  SellOrderBought = 'SellOrderBought',
  BuyOrderCreated = 'BuyOrderCreated',
  BuyOrderCanceled = 'BuyOrderCanceled',
  BuyOrderAccepted = 'BuyOrderAccepted',
}

export const MarketplaceEventParser = (
  {
    contractPackageHash,
    eventNames,
  }: { contractPackageHash: string; eventNames: string[] },
  value: any,
) => {
  if (value.body.DeployProcessed.execution_result.Success) {
    const { transforms } =
      value.body.DeployProcessed.execution_result.Success.effect

    const cep47Events = transforms.reduce((acc: any, val: any) => {
      if (
        // eslint-disable-next-line no-prototype-builtins
        val.transform.hasOwnProperty('WriteCLValue') &&
        typeof val.transform.WriteCLValue.parsed === 'object' &&
        val.transform.WriteCLValue.parsed !== null
      ) {
        const maybeCLValue = CLValueParsers.fromJSON(val.transform.WriteCLValue)
        const clValue = maybeCLValue.unwrap()
        if (clValue && clValue.clType().tag === CLTypeTag.Map) {
          const hash = (clValue as CLMap<CLValue, CLValue>).get(
            CLValueBuilder.string('contract_package_hash'),
          )
          const preferContractPackageHash = contractPackageHash.startsWith(
            'hash-',
          )
            ? contractPackageHash.slice(5).toLowerCase()
            : contractPackageHash.toLowerCase()
          const event = (clValue as CLMap<CLValue, CLValue>).get(
            CLValueBuilder.string('event_type'),
          )
          if (
            hash &&
            // NOTE: Calling toLowerCase() because current JS-SDK doesn't support checksumed hashes and returns all lower case value
            // Remove it after updating SDK
            hash.value() === preferContractPackageHash &&
            event &&
            eventNames.includes(event.value())
          ) {
            acc = [...acc, { name: event.value(), clValue }]
          }
        }
      }
      return acc
    }, [])

    return { error: null, success: !!cep47Events.length, data: cep47Events }
  }

  return null
}

export class MarketplaceClient {
  casperClient: CasperClient

  contractClient: Contracts.Contract

  chainName: string

  constructor(_nodeAddress: string, _chainName: string) {
    this.casperClient = new CasperClient(_nodeAddress)
    this.contractClient = new Contract(this.casperClient)
    this.chainName = _chainName
  }

  public install(
    wasm: Uint8Array,
    args: MarketplaceInstallArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[],
  ) {
    const acceptableTokens = new CLMap([new CLStringType(), new CLU32Type()])
    Array.from(args.acceptableTokens.entries()).forEach((entry) => {
      acceptableTokens.set(
        CLValueBuilder.string(entry[0]),
        CLValueBuilder.u32(entry[1]),
      )
    })
    const runtimeArgs = RuntimeArgs.fromMap({
      fee_wallet: new CLKey(args.feeWallet),
      acceptableTokens,
      contract_name: CLValueBuilder.string(args.contractName),
    })
    return this.contractClient.install(
      wasm,
      runtimeArgs,
      paymentAmount,
      deploySender,
      this.chainName,
      keys || [],
    )
  }

  public setContractHash(contractHash: string, contractPackageHash?: string) {
    this.contractClient.setContractHash(contractHash, contractPackageHash)
  }

  public async createSellOrder(
    startTime: number,
    collection: string,
    tokens: Map<BigNumberish, BigNumberish>,
    publicKeyHex: string,
    paymentAmount: string,
    payToken?: string,
  ) {
    const tokensMap = new CLMap([new CLU256Type(), new CLU256Type()])
    Array.from(tokens.entries()).forEach((token) => {
      tokensMap.set(
        CLValueBuilder.u256(token[0]),
        CLValueBuilder.u256(token[1]),
      )
    })

    const formatedCollection = `contract-${collection}`

    const runtimeArgs = RuntimeArgs.fromMap({
      start_time: CLValueBuilder.u64(startTime),
      collection: CLValueBuilder.string(formatedCollection),
      tokens: tokensMap,
      pay_token: payToken
        ? CLValueBuilder.option(
            Some(CLValueBuilder.string(`contract-${payToken.slice(5)}`)),
          )
        : CLValueBuilder.option(None, new CLStringType()),
    })

    const deploy = this.contractClient.callEntrypoint(
      'create_sell_order',
      runtimeArgs,
      CLPublicKey.fromHex(publicKeyHex),
      this.chainName,
      paymentAmount,
    )
    const signedDeploy = await signDeploy(deploy, publicKeyHex)
    const deployHash = await this.casperClient.putDeploy(signedDeploy)
    return deployHash
  }

  public cancelSellOrder(
    collection: string,
    tokenIds: BigNumberish[],
    key: Keys.AsymmetricKey,
    paymentAmount: string,
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      collection: CLValueBuilder.string(collection),
      token_ids: CLValueBuilder.list(
        tokenIds.map((tokenId) => CLValueBuilder.u256(tokenId)),
      ),
    })
    return this.contractClient.callEntrypoint(
      'cancel_sell_order',
      runtimeArgs,
      key.publicKey,
      this.chainName,
      paymentAmount,
      [key],
    )
  }

  public async buySellOrder(
    collection: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    sender: CLPublicKey,
    paymentAmount: string,
    additionalRecipient?: CLKeyParameters,
    signingKeys?: Keys.AsymmetricKey[],
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      collection: CLValueBuilder.string(`contract-${collection}`),
      token_id: CLValueBuilder.u256(tokenId),
      amount: CLValueBuilder.u256(amount),
      additional_recipient: additionalRecipient
        ? CLValueBuilder.option(Some(additionalRecipient))
        : CLValueBuilder.option(None, new CLKeyType()),
    })
    const deploy = this.contractClient.callEntrypoint(
      'buy_sell_order',
      runtimeArgs,
      sender,
      this.chainName,
      paymentAmount,
      signingKeys,
    )
    const signedDeploy = await signDeploy(deploy, sender.toHex())
    const deployHash = await this.casperClient.putDeploy(signedDeploy)
    return deployHash
  }

  public async buySellOrderCspr(
    collection: string,
    tokenId: string,
    amount: string,
    paymentAmount: string,
    publicKeyHex: string,
    additionalRecipient?: CLKeyParameters,
  ) {
    //
    if (this.contractClient.contractHash === undefined) {
      throw Error('Invalid Marketplace contract hash')
    }
    const preBuySellOrder = new Contract(this.casperClient)

    const runtimeArgs = RuntimeArgs.fromMap({
      marketplace_contract: CLValueBuilder.string(
        `contract-${this.contractClient.contractHash.slice(5)}`,
      ),
      entrypoint: CLValueBuilder.string('buy_sell_order_cspr'),
      collection: CLValueBuilder.string(`contract-${collection}`),
      token_id: CLValueBuilder.u256(tokenId),
      amount: CLValueBuilder.u512(amount),
      additional_recipient: additionalRecipient
        ? CLValueBuilder.option(Some(additionalRecipient))
        : CLValueBuilder.option(None, new CLKeyType()),
    })

    const file = await fetch('/pre_buy_sell_order_cspr.wasm')
    const bytes = await file.arrayBuffer()
    const contractContent = new Uint8Array(bytes)

    const deploy = preBuySellOrder.install(
      contractContent,
      runtimeArgs,
      paymentAmount,
      CLPublicKey.fromHex(publicKeyHex),
      this.chainName,
    )
    const signedDeploy = await signDeploy(deploy, publicKeyHex)
    const deployHash = await this.casperClient.putDeploy(signedDeploy)
    return deployHash
  }

  public async createBuyOrderCspr(
    collection: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    paymentAmount: string,
    sender: CLPublicKey,
    additionalRecipient?: CLKeyParameters,
    signingKeys?: Keys.AsymmetricKey[],
  ) {
    if (this.contractClient.contractHash === undefined) {
      throw Error('Invalid Marketplace contract hash')
    }
    if (!isValidHash(collection)) {
      throw Error('Invalid contractHash')
    }
    const preCreateBuyOrderCspr = new Contract(this.casperClient)
    const runtimeArgs = RuntimeArgs.fromMap({
      marketplace_contract: CLValueBuilder.string(
        `contract-${this.contractClient.contractHash.slice(5)}`,
      ),
      entrypoint: CLValueBuilder.string('create_buy_order_cspr'),
      collection: CLValueBuilder.string(`contract-${collection}`),
      token_id: CLValueBuilder.u256(tokenId),
      amount: CLValueBuilder.u512(amount),
      additional_recipient: additionalRecipient
        ? CLValueBuilder.option(Some(additionalRecipient))
        : CLValueBuilder.option(None, new CLKeyType()),
    })

    const file = await fetch('/pre_order_cspr.wasm')
    const bytes = await file.arrayBuffer()
    const contractContent = new Uint8Array(bytes)

    const deploy = preCreateBuyOrderCspr.install(
      contractContent,
      runtimeArgs,
      paymentAmount,
      sender,
      this.chainName,
      signingKeys,
    )

    const signedDeploy = await signDeploy(deploy, sender.toHex())
    const deployHash = await this.casperClient.putDeploy(signedDeploy)
    return deployHash
  }

  public async createBuyOrder(
    collection: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    payToken: string,
    sender: CLPublicKey,
    paymentAmount: string,
    additionalRecipient?: CLKeyParameters,
    signingKeys?: Keys.AsymmetricKey[],
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      collection: CLValueBuilder.string(collection),
      token_id: CLValueBuilder.u256(tokenId),
      amount: CLValueBuilder.u256(amount),
      pay_token: CLValueBuilder.string(`contract-${payToken}`),
      additional_recipient: additionalRecipient
        ? CLValueBuilder.option(Some(additionalRecipient))
        : CLValueBuilder.option(None, new CLKeyType()),
    })
    const deploy = this.contractClient.callEntrypoint(
      'create_buy_order',
      runtimeArgs,
      sender,
      this.chainName,
      paymentAmount,
      signingKeys,
    )
    const signedDeploy = await signDeploy(deploy, sender.toHex())
    const deployHash = await this.casperClient.putDeploy(signedDeploy)
    return deployHash
  }

  public async acceptBuyOrder(
    collection: string,
    tokenId: string,
    bidder: CLKeyParameters,
    paymentAmount: string,
    sender: CLPublicKey,
    signingKeys?: Keys.AsymmetricKey[],
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      collection: CLValueBuilder.string(`contract-${collection}`),
      token_id: CLValueBuilder.u256(tokenId),
      bidder: new CLKey(bidder),
    })

    const deploy = this.contractClient.callEntrypoint(
      'accept_buy_order',
      runtimeArgs,
      sender,
      this.chainName,
      paymentAmount,
      signingKeys,
    )
    const signedDeploy = await signDeploy(deploy, sender.toHex())
    const deployHash = await this.casperClient.putDeploy(signedDeploy)
    return deployHash
  }

  public async feeWallet() {
    const result = (await this.contractClient.queryContractData([
      'fee_wallet',
    ])) as CLValue
    return encodeBase16(result.value())
  }
}
