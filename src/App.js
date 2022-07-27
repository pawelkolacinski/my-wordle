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
  const usedLetters = useSelector((state) => state.wordle.userWords)





  return (
    <div className="App">

      <h1 className="answer">Todays word : {wordToGuess} </h1>
      
      <LetterGrid data={[...typedWords,...typedLetters]} 
      />

      <br/>
      
      <Keyboard 
        onKeyPressed={keyPressHandler}
        keyClasses={{
          "q":"wordleletter-exists-same-place",
          "e":"wordleletter-exists-different-place",
          "w":"wordleletter-exists-not"
        } }
      />
    </div>
  );
}

export default App;
