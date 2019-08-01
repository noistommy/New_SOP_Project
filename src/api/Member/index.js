import HTTP from '@/api'

const TargetURL = '/n3n.sop.OrgnztInfo'

export default {
  // 조직도 목록조회
  getTree: () => {
    return HTTP.post(`${TargetURL}.selectOrgnztInfoTrList.do`, {})
  },
  // 조직직원목록조회
  getItems: (payload) => {
    return HTTP.post(`${TargetURL}.selectDeptEmpInfoList.do`, payload)
  }
}
