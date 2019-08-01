import HTTP from '@/api'
import BASE_URL from '@/api/config'
import axios from 'axios'

const TargetURL = '/n3n.sop.ccpyInfo'

export default {
  // 협력업체목록조회
  getAllList: (payload) => {
    return HTTP.post(`${TargetURL}.selectCcpyInfoList.do`, payload)
  },
  // 협력업체상세정보조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectCcpyDetailInfo.do`, payload)
  },
  // 협력업체정보저장
  updatePartnerInfo: (payload) => {
    return HTTP.post(`${TargetURL}.saveCcpyInfo.do`, payload)
  },
  // 협력업체정보등록
  createPartnerInfo: (payload) => {
    return HTTP.post(`${TargetURL}.insertCcpyInfo.do`, payload)
  },
  // 협력업체직원정보저장
  updateEmployee: (payload) => {
    return HTTP.post(`${TargetURL}.saveCcpyEmpInfo.do`, payload)
  },
  // 협력업체직원정보등록
  createEmployee: (payload) => {
    return HTTP.post(`${TargetURL}.insertCcpyEmpInfo.do`, payload)
  },
  // 파일업로드
  fileUpload: (payload) => {
    return axios.post(`${BASE_URL}${TargetURL}.uploadCcpyExcelFile.do`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  // 업로드샘플
  fileSampleUpload: (param) => {
    location.href = `${BASE_URL}${TargetURL}.selectCcpyExcelDownLoad.do`
  },
  // 파일다운로드
  fileDownload: (param) => {
    var url = `${BASE_URL}${TargetURL}.selectCcpyDetailExcelInfo.do`
    var form = '<form action=' + url + " method='post'>"
    if (param != null && typeof param !== 'undefined') {
      $.each(param, function (index, value) {
        form += "<input type='hidden' name=" + index + ' value=' + value + ' />'
      })
    }
    // form += "<input type='hidden' name='resultData' value='"+postData+"' />"
    form += '</form>'
    $(form).appendTo('body').submit().remove()
    // location.href = `${BASE_URL}${TargetURL}.selectCcpyDetailExcelInfo.do`
  }
}
