<template lang="pug">
  div.modal.user-editor
    div.modal-header 운영자{{type === 'new' ? '등록' : '수정'}}
    div.modal-content
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td ID*
                td
                  div.field
                    label
                    input(v-if="type=='new'", type="text", v-model="userData.oprtrId", @blur="checkUserId")
                    input(v-else, type="text", v-model="userData.oprtrId", readonly).readonly
                td 이름
                td
                  div.field
                    label
                    input(type="text", v-model="userData.oprtrNm")
              tr
                td 직위
                td
                  div.field
                    label
                    input(type="text", placeholder="직위", v-model="userData.ofcpsCdNm")
                td 직급
                td
                  div.field
                    label
                    input(type="text", placeholder="직급" v-model="userData.clsfCdNm")
              tr
                td 휴대전화
                td(:colspan='3')
                  div.field
                    label
                    input(type="text", v-model="userData.moblphonNo")
              tr
                td 권한설정
                td(:colspan='3')
                  div.inline.fields
                    div.field
                      div.ui.button.mini(@click="activeMode('S0400100')", :class="{blue:activeCode === 'S0400100'}") 관리자
                    div.field
                      div.ui.button.mini(@click="activeMode('S0400200')", :class="{blue:activeCode === 'S0400200'}") 운영자
              tr
                td 비밀번호
                td(v-if="type === 'new'", :colspan='3')
                  div.field
                    | {{initPw}}
                td(v-else, :colspan='3')
                  div.field
                    button.ui.button(@click="initPassword") 초기화
          div.error-message {{errorMsg}}
    div.modal-footer
      div.btnSet.center
        template(v-if="type=='new'")
          button.ui.button.blue(@click="createUser") 등록
        template(v-else)
          button.ui.button.blue(@click="updateUser") 저장
        button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import UsersApi from '@/api/Users'
import PublicCodeApi from '@/api/PublicCode'

export default {
  name: 'user-editor',
  components: {
  },
  props: {
    data: Object,
    type: String
  },
  data () {
    return {
      userData: this.data,
      option1: 'S0400100',
      option2: 'S0400200',
      errorMsg: '',
      initPw: '',
      activeCode: ''
    }
  },
  created () {
    if (this.type === 'new') {
      this.activeCode = 'S0400200'
      this.userData.oprtrFgCd = 'S0400200'
    } else {
      this.activeCode = this.userData.oprtrFgCd
    }
    this.spotInfo = this.getCodeList('S020')
    this.positionInfo = this.getCodeList('S030')
    this.getPassword()
  },
  mounted () {
    $('.ui.radio.checkbox').checkbox()
  },
  methods: {
    activeMode (mode) {
      this.userData.oprtrFgCd = mode
      this.activeCode = mode
    },
    getPassword () {
      const requestData = JSON.stringify({})
      UsersApi.getInitPassword(requestData).then(result => {
        this.initPw = result.data.userData1
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    },
    createUser () {
      const requestData = JSON.stringify(this.userData)
      UsersApi.createUser(requestData).then(result => {
        this.$emit('close')
        this.showDailog()
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    },
    updateUser () {
      const requestData = JSON.stringify(this.userData)
      UsersApi.updateUser(requestData).then(result => {
        this.$emit('close')
        this.showDailog()
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    },
    initPassword () {
      const requestData = JSON.stringify({
        oprtrId: this.userData.oprtrId
      })
      UsersApi.resetPasswordInit(requestData).then(result => {
        alert('비밀번호가 초기화 되었습니다.')
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    },
    getCodeList (code) {
      const requestData = JSON.stringify({
        cmmnCd: code
      })
      PublicCodeApi.getUseItem(requestData).then(result => {
        return result.data.cmmnCdGroupList
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    },
    checkUserId () {
      const requestData = JSON.stringify({
        oprtrId: this.userData.oprtrId
      })
      UsersApi.getDetail(requestData).then(result => {
        if (result.data.oprtrInfoDetail === null) {
          this.errorMsg = ''
          return false
        }
        if (this.userData.oprtrId === result.data.oprtrInfoDetail.oprtrId) {
          this.errorMsg = `[${this.userData.oprtrId}]는 이미 사용중입니다`
        }
      })
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: '운영자가'
      }
      if (this.type === 'new') {
        options.text += '등록되었습니다'
      } else {
        options.text += '수정되었습니다'
      }
      this.$modal.show('dialog', options)
    }
  }
}
</script>

<style lang="less" scoped>
.vue--dialog-overlay {
  z-index: 9999;
}
.msgError {
  text-align: center;
  font-size: 0.8rem;
}
.error {
  color: #9f3a38;
}
.ui.table {
  td:nth-child(odd) {
    text-align: center;
    min-width: 100px;
    background-color: #f9fafb;
  }
}
.error-message {
  height: 20px;
  text-align: right;
  font-size: 1rem;
  color:#f3302c;
  font-weight: bold;
}
</style>
