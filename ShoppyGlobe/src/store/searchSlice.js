import { createSlice } from '@reduxjs/toolkit'
// Initial state
const initialState = {
  query: '',
}
// Create search slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    clearQuery(state) {
      state.query = ''
    },
  },
})

export const { setQuery, clearQuery } = searchSlice.actions
export default searchSlice.reducer
