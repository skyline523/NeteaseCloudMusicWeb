import { createFetch } from '@vueuse/core'
import { message } from 'ant-design-vue'

export const useFetch = createFetch({
  baseUrl: 'https://netease-cloud-music-api-skyline523.vercel.app',
  options: {
    async beforeFetch({ options }) {
      // send token

      return { options }
    },
    async onFetchError({ error }) {
      message.error(error)

      return error
    },
  },
})
