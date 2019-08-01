<template lang="pug">
  div.modal.user-editor
    div.modal-header {{title}} {{type === 'new' ? '신규' : '편집'}}
    div.modal-content
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr(v-if="item=='code'", v-show="true")
                td.center.aligned
                  span 코드그룹
                td
                  div.field
                    label
                    input(type="text", v-model="codeData.upperCmmnCd", readonly).readonly
              tr
                td.center.aligned
                  span(v-if="item=='group'") 코드그룹
                  span(v-else) 코드
                td
                  div.field
                    label
                    input(v-if="type=='new'", type="text", v-model="codeData.cmmnCd", maxlength="4")
                    input(v-else, type="text", v-model="codeData.cmmnCd", readonly).readonly
              tr
                td.center.aligned
                  span(v-if="item=='group'") 코드그룹명
                  span(v-else) 코드명
                td
                  div.field
                    label
                    input(type="text", v-model="codeData.cmmnCdNm" maxlength="15")
              tr(v-if="item=='code'")
                td.center.aligned
                  span 표시순서
                td
                  div.field
                    label
                    input(type="number", v-model="codeData.indictOrdr", default="0", min="0", max="99", @keyup="setLimitValue")
              tr
                td.center.aligned
                  span 사용여부
                td
                  div.ui.toggle.checkbox(@click="toggleCheck")
                    input(type="checkbox",
                      v-model="codeData.useYn",
                      true-value="Y",
                      false-value="N")
                    label 사용
    div.modal-footer
      div.btnSet.center
        template(v-if="item === 'group'")
          button.ui.button.blue(@click="updateCodeGroup") {{type === 'new' ? '등록' : '편집'}}
        template(v-else)
          button.ui.button.blue(@click="updateCode") {{type === 'new' ? '등록' : '편집'}}
        button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'code-editor',
  components: {
  },
  props: {
    data: Object,
    title: String,
    type: String,
    item: String
  },
  data () {
    return {
      codeData: {}
    }
  },
  created () {
    this.codeData = this.data
  },
  mounted () {
    $('.ui.radio.checkbox').checkbox()
  },
  methods: {
    toggleCheck () {
      this.codeData.useYn = this.codeData.useYn === 'Y' ? 'N' : 'Y'
    },
    updateCodeGroup () {
      const requestData = JSON.stringify(this.codeData)
      if (this.type === 'new') {
        PublicCodeApi.insertCodeGroup(requestData).then(result => {
          this.$emit('close')
          this.showDailog()
        }).catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
      } else {
        PublicCodeApi.updateCodeGroup(requestData).then(result => {
          this.$emit('close')
          this.showDailog()
        }).catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
      }
    },
    updateCode () {
      const requestData = JSON.stringify(this.codeData)
      if (this.type === 'new') {
        PublicCodeApi.insertCodeItem(requestData).then(result => {
          this.$emit('close')
          this.showDailog()
        }).catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
      } else {
        PublicCodeApi.updateCodeItem(requestData).then(result => {
          this.$emit('close')
          this.showDailog()
        }).catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
      }
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: ''
      }
      if (this.item === 'group') {
        options.text = '그룹코드가 '
      } else {
        options.text = '코드가 '
      }
      if (this.type === 'new') {
        options.text += '생성되었습니다'
      } else {
        options.text += '수정되었습니다'
      }
      this.$modal.show('dialog', options)
    },
    setLimitValue (event) {
      if (event.target.value > 99) {
        this.codeData.indictOrdr = event.target.value.substring(0, 2)
      }
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
