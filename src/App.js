import { useState, useCallback, useEffect } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import LetterGrid from './components/LetterGrid';
import WordsObject from './data/words_en.json'

function App() {
  console.log('App rendered')
  const [userInput, setUserInput] = useState([])
  const keyPressHandler = useCallback(({key}) => {
    console.log('Pressed ' + key)
    if(/^[a-z]$/i.test(key)) setUserInput(state => [...state, {text: key }])
    
  },[])


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const [wordToGuess, setWordToGuess] = useState('')
  useEffect(() => {
    setWordToGuess(WordsObject.words[getRandomInt(0,WordsObject.words.length)])
  },[])
  



  return (
    <div className="App">

      <h1 className="answer">Todays word : {wordToGuess}</h1>
      
      <LetterGrid data={userInput} 
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
