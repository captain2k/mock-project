import { SyncOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const CustomSpinIcon = (
  <SyncOutlined
    style={{
      fontSize: 24,
      color: '#7367f0',
    }}
    spin
  />
)

const CustomSpin = () => {
  return <Spin indicator={CustomSpinIcon} />
}

export default CustomSpin
