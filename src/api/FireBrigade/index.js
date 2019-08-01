import HTTP from '@/api'
import BASE_URL from '@/api/config'
import axios from 'axios'

const TargetURL = '/n3n.sop.SlfdfnFbrdInfo'

export default {
  TargetURL: '/n3n.sop.SlfdfnFbrdInfo',
  // 자위소방대트리목록조회
  getTreeList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdTrList.do`, payload)
  },
  // 소방대상세정보조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdDetailInfo.do`, payload)
  },
  // 자위소방대원정보저장
  setFiremanInfo: (payload) => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFgtMemberInfo.do`, payload)
  },
  // 자위소방대정보저장
  updateItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFbrdInfo.do`, payload)
  },
  // 상위소방대목록조회
  getUpperFireBrigade: () => {
    return HTTP.post(`${TargetURL}.selectUpperSlfdfnFbrdList.do`, {})
  },
  // 자위소방대원전체목록조회
  getAllFireman: () => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdEmpInfoAllList.do`, {})
  },
  // 자위소방대등록
  createItem: (payload) => {
    return HTTP.post(`${TargetURL}.insertSlfdfnFbrdInfo.do`, payload)
  },
  // 파일업로드
  fileUpload: (payload) => {
    return axios.post(`${BASE_URL}${TargetURL}.uploadSlfdfnFbrdExcelFile.do`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  // 업로드샘플
  fileSampleUpload: () => {
    location.href = `${BASE_URL}${TargetURL}.selectSlfdfnFbrdExcelDownLoad.do`
  },
  // 파일다운로드
  fileDownload: () => {
    location.href = `${BASE_URL}${TargetURL}.selectSlfdfnFbrdDetailExcelInfo.do`
  }
  // ,
  // // 파일다운로드
  // selectList: (payload) => {
  //   return HTTP.post(`${TargetURL}.slfdfnFbrdEmpInfoPopupList.do`, payload)
  // }
}
