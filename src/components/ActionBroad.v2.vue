<template lang="pug">
  div.broad-action
    components(:is = 'selectBroadModal', @close="$modal.hide('select-broad')", @select="insertData")
    CheckMediaModal(@close="$modal.hide('check-msg-modal')")
    //- modals-container(@select="insertData")
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.green
        thead
          tr
            th.center.aligned
              div.type 방송
            th.right.aligned.wide.ten
              button.ui.button.basic.mini(@click="selectStandard") 선택
              button.ui.button.basic.mini(@click="checkBroadItem") 방송문구확인
            th.center.aligned
              div.ui.radio.checkbox
                input(type="checkbox", v-model="broadData.autoYn", true-value="Y", false-value="N")
                label 자동실행
            th.center.aligned
              button.ui.button.icon.basic.mini(@click="$emit('delete')")
                i.icon.close
        tbody
          tr
            td(colspan="4")
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='500',
                  v-model="broadData.brdcstContents",
                  @input="returnText")

          tr
            td(colspan="4")
              div.parameters
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 1
                      select(:id="1", @change="setCode", v-model="broadData.cmmnCd1")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :disabled="param.useYn === 'N'") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="broadData.userData1")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 2
                      select(:id="2", @change="setCode", v-model="broadData.cmmnCd2")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :disabled="param.useYn === 'N'") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="broadData.userData2")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 3
                      select(:id="3", @change="setCode", v-model="broadData.cmmnCd3")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :disabled="param.useYn === 'N'") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="broadData.userData3")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 4
                      select(:id="4", @change="setCode", v-model="broadData.cmmnCd4")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :disabled="param.useYn === 'N'") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="broadData.userData4")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 5
                      select(:id="5", @change="setCode", v-model="broadData.cmmnCd5")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :disabled="param.useYn === 'N'") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="broadData.userData5")
</template>

<script>
import StandardBroadApi from '@/api/StandardBroad'
import CheckTextCount from '@/components/CheckTextCount.vue'
import SelectBroadModal from '@/components/SelectBroadModal.vue'
import CheckMediaModal from '@/components/CheckMediaModal.vue'
import { codeGenerator } from '@/util'

export default {
  name: 'action-broad',
  props: {
    idx: Number,
    paramCode: Array,
    value: Object
  },
  data () {
    return {
      actionCheck: false,
      formType: 'textarea',
      textareaData: '',
      broadData: this.value,
      paramList: this.paramCode,
      paramData1: { code: '', name: '', data: '' },
      paramData2: { code: '', name: '', data: '' },
      paramData3: { code: '', name: '', data: '' },
      paramData4: { code: '', name: '', data: '' },
      paramData5: { code: '', name: '', data: '' },
      selectBroadModal: ''
    }
  },
  components: {
    CheckTextCount,
    SelectBroadModal,
    CheckMediaModal
  },
  created () {
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  methods: {
    returnText (text) {
      this.broadData.brdcstContents = text
    },
    selectStandard () {
      this.selectBroadModal = 'SelectBroadModal'
      setTimeout(() => {
        this.$modal.show('select-broad', {
          title: '표준방송 선택',
          type: 'ActionBroad',
          stepNo: this.broadData.stepNo,
          stepSn: this.broadData.stepSn
        })
      }, 100)
    },
    insertData (obj) {
      this.selectBroadModal = ''
      for (let key in obj) {
        this.broadData[key] = obj[key]
      }
    },
    setCode (event) {
      const index = event.target.id

      if (this[`paramData${index}`][`name`] !== '') {
        this.insertTextarea(this[`paramData${index}`][`name`])
      }

      this.paramList.forEach(e => {
        if (e.cmmnCd === this[`paramData${index}`][`code`]) {
          e.useYn = 'Y'
        }
        if (e.cmmnCd === event.target.value) {
          e.useYn = 'N'
        }
      })

      this.broadData[`userData${index}`] = ''
      this.broadData[`inputParam${index}`] = ''

      this[`paramData${index}`] = this.findCode(event.target.value, index)
      this.insertTextarea(this[`paramData${index}`][`name`])
      this.broadData[`inputParam${index}`] = this[`paramData${index}`][`name`]
      this.broadData[`userData${index}`] = this[`paramData${index}`][`data`]
    },
    findCode (code, i) {
      const value = {
        code: '',
        name: '',
        data: ''
      }
      this.paramList.forEach(e => {
        if (e.cmmnCd === code) {
          value.code = e.cmmnCd
          value.name = e.cmmnCdNm
          value.data = e.userData1
        }
      })
      return value
    },
    insertTextarea (name) {
      if (this.broadData.brdcstContents.indexOf(name) < 0) {
        this.broadData.brdcstContents = `${this.broadData.brdcstContents}${name} `
      } else {
        this.broadData.brdcstContents = this.broadData.brdcstContents.replace(name, '')
      }
    },
    checkBroadItem () {
      const requestData = JSON.stringify(this.broadData)
      StandardBroadApi.checkDetail(requestData)
        .then(result => {
          console.log(result)
          this.$modal.show('check-msg-modal', {
            title: '방송문구확인',
            data: result.data
          }, {
            width: '350px',
            height: 'auto',
            clickToClose: false
          })
        })
        .catch(error => {
          const err = error.response
          console.log(err)
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    }
  }
}
</script>

<style lang="less">
.action
  > div {
    padding: 10px 0;
  }
  .broad-action {
    .parameters {
      display: flex;
      flex-wrap: wrap;
      .parameter {
        width: 50%;
        .fields > div {
          padding: 0 5px;
        }
      }
    }
    .ui.table {
      th:nth-child(1) {
        width: 15%
      }
      td {
        overflow: visible;
      }
    }
  }
</style>
