import { createSlice } from '@reduxjs/toolkit'
import randomInt from '../helpers/randomInt'
import WordsObject from '../data/words_en.json'

const calculatePointsForFinishedGame = (state) => {
  if (!state.gameWon) return 0
  const points = 100 - (state.userWords.length / 5 - 1) * 15
  return points
}

const getGameStats = () => {
  return localStorage.getItem('gameHistory')
    ? JSON.parse(localStorage.getItem('gameHistory'))
    : { games: 0, totalPoints: 0 }
}

const saveGameStats = (points) => {
  const gameHistory = getGameStats()
  gameHistory.games = gameHistory.games + 1
  gameHistory.totalPoints = gameHistory.totalPoints + points
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory))
}

const wordEnteredHandler = (state, word) => {
  let checkedWord = word.map((letter) => ({
    text: letter,
    className: 'wordleletter-exists-not',
  }))

  for (let i = 0; i < 5; i++) {
    if (state.wordToGuess.indexOf(word[i]) !== -1)
      checkedWord[i] = {
        text: word[i],
        className: 'wordleletter-exists-different-place',
      }
    if (state.wordToGuess[i] === word[i])
      checkedWord[i] = {
        text: word[i],
        className: 'wordleletter-exists-same-place',
      }
  }

  state.userWords = [...state.userWords, ...checkedWord]
  state.userLetters = []

  if (state.wordToGuess === word.join('')) {
    state.gameEnded = true
    state.gameWon = true
  }

  if (state.wordToGuess !== word.join('') && state.userWords.length === 6 * 5) {
    state.gameEnded = true
    state.gameWon = false
  }

  state.gamePoints = calculatePointsForFinishedGame(state)
  saveGameStats(state.gamePoints)
  state.gameStats = getGameStats()
}

const initGameHandler = (state) => {
  return {
    ...initialState,
    wordToGuess: WordsObject.words[randomInt(0, WordsObject.words.length)],
  }
}

const initialState = {
  wordToGuess: '',
  userWords: [],
  userLetters: [],
  gameEnded: false,
  gameWon: false,
  gamePoints: null,
  gameStats: getGameStats(),
  gameEndDelayFinished: false,
}

export const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    initGame: initGameHandler,

    addUserLetter: (state, action) => {
      if (
        state.gameEnded &&
        (action.payload === 'Enter' || action.payload === 'Escape')
      ) {
        return initGameHandler(state)
      }
      if (state.gameEnded) return
      if (/^[a-z]$/i.test(action.payload) && state.userLetters.length < 5)
        state.userLetters.push(action.payload.toLowerCase())
      if (action.payload === 'Backspace') state.userLetters.pop()
      if (action.payload === 'Enter' && state.userLetters.length === 5)
        wordEnteredHandler(state, state.userLetters)
    },
    setGameEndDelayFinished: (state, action) => {
      state.gameEndDelayFinished = action.payload
    },
  },
})

export const { addUserLetter, initGame, setGameEndDelayFinished } =
  wordleSlice.actions

export default wordleSlice.reducer
