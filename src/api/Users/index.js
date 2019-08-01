import HTTP from '@/api'

const TargetURL = '/n3n.sop.OprtrInfo'

export default {
  // 운영자관리목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectOprtrInfoList.do`, {})
  },
  // 운영자상세조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectOprtrInfoDetail.do`, payload)
  },
  // 운영자정보삭제
  deleteUser: (payload) => {
    return HTTP.post(`${TargetURL}.deleteOprtrInfo.do`, payload)
  },
  // 운영자정보등록
  createUser: (payload) => {
    return HTTP.post(`${TargetURL}.insertOprtrInfo.do`, payload)
  },
  // 운영자정보수정
  updateUser: (payload) => {
    return HTTP.post(`${TargetURL}.updateOprtrInfo.do`, payload)
  },
  // 운영자비밀번호초기화저장
  resetPasswordInit: (payload) => {
    return HTTP.post(`${TargetURL}.updatePasswordInit.do`, payload)
  },
  // 운영자비밀번호초기화저장
  resetPassword: (payload) => {
    return HTTP.post(`${TargetURL}.updatePassword.do`, payload)
  },
  // 운영자비밀번호초기화저장
  getInitPassword: (payload) => {
    return HTTP.post(`/n3n.sop.CmmnCd.selectCmmnCdOprtPw.do`, payload)
  }
}
