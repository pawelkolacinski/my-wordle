import { createSlice } from '@reduxjs/toolkit'


export const themeSlice = createSlice({
    name: 'theme',
    initialState:'light',
    reducers: {
  
      
      toggleTheme: (state) => {
        return (state  === 'light' ? 'dark': 'light')
      } 
  
      
     
  
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleTheme } = themeSlice.actions
  
  export default themeSlice.reducer