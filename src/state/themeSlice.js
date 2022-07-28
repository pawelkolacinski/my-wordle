import { createSlice } from '@reduxjs/toolkit'


export const themeSlice = createSlice({
    name: 'theme',
    initialState:(localStorage.getItem('theme') ?? 'light'),
    reducers: {
  
      
      toggleTheme: (state) => {
        const selectedTheme =  (state  === 'light' ? 'dark': 'light')
        localStorage.setItem('theme',selectedTheme)
        return selectedTheme

      } 
  
      
     
  
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleTheme } = themeSlice.actions
  
  export default themeSlice.reducer