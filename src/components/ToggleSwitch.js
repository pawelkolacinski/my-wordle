import './ToggleSwitch.css'

export default function ToggleSwitch({onClickHandler}) {
  return (
    <label className="switch">
        <input type="checkbox" onClick={onClickHandler}/>
        <span className="slider round"></span>
    </label>
  )
}
