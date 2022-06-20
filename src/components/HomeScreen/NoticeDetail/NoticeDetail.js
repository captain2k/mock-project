import {
  DownloadOutlined,
  MailTwoTone,
  PhoneTwoTone,
  RightCircleTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { Col, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import XIcon from '../../../common/XIcon/XIcon'
import {
  downloadAttachment,
  getNoticeDetailState,
} from '../../../store/reducer/homeSlice'
import './NoticeDetail.scss'

const NoticeDetail = ({ toggleModal, setToggleModal }) => {
  const dispatch = useDispatch()
  const handleCancel = () => {
    setToggleModal(false)
  }
  const handleDownload = () => {
    dispatch(downloadAttachment({ fileName: notice_detail?.attachment }))
  }
  const noticeDetail = useSelector(getNoticeDetailState)
  const { detail, toDepartment, publishedDate } = noticeDetail
  const notice_detail = detail?.notice_detail

  const styles = {
    top: 30,
    overflow: 'auto',
  }

  return (
    <Modal
      title="Notice Detail"
      visible={toggleModal}
      closeIcon={<XIcon />}
      onCancel={handleCancel}
      footer={null}
      className="notice-detail-modal"
      width="80%"
      height="90%"
      style={styles}
    >
      <Row>
        <Col span={8}>
          <h3>Author</h3>
          <p>
            <UserOutlined style={{ color: '#7367f0', marginRight: 5 }} />
            <strong>Name:</strong> {notice_detail?.author?.full_name}
          </p>
          <p>
            <MailTwoTone twoToneColor="#7367f0" style={{ marginRight: 5 }} />
            <strong>Email:</strong> {notice_detail?.author?.email}
          </p>
          <p>
            <MailTwoTone twoToneColor="#7367f0" style={{ marginRight: 5 }} />
            <strong>Other email:</strong> {notice_detail?.author?.other_email}
          </p>
          <p>
            <PhoneTwoTone twoToneColor="#7367f0" style={{ marginRight: 5 }} />
            <strong>Phone:</strong> {notice_detail?.author?.phone}
          </p>
        </Col>
        <Col span={8}>
          <h3>To Department</h3>
          <p>
            <RightCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            <strong>To department:</strong> {toDepartment}
          </p>
          <p>
            <RightCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            <strong>Published date:</strong> {publishedDate}
          </p>
        </Col>
      </Row>
      <hr />
      <h3>Detail</h3>
      <p>
        <strong>Subject:</strong> {notice_detail?.subject}
      </p>
      <p>
        Attachment:
        <Link to="#" download target="_self" onClick={handleDownload}>
          {' '}
          {notice_detail?.attachment} <DownloadOutlined />
        </Link>
      </p>
      <p>Message: {notice_detail?.message}</p>
    </Modal>
  )
}

NoticeDetail.propTypes = {
  toggleModal: PropTypes.bool,
  setToggleModal: PropTypes.func,
}

export default NoticeDetail
