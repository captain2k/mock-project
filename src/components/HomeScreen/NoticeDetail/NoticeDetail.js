import {
  MailTwoTone,
  PhoneTwoTone,
  RightCircleTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { Col, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import XIcon from '../../../common/XIcon/XIcon'
import { getNoticeDetailState } from '../../../store/reducer/homeSlice'
import './NoticeDetail.scss'

const NoticeDetail = ({ toggleModal, setToggleModal }) => {
  const handleCancel = () => {
    setToggleModal(false)
  }
  const noticeDetail = useSelector(getNoticeDetailState)
  const { detail, toDepartment, publishedDate } = noticeDetail
  const notice_detail = detail?.notice_detail

  return (
    <Modal
      title="Notice Detail"
      visible={toggleModal}
      closeIcon={<XIcon />}
      onCancel={handleCancel}
      footer={null}
      className="notice-detail-modal"
    >
      <Row>
        <Col span={12}>
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
        <Col span={12}>
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
      <p>Attachment: {notice_detail?.attachment}</p>
      <p>Message: {notice_detail?.message}</p>
    </Modal>
  )
}

NoticeDetail.propTypes = {
  toggleModal: PropTypes.bool,
  setToggleModal: PropTypes.func,
}

export default NoticeDetail
