import React from 'react'
import {CircleButton, Dialog} from './lib'
import VisuallyHidden from '@reach/visually-hidden'

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

const ModalContentsBase = props => {
  const [isOpen, setIsOpen] = useModalContext()
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

const ModalContents = ({children, title, ...props}) => {
  return (
    <ModalContentsBase {...props}>
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </ModalContentsBase>
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

export {
  Modal,
  ModalOpenButton,
  ModalDismissButton,
  ModalContents,
  ModalContentsBase,
}
