import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import moment from 'moment'
import getLocalStorageItem from '../../utils/helpers/handleLocalStorageItems/getLocalStorageItem'
import { handleWorksheetTableData } from '../../utils/helpers/handleTableData'

const today = moment().format('YYYY-MM-DD')
const firstDayOfRecentMonth = moment().startOf('month').format('YYYY-MM-DD')

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

export const worksheetPagination = createAsyncThunk(
  'worksheet/pagination',
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
    paramTimesheet: {
      end_date: today,
      start_date: firstDayOfRecentMonth,
      work_date: 'asc',
      page: 1,
      per_page: 30,
    },
    currentPage: 1,
    perPage: 30,
    lastPage: 1,
  },
  reducers: {
    getParams: (state, action) => {
      state.paramTimesheet = { ...action.payload }
    },
  },
  extraReducers: {
    [getWorksheet.fulfilled]: (state, action) => {
      const sortBy = action.meta.arg.work_date
      const { current_page, per_page, total, data, last_page } =
        action.payload.worksheet
      state.totalRecord = total
      state.currentPage = current_page
      const result = handleWorksheetTableData(
        data,
        current_page,
        per_page,
        total,
        sortBy,
      )
      state.worksheet = result
      state.isLoading = false
      state.isFirstLoad = false
      state.lastPage = last_page
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
    [worksheetPagination.fulfilled]: (state, action) => {
      const sortBy = action.meta.arg.work_date
      const { current_page, per_page, total, data, last_page } =
        action.payload.worksheet
      state.totalRecord = total
      state.currentPage = current_page
      const result = handleWorksheetTableData(
        data,
        current_page,
        per_page,
        total,
        sortBy,
      )
      state.worksheet = result
      state.lastPage = last_page
    },
  },
})

export default worksheetSlice.reducer
export const { getParams } = worksheetSlice.actions
export const getWorksheetData = (state) => state.worksheetReducer.worksheet
export const getWorksheetLoading = (state) => state.worksheetReducer.isLoading
export const getWorksheetTotal = (state) => state.worksheetReducer.totalRecord
export const isFirstLoad = (state) => state.worksheetReducer.isFirstLoad
export const paramTimesheet = (state) => state.worksheetReducer.paramTimesheet
export const getCurrentPage = (state) => state.worksheetReducer.currentPage
export const getLastPage = (state) => state.worksheetReducer.lastPage
