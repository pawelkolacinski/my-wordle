import { createSlice } from '@reduxjs/toolkit'
import randomInt from '../helpers/randomInt'
import WordsObject from '../data/words_en.json'

const initialState = {
  wordToGuess: '',
  userWords:[],
  userLetters:[],
  gameEnded:false,
  gameWon:false
}

const wordEnteredHandler = (state,word) => {
    let checkedWord = word.map(letter => ({text:letter,className:"wordleletter-exists-not"}))
    


    for(let i=0; i<5;i++) {
        if(state.wordToGuess.indexOf(word[i]) !== -1) checkedWord[i] = {text:word[i],className:"wordleletter-exists-different-place"}
        if(state.wordToGuess[i]===word[i]) checkedWord[i] = {text:word[i],className:"wordleletter-exists-same-place"}
    }

    




    state.userWords = [...state.userWords, ...checkedWord]
    state.userLetters = []


    if(state.wordToGuess===word.join('')){
        state.gameEnded = true
        state.gameWon =true
    }

    if(state.wordToGuess!==word.join('') && state.userWords.length === 6*5 ){
        state.gameEnded = true
        state.gameWon =false
    }
}


const initGameHandler = (state) =>{
  return { ...initialState, wordToGuess: WordsObject.words[randomInt(0,WordsObject.words.length)]}
  
}

export const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {

    initGame: initGameHandler,

    
    addUserLetter: (state, action) => {
        if(state.gameEnded && (action.payload === 'Enter' || action.payload === 'Escape' ) ) {return initGameHandler(state)}
        if(state.gameEnded) return 
        if(/^[a-z]$/i.test(action.payload) && state.userLetters.length < 5) state.userLetters.push(action.payload.toLowerCase())
        if(action.payload === 'Backspace') state.userLetters.pop()
        if(action.payload === 'Enter' && state.userLetters.length === 5) wordEnteredHandler(state,state.userLetters)
      
    },


  },
})

// Action creators are generated for each case reducer function
export const { addUserLetter, initGame } = wordleSlice.actions

export default wordleSlice.reducer