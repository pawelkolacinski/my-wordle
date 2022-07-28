import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {toggleTheme} from './state/themeSlice'
import ToggleSwitch from './components/ToggleSwitch';
import Game from './components/Game';


function App() {
  console.log('App rendered')
  
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme )

  

  
 

  return (
    <div className={`App ${theme}`}>
      <div className="container" >
       
        <h1 className="title">Wordle Clone</h1>
        
        <Game />
        
        <div className="theme-switcher"><ToggleSwitch onClickHandler={()=>dispatch(toggleTheme())}></ToggleSwitch><span>{theme==='dark' ? 'Dark mode': 'Light mode'}</span></div>
        
      </div>
    </div>
  );
}

export default App;
