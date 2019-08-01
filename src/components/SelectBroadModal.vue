<template lang="pug">
  modal(name="select-broad", :width='1500', height='800',  :clickToClose="false", @before-open="setProps")
    div.StandardBroadModal.sub-container
      div.sub-wrapper
        div.sub-header
          div.title 표준 방송 선택
        div.sub-content.column
          div.content.section.section-1
              h3.title 표준방송관리
              div.contant-wrapper
                DataTable(
                  v-model="standardBroad.selected"
                  :headers="standardBroad.headers",
                  :items="standardBroad.standardBroadData",
                  :itemKey="standardBroad.itemkey",
                  :isFooter="standardBroad.isfooter",
                  :isPagination="standardBroad.isPagination",
                  :page="standardBroad.pageInfo"
                  :isListNumber="standardBroad.isListNumber",
                  @search="getBroadlist"
                ).ui.table.celled.selectable
                  <template slot="items" slot-scope="props">
                    tr(:active="props.selected", @click="selectedItem(props)" )
                      td {{props.item.brdcstTitle}}
                      td.center.aligned {{props.item.useYn}}
                  </template>
          div.content.section.section-2
            h3.title 표준방송 상세정보
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
                          span 방송제목
                        td
                          div.text-title {{standardBroadDetail.brdcstTitle}}
                      tr
                        td.center.aligned
                          span 방송내용
                        td.sixteen.wide
                          div.text-contents {{standardBroadDetail.brdcstContents}}
                      tr(v-if="standardBroadDetail.inputParam1")
                        td.center.aligned
                          span 파라미터1
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.pram-name [{{standardBroadDetail.inputParam1}}]
                            div.field.ten.wide
                              span {{standardBroadDetail.userData1}}
                      tr(v-if="standardBroadDetail.inputParam2")
                        td.center.aligned
                          span 파라미터2
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.pram-name [{{standardBroadDetail.inputParam2}}]
                            div.field.ten.wide
                              span {{standardBroadDetail.userData2}}
                      tr(v-if="standardBroadDetail.inputParam3")
                        td.center.aligned
                          span 파라미터3
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.pram-name [{{standardBroadDetail.inputParam3}}]
                            div.field.ten.wide
                              span {{standardBroadDetail.userData3}}
                      tr(v-if="standardBroadDetail.inputParam4")
                        td.center.aligned
                          span 파라미터4
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.pram-name [{{standardBroadDetail.inputParam4}}]
                            div.field.ten.wide
                              span {{standardBroadDetail.userData4}}
                      tr(v-if="standardBroadDetail.inputParam5")
                        td.center.aligned
                          span 파라미터5
                        td.visibleTd
                          div.fields
                            div.field.six.wide
                              div.pram-name [{{standardBroadDetail.inputParam5}}]
                            div.field.ten.wide
                              span {{standardBroadDetail.userData5}}
                      tr
                        td.center.aligned
                          span 사용여부
                        td
                          div {{standardBroadDetail.useYn === 'Y' ? '사용' : '사용안함'}}
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
import { standardBroadHeader } from '@/setting'
import StandardBroadApi from '@/api/StandardBroad'
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'standard-broad-modal',
  data () {
    return {
      title: '',
      type: '',
      stepNo: 0,
      stepSn: 0,
      standardBroad: {
        selected: [],
        headers: standardBroadHeader.headers,
        standardBroadData: [],
        isfooter: true,
        isPagination: true,
        isListNumber: false,
        itemkey: 'brdcstSn',
        pageInfo: {}
      },
      standardBroadDetail: {},
      newBroadDetail: {},
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
    this.getBroadlist(1)
  },
  mounted () {
    $('.ui.dropdown').dropdown('restore defaults')
  },
  computed: {
    alarmYn () {
      return this.standardBroadDetail.useYn === 'Y'
    }
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.stepNo = event.params.stepNo
      this.stepSn = event.params.stepSn
      this.type = event.params.type
    },
    getBroadlist (targetNum) {
      this.searchData.currPage = targetNum
      this.searchData.useYn = 'Y'
      const requestData = JSON.stringify(this.searchData)
      StandardBroadApi.getList(requestData).then(result => {
        this.standardBroad.standardBroadData = result.data.stdBrdcstList
        this.standardBroad.selected[0] = this.standardBroad.standardBroadData[0]
        result.data.param.totalCount = result.data.totCnt
        this.standardBroad.pageInfo = result.data.param
        this.getBroadItem()
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    },
    getBroadItem () {
      const requestData = JSON.stringify({
        brdcstSn: this.standardBroad.selected[0].brdcstSn
      })
      StandardBroadApi.getDetail(requestData).then(result => {
        this.standardBroadDetail = result.data
      }).catch(error => {
        const err = error.response
        this.$emit('close')
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem (itemInfo) {
      this.standardBroad.selected = []
      if (!itemInfo.selected) {
        this.standardBroad.selected.push(this.standardBroad.standardBroadData[itemInfo.idx])
        this.getBroadItem()
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
      this.standardBroadDetail.brdcsContents = text
    },
    insertValueName (event) {
      this.paramList.forEach(e => {
        if (e.cmmnCd === event.target.value) {
          this.standardBroadDetail[`inputParam${event.target.id}`] = e.cmmnCdNm
          this.standardBroadDetail[`userData${event.target.id}`] = e.userData1
          if (this.standardBroadDetail.brdcsContents.indexOf(e.cmmnCdNm) < 0) {
            this.standardBroadDetail.brdcsContents = `${this.standardBroadDetail.brdcsContents}\r\n${e.cmmnCdNm}`
          }
        }
      })
    },
    getSelectData () {
      this.$emit('select', this.standardBroadDetail)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
.StandardBroadModal {
  .section {
    .contant-wrapper {
      height: 93%;
    }
  }
  .content.section.section-1 {
    width: 30% !important;
    .ui.table tr:nth-child(1) td:nth-child(odd) {
      background: none;
    }
  }
  .content.section.section-2 .section_1{
    table {
      width: 100%;
    }
    table tr th {
      padding: 0;
       opacity: 0 !important;
       }
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
