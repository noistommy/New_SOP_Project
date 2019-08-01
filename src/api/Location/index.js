import HTTP from '@/api'

const TargetURL = '/n3n.sop.BuldManage'

export default {
  // 건물관리목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectBuldManageList.do`, {})
  },
  // 건물층정보목록조회
  getItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectBuldFloorInfoList.do`, payload)
  },
  // 건물층정보목록수정
  updateItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveBuldDetailInfo.do`, payload)
  },
  // 건물 및 층 목록 조회
  locationList: () => {
    return HTTP.post(`${TargetURL}.selectSopBuldFloorList.do`, {})
  }
}
