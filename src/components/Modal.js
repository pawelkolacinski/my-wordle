import { useEffect, useState } from 'react'
import './Modal.css'

export default function Modal({ children, onCloseHandler }) {
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === 'Escape') {
        onCloseHandler()
        setShowModal(false)
      }
    }
    document.querySelector('body').addEventListener('keydown', handleEscPress)

    return () => {
      document
        .querySelector('body')
        .removeEventListener('keydown', handleEscPress)
    }
  }, [onCloseHandler])

  return (
    showModal && (
      <div className="modal" onClick={onCloseHandler}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="modal-close" onClick={onCloseHandler}>
            &times;
          </span>
          <div className="modal-text">{children}</div>
        </div>
      </div>
    )
  )
}
