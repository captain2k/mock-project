/* eslint-disable no-unused-vars */
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomSpin from '../../common/CustomSpin/CustomSpin'
import {
  getHomeTable,
  getLoadingNotice,
  getNotice,
  getNoticeDetail,
  getNoticeState,
  viewAttachment,
} from '../../store/reducer/homeSlice'
import calculateComponentHeight from '../../utils/helpers/handleSize/calculateComponentHeight'
import './HomeScreen.scss'
import NoticeDetail from './NoticeDetail/NoticeDetail'

const HomeScreen = () => {
  const [tableScrollHeight, setTableScrollHeight] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [oderPublishedDate, setOderPublishedDate] = useState('desc')
  const [pageSize, setPageSize] = useState(10)
  const [toggleModal, setToggleModal] = useState(false)
  const homeScreen = useRef()
  const dispatch = useDispatch()
  const notice = useSelector(getNoticeState)
  const dataSource = useSelector(getHomeTable)
  const loadingNotice = useSelector(getLoadingNotice)
  useEffect(() => {
    document.title = 'Home'
  }, [])

  // Get notices
  useEffect(() => {
    dispatch(
      getNotice({
        page: currentPage,
        per_page: pageSize,
        order_published_date: oderPublishedDate,
      }),
    )
  }, [dispatch, oderPublishedDate, pageSize, currentPage])

  const handleShowNoticeDetail = (rowId, toDepartment, publishedDate) => {
    setToggleModal(true)
    dispatch(getNoticeDetail({ noticeId: rowId, toDepartment, publishedDate }))
  }

  const handleViewAttachment = (fileName) => {
    dispatch(viewAttachment({ fileName }))
  }

  useEffect(() => {
    // Calculate home screen height
    const headerHeight = calculateComponentHeight('.navbar')
    const windowHeight = window.innerHeight
    if (homeScreen.current) {
      homeScreen.current.style.paddingTop = headerHeight + 'px'
      homeScreen.current.style.height = windowHeight + 'px'
    }
    // Calculate table scroll height
    const PAGINATION_MARGIN_TOP = 16
    const HOME_SCREEN_PADDING_BOTTOM = 32
    const customPaginationHeight = 32
    const tableTileHeight = calculateComponentHeight('.header-home-screen')
    const tableHeaderHeight = calculateComponentHeight('.ant-table-header')
    const calculateHeight =
      windowHeight -
      headerHeight -
      tableTileHeight -
      tableHeaderHeight -
      customPaginationHeight -
      2 * HOME_SCREEN_PADDING_BOTTOM -
      PAGINATION_MARGIN_TOP
    setTableScrollHeight(calculateHeight)
  }, [])

  // Recalculate home screen height when resize
  useEffect(() => {
    const handleResize = () => {
      // Calculate home screen height
      const headerHeight = calculateComponentHeight('.navbar')
      const windowHeight = window.innerHeight
      if (homeScreen.current) {
        homeScreen.current.style.paddingTop = headerHeight + 'px'
        homeScreen.current.style.height = windowHeight + 'px'
      }
      // Calculate table scroll height
      const PAGINATION_MARGIN_TOP = 16
      const HOME_SCREEN_PADDING_BOTTOM = 32
      const customPaginationHeight = 32
      const tableTileHeight = calculateComponentHeight('.header-home-screen')
      const tableHeaderHeight = calculateComponentHeight('.ant-table-header')
      const calculateHeight =
        windowHeight -
        headerHeight -
        tableTileHeight -
        tableHeaderHeight -
        customPaginationHeight -
        2 * HOME_SCREEN_PADDING_BOTTOM -
        PAGINATION_MARGIN_TOP
      setTableScrollHeight(calculateHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize)
  }, [])

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page)
  }

  const onShowSizeChange = (current, size) => {
    setPageSize(size)
  }

  const columns = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      width: '5%',
      ellipsis: true,
    },
    {
      title: 'SUBJECT',
      dataIndex: 'subject',
      key: 'subject',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'AUTHOR',
      dataIndex: 'author',
      key: 'author',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'TO DEPARTMENT',
      dataIndex: 'toDepartment',
      key: 'toDepartment',
      align: 'center',
      width: '15%',
    },
    {
      title: 'PUBLISHED DATE',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      align: 'center',
      width: '15%',
      showSorterTooltip: false,
      sorter: () => {
        if (oderPublishedDate === 'desc') {
          setOderPublishedDate('asc')
        } else {
          setOderPublishedDate('desc')
        }
      },
    },
    {
      title: 'ATTACHMENT',
      dataIndex: 'attachment',
      key: 'attachment',
      width: '20%',
      ellipsis: true,
      render: (text) => (
        <Link to="#" onClick={() => handleViewAttachment(text)}>
          {text}
        </Link>
      ),
    },
    {
      title: 'DETAIL',
      dataIndex: 'detail',
      key: 'detail',
      align: 'center',
      width: '10%',
      render: ({ content, rowId, toDepartment, publishedDate }) => (
        <Link
          to="./"
          onClick={() =>
            handleShowNoticeDetail(rowId, toDepartment, publishedDate)
          }
        >
          {content}
        </Link>
      ),
    },
  ]

  return (
    <div ref={homeScreen} className="home-screen">
      <div className="container-home-screen">
        <div className="header-home-screen">
          <h3>Official Notice</h3>
        </div>
        <div className="body-home-screen">
          <Table
            dataSource={[...dataSource]}
            columns={columns}
            bordered
            loading={{ indicator: <CustomSpin />, spinning: loadingNotice }}
            rowClassName={(record, index) => {
              if (index % 2 === 0) {
                return 'evenRow'
              } else {
                return 'oddRow'
              }
            }}
            scroll={{
              y: tableScrollHeight,
            }}
            pagination={{
              position: ['bottomCenter'],
              showTotal: (total) => `Total number of records: ${total}`,
              locale: { items_per_page: '' },
              hideOnSinglePage: true,
              current: currentPage,
              pageSize: pageSize,
              pageSizeOptions: notice?.per_page_config,
              total: notice?.official_notice.total || 1,
              onChange: onPageChange,
              onShowSizeChange: onShowSizeChange,
              className: 'custom-pagination',
              itemRender: (_, type, element) => {
                if (type === 'prev') {
                  return (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            getNotice({
                              page: 1,
                              per_page: pageSize,
                              order_published_date: oderPublishedDate,
                            }),
                          )
                          setCurrentPage(1)
                        }}
                        disabled={currentPage === 1}
                      >
                        <DoubleLeftOutlined />
                      </Button>
                      <Button>
                        <LeftOutlined />
                      </Button>
                    </>
                  )
                }

                if (type === 'next') {
                  return (
                    <>
                      <Button>
                        <RightOutlined />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            getNotice({
                              page: notice?.official_notice.last_page || 1,
                              per_page: pageSize,
                              order_published_date: oderPublishedDate,
                            }),
                          )
                          setCurrentPage(notice?.official_notice.last_page || 1)
                        }}
                        disabled={
                          currentPage === notice?.official_notice.last_page
                        }
                      >
                        <DoubleRightOutlined />
                      </Button>
                    </>
                  )
                }
                return element
              },
            }}
          />
        </div>
      </div>
      <NoticeDetail toggleModal={toggleModal} setToggleModal={setToggleModal} />
    </div>
  )
}

export default HomeScreen
