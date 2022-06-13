import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubmitLateEarlyLoading,
  submitLateEarly,
} from '../../../../store/reducer/submitLateEarlySlice'

import '../../../../styles/index.scss'
import changeFormatDate from '../../../../utils/helpers/handleTime/changeFormatDate'
import changeTimeNumberToHour from '../../../../utils/helpers/handleTime/changeTimeNumberToHour'
import changeTimeToMint from '../../../../utils/helpers/handleTime/changeTimeToMint'
import './LateEarly.scss'

export default function LateEarly({
  isLateEarlyVisible,
  setIsLateEarlyVisible,
}) {
  // lấy từ bảng worksheet */
  const registerForDate = '19/02/2022'
  const checkInTime = '08:15'
  const checkOutTime = '17:01'
  const lateTime = '0:15'
  const earlyTime = '00:00'
  // eslint-disable-next-line
  const [requestExists, setRequestExists] = useState(false)
  // const [overtime, setOvertime] = useState('00:16')
  // const [overtimeNumber, setOvertimeNumber] = useState(960)

  // redux
  const dispatch = useDispatch()
  const loadingSubmit = useSelector(getSubmitLateEarlyLoading)

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const handleCancel = () => {
    setIsLateEarlyVisible(false)
  }

  const onFinish = (values) => {
    const newRequest = {
      created_at: moment().format('DD-MM-YYYY HH:mm'),
      request_type: 4,
      request_for_date: changeFormatDate(registerForDate),
      check_in: checkInTime,
      check_out: checkOutTime,
      compensation_date: changeFormatDate(
        values['date-cover-up'].format('DD/MM/YYYY'),
      ),
      compensation_time: '00:16',
      reason: values['reason'],
    }
    console.log(newRequest)
    dispatch(submitLateEarly(newRequest))
    setIsLateEarlyVisible(false)
  }

  const deleteRequest = () => {
    const deleteRequest = {
      request_type: 4,
      request_for_date: registerForDate,
      action: 'delete',
    }
    console.log(deleteRequest)
  }

  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
  }

  // Hàm tính toán thời gian

  const earlyNumber = Number(changeTimeToMint(earlyTime))
  const lateNumber = Number(changeTimeToMint(lateTime))

  const requestTimeNumber =
    (lateNumber > 0 ? lateNumber : 0) + (earlyNumber > 0 ? earlyNumber : 0)
  const requestTime = changeTimeNumberToHour(requestTimeNumber)

  // get date, time
  const date = moment().format('DD-MM-YYYY')
  // format datePicker
  const dateFormat = 'DD/MM/YYYY'
  // the day before
  const dateBefore = moment().subtract(1, 'days').format('DD/MM/YYYY')
  return (
    <Modal
      title="Register Late Early"
      visible={isLateEarlyVisible}
      onCancel={handleCancel}
      width="80%"
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
            <h4 className="w-140 mr-20">Late time:</h4>
            {/* lấy thời gian check-in trừ 08:00 */}
            <span className="time">{lateNumber > 0 && lateTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="early_time">
            <h4 className="col-order-2 mr-20">Early time:</h4>
            {/* lấy 17:00 trừ thời gian check-out  */}
            <span className="time">{earlyNumber > 0 && earlyTime}</span>
          </Col>
        </Row>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{
            'date-cover-up': moment(dateBefore, dateFormat),
          }}
        >
          <Row>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              className="date_cover_up item"
            >
              <Form.Item
                name={'date-cover-up'}
                label="Date cover up:"
                rules={[
                  {
                    type: 'object',
                    required: true,
                    message: 'Please select date!',
                  },
                ]}
              >
                {/* <div className="date-picker"> */}
                <DatePicker
                  format={dateFormat}
                  className="outlinePrimaryButton"
                />
                {/* </div> */}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <div className="overtime_time-request item">
                <div className="overtime">
                  <span>Overtime:</span>
                  {/* thời gian in_office ngày date cover up của worksheet - 9h */}
                  <span style={{ marginLeft: '6px' }}>
                    {/* {overtime} */}
                    00:16
                  </span>
                </div>
                <div>
                  <span>Time request:</span>
                  {/* Thời gian late cộng early */}
                  <span
                    style={{
                      marginLeft: '6px',
                      // color: `${requestTimeNumber > overtimeNumber && 'red'}`,
                    }}
                  >
                    {requestTime}
                  </span>
                </div>
              </div>
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
                <Button
                  className="primary-button mr-20 item"
                  htmlType="submit"
                  loading={loadingSubmit}
                >
                  Submit
                </Button>
              )}
              {requestExists && (
                <>
                  <Button className="primary-button mr-20 item">Update</Button>
                  <Button
                    className="outline-primary-button mr-20 item"
                    onClick={deleteRequest}
                  >
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
