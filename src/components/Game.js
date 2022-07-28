import React from 'react'
import {useCallback, useEffect } from 'react';
import Keyboard from './Keyboard';
import LetterGrid from './LetterGrid';
import { useSelector, useDispatch } from 'react-redux'
import {addUserLetter, initGame} from '../state/wordleSlice'
import Modal from './Modal';
import './Game.css'

export default function Game() {
    
    const dispatch = useDispatch()

    //init game
    const wordToGuess = useSelector((state) => state.wordle.wordToGuess)
    useEffect(() => {
        dispatch(initGame())

    },[dispatch])



    //define event frirng when user types on keyboard component
    const keyPressHandler = useCallback(({key}) => {
        console.log('Pressed ' + key)
        
        dispatch(addUserLetter(key))
        
    },[dispatch])


    
    //get current letters and past words
    const typedLetters = useSelector((state) => state.wordle.userLetters)
    const typedWords = useSelector((state) => state.wordle.userWords)
    
    //we get used letters so we can color keyboard
    const usedLetters = {}
    typedWords.forEach(element=>{
        if(usedLetters[element.text]) {
        usedLetters[element.text]+=usedLetters[element.text]+' '+element.className
        } 
        else {
        usedLetters[element.text]=element.className
        }
    }) 

    //we get state of game

    const gameEnded = useSelector((state) => state.wordle.gameEnded)
    const gameWon = useSelector((state) => state.wordle.gameWon)



  return (
    <>
        <h2 className="answer">Todays word : {wordToGuess} </h2>
        {gameEnded && 
        <Modal onCloseHandler={() => {dispatch(initGame())}}>
          <h2 className="gamestate">Game is finished. <br/> Correct answer : {wordToGuess.toUpperCase()}. <br/> {gameWon ? 'You won!' : 'You lost.'}<br/><br/>
          <button className="button" onClick={() => {dispatch(initGame())}}>New game</button>
          </h2>
        </Modal>
        
        }
        
        <LetterGrid data={[...typedWords,...typedLetters]} 
        />

        <br/>
        
        <Keyboard 
          onKeyPressed={keyPressHandler}
          keyClasses={usedLetters}
        />

    </>
  )
}
