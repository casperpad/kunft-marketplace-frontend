/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CLMap,
  CLString,
  CLValueBuilder,
  EventName,
  EventStream,
} from 'casper-js-sdk'
import {
  NEXT_PUBLIC_CASPER_EVENT_STREAM_ADDRESS,
  MARKET_PLACE_CONTRACT_PACKAGE_HASH,
} from '../../config'
import { Sale } from '../../models/sale.model'
import { MarketplaceEventParser, MarketplaceEvents } from '../marketplace'

// const privateKey = Keys.Ed25519.parsePrivateKeyFile(
//   `${MASTER_KEY_PAIR_PATH}/secret_key.pem`,
// )
// const publicKey = Keys.Ed25519.privateToPublicKey(privateKey)

// const KEYS = Keys.Ed25519.parseKeyPair(publicKey, privateKey)

export const startMarketplaceEventStream = async () => {
  console.info(`Starting Marketplace event listener`)
  const es = new EventStream(NEXT_PUBLIC_CASPER_EVENT_STREAM_ADDRESS!)
  const contractPackageHash = MARKET_PLACE_CONTRACT_PACKAGE_HASH!

  es.subscribe(EventName.DeployProcessed, async (events) => {
    const parsedEvents = MarketplaceEventParser(
      {
        contractPackageHash: contractPackageHash.slice(5),
        eventNames: [MarketplaceEvents.SellOrderCreated],
      },
      events,
    )
    if (parsedEvents && parsedEvents.success) {
      console.info('***  MARKETPLACE EVENT  ***')

      const promises = parsedEvents.data.map(async (event: any) => {
        const eventName = event.name as MarketplaceEvents
        const eventParams: CLMap<CLString, CLString> = event.clValue
        console.info(`Handling ${eventName} event`)
        const creator = eventParams.get(CLValueBuilder.string('creator'))
        const collection = eventParams.get(CLValueBuilder.string('collection'))
        const tokenId = eventParams.get(CLValueBuilder.string('token_id'))
        const payToken = eventParams.get(CLValueBuilder.string('pay_token'))
        const price = eventParams.get(CLValueBuilder.string('price'))
        const startTime = eventParams.get(CLValueBuilder.string('start_time'))
        const buyer = eventParams.get(CLValueBuilder.string('buyer'))
        const additionalRecipient = eventParams.get(
          CLValueBuilder.string('additional_recipient'),
        )
        switch (eventName) {
          case MarketplaceEvents.SellOrderCreated: {
            const order = await Sale.findOne({
              creator: creator!.value(),
              contractHash: collection!.value(),
              tokenId: tokenId!.value(),
            })
            if (order) break
            const sellOrder = new Sale({
              creator: creator!.value(),
              contractHash: collection!.value(),
              tokenId: tokenId!.value(),
              payToken:
                payToken!.value() === 'None' ? undefined : payToken!.value(),
              price: price!.value(),
              startTime: startTime!.value(),
              status: 'pending',
            })
            await sellOrder.save()
            break
          }
          case MarketplaceEvents.SellOrderCanceled:
            await Sale.findOneAndUpdate(
              {
                creator: creator!.value(),
                contractHash: collection!.value(),
                tokenId: tokenId!.value(),
              },
              { status: 'canceled' },
            )
            break
          case MarketplaceEvents.SellOrderBought:
            await Sale.findOneAndUpdate(
              {
                creator: creator!.value(),
                contractHash: collection!.value(),
                tokenId: tokenId!.value(),
              },
              {
                buyer: buyer!.value(),
                additionalRecipient: additionalRecipient!.value(),
                status: 'succed',
              },
            )
            break
          default:
            console.error(`Unhandled event: ${eventName}`)
        }
      })
      await Promise.all(promises)
      console.info('***     ***')
    }
  })
  es.start(0)
}
