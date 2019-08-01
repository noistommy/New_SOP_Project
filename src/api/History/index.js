import HTTP from '@/api'
import BASE_URL from '@/api/config'

const TargetURL = '/n3n.sop.SopExecutManage'

export default {
  // SOP 실행 이력 리스트
  getSOPList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndHistList.do`, payload)
  },
  // SOP 실행 이력 상세 리스트
  getSOPDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndStepHistList.do`, payload)
  },
  // SMS 전송 이력 리스트
  getSMSList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutSmsHistList.do`, payload)
  },
  // 센서 탐지 이력 리스트
  getSensorList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSensorDetctHistList.do`, payload)
  },
  // SOP 실행 이력 다운로드
  getSOPExcel: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndHistListExcel.do`, payload)
  },
  // SMS 전송 이력 리스트
  getSMSExcel: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutSmsHistListExcel.do`, payload)
  },
  // 센서 탐지 이력 리스트
  getSensorExcel: (payload) => {
    return HTTP.post(`${TargetURL}.selectSensorDetctHistListExcel.do`, payload)
  },
  // SOP 실행 종료
  updateSopEnd: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopEnd.do`, payload)
  },
  // SOP 제어권 전달
  controlOutSop: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopExecutOprtr.do`, payload)
  },
  sopHistoryDownload: (param) => {
    var url = `${BASE_URL}${TargetURL}.selectSopExecutEndHistListExcel.do`
    var form = '<form action=' + url + " method='post'>"
    if (param != null && typeof param !== 'undefined') {
      $.each(param, function (index, value) {
        form += "<input type='hidden' name=" + index + ' value=' + value + ' />'
      })
    }
    form += '</form>'
    $(form).appendTo('body').submit().remove()
  },
  smsHistoryDownload: (param) => {
    var url = `${BASE_URL}${TargetURL}.selectSopExecutSmsHistListExcel.do`
    var form = '<form action=' + url + " method='post'>"
    if (param != null && typeof param !== 'undefined') {
      $.each(param, function (index, value) {
        form += "<input type='hidden' name=" + index + ' value=' + value + ' />'
      })
    }
    form += '</form>'
    $(form).appendTo('body').submit().remove()
  },
  sensorHistoryDownload: (param) => {
    var url = `${BASE_URL}${TargetURL}.selectSensorDetctHistListExcel.do`
    var form = '<form action=' + url + " method='post'>"
    if (param != null && typeof param !== 'undefined') {
      $.each(param, function (index, value) {
        form += "<input type='hidden' name=" + index + ' value=' + value + ' />'
      })
    }
    form += '</form>'
    $(form).appendTo('body').submit().remove()
  },
  sopHistoryDetailDownload: (param) => {
    var url = `${BASE_URL}${TargetURL}.selectSopExecutEndStepHistListExcel.do`
    var form = '<form action=' + url + " method='post'>"
    if (param != null && typeof param !== 'undefined') {
      $.each(param, function (index, value) {
        form += "<input type='hidden' name=" + index + ' value=' + value + ' />'
      })
    }
    form += '</form>'
    $(form).appendTo('body').submit().remove()
  }
}
