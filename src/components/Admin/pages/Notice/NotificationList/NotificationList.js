import { Space, Table } from 'antd'
import './NotificationList.scss'
const NotificationList = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'DateNotice',
      dataIndex: 'dateNotice',
      key: 'dateNotice',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (data, record) => {
        console.log(record)
      },
    },
    // {
    //   title: 'Tags',
    //   dataIndex: 'tags',
    //   key: 'tags',
    //   render: (tags, record) => console.log(tags),
    //   <span>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green'
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       )
    //     })}
    //   </span>
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a>
          <a>Delete</a> */}
        </Space>
      ),
    },
  ]
  const data = [
    {
      key: '1',
      dateNotice: '19-06-2022',
      content: 'Lastweek we have an important event',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      dateNotice: '19-06-2022',
      content: 'Lastweek we have an important event',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      dateNotice: '19-06-2022',
      content: 'Lastweek we have an important event',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
  return (
    <div className="notification-list">
      <div>
        <Table
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
          }}
          dataSource={data}
        />
      </div>
    </div>
  )
}

export default NotificationList
