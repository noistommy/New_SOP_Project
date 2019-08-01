
const actionItemsList = [
  { actionCode: 'ActionSms', name: '문자' },
  // { actionCode: 'ActionBroad', name: '방송1' },
  { actionCode: 'ActionBroadOnOff', name: '방송' },
  { actionCode: 'ActionOrder', name: '지시사항' }
]

const sopMenuList = {
  defaultTab: 'sop-list',
  tabList: [
    { name: '재난관리조회', pathName: 'sop-list', default: true, icon: '', type: 'list' },
    { name: '재난관리생성', pathName: 'sop-edit', default: false, icon: '', type: 'new' },
    { name: '재난관리실행', pathName: 'sop-run', default: false, icon: '', type: 'run' }
  ]
}

const memberMenuList = {
  defaultTab: 'membergroup',
  tabList: [
    { name: '조직도관리', pathName: 'membergroup', default: true, icon: '' },
    { name: '자위소방대관리', pathName: 'firebrigade', default: false, icon: '' },
    { name: '협력업체관리', pathName: 'partner', default: false, icon: '' }
  ]
}

const historyMenuList = {
  defaultTab: 'sophistory',
  tabList: [
    { name: 'SOP실행이력', pathName: 'sophistory', default: true, icon: '' },
    { name: 'SMS전송이력', pathName: 'smshistory', default: false, icon: '' },
    { name: '센서탐지이력', pathName: 'sensorhistory', default: false, icon: '' }
  ]
}

const standardInfoMenuList1 = {
  defaultTab: 'location-info',
  tabList: [
    { name: '건물/층관리', pathName: 'location-info', default: true, icon: '' },
    { name: '장비유형관리', pathName: 'sensor-type', default: false, icon: '' },
    { name: '표준문자관리', pathName: 'standard-sms', default: false, icon: '' },
    // { name: '표준방송관리', pathName: 'standard-broad', default: false, icon: '' },
    { name: '공통코드관리', pathName: 'public-code', default: false, icon: '' },
    { name: '공지사항', pathName: 'notice-manage', default: false, icon: '' },
    { name: '운영자관리', pathName: 'system-user', default: false, icon: '' }
  ]
}

const standardInfoMenuList2 = {
  defaultTab: 'standard-sms',
  tabList: [
    { name: '표준문자관리', pathName: 'standard-sms', default: false, icon: '' },
    { name: '표준방송관리', pathName: 'standard-broad', default: false, icon: '' },
    { name: '공지사항', pathName: 'notice-manage', default: false, icon: '' }
  ]
}
// MAIN TABLE
const mainSopHistoryHeader = {
  headers: [
    { text: '실행일시', align: 'center', value: 'executBeginDt', size: 'three' },
    { text: '재난절차', align: 'center', value: 'msfrtnKndCdNm', size: 'two' },
    { text: 'SOP', align: 'center', value: 'sopTitle', size: 'six' },
    { text: '위치', align: 'center', value: 'buldNm', size: 'four' }
  ]
}
// sms전송이력
const mainSmsHistoryHeader = {
  headers: [
    { text: '날짜', align: 'center', value: 'regDt', size: 'three' },
    { text: '위치', align: 'center', value: 'buldNm', size: 'four' },
    { text: '전송인원', align: 'center', value: 'cnt', size: 'two' },
    { text: '전송내용', align: 'center', value: 'smsContents', size: 'six' }
  ]
}

// TABLE HEADER
// 실행이력
const sopHistoryTableHeader = {
  headers: [
    { text: '실행일시', align: 'center', value: 'executBeginDt', size: 'four' },
    { text: '실행모드', align: 'center', value: 'executFgCdNm', size: 'one' },
    { text: '재난절차', align: 'center', value: 'msfrtnKndCdNm', size: 'one' },
    { text: '위기발령단계', align: 'center', value: 'crisisGnfdStepNm', size: 'two' },
    { text: 'SOP', align: 'center', value: 'sopTitle', size: 'three' },
    { text: '위치', align: 'center', value: 'buldNm', size: 'three' },
    { text: '담당자', align: 'center', value: 'oprtrNm', size: '' }
  ]
}
// sms전송이력
const smsHistoryTableHeader = {
  headers: [
    { text: '날짜', align: 'center', value: 'regDt', size: '' },
    { text: '위치', align: 'center', value: 'buldNm', size: '' },
    { text: '전송인원', align: 'center', value: 'cnt', size: '' },
    { text: '전송내용', align: 'center', value: 'smsContents', size: 'six' },
    { text: '완료', align: 'center', value: 'result', size: '' }
  ]
}
// 센서탐지이력
const sensorHistoryTableHeader = {
  headers: [
    { text: '감사일자', align: 'center', value: 'prcpDt', size: '' },
    { text: '오작동여부', align: 'center', value: 'date', size: '' },
    { text: '센서종류', align: 'center', value: 'location', size: '' },
    { text: '센서아이디', align: 'center', value: 'sensorId', size: '' },
    { text: '발생위치', align: 'center', value: 'buldId', size: 'three' },
    { text: 'SOP명', align: 'center', value: 'sopTitle', size: 'three' },
    { text: '담당자', align: 'center', value: 'endtime', size: '' },
    { text: '처리상태', align: 'center', value: 'endtime', size: 'one' }
  ]
}
// 공지사항
const noticeTableHeader = {
  headers: [
    { text: '제목', align: 'center', value: 'date', size: 'five' },
    { text: '게시시간', align: 'center', value: 'endtime', size: '' },
    { text: '작성자', align: 'center', value: 'manager', size: '' },
    { text: '작성일', align: 'center', value: 'title', size: '' }
  ]
}
// 조직도
const memberGroupeHeader = {
  headers: [
    { text: '이름', align: 'center', value: 'emplNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
    { text: '부서', align: 'center', value: 'deptNm', size: '' },
    { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: 'four' }
  ]
}
// 자위소방대
const fireBrigadeGroupHeader = {
  headers: [
    { text: '이름', align: 'center', value: 'emplNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
    { text: '부서', align: 'center', value: 'deptNm', size: '' }
  ]
}
// 협력업체
const partnerGroupeHeader = {
  headers: [
    { text: '협력업체', align: 'center', value: 'emplNm', size: '' },
    { text: '이름', align: 'center', value: 'emplNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: '' }
  ]
}
// 건물/층 관리 - 건물관리
const locationInfoHeader = {
  headers: [
    { text: '건물ID', align: 'center', value: 'buldId', size: 'eight' },
    { text: '건물명', align: 'center', value: 'buldNm', size: 'eight' }
  ]
}
// 건물/층 관리 - 건물층 정보
const locationFloorHeader = {
  headers: [
    { text: '층정보', align: 'center', value: 'buldFloor', size: '' },
    { text: '알람허용여부', align: 'center', value: 'alarmPermYn', size: '' }
  ]
}
// 장비관리-장비구분관리
const sensorTypeHeader = {
  headers: [
    { text: '종류', align: 'center', value: 'eqpmnClId', size: 'six' },
    { text: '종류명', align: 'center', value: 'eqpmnClNm', size: 'eight' }
  ]
}
// 장비관리-구분별 센서 목록
const sensorByTypeHeader = {
  headers: [
    { text: 'ID', align: 'center', value: 'iwId', size: 'one' },
    { text: '센서명', align: 'center', value: 'sensorNm', size: '' },
    { text: '건물명', align: 'center', value: 'buldNm', size: '' },
    { text: '건물층', align: 'center', value: 'buldFloor', size: 'two' },
    { text: '알람허용여부', align: 'center', value: 'alarmPermYn', size: 'three' }
  ]
}
// 표준문자관리
const standardSmsHeader = {
  headers: [
    { text: '문자제목', align: 'center', value: 'smsTitle', size: 'twelve' },
    { text: '사용여부', align: 'center', value: 'useYn', size: 'four' }
  ]
}
// 표준방송관리
const standardBroadHeader = {
  headers: [
    { text: '방송제목', align: 'center', value: 'brdcstTitle', size: 'twelve' },
    { text: '사용여부', align: 'center', value: 'useYn', size: 'four' }
  ]
}
// 공통코드-공통코드 관리
const publicCodeHeader = {
  headers: [
    { text: '코드그룹', align: 'center', value: 'cmmnCd', size: '' },
    { text: '코드그룹명', align: 'center', value: 'cmmnCdNm', size: '' },
    { text: '사용여부', align: 'center', value: 'useYn', size: '' }
  ]
}
// 공통코드-공통코드 상세목록
const publicCodeDetailHeader = {
  headers: [
    { text: '코드', align: 'center', value: 'cmmnCd', size: '' },
    { text: '코드명', align: 'center', value: 'cmmnCdNm', size: '' },
    { text: '표시순서', align: 'center', value: 'indictOrdr', size: '' },
    { text: '사용여부', align: 'center', value: 'useYn', size: '' },
    { text: '파라미터1', align: 'center', value: 'userData1', size: '' },
    { text: '파라미터2', align: 'center', value: 'userData2', size: '' },
    { text: '파라미터3', align: 'center', value: 'userData3', size: '' },
    { text: '파라미터4', align: 'center', value: 'userData4', size: '' },
    { text: '파라미터5', align: 'center', value: 'userData5', size: '' }
  ]
}
// 운영자 관리
const systemUserHeader = {
  headers: [
    { text: '운영자ID', align: 'center', value: 'oprtrId', size: '' },
    { text: '운영자명', align: 'center', value: 'oprtrNm', size: '' },
    { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: '' },
    { text: '운영권한', align: 'center', value: 'oprtrFgCdNm', size: '' }
  ]
}

// 재난절차목록
const sopListHeader = {
  headers: [
    { text: 'SOP아이디', align: 'center', value: 'sopId', size: '' },
    { text: '재난종류', align: 'center', value: 'msfrtnKndCdNm', size: '' },
    { text: '위기발령단계', align: 'center', value: 'crisisGnfdStepNm', size: '' },
    { text: 'SOP제목', align: 'center', value: 'sopTitle', size: 'eight' }
  ]
}

// 재난절차목록
const sopRunHistoryHeader = {
  headers: [
    { text: '실행일자', align: 'center', value: 'regDt', size: '' },
    { text: '단계', align: 'center', value: 'stepSn', size: '' },
    { text: '종류', align: 'center', value: 'itemKndNm', size: '' },
    { text: '임무내용', align: 'center', value: 'contents', size: 'six' }
  ]
}

export {
  actionItemsList,
  sopMenuList,
  memberMenuList,
  historyMenuList,
  standardInfoMenuList1,
  standardInfoMenuList2,
  sopHistoryTableHeader,
  smsHistoryTableHeader,
  sensorHistoryTableHeader,
  noticeTableHeader,
  memberGroupeHeader,
  fireBrigadeGroupHeader,
  partnerGroupeHeader,
  locationInfoHeader,
  locationFloorHeader,
  sensorTypeHeader,
  sensorByTypeHeader,
  standardSmsHeader,
  standardBroadHeader,
  publicCodeHeader,
  publicCodeDetailHeader,
  systemUserHeader,
  mainSopHistoryHeader,
  mainSmsHistoryHeader,
  sopListHeader,
  sopRunHistoryHeader
}
