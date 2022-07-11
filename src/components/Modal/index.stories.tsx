import React, { useState, useEffect } from 'react'

import Modal from './Profile'

export default {
  title: 'Components/Modal/Profile',
  component: Modal,
  argTypes: {},
}

export const ProfileModal: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setShow(!show)}>
        click
      </button>
      {show && <Modal setShow={setShow} />}
    </>
  )
}
