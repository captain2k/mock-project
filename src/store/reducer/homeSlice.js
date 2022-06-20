import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems'
import { handleHomeTableData } from '../../utils/helpers/handleTableData/index'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'

export const getNotice = createAsyncThunk(
  'noticeSlice/getNotice',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(
      `/notifications?page=${args.page}&per_page=${args.per_page}&order_published_date=${args.order_published_date}`,
    )
    return res.data
  },
)

export const getNoticeDetail = createAsyncThunk(
  'noticeSlice/getNoticeDetail',
  async (args) => {
    const axiosPrivate = useAxiosPrivate()
    const res = await axiosPrivate.get(`/notifications/detail/${args.noticeId}`)
    return res.data
  },
)

export const downloadAttachment = createAsyncThunk(
  'noticeSlice/downloadAttachment',
  async (args) => {
    const fileName = args.fileName
    const accessToken = getLocalStorageItem('accessToken')
    const res = await axios
      .get(
        process.env.REACT_APP_BASE_URL + `/notifications/download/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: 'blob',
        },
      )
      .then((response) => {
        const file = new Blob([response.data])
        const url = window.URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    return res.data
  },
)

export const viewAttachment = createAsyncThunk(
  'noticeSlice/viewAttachment',
  async (args) => {
    const fileName = args.fileName
    const accessToken = getLocalStorageItem('accessToken')
    const res = await axios
      .get(
        process.env.REACT_APP_BASE_URL + `/notifications/download/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: 'blob',
        },
      )
      .then((response) => {
        if (response?.data.type === 'application/pdf') {
          const file = new Blob([response.data], { type: 'application/pdf' })
          const fileURL = URL.createObjectURL(file)
          window.open(fileURL)
        }
      })
    return res.data
  },
)

const noticeSlice = createSlice({
  name: 'noticeSlice',
  initialState: {
    notices: null,
    loadingNotice: true,
    noticeDetail: {
      detail: null,
      toDepartment: null,
      publishedDate: null,
    },
    homeTable: [],
    attachmentURL: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotice.pending, (state) => {
      state.loadingNotice = true
    })
    builder.addCase(getNotice.fulfilled, (state, action) => {
      state.loadingNotice = false
      state.notices = action.payload
      state.homeTable = handleHomeTableData(
        action.payload?.official_notice.data,
        action.payload?.official_notice,
        action.meta.arg.order_published_date,
      )
    })
    builder.addCase(getNotice.rejected, (state) => {
      state.loadingNotice = false
    })
    builder.addCase(getNoticeDetail.fulfilled, (state, action) => {
      state.noticeDetail.detail = action.payload
      state.noticeDetail.toDepartment = action.meta.arg.toDepartment
      state.noticeDetail.publishedDate = action.meta.arg.publishedDate
    })
  },
})

export default noticeSlice.reducer
export const getNoticeState = (state) => state.homeReducer.notices
export const getLoadingNotice = (state) => state.homeReducer.loadingNotice
export const getNoticeDetailState = (state) => state.homeReducer.noticeDetail
export const getHomeTable = (state) => state.homeReducer.homeTable
