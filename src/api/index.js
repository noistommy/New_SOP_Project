import axios from 'axios'
import BASE_URL from '@/api/config'

const apiConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default apiConfig
