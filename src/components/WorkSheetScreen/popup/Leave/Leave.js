import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  TimePicker,
} from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import { useEffect, useState } from 'react'
import changeTimeToMint from '../../../../utils/helpers/handleTime/changeTimeToMint'
import './Leave.scss'

export default function Leave({ isLeaveVisible, setIsLeaveVisible }) {
  // lấy từ bảng worksheet
  const registerForDate = '19-2-2022'
  const checkInTime = '08:15'
  const checkOutTime = '16:01'
  const workTime = '07:00'
  const lackTime = '01:00'
  // eslint-disable-next-line
  const [requestExists, setRequestExists] = useState(false)
  const [isLeaveAllDay, setIsLeaveAllDay] = useState(false)

  //  set range time
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')
  // eslint-disable-next-line
  const [timeCount, setTimeCount] = useState('')

  const format = 'HH:mm'
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const validateMessages = {
    // required: '${label} is required!',
    // types: {
    //   email: '${label} is not a valid email!',
    //   number: '${label} is not a valid number!',
    // },
  }

  // Handle Click
  const handleOk = () => {
    setIsLeaveVisible(false)
  }
  const handleCancel = () => {
    setIsLeaveVisible(false)
  }

  const onFinish = (values) => {
    // let newRequest
    // if (isLeaveAllDay) {
    //   newRequest = {
    //     leave_all_day: 1,
    //     request_type: Number(values['paid_unpaid'] + 1),
    //     request_for_date: registerForDate,
    //     check_in: checkInTime,
    //     check_out: checkOutTime,
    //     reason: values['reason'],
    //   }
    // } else {
    //   const rangeStartNumber = changeTimeToMint(rangeStart)
    //   const rangeStartEnd = changeTimeToMint(rangeEnd)
    //   if (rangeStartEnd > rangeStartNumber) {
    //     setTimeCount(calculateTime(rangeEnd, rangeStart))
    //     newRequest = {
    //       leave_start: rangeStart,
    //       leave_end: rangeEnd,
    //       request_type: Number(values['paid_unpaid'] + 1),
    //       request_for_date: registerForDate,
    //       check_in: checkInTime,
    //       check_out: checkOutTime,
    //       reason: values['reason'],
    //     }
    //   } else {
    //     message.error(`Please choose end time after start time!!!`)
    //   }
    // }
  }

  const onChangeLeaveAllDay = (e) => {
    setIsLeaveAllDay(e.target.checked)
  }

  const onChangeStart = (time, timeString) => {
    setRangeStart(timeString)
  }

  const onChangeEnd = (time, timeString) => {
    setRangeEnd(timeString)
  }
  // Hàm tính toán thời gian:

  const lackNumber = changeTimeToMint(workTime)
  const workNumber = changeTimeToMint(lackTime)

  useEffect(() => {}, [rangeEnd, rangeStart])
  // get date, time
  const today = new Date()
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  const time = today.getHours() + ':' + today.getMinutes()

  return (
    <Modal
      title="Register Leave"
      visible={isLeaveVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="80%"
      okText="Register"
      okButtonProps={{ style: { marginRight: '20px' } }}
      className="modal_late_early"
      footer={null}
    >
      <div className="container">
        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Registration date:</h4>
          </Col>
          <Col>
            <Row>
              <p className="date">{date}</p>{' '}
              <p style={{ marginLeft: '8px' }}>{time}</p>
            </Row>
          </Col>
        </Row>

        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Register for date:</h4>
          </Col>
          <Col>
            {/* thời gian lấy từ bảng worksheet */}
            <p className="date">{registerForDate}</p>
          </Col>
        </Row>

        <Row className="item">
          {/* thời gian từ bảng worksheet */}
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time">
            <h4 className="w-140 mr-20">Check-in:</h4>
            <span className="time">{checkInTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="check_time ">
            <h4 className="col-order-2 mr-20">Check-out:</h4>
            <span className="time">{checkOutTime}</span>
          </Col>
        </Row>

        <Row className="item">
          {/* thời gian từ bảng worksheet */}
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="late_time">
            <h4 className="w-140 mr-20">Work time:</h4>
            {/* lấy thời gian check-out trừ check-in */}
            <span>{workNumber > 0 && workTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="early_time">
            <h4 className="col-order-2 mr-20">Lack time:</h4>
            {/* lấy 08:00 trừ work time  */}
            <span>{lackNumber > 0 && lackTime}</span>
          </Col>
        </Row>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{
            start_time: moment('00:00', format),
            end_time: moment('00:00', format),
            paid_unpaid: 1,
          }}
        >
          <Form.Item name="leave_all_day">
            <Row className="item">
              <Checkbox onChange={onChangeLeaveAllDay}>Leave all day</Checkbox>
            </Row>
          </Form.Item>
          <Row>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              className="item align-center"
              style={{ margin: 0 }}
            >
              <Row className="item">
                <Col>
                  <div className="w-140 mr-20 d-flex align-center">
                    <h4>Range:</h4>
                  </div>
                </Col>
                <Col
                  className="d-flex align-center item range-time_container"
                  style={{ margin: 0 }}
                >
                  <Form.Item name={'start_time'} className="range-item">
                    <TimePicker
                      format={format}
                      suffixIcon=""
                      placeholder=""
                      className="range-time"
                      allowClear={false}
                      disabled={isLeaveAllDay}
                      onChange={onChangeStart}
                    />
                  </Form.Item>
                  <span style={{ margin: '0 5px' }}>to</span>
                  <Form.Item name={'end_time'} className="range-item">
                    <TimePicker
                      format={format}
                      suffixIcon=""
                      placeholder=""
                      className="range-time"
                      allowClear={false}
                      disabled={isLeaveAllDay}
                      onChange={onChangeEnd}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              className="d-flex align-center item"
            >
              <Row>
                <Col className="paid_unpaid_container">
                  <Form.Item name="paid_unpaid" style={{ margin: 0 }}>
                    <Radio.Group>
                      <Radio value={1}>Paid</Radio>
                      <Radio value={2}>Unpaid</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col className="d-flex align-center">
                  <span>Time count:</span>
                  {/* Thời gian late cộng early */}
                  <span style={{ marginLeft: '6px' }}>
                    {isLeaveAllDay ? '08:00' : timeCount}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Form.Item
              name={'reason'}
              label="Reason"
              rules={[
                {
                  required: true,
                  message: 'Please write your reason!',
                },
              ]}
            >
              <Input.TextArea rows={4} maxLength={100} className="flex-1" />
            </Form.Item>
          </Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="button-group">
              {!requestExists && (
                <Button className="primary-button mr-20 item" htmlType="submit">
                  Submit
                </Button>
              )}
              {requestExists && (
                <>
                  <Button className="primary-button mr-20 item">Update</Button>
                  <Button className="outline-primary-button mr-20 item">
                    Delete
                  </Button>
                </>
              )}
              <Button
                onClick={handleCancel}
                className="outline-secondary-button"
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
