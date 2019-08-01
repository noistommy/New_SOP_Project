import HTTP from '@/api'

const TargetURL = '/n3n.sop.OprtrInfo'

export default {
  // 로그인
  login: (payload) => {
    return HTTP.post(`${TargetURL}.login.do`, payload)
  },
  logout: () => {
    return HTTP.post(`${TargetURL}.logout.do`, {})
  },
  session: () => {
    return HTTP.post(`${TargetURL}.sessionInfo.do`, {})
  }
}
