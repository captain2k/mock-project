import { getLocalStorageItem } from '../helpers/handleLocalStorageItems/index'
import axiosInstance from './axiosInstance'

const useAxiosPrivate = () => {
  axiosInstance.interceptors.request.use(
    (configs) => {
      const accessToken = getLocalStorageItem('accessToken')
      if (accessToken) {
        configs.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return configs
    },
    (error) => {
      Promise.reject(error)
    },
  )
  return axiosInstance
}

export default useAxiosPrivate
