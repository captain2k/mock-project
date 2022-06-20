import { Button, Form, message, Modal } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import XIcon from '../../common/XIcon/XIcon'
import { convertTimeToIso } from '../../utils/helpers/convertTime'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems'
import useAxiosPrivate from '../../utils/requests/useAxiosPrivate'
import FormFirstLeft from './FormFirstLeft/FormFirstLeft'
import FormFirstRight from './FormFirstRight/FormFirstRight'
import FormSecond from './FormSecond/FormSecond'
import FormThirdLeft from './FormThirdLeft/FormThirdLeft'
import FormThirdRight from './FormThirdRight/FormThirdRight'
import './profile.scss'
import UserInfo from './UserInfo/UserInfo'

const Profile = ({ showProFileScreen, handleHideProfileScreen }) => {
  const [profileUser, setUserProfile] = useState({})

  const axiosPrivate = useAxiosPrivate()
  const [form] = Form.useForm()

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosPrivate.get(`/member/profile`)
      if (res) {
        setUserProfile(res.data.member)
      }
    }
    getUserProfile()
  }, [axiosPrivate, showProFileScreen])

  useEffect(() => {
    document.title = 'Edit Profile'
  }, [])

  const handleSubmit = async (values) => {
    const birth_date = moment(values['birth_date']).format('YYYY-MM-DD')
    const identity_card_date = moment(values['identity_card_date']).format(
      'YYYY-MM-DD',
    )
    let passport_expiration = null
    if (values['passport_expiration']) {
      passport_expiration = moment(values['passport_expiration']).format(
        'YYYY-MM-DD',
      )
    }
    let avatar = null
    let avatar_official = null
    if (values['avatar_official']) {
      avatar_official = getLocalStorageItem('officialAvatar')
    }
    if (values['avatar']) {
      avatar = getLocalStorageItem('subAvatar')
    }

    const updatedData = {
      ...values,
      birth_date,
      identity_card_date,
      passport_expiration,
      avatar,
      avatar_official,
    }
    const res = await axiosPrivate.put(`member/profile/update`, updatedData)
    if (res.status === 200) {
      handleHideProfileScreen()
      message.success('Update profile successfully!')
      handleHideProfileScreen()
    }
  }

  const handleError = (err) => {
    message.error('Update profile unsuccessfully!')
  }

  const handleShowDialog = () => {
    return Modal.confirm({
      title: 'Do you really want to cancel updating?',
      content: 'Everything will be not saved!',
      centered: true,
      onOk: () => {
        form.resetFields()
        handleHideProfileScreen()
      },
    })
  }

  const handleCancel = () => {
    return Modal.confirm({
      title: 'Do you really want to close this form?',
      content: 'Everything will be not saved!',
      centered: true,
      onOk: () => {
        handleHideProfileScreen()
        form.resetFields()
      },
    })
  }

  return (
    <>
      <Modal
        className="edit-profile-pop-up"
        visible={showProFileScreen}
        title="My profile"
        footer={null}
        closeIcon={<XIcon />}
        onCancel={handleCancel}
        onOk={() => handleHideProfileScreen()}
      >
        <div className="user-info-form">
          <Form
            name="userInfo"
            initialValues={{
              gender: profileUser?.gender,
              birth_date:
                profileUser?.birth_date &&
                moment(convertTimeToIso(profileUser?.birth_date)),
              identity_number: profileUser?.identity_number,
              identity_card_date:
                profileUser?.identity_card_date &&
                moment(convertTimeToIso(profileUser?.identity_card_date)),
              identity_card_place: profileUser?.identity_card_place,
              passport_number: profileUser?.passport_number,
              nationality: profileUser?.nationality,
              passport_expiration:
                profileUser?.passport_expiration &&
                moment(convertTimeToIso(profileUser?.passport_expiration)),
              nick_name: profileUser?.nick_name,
              other_email: profileUser?.other_email,
              skype: profileUser?.skype,
              facebook: profileUser?.facebook,
              bank_name: profileUser?.bank_name,
              bank_account: profileUser?.bank_account,
              marital_status: profileUser?.marital_status,
              academic_level: profileUser?.academic_level,
              permanent_address: profileUser?.permanent_address,
              temporary_address: profileUser?.temporary_address,
              tax_identification: profileUser?.tax_identification,
              insurance_number: profileUser?.insurance_number,
              healthcare_provider: profileUser?.healthcare_provider,
              emergency_contact_name: profileUser?.emergency_contact_name,
              emergency_contact_relationship:
                profileUser?.emergency_contact_relationship,
              emergency_contact_number: profileUser?.emergency_contact_number,
              start_date_official: profileUser?.start_date_official,
            }}
            scrollToFirstError
            onFinish={handleSubmit}
            onFinishFailed={handleError}
            form={form}
          >
            <UserInfo
              mail={profileUser?.email}
              memberCode={profileUser?.member_code}
              fullName={profileUser?.full_name}
              phoneNumber={profileUser?.phone}
              avatar_official={profileUser?.avatar_official}
              avatar={profileUser?.avatar}
            />
            <div className="user-info-form-first">
              {/* Left */}
              <FormFirstLeft />
              {/* Right */}
              <FormFirstRight />
            </div>
            <div className="user-info-form-second">
              <FormSecond />
            </div>
            <div className="user-info-form-third">
              <FormThirdLeft />
              <FormThirdRight />
            </div>
            <div className="btn-submit">
              <Form.Item>
                <Button
                  onClick={handleShowDialog}
                  className="outline-primary-button"
                >
                  Cancel
                </Button>
                <Button className="primary-button" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default Profile
