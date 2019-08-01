<template lang="pug">
  div.modal.user-editor
    div.modal-header 운영자{{type}}
    div.modal-content
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td 코드그룹
                td
                  div.field
                    label
                    input(type="text", v-model="codeGroup.cmmnCd")
                td 코드그룹명
                td
                  div.field
                    label
                    input(type="text", v-model="codeGroup.cmmnCdNm")
              tr
                td.center.aligned
                  span 사용여부
                td
                  div.ui.toggle.checkbox(@click="toggleCheck")
                    input(type="checkbox", :checked="alarmYn")
                    label 허용
    div.modal-footer
      div.btnSet.center
        template(v-if="type=='group'")
          button.ui.button.blue(@click="updateCodeGroup") 등록
        template(v-else)
          button.ui.button.blue(@click="updateCode") 저장
        button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'insert-code-group',
  components: {
  },
  props: {
    codeData: Object,
    type: String
  },
  data () {
    return {
      codeGroup: {
        cmmnCd: '',
        cmmnCdNm: '',
        useYn: 'Y'
      }
    }
  },
  created () {
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  computed: {
    alarmYn () {
      return this.codeGroup.useYn === 'Y'
    }
  },
  methods: {
    updateCodeGroup () {
      const requestData = JSON.stringify(this.codeGroup)
      PublicCodeApi.updateCodeGroup(requestData).then(result => {
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateCode () {
      const requestData = JSON.stringify(this.codeData)
      PublicCodeApi.updateCodeItem(requestData).then(result => {
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    toggleCheck () {
      this.codeGroup.useYn = this.codeGroup.useYn === 'Y' ? 'N' : 'Y'
    }
  }
}
</script>

<style lang="less" scoped>
.ui.table {
  td:nth-child(odd) {
    text-align: center;
    min-width: 100px;
    background-color: #f9fafb;
  }
}

</style>
