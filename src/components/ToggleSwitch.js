import './ToggleSwitch.css'

export default function ToggleSwitch({ onClickHandler }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        onClick={onClickHandler}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClickHandler()
            e.target.checked = !e.target.checked
          }
        }}
        tabIndex="1"
      />
      <span className="slider round"></span>
    </label>
  )
}
