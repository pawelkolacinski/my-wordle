import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from './state/themeSlice'
import ToggleSwitch from './components/ToggleSwitch'
import Game from './components/Game'

import { useState } from 'react'
import GameInfoModal from './components/GameInfoModal'

function App() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)

  const [showGameInfoModal, setShowGameInfoModal] = useState(false)

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <h1 className="title">Wordle Clone</h1>
        <p
          className="game-info-link"
          onClick={() => setShowGameInfoModal(true)}
        >
          How to play?
        </p>
        {showGameInfoModal && (
          <GameInfoModal onCloseHandler={() => setShowGameInfoModal(false)} />
        )}

        <br></br>

        <Game />

        <div className="theme-switcher">
          <ToggleSwitch
            onClickHandler={() => dispatch(toggleTheme())}
          ></ToggleSwitch>
          <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
        </div>
      </div>
    </div>
  )
}

export default App
