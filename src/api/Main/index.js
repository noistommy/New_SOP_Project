import HTTP from '@/api'

const TargetURL = '/n3n.sop.SopCntcManage'

export default {
  // 메인 관제 조회
  getMainList: () => {
    return HTTP.post(`${TargetURL}.selectSopMainCntrl.do`, {})
  }
}
