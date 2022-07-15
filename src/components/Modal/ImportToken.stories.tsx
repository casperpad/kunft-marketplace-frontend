import React, { useState } from 'react'

import Modal from './ImportToken'

export default {
  title: 'Components/Modal/ImportToken',
  component: Modal,
  argTypes: {},
}

export const ImportTokenModal: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setShow(!show)}>
        click
      </button>
      <Modal setShow={setShow} show={show} />
    </>
  )
}
