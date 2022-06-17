import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getLocalStorageItem from '../../utils/helpers/handleLocalStorageItems/getLocalStorageItem'
import { handleWorksheetTableData } from '../../utils/helpers/handleTableData'

export const getWorksheet = createAsyncThunk(
  'getWorksheet',
  async (params, thunkAPI) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + '/worksheet/my-timesheet',
        {
          headers: {
            Authorization: `Bearer ${getLocalStorageItem('accessToken')}`,
          },
          params: params,
        },
      )
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const worksheetSlice = createSlice({
  name: 'worksheet',
  initialState: {
    worksheet: [],
    isLoading: false,
    totalRecord: 0,
    isFirstLoad: true,
  },
  reducers: {},
  extraReducers: {
    [getWorksheet.fulfilled]: (state, action) => {
      const result = handleWorksheetTableData(action.payload.worksheet.data)
      state.worksheet = result
      state.isLoading = false
      state.totalRecord = action.payload.worksheet.total
      state.isFirstLoad = false
    },
    [getWorksheet.pending]: (state, action) => {
      state.worksheet = []
      state.isLoading = true
      state.totalRecord = 0
      state.isFirstLoad = false
    },
    [getWorksheet.rejected]: (state, action) => {
      state.worksheet = []
      state.isLoading = false
      state.totalRecord = 0
      state.isFirstLoad = false
    },
  },
})

export default worksheetSlice.reducer
export const getWorksheetData = (state) => state.worksheetReducer.worksheet
export const getWorksheetLoading = (state) => state.worksheetReducer.isLoading
export const getWorksheetTotal = (state) => state.worksheetReducer.totalRecord
export const isFirstLoad = (state) => state.worksheetReducer.isFirstLoad
