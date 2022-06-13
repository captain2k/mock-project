import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/reducer/loginSlice'
import changePassReducer from './reducer/changePassSlice'
import userProfileSlice from './reducer/userProfileSlice'
import worksheetReducer from './reducer/worksheetSlice'
export const store = configureStore({
  reducer: {
    loginReducer,
    changePassReducer,
    userProfileSlice,
    worksheetReducer,
  },
})
