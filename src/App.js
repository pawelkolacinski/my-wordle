import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {toggleTheme} from './state/themeSlice'
import ToggleSwitch from './components/ToggleSwitch';
import Game from './components/Game';
import Modal from './components/Modal';
import { useState } from 'react';


function App() {
  console.log('App rendered')
  
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme )

  
  const [showGameInfoModal, setShowGameInfoModal] = useState(false)
  
 

  return (
    <div className={`App ${theme}`}>
      <div className="container" >
       
        <h1 className="title">Wordle Clone</h1>
        <p className="game-info-link" onClick={()=>setShowGameInfoModal(true)}>How to play?</p>
        {showGameInfoModal &&
          <Modal onCloseHandler={()=>setShowGameInfoModal(false)} >
            <div >
              <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>
              <p>Each guess must be a valid 5-letter word. Hit the enter button to submit.</p>
              <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
              <br></br>
              <div >
                <p><strong>Examples</strong></p>
                <br></br>
                <div>
                  <div className='letter-grid game-info-word'>
                    <div className='letter wordleletter-exists-same-place'>W</div>
                    <div className='letter'>O</div>
                    <div className='letter'>R</div>
                    <div className='letter'>D</div>
                    <div className='letter'>S</div>
                  </div>
                  <p>The letter <b>W</b> is in the word and in the correct spot.</p>
                </div>
                <br></br>
                <div>
                  <div className='letter-grid game-info-word'>
                    <div className='letter'>P</div>
                    <div className='letter wordleletter-exists-different-place'>I</div>
                    <div className='letter'>L</div>
                    <div className='letter'>L</div>
                    <div className='letter'>S</div>
                  </div>
                  <p>The letter <b>I</b> is in the word but in the wrong spot..</p>
                </div>
                <br></br>
                <div>
                  <div className='letter-grid game-info-word'>
                    <div className='letter'>R</div>
                    <div className='letter'>A</div>
                    <div className='letter'>I</div>
                    <div className='letter wordleletter-exists-not'>S</div>
                    <div className='letter'>E</div>
                  </div>
                  <p>The letter <b>S</b> is not in the word in any spot.</p>
                  <br></br>
                </div>
              </div>
            </div>
          </Modal> 
        }

        <br></br>
        
        <Game />
        
        <div className="theme-switcher"><ToggleSwitch onClickHandler={()=>dispatch(toggleTheme())}></ToggleSwitch><span>{theme==='dark' ? 'Dark mode': 'Light mode'}</span></div>
        
      </div>
    </div>
  );
}

export default App;
