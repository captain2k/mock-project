import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const changePass = createAsyncThunk(
  'changePass/putUserAccount',
  async (args, thunkAPI) => {
    try {
      const axiosPrivate = useAxiosPrivate()
      const res = await axiosPrivate.put('/auth/change-pass', {
        old_password: args.oldPassword,
        new_password: args.newPassword,
        new_password_confirmation: args.confirmPassword,
      })
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const changePassSlice = createSlice({
  name: 'changePass',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(changePass.pending, (state) => {
      state.loading = true
    })
    builder.addCase(changePass.fulfilled, (state, action) => {
      state.loading = false
      message.success('Successfully change password')
    })
    builder.addCase(changePass.rejected, (state, action) => {
      message.error(`${action.payload?.message}`)
      state.loading = false
    })
  },
})

export default changePassSlice.reducer
export const getChangePassLoading = (state) => state.changePassReducer.loading
export const getChangePassError = (state) => state.changePassReducer.error
