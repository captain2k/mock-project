import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubmitLateEarlyLoading,
  submitLateEarly,
} from '../../../../store/reducer/submitLateEarlySlice'
import {
  getUpdateLateEarlyLoading,
  updateLateEarly,
} from '../../../../store/reducer/updateLateEarlySlice'

import '../../../../styles/index.scss'
import {
  calculateTime,
  changeFormatDate,
  changeTimeNumberToHour,
  changeTimeToMint,
} from '../../../../utils/helpers/handleTime/index'
import useAxiosPrivate from '../../../../utils/requests/useAxiosPrivate'
import './LateEarly.scss'

export default function LateEarly({
  data,
  isLateEarlyVisible,
  setIsLateEarlyVisible,
}) {
  // lấy từ bảng worksheet */
  const registerForDate = moment(data?.work_date).format('DD-MM-YYYY')
  const checkinData = data?.checkin_original || data?.checkin
  const checkInTime = checkinData ? moment(checkinData).format('HH:mm') : ''
  const checkoutData = data?.checkout_original || data?.checkout
  const checkOutTime = checkoutData ? moment(checkoutData).format('HH:mm') : ''
  const lateTime = calculateTime(checkInTime, '08:30')
  const earlyTime = calculateTime('17:30', checkOutTime)
  // eslint-disable-next-line
  const [overtime, setOvertime] = useState('00:00')
  const [overtimeNumber, setOvertimeNumber] = useState(0)

  const { Text } = Typography
  const [form] = Form.useForm()

  // redux
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const loadingSubmit = useSelector(getSubmitLateEarlyLoading)
  const loadingUpdate = useSelector(getUpdateLateEarlyLoading)

  console.log(data)

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const getDataByDate = async (date) => {
    const res = await axiosPrivate.get(`/worksheet/getByDate/${date}`)
    console.log(res)
    const inOffice = res.data?.in_office || '00:00'
    const time = '10:00'
    const overtime = calculateTime(inOffice, time)
    if (changeTimeToMint(overtime) > 0) {
      setOvertime(overtime)
      setOvertimeNumber(changeTimeToMint(overtime))
    } else {
      setOvertime('00:00')
      setOvertimeNumber(0)
    }
  }

  const handleChangeDate = (e) => {
    const date = moment(e).format('YYYY-MM-DD')
    getDataByDate(date)
  }

  const handleCancel = () => {
    form.setFieldsValue({
      'date-cover-up': moment(dateBefore, dateFormat),
      reason: '',
    })
    setIsLateEarlyVisible(false)
  }

  const onFinish = (values, e) => {
    const newRequest = {
      request_type: 4,
      request_for_date: changeFormatDate(registerForDate),
      checkin: checkInTime,
      checkout: checkOutTime,
      compensation_date: changeFormatDate(
        values['date-cover-up'].format('DD-MM-YYYY'),
      ),
      compensation_time: '00:16',
      reason: values['reason'],
    }
    if (data?.status === 0) {
      dispatch(updateLateEarly(newRequest))
    } else {
      dispatch(submitLateEarly(newRequest))
    }
    form.setFieldsValue({
      'date-cover-up': moment(dateBefore, dateFormat),
      reason: '',
    })
    setIsLateEarlyVisible(false)
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
              <p className="date">
                {data?.created_at
                  ? moment(data?.created_at).format('DD-MM-YYYY HH:mm')
                  : date}
              </p>
            </Row>
          </Col>
        </Row>

        <Row className="item">
          <Col>
            <h4 className="w-140 mr-20">Register for date:</h4>
          </Col>
          <Col>
            <p className="date">{registerForDate}</p>
          </Col>
        </Row>

        <Row className="item">
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="late_time">
            <h4 className="w-140 mr-20">Late time:</h4>
            <span className="time">{lateNumber > 0 && lateTime}</span>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="early_time">
            <h4 className="col-order-2 mr-20">Early time:</h4>
            <span className="time">{earlyNumber > 0 && earlyTime}</span>
          </Col>
        </Row>
        <Form
          form={form}
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
                <DatePicker
                  format={dateFormat}
                  className="outlinePrimaryButton"
                  onChange={(e) => handleChangeDate(e)}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <div className="overtime_time-request item">
                <div className="overtime">
                  <span>Overtime:</span>
                  <span style={{ marginLeft: '6px' }}>
                    {overtimeNumber > 0 ? overtime : '00:00'}
                  </span>
                </div>
                <div>
                  <span>Time request:</span>
                  <span
                    style={{
                      marginLeft: '6px',
                      color: `${
                        requestTimeNumber > overtimeNumber ? 'red' : 'black'
                      }`,
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
              <Input.TextArea
                autoSize={{ maxRows: 7, minRows: 4 }}
                rows={4}
                maxLength={100}
                className="flex-1"
              />
            </Form.Item>
          </Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="button-group">
              {!(data?.status || data?.status === 0) && (
                <>
                  <Button
                    className="primary-button mr-20 item"
                    htmlType="submit"
                    loading={loadingSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="outline-secondary-button"
                  >
                    Close
                  </Button>
                </>
              )}
              {data?.status === 0 && (
                <>
                  <Button
                    className="primary-button mr-20 item"
                    htmlType="submit"
                    loading={loadingUpdate}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="outline-secondary-button"
                  >
                    Close
                  </Button>
                </>
              )}

              {data?.status === -1 && (
                <Text type="warning">Your request has been rejected.</Text>
              )}
              {data?.status === 1 && (
                <Text type="success">Your request has been confirmed.</Text>
              )}
              {data?.status === 2 && (
                <Text type="success">Your request has been approved.</Text>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
