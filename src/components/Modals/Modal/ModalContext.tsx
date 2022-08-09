import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

import { Overlay } from '../../Overlay'

import { Handler } from './types'

interface ModalsContext {
  isOpen: boolean
  nodeId: string
  modalNode: React.ReactNode
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onPresent: (
    node: React.ReactNode,
    newNodeId: string,
    closeOverlayClick: boolean,
  ) => void
  onDismiss: Handler
}

export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: '',
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [nodeId, setNodeId] = useState('')
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    return () => window.removeEventListener('resize', setViewportHeight)
  }, [])

  const handlePresent = useCallback(
    (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => {
      setModalNode(node)
      setIsOpen(true)
      setNodeId(newNodeId)
      setCloseOnOverlayClick(closeOverlayClick)
    },
    [],
  )

  const handleDismiss = useCallback(() => {
    setModalNode(undefined)
    setIsOpen(false)
    setNodeId('')
    setCloseOnOverlayClick(true)
  }, [])

  const handleOverlayDismiss = useCallback(() => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }, [closeOnOverlayClick, handleDismiss])

  const value = useMemo(() => {
    return {
      isOpen,
      nodeId,
      modalNode,
      setModalNode,
      onPresent: handlePresent,
      onDismiss: handleDismiss,
    }
  }, [handleDismiss, handlePresent, isOpen, modalNode, nodeId])

  return (
    <Context.Provider value={value}>
      {isOpen ? (
        <>
          <Overlay onClick={handleOverlayDismiss} />
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              onDismiss: handleDismiss,
            })}
        </>
      ) : null}
      {children}
    </Context.Provider>
  )
}

export default ModalProvider
