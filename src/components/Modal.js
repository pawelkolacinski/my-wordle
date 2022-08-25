import './Modal.css'

export default function Modal({ children, onCloseHandler }) {
  return (
    <div className="modal" onClick={onCloseHandler}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onCloseHandler}>
          &times;
        </span>
        <div className="modal-text">{children}</div>
      </div>
    </div>
  )
}
