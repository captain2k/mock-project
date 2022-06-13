import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const submitLateEarly = createAsyncThunk(
  'submitLateEarly/submitRequest',
  async (args, thunkAPI) => {
    try {
      const axiosPrivate = useAxiosPrivate()
      const res = await axiosPrivate.post(
        '/worksheet/request/LateEarly/create',
        {
          request_type: 4,
          request_for_date: args.request_for_date,
          check_in: args.check_in,
          check_out: args.check_out,
          compensation_date: args.compensation_date,
          compensation_time: args.compensation_time,
          reason: args.reason,
        },
      )
      console.log('res', res)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const submitLateEarlySlice = createSlice({
  name: 'submitLateEarly',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(submitLateEarly.pending, (state) => {
      state.loading = true
    })
    builder.addCase(submitLateEarly.fulfilled, (state, action) => {
      state.loading = false
      message.success('Successfully submit request')
    })
    builder.addCase(submitLateEarly.rejected, (state, action) => {
      message.error(`${action.payload?.message}`)
      state.loading = false
    })
  },
})

export default submitLateEarlySlice.reducer
export const getSubmitLateEarlyLoading = (state) =>
  state.submitLateEarlyReducer.loading
export const getSubmitLateEarlyError = (state) =>
  state.submitLateEarlyReducer.error
