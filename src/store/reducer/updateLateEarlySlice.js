import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const updateLateEarly = createAsyncThunk(
  'updateLateEarly/updateRequest',
  async (args, thunkAPI) => {
    try {
      const axiosPrivate = useAxiosPrivate()
      const res = await axiosPrivate.put(
        '/worksheet/request/LateEarly/update',
        {
          request_type: 4,
          request_for_date: args.request_for_date,
          checkin: args.checkin,
          checkout: args.checkout,
          compensation_date: args.compensation_date,
          compensation_time: args.compensation_time,
          reason: args.reason,
        },
      )
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const updateLateEarlySlice = createSlice({
  name: 'updateLateEarly',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateLateEarly.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateLateEarly.fulfilled, (state, action) => {
      state.loading = false
      message.success('Successfully update your request')
    })
    builder.addCase(updateLateEarly.rejected, (state, action) => {
      message.error(`${action.payload?.message}`)
      state.loading = false
    })
  },
})

export default updateLateEarlySlice.reducer
export const getUpdateLateEarlyLoading = (state) =>
  state.updateLateEarlyReducer.loading
export const getUpdateLateEarlyError = (state) =>
  state.updateLateEarlyReducer.error
