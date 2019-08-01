import HTTP from '@/api'

const TargetURL = '/n3n.sop.Notice'

export default {
  // 공지사항목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectNoticeList.do`, payload)
  },
  // 공지사항상세조회
  getItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectNoticeDetail.do`, payload)
  },
  // 공지사항저장
  setItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveNotice.do`, payload)
  },
  // 공지사항수정
  updateItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveNotice.do`, payload)
  },
  // 공지사항목록삭제
  deleteItem: (payload) => {
    return HTTP.post(`${TargetURL}.deleteNotice.do`, payload)
  }
}
