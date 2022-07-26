import { useState, useCallback } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import LetterGrid from './components/LetterGrid';

function App() {
  console.log('App rendered')
  const [userInput, setUserInput] = useState([])
  

  const keyPressHandler = useCallback(({key}) => {
    console.log('Pressed ' + key)
    if(/^[a-z]$/i.test(key)) setUserInput(state => [...state, {text: key }])
    
  },[])



  return (
    <div className="App">
      
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
