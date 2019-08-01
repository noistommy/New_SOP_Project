import HTTP from '@/api'

const TargetURL = '/n3n.sop.EqpmnFgManage'

export default {
  // 장비구분관리목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectEqpmnFgManageList.do`, {})
  },
  // 장비구분별센서목록조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectEqpmnFgSensorList.do`, payload)
  },
  // 장비구분상세정보수정
  updateItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveEqpmnFgDetailInfo.do`, payload)
  }
}
