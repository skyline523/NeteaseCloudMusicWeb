import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'

function wrapUrl(config: InternalAxiosRequestConfig) {
  if (config.method === 'get') {
    if (config.url?.includes('?'))
      config.url = `${config.url}&timestamp=${Date.now()}`
    else
      config.url = `${config.url}?timestamp=${Date.now()}`
  }

  return config
}

const axiosInstance = axios.create({
  baseURL: 'https://netease-cloud-music-api-skyline523.vercel.app',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    return wrapUrl(config)
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 200)
      return Promise.resolve(response.data)
    else
      return Promise.reject(response)
  },
  (error) => {
    if (error?.message?.includes?.('timeout'))
      message.error('请求超时')
    else
      message.error(error)

    Promise.reject(error)
  },
)

function request<ResponseType = unknown>(url: string, options?: AxiosRequestConfig<unknown>): Promise<ResponseType> {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options,
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}

export { axiosInstance, request }
