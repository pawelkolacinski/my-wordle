import React from 'react'
import { useCallback, useEffect } from 'react'
import Keyboard from './Keyboard'
import LetterGrid from './LetterGrid'
import { useSelector, useDispatch } from 'react-redux'
import {
  addUserLetter,
  initGame,
  setGameEndDelayFinished,
} from '../state/wordleSlice'
import Modal from './Modal'
import './Game.css'

export default function Game() {
  const dispatch = useDispatch()

  //we get state of game

  const gameEnded = useSelector((state) => state.wordle.gameEnded)
  const gameWon = useSelector((state) => state.wordle.gameWon)
  const gamePoints = useSelector((state) => state.wordle.gamePoints)
  const gameStats = useSelector((state) => state.wordle.gameStats)
  const gameEndDelayFinished = useSelector(
    (state) => state.wordle.gameEndDelayFinished
  )

  //init game
  const wordToGuess = useSelector((state) => state.wordle.wordToGuess)
  useEffect(() => {
    dispatch(initGame())
  }, [dispatch])

  //define event frirng when user types on keyboard component
  const keyPressHandler = useCallback(
    ({ key }) => {
      dispatch(addUserLetter(key))
    },
    [dispatch]
  )

  //get current letters and past words
  const typedLetters = useSelector((state) => state.wordle.userLetters)
  const typedWords = useSelector((state) => state.wordle.userWords)

  //we get used words so we can color keyboard if given letter was used/found
  const usedLetters = {}
  typedWords.forEach((element) => {
    if (usedLetters[element.text]) {
      usedLetters[element.text] +=
        usedLetters[element.text] + ' ' + element.className
    } else {
      usedLetters[element.text] = element.className
    }
  })

  //we delay game end so animation of rotating letters can finish

  useEffect(() => {
    if (gameEnded) {
      setTimeout(() => dispatch(setGameEndDelayFinished(true)), 2500)
    }
  }, [gameEnded, dispatch])

  return (
    <>
      <h2 className="answer hide">Todays word : {wordToGuess} </h2>
      {gameEndDelayFinished && gameEnded && (
        <Modal
          onCloseHandler={() => {
            dispatch(initGame())
          }}
        >
          <h2 className="gamestate">
            Game is finished. <br /> Correct answer :{' '}
            {wordToGuess.toUpperCase()}. <br />
            <br />{' '}
            {gameWon
              ? 'You won! You get ' + gamePoints + ' points.'
              : 'You lost.'}
            {gameStats.games && (
              <p>
                Your avarage points :{' '}
                {Math.round(gameStats.totalPoints / gameStats.games)}.
              </p>
            )}
            <br />
            <br />
            <button
              className="button"
              onClick={() => {
                dispatch(initGame())
              }}
            >
              New game
            </button>
          </h2>
        </Modal>
      )}

      <LetterGrid data={[...typedWords, ...typedLetters]} />

      <br />

      <Keyboard onKeyPressed={keyPressHandler} keyClasses={usedLetters} />
    </>
  )
}
