import HTTP from '@/api'

const TargetURL = '/n3n.sop.SmsManage'

export default {
  // 표준문자목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectStdSmsList.do`, payload)
  },
  // 표준문자상세정보조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectStdSmsDetailInfo.do`, payload)
  },
  // 표준문자정보저장
  updateDetail: (payload) => {
    return HTTP.post(`${TargetURL}.saveStdSmsInfo.do`, payload)
  },
  // 표준문자검증
  checkDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectStdSmsVrify.do`, payload)
  }
}
