<template lang="pug">
  div.sms-action
    components(:is="recieverModal", @close="$modal.hide(`select-reciever`)", @reciever="setRecieverList")
    components(:is="selectSmsModal", @close="$modal.hide('select-sms')", @select="insertData")
    CheckMediaModal(@close="$modal.hide('check-msg-modal')")
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.blue
        thead
          tr
            th.center.aligned.wide.three
              div.type 문자
            th.right.aligned.wide.nine
              button.ui.button.basic.mini(@click="selectStandard") 선택
              button.ui.button.basic.mini(@click="checkSmsItem") 문자(SMS)확인
            th.center.aligned
              div.ui.radio.checkbox
                input(type="checkbox", v-model="smsData.autoYn", true-value="Y", false-value="N")
                label 자동실행
            th.center.aligned
              button.ui.button.icon.basic.mini(@click="$emit('delete')")
                i.icon.close
        tbody
          tr
            td.center.aligned
              div 부서 및 수신자
            td(colspan="3")
              div.ui.input.fluid(@click="selectSmsReceiver")
                label
                button.ui.button(type="button", :value="recieverTitle") {{recieverTitle}}

          tr
            td(colspan="4")
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='100',
                  v-model="smsData.smsContents",
                  )
          tr
            td(colspan="4")
              div.parameters
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 1
                      select(:id="1", @change="setCode1", v-model="smsData.cmmnCd1")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="smsData.userData1")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 2
                      select(:id="2", @change="setCode2", v-model="smsData.cmmnCd2")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="smsData.userData2")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 3
                      select(:id="3", @change="setCode3", v-model="smsData.cmmnCd3")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="smsData.userData3")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 4
                      select(:id="4", @change="setCode4", v-model="smsData.cmmnCd4")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="smsData.userData4")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 5
                      select(:id="5", @change="setCode5", v-model="smsData.cmmnCd5")
                        option(value="") 선택
                        option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="smsData.userData5")
</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'
import SelectSmsModal from '@/components/SelectSmsModal.vue'
import SelectReceiver from '@/components/SelectReceiver.vue'
import StandardSmsApi from '@/api/StandardSMS'
import CheckMediaModal from '@/components/CheckMediaModal.vue'
import { setTimeout } from 'timers'

export default {
  name: 'action-sms',
  props: {
    idx: Number,
    paramCode: Array,
    value: Object,
    isUpdate: Boolean
  },
  data () {
    return {
      actionUpdate: this.isUpdate,
      formType: 'textarea',
      textareaData: this.value.smsContents,
      smsData: this.value,
      paramList: this.paramCode,
      paramData1: { code: '', name: '', data: '' },
      paramData2: { code: '', name: '', data: '' },
      paramData3: { code: '', name: '', data: '' },
      paramData4: { code: '', name: '', data: '' },
      paramData5: { code: '', name: '', data: '' },
      recieveText: '수신자 선택',
      recieveCount: '',
      recieverModal: '',
      selectSmsModal: ''
    }
  },
  components: {
    CheckTextCount,
    SelectSmsModal,
    SelectReceiver,
    CheckMediaModal
  },
  created () {
    this.setRecieverList(this.smsData.sopStepChrgEmpList)
    for (let key in this.smsData) {
      if (key.indexOf('cmmnCd') > 0) {
        this.findCode(this.smsData[key])
      }
    }
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  updated () {
  },
  computed: {
    recieverTitle () {
      if (this.smsData.sopStepChrgEmpList.length === 0) {
        this.recieveText = '수신자선택'
      }
      if (this.smsData.sopStepChrgEmpList.length <= 1) {
        this.recieveCount = ''
      }
      return `${this.recieveText} ${this.recieveCount}`
    }
  },
  methods: {
    returnText (text) {
      this.smsData.smsContents = text
    },
    setRecieverList (recieveList) {
      this.recieverModal = ''
      this.smsData.sopStepChrgEmpList = recieveList
      if (recieveList.length === 0) return
      this.recieveText = `${recieveList[0].deptNm} ${recieveList[0].emplNm}`
      this.recieveCount = `외 ${recieveList.length - 1}명`
    },
    selectStandard () {
      this.selectSmsModal = 'SelectSmsModal'
      setTimeout(() => {
        this.$modal.show('select-sms', {
          title: '표준문자 선택',
          type: 'ActionSms',
          stepNo: this.smsData.stepNo,
          stepSn: this.smsData.stepSn
        })
      }, 100)
    },
    insertData (obj) {
      this.selectSmsModal = ''
      for (let key in obj) {
        this.smsData[key] = obj[key]
      }
    },
    setCode1 (event) {
      this.smsData.userData1 = ''
      this.smsData.inputParam1 = ''
      this.paramData1 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData1.name)
      this.smsData.inputParam1 = this.paramData1.name
      this.smsData.userData1 = this.paramData1.data
    },
    setCode2 (event) {
      this.smsData.userData2 = ''
      this.smsData.inputParam2 = ''
      this.paramData2 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData2.name)
      this.smsData.inputParam2 = this.paramData2.name
      this.smsData.userData2 = this.paramData2.data
    },
    setCode3 (event) {
      this.smsData.userData3 = ''
      this.smsData.inputParam3 = ''
      this.paramData3 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData3.name)
      this.smsData.inputParam3 = this.paramData3.name
      this.smsData.userData3 = this.paramData3.data
    },
    setCode4 (event) {
      this.smsData.userData4 = ''
      this.smsData.inputParam4 = ''
      this.paramData4 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData4.name)
      this.smsData.inputParam4 = this.paramData4.name
      this.smsData.userData4 = this.paramData4.data
    },
    setCode5 (event) {
      this.smsData.userData5 = ''
      this.smsData.inputParam5 = ''
      this.paramData5 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData5.name)
      this.smsData.inputParam5 = this.paramData5.name
      this.smsData.userData5 = this.paramData5.data
    },
    findCode (code) {
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
      if (this.smsData.smsContents.indexOf(name) < 0) {
        this.smsData.smsContents = `${this.smsData.smsContents}\r\n${name}`
      }
    },
    selectSmsReceiver () {
      this.recieverModal = 'SelectReceiver'
      setTimeout(() => {
        this.$modal.show(`select-reciever`, {
          title: '수신자 선택',
          stepNo: this.smsData.stepNo,
          stepSn: this.smsData.stepSn,
          recieveData: this.smsData.sopStepChrgEmpList
        })
      }, 100)
    },
    checkSmsItem () {
      const requestData = JSON.stringify(this.smsData)
      StandardSmsApi.checkDetail(requestData)
        .then(result => {
          this.$modal.show('check-msg-modal', {
            title: '문자(SMS)확인',
            data: result.data
          })
        })
        .catch(error => {
          const err = error.response
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.action
  > div {
    padding: 10px 0;
  }
  .sms-action {
    position: relative;
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
