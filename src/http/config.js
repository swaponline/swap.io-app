import { BASE_URL } from '@/constants/http'

const devEnv = process.env.NODE_ENV === 'development'

export default {
  baseURL: devEnv ? '/' : BASE_URL
}
