import './App.css';
import Keyboard from './components/Keyboard';

function App() {

  const keyPressHandler = ({key}) => {
    console.log('Pressed ' + key)
    
  }

  return (
    <div className="App">
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
