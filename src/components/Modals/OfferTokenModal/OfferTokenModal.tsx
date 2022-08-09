import React from 'react'
import { Token } from '@/types'
import { Modal, InjectedModalProps } from '../Modal'
import Offer from './Offer'
// import _Modal from 'styled-react-modal'

// const Modal = _Modal.styled``

// const StyledModal = styled(Modal)`
//   position: relative;
//   background: ${({ theme }) => theme.colors.backgroundSecondary};
//   border-radius: 10px 10px 0px 0px;
//   margin: auto 10px;

//   min-width: 350px;
//   z-index: 20;

//   padding: 30px 47px 38px 48px;

//   ${({ theme }) => theme.mediaQueries.md} {
//     padding: 38px 57px 48px 64px;
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     padding: 44px 67px 56px 74px;
//   }

//   ${({ theme }) => theme.mediaQueries.xl2} {
//     padding: 44px 77px 56px 84px;
//   }
// `

interface OfferTokenModalProps extends InjectedModalProps {
  token: Token
}

export default function OfferTokenModal({
  token,
  ...props
}: OfferTokenModalProps) {
  return (
    <Modal title={`Offer ${token.name} Token`} {...props}>
      The smart contract will hold the offer amount until it is either accepted
      by the NFT owner or it expires.
      <Offer token={token} />
    </Modal>
  )
}
