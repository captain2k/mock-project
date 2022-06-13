import moment from 'moment'

const handleHomeTableData = (dataNotice) => {
  const dataSource = dataNotice?.map((notice, index) => {
    const publishedTo = notice?.published_to
    let toDepartment = ''
    const publishedDate = moment(notice.published_date).format('DD/MM/YYYY')
    if (typeof publishedTo === 'string') {
      toDepartment = 'All'
    } else {
      toDepartment = notice?.published_to[0].division_name
    }
    return {
      key: +index,
      no: index + 1,
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
