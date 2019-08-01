<template lang="pug">
  div.StandardSms.sub-container
    CheckMediaModal(@close="$modal.hide('check-msg-modal')")
    //- modals-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 문자 관리
        SearchComp(
          v-model="searchData",
          :searchClass="[]",
          :isDateSearch="false",
          :isTextSearch="true"
          @search="getSmslist")
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
            button.ui.right.floated.button.mini.blue.basic(@click="checkSmsItem") 문자(SMS)확인
          div.contant-wrapper
            div.section_1
              div.ui.form.tiny
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 문자제목
                      td
                        input(type="text", v-model="standardSmsDetail.smsTitle")
                        label
                    tr
                      td.center.aligned
                        span 문자내용
                      td
                        check-text-count(
                          :formType="formType",
                          :textData="standardSmsDetail.smsContents",
                          :rownum='6',
                          :maxLength='100',
                          v-model="standardSmsDetail.smsContents",
                          @input="returnTextarea")
                    tr
                      td.center.aligned
                        span 파라미터1
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="1", v-model="standardSmsDetail.cmmnCd1", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData1")
                    tr
                      td.center.aligned
                        span 파라미터2
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="2",v-model="standardSmsDetail.cmmnCd2", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData2")
                    tr
                      td.center.aligned
                        span 파라미터3
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="3",v-model="standardSmsDetail.cmmnCd3", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData3")
                    tr
                      td.center.aligned
                        span 파라미터4
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="4",v-model="standardSmsDetail.cmmnCd4", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData4")
                    tr
                      td.center.aligned
                        span 파라미터5
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="5",v-model="standardSmsDetail.cmmnCd5", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData5")
                    tr
                      td.center.aligned
                        span 사용여부
                      td
                        div.ui.toggle.checkbox
                          input(type="checkbox",
                          true-value="Y",
                          false-value="N",
                          v-model="standardSmsDetail.useYn")
                          label 사용{{standardSmsDetail.useYn === 'N' ? '안함' : ''}}
            div.btnSet
                div.btn-wrap.right
                  button.ui.button.blue(@click="createSmsItem('new')") 신규등록
                div.btn-group.left
                  button.ui.button.blue(@click="updateWithCheckItem") 저장
                  button.ui.button(@click="createSmsItem('init')", v-if="isNewInsert") 초기화
                  button.ui.button(@click="getSmsItem") 취소
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
import CheckMediaModal from '@/components/CheckMediaModal.vue'
import { codeGenerator } from '@/util'

export default {
  name: 'standard-sms',
  data () {
    return {
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
      searchData: {
        searchNm: ''
      },
      paramList: [],
      formType: 'textarea',
      textArea: 'S0800100',
      isNewInsert: false,
      checkMedia: false
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp,
    DataForm,
    CheckTextCount,
    CheckMediaModal
  },
  created () {
    this.getCodeList('S080')
    this.getSmslist(1)
  },
  mounted () {
  },
  computed: {
    alarmYn () {
      return this.standardSmsDetail.useYn === 'Y'
    }
  },
  methods: {
    getSmslist (targetNum) {
      this.searchData.currPage = targetNum
      const requestData = JSON.stringify(this.searchData)
      StandardSmsApi.getList(requestData).then(result => {
        this.standardSms.standardSmsData = result.data.stdSmsList
        this.standardSms.selected[0] = this.standardSms.standardSmsData[0]
        result.data.param.totalCount = result.data.totCnt
        this.standardSms.pageInfo = result.data.param
        this.getSmsItem()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getSmsItem () {
      const requestData = JSON.stringify({
        smsSn: this.standardSms.selected[0].smsSn
      })
      StandardSmsApi.getDetail(requestData).then(result => {
        this.standardSmsDetail = result.data
        this.isNewInsert = false
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateSmsItem () {
      if (this.isNewInsert) {
        this.isNewInsert = false
      }
      const requestData = JSON.stringify(this.standardSmsDetail)
      StandardSmsApi.updateDetail(requestData).then(result => {
        this.getSmslist(this.standardSms.pageInfo.currPage)
        this.$modal.show('dialog', codeGenerator('Y', '저장되었습니다'))
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateWithCheckItem () {
      const requestData = JSON.stringify(this.standardSmsDetail)
      StandardSmsApi.checkDetail(requestData).then(result => {
        if (result.data.vrifyYn !== 'Y') {
          this.$modal.show('check-msg-modal', {
            title: '문자(SMS)확인',
            data: result.data
          })
        } else {
          this.updateSmsItem()
        }
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    checkSmsItem () {
      const requestData = JSON.stringify(this.standardSmsDetail)
      StandardSmsApi.checkDetail(requestData).then(result => {
        this.$modal.show('check-msg-modal', {
          title: '문자(SMS)확인',
          data: result.data
        })
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    createSmsItem (type) {
      if (type === 'new') {
        this.isNewInsert = true
      }
      this.standardSmsDetail = {
        smsSn: 0,
        smsTitle: '',
        smsContents: '',
        useYn: 'Y',
        cmmnCd1: '',
        inputParam1: '',
        userData1: '',
        cmmnCd2: '',
        inputParam2: '',
        userData2: '',
        cmmnCd3: '',
        inputParam3: '',
        userData3: '',
        cmmnCd4: '',
        inputParam4: '',
        userData4: '',
        cmmnCd5: '',
        inputParam5: '',
        userData5: '',
        vrifyYn: ''
      }
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
    returnTextarea (text) {
      this.standardSmsDetail.smsContents = text
    },
    returnText (text) {
      this.standardSmsDetail.smsTitle = text
    },
    insertValueName (event) {
      if (event.target.value === '') {
        this.standardSmsDetail[`userData${event.target.id}`] = ''
        this.standardSmsDetail[`inputParam${event.target.id}`] = ''
      }
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
    showDialog (title) {
      this.$modal.show('dialog', {
        title: 'Success',
        text: title
      })
      setTimeout(() => {
        this.$modal.hide('dialog')
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.StandardSms {
  .sub-wrapper {
    .sub-content > .content {
      height: 100%;
    }
  }
}
.StandardSms {
  .content.section.section-1 {
    width: 30% !important;
  }
  .ld,.lh {
    width: 80% !important;
  }
  .ui.form td {
    .fields {
      margin: 0;
    }
    &.visibleTd {
      overflow: visible;
    }
  }
}
</style>
