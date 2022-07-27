import {useCallback, useEffect } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import LetterGrid from './components/LetterGrid';
import { useSelector, useDispatch } from 'react-redux'
import {addUserLetter, initGame} from './state/wordleSlice'


function App() {
  console.log('App rendered')
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
    <div className="App">

      <h1 className="answer">Todays word : {wordToGuess} </h1>
      {gameEnded && <h2 className="gamestate">Game is finished. {gameWon ? 'You won!' : 'You lost.'}</h2>}
      
      <LetterGrid data={[...typedWords,...typedLetters]} 
      />

      <br/>
      
      <Keyboard 
        onKeyPressed={keyPressHandler}
        keyClasses={usedLetters}
      />
    </div>
  );
}

export default App;
