import { useEffect } from "react"
import KeyboardKeysData from "./KeyboardKeysData"
import './Keyboard.css'


export default function Keyboard({onKeyPressed=()=>{}, keyClasses={}}) {

    useEffect(()=> {
        document.addEventListener('keyup', event => {
            const keyPressed = event.key
            onKeyPressed({key:keyPressed})
            
        })

        document.querySelector('.keyboard').addEventListener("click", event => {
          event.stopPropagation()
          
          const keyPressed = event.target.dataset.key
          if(keyPressed) onKeyPressed({key:keyPressed})
        })


    },[])

  return (
    <div className="keyboard">
      {KeyboardKeysData.rows.map((row,i) => (
        <div className="keyboard-row"  key={i}>
          {row.map(key => (
            <button className={`keyboard-key ${keyClasses[key] ? keyClasses[key] : ''}`} key={key} data-key={key}>{key}</button>
          ))}
        </div>
      ))}
    </div>
  )
}
