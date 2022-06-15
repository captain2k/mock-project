import { createSlice } from '@reduxjs/toolkit'

const initialState = {}
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    saveUserProfile: (state, action) => {
      return (state = action.payload)
    },
  },
})

export const { saveUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
