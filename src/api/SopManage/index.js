import HTTP from '@/api'

const TargetURL = '/n3n.sop.SopManage'
const TargetURL1 = '/n3n.sop.SopExecutManage'

export default {
  // SOP 목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopManageList.do`, payload)
  },
  // SOP 상세조회
  getItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopStepInfo.do`, payload)
  },
  // SOP 생성
  createItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveSopManageInfo.do`, payload)
  },
  // SOP 삭제
  deleteItem: (payload) => {
    return HTTP.post(`${TargetURL}.deleteSopManageInfo.do`, payload)
  },
  // SOP 삭제
  selectBuilding: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopBuldMapngList.do`, payload)
  },
  // SOP 정보
  getSopInfo: (payload) => {
    return HTTP.post(`${TargetURL1}.selectSopExecutManagerInfo.do`, payload)
  },
  // SOP 수동 실행
  runStepListByOper: (payload) => {
    return HTTP.post(`${TargetURL1}.insertSopExecutManage.do`, payload)
  },
  // SOP 실행
  runStepList: (payload) => {
    return HTTP.post(`${TargetURL1}.selectSopStepExecutMisnList.do`, payload)
  },
  // SOP Step Action 실행
  runStepAction: (payload) => {
    return HTTP.post(`${TargetURL1}.insertSopStepExecutInfo.do`, payload)
  },
  // SOP 종료
  closeSopList: (payload) => {
    return HTTP.post(`${TargetURL1}.updateSopEnd.do`, payload)
  },
  // 제어권 전달
  passOperation: (payload) => {
    return HTTP.post(`${TargetURL1}.updateSopExecutOprtr.do`, payload)
  },
  // sop 실행 이력
  getSophistoryList: (payload) => {
    return HTTP.post(`${TargetURL1}.selectSopStepExecutHistList.do`, payload)
  },
  // sop 수신자 트리 조회
  getRecieverTree: (payload) => {
    return HTTP.post(`/n3n.sop.SopDeptEmpl.selectSopCreatDeptTrList.do`, payload)
  },
  // sop 수신자 조회
  getRecieverList: (payload) => {
    return HTTP.post(`/n3n.sop.SlfdfnFbrdInfo.selectAllDeptEmpPopupList.do`, payload)
  }
}
