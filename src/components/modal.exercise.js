import React from 'react'
import {Dialog} from './lib'

const Modal = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  )
}

const ModalDismissButton = ({children: child}) => {
  const [, setIsOpen] = useModalContext()
  return React.cloneElement(child, {
    onClick: () => setIsOpen(false),
  })
}

const ModalOpenButton = ({children: child}) => {
  const [, setIsOpen] = useModalContext()
  return React.cloneElement(child, {
    onClick: () => setIsOpen(true),
  })
}

const ModalContents = props => {
  const [isOpen, setIsOpen] = useModalContext()
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

const ModalContext = React.createContext()
ModalContext.displayName = 'ModalContext'
function useModalContext() {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error(
      'ModalDismissButton has to be a descendent of the Modal component',
    )
  }
  return context
}

export {Modal, ModalOpenButton, ModalDismissButton, ModalContents}
