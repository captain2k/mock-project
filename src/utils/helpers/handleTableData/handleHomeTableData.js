import moment from 'moment'

const handleHomeTableData = (dataNotice, officialNotice, orderType) => {
  const dataSource = dataNotice?.map((notice, index) => {
    const publishedTo = notice?.published_to
    // Handle division name
    let toDepartment = ''
    const publishedDate = moment(notice.published_date).format('DD/MM/YYYY')
    if (typeof publishedTo === 'string') {
      toDepartment = 'All'
    } else {
      toDepartment = notice?.published_to[0].division_name
    }
    //Handle table no
    const page = officialNotice?.current_page
    const perPage = officialNotice?.per_page
    const total = officialNotice?.total
    let tableNo = null
    if (orderType === 'desc') {
      tableNo = (page - 1) * perPage + index + 1
    } else {
      tableNo = total - ((page - 1) * perPage + index)
    }
    return {
      key: +index,
      no: tableNo,
      subject: notice.subject,
      author: notice.author.full_name,
      toDepartment: toDepartment,
      publishedDate: publishedDate,
      attachment: notice.attachment,
      detail: {
        content: 'view',
        rowId: notice.id,
        toDepartment,
        publishedDate,
      },
    }
  })
  return dataSource
}

export default handleHomeTableData
