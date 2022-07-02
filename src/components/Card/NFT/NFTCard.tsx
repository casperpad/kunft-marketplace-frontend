import React from 'react'

import { BigNumberish } from '@ethersproject/bignumber'
import Image from 'next/image'
import Link from 'next/link'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

import { NFTType } from 'types/nft.types'

interface NFTCardProps {
  image: string
  name: string
  price: BigNumberish
  stars: number
  userStarred: boolean
  type: NFTType
  onStarClick: () => void
  onClick?: () => void
}

export default function NFTCard({
  image,
  name,
  price,
  stars,
  userStarred,
  type,
  onStarClick,
  ...props
}: NFTCardProps) {
  return (
    <Link href="/component">
      <div className="group relative bg-white border hover:cursor-pointer hover:drop-shadow-xl hover:border-transparent border-black min-w-min font-Avenir font-light">
        <Image
          src={image}
          width={320}
          height={320}
          layout="responsive"
          alt={name}
          className="rounded-full group-hover:rounded-none"
        />
        <div className="flex items-center justify-between p-2 border-t  group-hover:border-transparent border-black">
          <div className="flex flex-col items-start">
            <div className="font-Castle text-3xl">{name}</div>
            <button
              type="button"
              className="flex items-center gap-1 text-orange-600 text-2xl group-hover:opacity-80 transition-opacity duration-500"
              onClick={onStarClick}
            >
              {userStarred ? (
                <BsHeartFill fill="#FA5F0C" />
              ) : (
                <BsHeart fill="#FA5F0C" />
              )}
              {stars}
            </button>
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
            type="button"
            className="absolute bottom-0 left-0 translate-y-full bg-orange-600 rounded-bl-md rounded-br-md w-full p-2 font-Castle text-lg group-hover:opacity-80 transition-opacity duration-500"
            onClick={props.onClick}
          >
            {type === 'Sale' ? 'BUY NOW' : 'MAKE OFFER'}
          </button>
        )}
      </div>
    </Link>
  )
}
