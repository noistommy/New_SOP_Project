import HTTP from '@/api'

const TargetURL = '/n3n.sop.SopCntcManage'

export default {
  // SOP 연계관리조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectSopCntcManageInfo.do`, {})
  },
  // SOP 선택팝업조회
  getPopupItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopChoisePopupList.do`, payload)
  },
  // SOP 선택팝업실행
  selectRunSop: (payload) => {
    return HTTP.post(`${TargetURL}.updateSensorAlarmExecuteSopId.do`, payload)
  },
  // SOP 오작동 처리
  setErrorSop: (payload) => {
    return HTTP.post(`${TargetURL}.updateSensorAlarmMalfuncYn.do`, payload)
  },
  // SOP 실행 처리
  runSopInfo: (payload) => {
    return HTTP.post(`${TargetURL}.selectLegacySopExecut.do`, payload)
  },
  // SOP 생성
  createItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveSopManageInfo.do`, payload)
  },
  // SOP 삭제
  deleteItem: (payload) => {
    return HTTP.post(`${TargetURL}.deleteSopManageInfo.do`, payload)
  },
  // sop 실행권한조회
  checkRunFlag: (payload) => {
    return HTTP.post(`/n3n.sop.SopExecutManage.selectSopExecutAuthorFlag.do`, payload)
  },
  // 기존 sop 실행
  saveLegacySop: (payload) => {
    return HTTP.post(`${TargetURL}.saveLegacySopCtrlObtain.do`, payload)
  }
}
