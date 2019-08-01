<template lang="pug">
  modal(name="reset-password", width = "350", :clickToClose="false", @before-open="setProps")
    div.modal
      div.modal-header {{title}}
      div.modal-content
        div.content-wrapper
          div.ui.form
            div.inline.field
              label 기존비밀번호
              input(type="password", v-model="resetData.oprtrPassword")
            div.inline.field
              label 새비밀번호
              input(type="password", v-model="resetData.newOprtrPassword")
            div.inline.field(:class="{error:errorMessage}")
              label 새비밀번호확인
              input(type="password", v-model="comfirmPassword")
              div.msgError.error(v-if="errorMessage")
                div {{errorMessage}}
        div.modal-footer
          div.btnSet.center
            button.ui.button.blue(@click="resetPassword") 저장
            button.ui.button(@click="$emit('close')") 취소
      div.modal-close(@click="$emit('close')")
          div.close X
</template>

<script>
import UsersApi from '@/api/Users'

export default {
  name: 'reset-password',
  components: {
  },
  data () {
    return {
      title: '',
      text: '',
      resetData: {
        oprtrId: '',
        oprtrPassword: '',
        newOprtrPassword: ''
      },
      comfirmPassword: '',
      errorMessage: ''
    }
  },
  created () {
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.text = event.params.text
      this.resetData.oprtrId = event.params.userId
    },
    resetPassword () {
      const requestData = JSON.stringify(this.resetData)
      if (this.resetData.oprtrPassword === '' || this.resetData.newOprtrPassword === '') {
        this.errorMessage = '데이터가 입력되지 않았습니다.'
      } else if (!this.isRightPassword()) {
        this.errorMessage = '입력하신 패스워드와 같지 않습니다.'
      } else {
        UsersApi.resetPassword(requestData).then(result => {
          this.$emit('close')
          location.reload()
        }).catch(error => {
          alert(error.response.data.msgValue)
        })
      }
    },
    isRightPassword () {
      return this.resetData.newOprtrPassword === this.comfirmPassword
    }
  }
}
</script>

<style lang="less" scoped>
.ui.form {
  .inline {
    label {
      width: 32%;
    }
  }
}

</style>
