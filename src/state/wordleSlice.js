import { createSlice } from '@reduxjs/toolkit'
import randomInt from '../helpers/randomInt'
import WordsObject from '../data/words_en.json'

const initialState = {
  wordToGuess: '',
  userWords:[],
  userLetters:[]
}

const wordEnteredHandler = (state,word) => {
    let checkedWord = word.map(letter => ({text:letter,className:"wordleletter-exists-not"}))
    console.log('checkedWord',checkedWord)


    for(let i=0; i<5;i++) {
        if(state.wordToGuess.indexOf(word[i]) !== -1) checkedWord[i] = {text:word[i],className:"wordleletter-exists-different-place"}
        if(state.wordToGuess[i]===word[i]) checkedWord[i] = {text:word[i],className:"wordleletter-exists-same-place"}
    }
    state.userWords = [...state.userWords, ...checkedWord]
    state.userLetters = []
}

export const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    initGame:(state) =>{
       //state = initialState
       state.wordToGuess = WordsObject.words[randomInt(0,WordsObject.words.length)]
    },

    
    addUserLetter: (state, action) => {
        if(/^[a-z]$/i.test(action.payload) && state.userLetters.length < 5) state.userLetters.push(action.payload)
        if(action.payload === 'Backspace') state.userLetters.pop()
        if(action.payload === 'Enter' && state.userLetters.length === 5) wordEnteredHandler(state,state.userLetters)
      
    },


  },
})

// Action creators are generated for each case reducer function
export const { addUserLetter, initGame } = wordleSlice.actions

export default wordleSlice.reducer