import React from 'react'
import Modal from './Modal'

export default function GameInfoModal({onCloseHandler}) {
  return (
    <Modal onCloseHandler={onCloseHandler} >
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
  )
}
