import {useCallback, useEffect } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import LetterGrid from './components/LetterGrid';
import { useSelector, useDispatch } from 'react-redux'
import {addUserLetter, initGame} from './state/wordleSlice'
import {toggleTheme} from './state/themeSlice'
import Modal from './components/Modal';
import ToggleSwitch from './components/ToggleSwitch';


function App() {
  console.log('App rendered')
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme )

  
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
    <div className={`App ${theme}`}>
      <div className="container" >
       
        <h1 className="title">Wordle Clone</h1>
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
        
        <div className="theme-switcher"><ToggleSwitch onClickHandler={()=>dispatch(toggleTheme())}></ToggleSwitch><span>{theme==='dark' ? 'Dark mode': 'Light mode'}</span></div>
        
      </div>
    </div>
  );
}

export default App;
