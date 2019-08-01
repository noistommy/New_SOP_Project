<template lang="pug">
  modal(name="select-sms", :width='1500', height='800',  :clickToClose="false", @before-open="setProps")
    div.StandardSmsModal.sub-container
      div.sub-wrapper
        div.sub-header
          div.title 표준 문자 선택
        div.sub-content.column
          div.content.section.section-1
              h3.title 표준문자관리
              div.contant-wrapper
                DataTable(
                  v-model="standardSms.selected"
                  :headers="standardSms.headers",
                  :items="standardSms.standardSmsData",
                  :itemKey="standardSms.itemkey",
                  :isFooter="standardSms.isfooter",
                  :isPagination="standardSms.isPagination",
                  :page="standardSms.pageInfo"
                  :isListNumber="standardSms.isListNumber",
                  @search="getSmslist"
                ).ui.table.celled.selectable
                  <template slot="items" slot-scope="props">
                    tr(:active="props.selected", @click="selectedItem(props)" )
                      td {{props.item.smsTitle}}
                      td.center.aligned {{props.item.useYn}}
                  </template>
          div.content.section.section-2
            h3.title 표준문자 상세정보
            div.contant-wrapper
              div.section_1
                div.ui.form.tiny
                  table.ui.table.fixed
                    thead
                      tr
                        th.two.wide
                        th.fourteen.wide
                    tbody
                      tr
                        td.center.aligned
                          span 문자제목
                        td
                          div.text-title {{standardSmsDetail.smsTitle}}
                      tr
                        td.center.aligned
                          span 문자내용
                        td
                          div.text-contents {{standardSmsDetail.smsContents}}
                      tr(v-if="standardSmsDetail.inputParam1")
                        td.center.aligned
                          span 파라미터1
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.pram-name [{{standardSmsDetail.inputParam1}}]
                            div.field.ten.wide
                              span {{standardSmsDetail.userData1}}
                      tr(v-if="standardSmsDetail.inputParam2")
                        td.center.aligned
                          span 파라미터2
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.code-name [{{standardSmsDetail.inputParam2}}]
                            div.field.ten.wide
                              span {{standardSmsDetail.userData2}}
                      tr(v-if="standardSmsDetail.inputParam3")
                        td.center.aligned
                          span 파라미터3
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.code-name [{{standardSmsDetail.inputParam3}}]
                            div.field.ten.wide
                              span {{standardSmsDetail.userData3}}
                      tr(v-if="standardSmsDetail.inputParam4")
                        td.center.aligned
                          span 파라미터4
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.code-name [{{standardSmsDetail.inputParam4}}]
                            div.field.ten.wide
                              span {{standardSmsDetail.userData4}}

                      tr(v-if="standardSmsDetail.inputParam5")
                        td.center.aligned
                          span 파라미터5
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.code-name [{{standardSmsDetail.inputParam5}}]

                            div.field.ten.wide
                              span {{standardSmsDetail.userData5}}
              div.btnSet
                  div.btn-wrap.right
                  div.btn-group.left
                    button.ui.button.blue(@click="getSelectData") 선택
                    button.ui.button(@click="$emit('close')") 취소
        div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import DataForm from '@/components/DataForm.vue'
import CheckTextCount from '@/components/CheckTextCount.vue'
import SearchComp from '@/components/SearchComp.vue'
import { standardSmsHeader } from '@/setting'
import StandardSmsApi from '@/api/StandardSMS'
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'standard-sms-modal',
  data () {
    return {
      title: '',
      type: '',
      stepNo: 0,
      stepSn: 0,
      standardSms: {
        selected: [],
        headers: standardSmsHeader.headers,
        standardSmsData: [],
        isfooter: true,
        isPagination: true,
        isListNumber: false,
        itemkey: 'smsSn',
        pageInfo: {}
      },
      standardSmsDetail: {
      },
      newSmsDetail: {},
      searchData: {},
      paramList: [],
      formType: 'textarea',
      textArea: 'S0800100'
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp,
    DataForm,
    CheckTextCount
  },
  created () {
    this.getCodeList('S080')
    this.getSmslist(1)
  },
  mounted () {
    $('.ui.dropdown').dropdown('restore defaults')
  },
  updated () {

  },
  computed: {
    alarmYn () {
      return this.standardSmsDetail.useYn === 'Y'
    }
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.stepNo = event.params.stepNo
      this.stepSn = event.params.stepSn
      this.type = event.params.type
    },
    getSmslist (targetNum) {
      this.searchData.currPage = targetNum
      this.searchData.useYn = 'Y'
      const requestData = JSON.stringify(this.searchData)
      StandardSmsApi.getList(requestData)
        .then(result => {
          this.standardSms.standardSmsData = result.data.stdSmsList
          this.standardSms.selected[0] = this.standardSms.standardSmsData[0]
          result.data.param.totalCount = result.data.totCnt
          this.standardSms.pageInfo = result.data.param
          this.getSmsItem()
        }).catch(error => {
          const err = error.response
          alert(err.data.msgValue)
        })
    },
    getSmsItem () {
      const requestData = JSON.stringify({
        smsSn: this.standardSms.selected[0].smsSn
      })
      StandardSmsApi.getDetail(requestData).then(result => {
        $('.ui.dropdown').dropdown('restore defaults')
        this.standardSmsDetail = result.data
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem (itemInfo) {
      this.standardSms.selected = []
      if (!itemInfo.selected) {
        this.standardSms.selected.push(this.standardSms.standardSmsData[itemInfo.idx])
        this.getSmsItem()
      }
    },
    getCodeList (code) {
      const requestData = JSON.stringify({
        cmmnCd: code
      })
      PublicCodeApi.getUseItem(requestData).then(result => {
        this.paramList = result.data.cmmnCdDetailList
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    returnText (text) {
      this.standardSmsDetail.smsContents = text
    },
    insertValueName (event) {
      this.paramList.forEach(e => {
        if (e.cmmnCd === event.target.value) {
          this.standardSmsDetail[`inputParam${event.target.id}`] = e.cmmnCdNm
          this.standardSmsDetail[`userData${event.target.id}`] = e.userData1
          if (this.standardSmsDetail.smsContents.indexOf(e.cmmnCdNm) < 0) {
            this.standardSmsDetail.smsContents = `${this.standardSmsDetail.smsContents}\r\n${e.cmmnCdNm}`
          }
        }
      })
    },
    getSelectData () {
      this.$emit('select', this.standardSmsDetail)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.StandardSmsModal {
  .section {
    .contant-wrapper {
      height: 93%;
      .ui.table tr:nth-child(1) td:nth-child(odd) {
        background: #f9f9f9;
      }
    }
  }
  .section.section-1 {
    width: 30% !important;
    .ui.table tr:nth-child(1) td:nth-child(odd) {
        background: none;
      }
  }
  table tr th {
      padding: 0;
       opacity: 0 !important;
       }
  .ld,.lh {
    width: 80% !important;
  }
  .ui.form {
    tr td:nth-child(1) {
      max-width: 20%;
    }
    td {
      .fields {
        margin: 0;
      }
      &.visibleTd {
        overflow: visible;
      }
    }
  }
  .text-contents {
    height: 10rem;
    background-color: #f9f9f9;
    padding: 5px;
    white-space: normal;
  }
  td {
    .code-name {padding: 5px;}
    .pram-name {padding: 5px;}
    span {
      display: inline-block;
      width: 100%;
      height: 2rem;
      background-color: #f9f9f9;
      padding: 5px;
    }
  }
}
</style>
