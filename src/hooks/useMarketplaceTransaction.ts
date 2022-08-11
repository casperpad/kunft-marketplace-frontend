import { useCallback } from 'react'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import {
  CLPublicKey,
  CLValueBuilder,
  decodeBase16,
  encodeBase16,
  CLKeyParameters,
} from 'casper-js-sdk'
import { toast } from 'react-toastify'

import {
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  contracts,
} from '@/config'
import { Token } from '@/types'
import { openCsprExplorer, shortenHash } from '@/utils/hash'
import { ERC20SignerClient } from '@/web3/client/erc20'
import { useCasperWeb3Provider } from '../providers/CasperWeb3Provider'
import useCEP47 from './useCEP47'
import useMarketplace from './useMarketplace'

export default function useMarketplaceTransaction(contractHash: string) {
  const { currentAccount, getDeploy, signDeploy } = useCasperWeb3Provider()
  const {
    acceptBuyOrder,
    buySellOrder,
    buySellOrderCspr,
    createBuyOrderCspr,
    createSellOrder,
  } = useMarketplace()
  const { approve, getAllowance } = useCEP47(contractHash)
  const erc20Client = new ERC20SignerClient(
    NEXT_PUBLIC_CASPER_NODE_ADDRESS,
    NEXT_PUBLIC_CASPER_CHAIN_NAME,
  )
  const marketplaceContractPackageHash = CLValueBuilder.byteArray(
    decodeBase16(
      contracts.marketplace[
        NEXT_PUBLIC_CASPER_CHAIN_NAME
      ].contractPackageHash.slice(5),
    ),
  )

  const sellToken = useCallback(
    async (id: string, price: BigNumberish, payToken?: string) => {
      if (currentAccount === undefined) return

      toast.info('Checking allownace')
      let shouldApprove = true
      try {
        const allowance = await getAllowance(
          CLPublicKey.fromHex(currentAccount),
          id,
        )

        const parsedAllowance = CLValueBuilder.byteArray(
          decodeBase16(allowance.slice(13)),
        )

        shouldApprove =
          encodeBase16(parsedAllowance.data) !==
          encodeBase16(marketplaceContractPackageHash.data)
        // eslint-disable-next-line no-empty
      } catch (error: any) {}

      // Approve if allowance is incorrect
      if (shouldApprove) {
        try {
          toast.info('Approve request submitted.')
          const approveDeploy = await approve(
            CLValueBuilder.byteArray(
              decodeBase16(
                contracts.marketplace[
                  NEXT_PUBLIC_CASPER_CHAIN_NAME
                ].contractPackageHash.slice(5),
              ),
            ),
            [id],
            '500000000',
            CLPublicKey.fromHex(currentAccount),
          )
          const signedApproveDeploy = await signDeploy(
            approveDeploy,
            currentAccount,
          )

          const arppoveDeployHash = await signedApproveDeploy.send(
            NEXT_PUBLIC_CASPER_NODE_ADDRESS,
          )

          const _ = await getDeploy(arppoveDeployHash)
        } catch (error: any) {
          console.error('Approve Error:', error)
        }
      } else {
        toast.info('Already approved')
      }
      try {
        const tokens = new Map<BigNumberish, BigNumberish>([[id, price]])
        toast.info('Sign sell request transaction')
        const deployHash = await createSellOrder(
          Date.now(),
          contractHash,
          tokens,
          currentAccount!,
          '1000000000',
          payToken,
        )

        const _ = await getDeploy(deployHash)
      } catch (error: any) {
        console.error('createSellOrder Error', error.message)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      contractHash,
      currentAccount,
      createSellOrder,
      getDeploy,
      getAllowance,
      approve,
      signDeploy,
    ],
  )

  const buyTokenCspr = useCallback(
    async (id: string, price: string) => {
      //
      try {
        if (currentAccount === undefined) return
        const deployHash = await buySellOrderCspr(
          contractHash,
          id,
          price,
          '8000000000',
          currentAccount,
        )
        toast.info(`Transaction created: ${shortenHash(deployHash)}`, {
          autoClose: false,
          onClick: () => openCsprExplorer(deployHash),
        })
        const _ = await getDeploy(deployHash)
        toast.success('Transaction confirmed')
      } catch (error: any) {
        toast.error('Transaction failed')
      }
    },
    [contractHash, currentAccount, buySellOrderCspr, getDeploy],
  )

  const buyTokenERC20 = useCallback(
    async (
      tokenId: string,
      erc20ContractHash: string,
      amount: BigNumberish,
    ) => {
      try {
        if (currentAccount === undefined) return

        toast.info('Checking allowance...')
        await erc20Client.setContractHash(`hash-${erc20ContractHash}`)
        // Check allowance
        const allowancesMote = await erc20Client.allowances(
          CLPublicKey.fromHex(currentAccount),
          marketplaceContractPackageHash,
        )
        // const decimals = await erc20Client.decimals()
        // const allowances = formatFixed(allowancesMote, decimals)
        // console.log(allowances)
        if (BigNumber.from(allowancesMote).lt(BigNumber.from(amount))) {
          // Approve
          const approveDeployHash = await erc20Client.approve(
            marketplaceContractPackageHash,
            amount,
            CLPublicKey.fromHex(currentAccount),
            '1000000000',
          )
          toast.info(
            `Approve Transaction created: ${shortenHash(approveDeployHash)}`,
            {
              autoClose: false,
              onClick: () => openCsprExplorer(approveDeployHash),
            },
          )
          const _ = await getDeploy(approveDeployHash)
          toast.success('Approved Successfully')
        }

        const deployHash = await buySellOrder(
          contractHash,
          tokenId,
          amount,
          CLPublicKey.fromHex(currentAccount),
          '5000000000',
        )
        toast.info(`Transaction created: ${shortenHash(deployHash)}`, {
          autoClose: false,
          onClick: () => openCsprExplorer(deployHash),
        })
        const _ = await getDeploy(deployHash)
        toast.success('Transaction confirmed')
      } catch (error: any) {
        console.error(error)
        toast.error('Transaction failed')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [buySellOrder, currentAccount, getDeploy, contractHash],
  )

  const buyToken = useCallback(
    async (token: Token) => {
      if (token.price!.payToken)
        await buyTokenERC20(token.id, token.price!.payToken, token.price!.price)
      else await buyTokenCspr(token.id, token.price!.price)
    },
    [buyTokenERC20, buyTokenCspr],
  )

  /**
   * Offer token by cspr desposit
   * @param id tokenId
   * @param amount offer amount
   */
  const offerToken = useCallback(
    async (id: string, amount: BigNumberish) => {
      try {
        // TODO Check token owner is not caller and marketplace
        if (!currentAccount) throw Error('')
        const deployHash = await createBuyOrderCspr(
          contractHash,
          id,
          amount,
          '1000000000',
          CLPublicKey.fromHex(currentAccount),
        )
        toast.info(`Transaction created: ${shortenHash(deployHash)}`, {
          onClick: () => openCsprExplorer(deployHash),
        })
        const _ = await getDeploy(deployHash)
        toast.success(`Transaction confirmed`)
      } catch (error: any) {
        toast.error(error.toString())
      }
    },
    [contractHash, createBuyOrderCspr, currentAccount, getDeploy],
  )

  const offerTokenERC20 = useCallback(() => {
    //
  }, [])

  const acceptOffer = useCallback(
    async (id: string, bidder: CLKeyParameters) => {
      if (!currentAccount) throw Error('')

      toast.info('Checking allownace')
      let shouldApprove = true
      try {
        const allowance = await getAllowance(
          CLPublicKey.fromHex(currentAccount),
          id,
        )

        const parsedAllowance = CLValueBuilder.byteArray(
          decodeBase16(allowance.slice(13)),
        )
        const marketplaceContractPackageHash = CLValueBuilder.byteArray(
          decodeBase16(
            contracts.marketplace[
              NEXT_PUBLIC_CASPER_CHAIN_NAME
            ].contractPackageHash.slice(5),
          ),
        )
        shouldApprove =
          encodeBase16(parsedAllowance.data) !==
          encodeBase16(marketplaceContractPackageHash.data)
        // eslint-disable-next-line no-empty
      } catch (error: any) {}

      // Approve if allowance is incorrect
      if (shouldApprove) {
        try {
          toast.info('Approve request submitted.')
          const approveDeploy = await approve(
            CLValueBuilder.byteArray(
              decodeBase16(
                contracts.marketplace[
                  NEXT_PUBLIC_CASPER_CHAIN_NAME
                ].contractPackageHash.slice(5),
              ),
            ),
            [id],
            '500000000',
            CLPublicKey.fromHex(currentAccount),
          )
          const signedApproveDeploy = await signDeploy(
            approveDeploy,
            currentAccount,
          )

          const arppoveDeployHash = await signedApproveDeploy.send(
            NEXT_PUBLIC_CASPER_NODE_ADDRESS,
          )

          toast.info(`Approve transaction created: ${arppoveDeployHash}`, {
            onClick: () => openCsprExplorer(arppoveDeployHash),
          })

          const _ = await getDeploy(arppoveDeployHash)
        } catch (error: any) {
          console.error('acceptBuyOrder Error', error)
          toast.error(error.message)
        }
      }

      try {
        const deployHash = await acceptBuyOrder(
          contractHash,
          id,
          bidder,
          '7000000000',
          CLPublicKey.fromHex(currentAccount),
        )
        toast.info(`Transaction created: ${deployHash}`, {
          autoClose: false,
          onClick: () => openCsprExplorer(deployHash),
        })
        const _ = await getDeploy(deployHash)
        toast.success(`Transaction confirmed`)
      } catch (error: any) {
        console.error('acceptBuyOrder Error', error)
        toast.error(error.message)
      }
    },
    [
      acceptBuyOrder,
      approve,
      contractHash,
      currentAccount,
      getAllowance,
      getDeploy,
      signDeploy,
    ],
  )

  return {
    acceptOffer,
    sellToken,
    buyToken,
    buyTokenERC20,
    offerToken,
  }
}
