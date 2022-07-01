import { BigNumberish } from '@ethersproject/bignumber'
import React from 'react'
import { NFTType } from 'types/nft.types'
import Image from 'next/image'
import Link from 'next/link'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

interface NFTCardProps {
  image: string
  name: string
  price: BigNumberish
  stars: number
  userStarred: boolean
  type: NFTType
  onClick?: () => void
}

export default function NFTCard({
  image,
  name,
  price,
  stars,
  userStarred,
  type,
  ...props
}: NFTCardProps) {
  return (
    <Link href="/component">
      <div className="nftcard relative bg-white border hover:cursor-pointer hover:border-none border-black min-w-min font-Avenir font-light">
        <Image
          src={image}
          width={320}
          height={320}
          alt={name}
          className="rounded-full hover:rounded-none"
        />
        <div className="flex items-center justify-between p-2 border-t  hover:border-none border-black">
          <div className="flex flex-col items-start">
            <div className="font-Castle text-3xl">{name}</div>
            <div className="flex items-center gap-1 text-orange-600 text-2xl">
              {userStarred ? (
                <BsHeartFill fill="#FA5F0C" />
              ) : (
                <BsHeart fill="#FA5F0C" />
              )}
              {stars}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="text-3xl">Price</div>
            <div className="text-orange-600 text-2xl">
              {price.toLocaleString()}
            </div>
          </div>
        </div>
        {(type === 'NoneSale' || type === 'Sale') && (
          <button
            className="opacity-0 hover:opacity-100 transition-opacity delay-150 bg-orange-600 rounded-bl-sm rounded-br-sm w-full p-2 font-Castle text-lg"
            onClick={props.onClick}
          >
            {type === 'Sale' ? 'BUY NOW' : 'MAKE OFFER'}
          </button>
        )}
      </div>
    </Link>
  )
}
