import { Button, DatePicker, Form, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import { useRef } from 'react'
import { MESSAGE_REQUIRED } from '../../../../../utils/helpers/message'
import './CreateNoticePopUp.scss'

const CreateNoticePopUp = ({
  visibleCreateRequest,
  setVisibleCreateRequest,
}) => {
  const formCreateNotice = useRef()
  const handleCancel = () => {
    setVisibleCreateRequest(false)
    formCreateNotice.current.resetFields()
  }

  const handleFailed = () => {}
  const handleFinish = (value) => {
    let date_notice = value.dateNotice
    date_notice = moment(date_notice).format('DD-MM-YYYY')
    date_notice = date_notice.split('-').reverse().join('-')
    let notice_content = value.noticeContent
    console.log(date_notice, notice_content)
    formCreateNotice.current.resetFields()
    // setVisibleCreateRequest(false)
  }

  return (
    <div className="create-notice-popup">
      <Modal
        width={'60%'}
        title="Create a new notice"
        visible={visibleCreateRequest}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          ref={formCreateNotice}
          labelAlign="left"
          labelCol={{ span: 6 }}
          onFinish={handleFinish}
          onFinishFailed={handleFailed}
          initialValues={{
            noticeContent: '',
            dateNotice: moment(new Date()),
          }}
        >
          <Form.Item
            label="Date notice::"
            name="dateNotice"
            rules={[{ required: true, message: MESSAGE_REQUIRED }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Notice content::"
            name="noticeContent"
            rules={[{ required: true, message: MESSAGE_REQUIRED }]}
          >
            <TextArea autoSize={{ maxRows: 7, minRows: 4 }} />
          </Form.Item>
          <div className="create-notice-buttons">
            <div className="wrap-buttons">
              <Button className="primary-button" htmlType="submit">
                Create
              </Button>
              <Button className="outline-primary-button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateNoticePopUp
