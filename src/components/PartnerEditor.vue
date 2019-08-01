<template lang="pug">
  div.modal.user-editor
    div.modal-header {{title}} {{type === 'new' ? '등록' : '편집'}}
    div.modal-content
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td.center.aligned
                  span 협력업체명*
                td
                  div.field
                    span {{this.target.childCcpyNm}}
              tr
                td.center.aligned
                  span 사원명*
                td
                  div.field
                    label
                    input(type="text", v-model="partnerData.emplNm")
              tr
                td.center.aligned
                  span 직급명*
                td
                  div.field
                    label
                    input(type="text", v-model="partnerData.clsfNm")
              tr
                td.center.aligned
                  span 휴대전화번호*
                td
                  div.field
                    label
                    input(type="text", v-model="partnerData.moblphonNo")

    div.btnSet.center
      button.ui.button.blue(@click="createPartner", v-if="type === 'new'") 등록
      button.ui.button.blue(@click="updatePartner", v-else) 수정
      button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import PartnerApi from '@/api/Partner'
import { codeGenerator } from '@/util'

export default {
  name: 'partner-editor',
  components: {
  },
  props: {
    data: Object,
    title: String,
    type: String,
    item: String,
    target: Object
  },
  data () {
    return {
      partnerData: {}
    }
  },
  created () {
    this.partnerData = this.data
  },
  methods: {
    createPartner () {
      const requestData = JSON.stringify(this.partnerData)
      PartnerApi.createEmployee(requestData)
        .then(result => {
          console.log(result)
          this.$emit('close')
          this.showDailog()
        })
        .catch(error => {
          const err = error.response
          console.log(err)
          this.$emit('close')
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    updatePartner () {
      const requestData = JSON.stringify(this.partnerData)
      PartnerApi.updateEmployee(requestData)
        .then(result => {
          console.log(result)
          this.$emit('close')
          this.showDailog()
        })
        .catch(error => {
          const err = error.response
          console.log(err)
          this.$emit('close')
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: ''
      }
      if (this.type === 'new') {
        options.text += '생성되었습니다'
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
.error {
  color: #9f3a38;
}
.btnSet {
  position:absolute;
  padding: 15px 0;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  .ui.button {
    border-radius: 0 !important;
  }
}
.ui.table {
  td:nth-child(odd) {
    text-align: center;
    min-width: 100px;
    background-color: #f9fafb;
  }
}

</style>
