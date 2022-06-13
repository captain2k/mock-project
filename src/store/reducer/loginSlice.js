import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setLocalStorageItems } from '../../utils/helpers/handleLocalStorageItems/index'

export const login = createAsyncThunk(
  'login/postUserAccount',
  async (args, thunkAPI) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + '/auth/login',
        {
          email: args.email,
          password: args.password,
        },
      )
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {
      fullName: null,
      role: null,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user.role = action.payload.role
      state.user.fullName = action.payload.full_name
      state.loading = false
      state.error = null
      setLocalStorageItems('accessToken', action.payload.access_token)
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload?.error) {
        state.error = action.payload.error
      }
      if (action.payload?.password) {
        state.error = action.payload.password
      }
      if (action.payload?.email) {
        state.error = action.payload.email
      }
      state.loading = false
    })
  },
})

export default loginSlice.reducer
export const getLoginInfo = (state) => state.loginReducer.user
export const getLoginLoading = (state) => state.loginReducer.loading
export const getLoginError = (state) => state.loginReducer.error
