import HTTP from '@/api'

const TargetURL = '/n3n.sop.CmmnCd'

export default {
  // 공통코드목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectCmmnCdGroupInfo.do`, payload)
  },
  // 공통코드상세정보조회
  getItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectCmmnCdDetailInfo.do`, payload)
  },
  // 공통코드상세정보조회(사용가능)
  getUseItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectCmmnCdDetailList.do`, payload)
  },
  // 공통코드그룹정보저장
  insertCodeGroup: (payload) => {
    return HTTP.post(`${TargetURL}.insertCmmnCdGroupInfo.do`, payload)
  },
  // 공통코드그룹정보수정
  updateCodeGroup: (payload) => {
    return HTTP.post(`${TargetURL}.updateCmmnCdGroupInfo.do`, payload)
  },
  // 공통코드상세정보저장
  insertCodeItem: (payload) => {
    return HTTP.post(`${TargetURL}.insertCmmnCdDetailInfo.do`, payload)
  },
  // 공통코드상세정보수정
  updateCodeItem: (payload) => {
    return HTTP.post(`${TargetURL}.updateCmmnCdDetailInfo.do`, payload)
  }
}
