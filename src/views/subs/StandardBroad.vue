<template lang="pug">
  div.StandardBroad.sub-container
    CheckMediaModal(@close="$modal.hide('check-msg-modal')")
    div.sub-wrapper
      div.sub-header
        div.title 표준 방송 관리
        SearchComp(
          v-model="searchData",
          :searchClass="[]",
          :isDateSearch="false",
          :isTextSearch="true",
          @search="getBroadlist")
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
            button.ui.right.floated.button.mini.blue.basic(@click="checkBroadItem") 방송문구확인
          div.contant-wrapper
            div.section_1
              div.ui.form.tiny
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 방송제목
                      td
                        input(type="text", v-model="standardBroadDetail.brdcstTitle")
                        label
                    tr
                      td.center.aligned
                        span 방송내용
                      td
                        check-text-count(
                          :formType="formType",
                          :rownum='6',
                          :maxLength='500',
                          v-model="standardBroadDetail.brdcstContents")
                    tr
                      td.center.aligned
                        span 파라미터1
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="1", v-model="standardBroadDetail.cmmnCd1", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData1")
                    tr
                      td.center.aligned
                        span 파라미터2
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="2", v-model="standardBroadDetail.cmmnCd2", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData2")
                    tr
                      td.center.aligned
                        span 파라미터3
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="3", v-model="standardBroadDetail.cmmnCd3", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData3")
                    tr
                      td.center.aligned
                        span 파라미터4
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="4", v-model="standardBroadDetail.cmmnCd4", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData4")
                    tr
                      td.center.aligned
                        span 파라미터5
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="5", v-model="standardBroadDetail.cmmnCd5", @change="insertValueName")
                              option(value="") 선택
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData5")
                    tr
                      td.center.aligned
                        span 사용여부
                      td
                        div.ui.toggle.checkbox
                          input(type="checkbox",
                          true-value="Y",
                          false-value="N",
                          v-model="standardBroadDetail.useYn")
                          label 사용{{standardBroadDetail.useYn === 'N' ? '안함' : ''}}
            div.btnSet
                div.btn-wrap.right
                  button.ui.button.blue(@click="createBroadItem('new')") 신규등록
                div.btn-group.left
                  button.ui.button.blue(@click="updateWithCheckItem") 저장
                  button.ui.button(@click="createBroadItem('init')", v-if="isNewInsert") 초기화
                  button.ui.button(@click="getBroadItem") 취소

      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import CheckTextCount from '@/components/CheckTextCount.vue'
import { standardBroadHeader } from '@/setting'
import StandardBroadApi from '@/api/StandardBroad'
import PublicCodeApi from '@/api/PublicCode'
import CheckMediaModal from '@/components/CheckMediaModal.vue'
import { codeGenerator } from '@/util'

export default {
  name: 'standard-broad',
  data () {
    return {
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
      searchData: {
        searchNm: ''
      },
      paramList: [],
      formType: 'textarea',
      isNewInsert: false
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp,
    CheckTextCount,
    CheckMediaModal
  },
  created () {
    this.getCodeList('S080')
    this.getBroadlist(1)
  },
  computed: {
    alarmYn () {
      return this.standardBroadDetail.useYn === 'Y'
    }
  },
  methods: {
    getBroadlist (targetNum) {
      this.searchData.currPage = targetNum
      const requestData = JSON.stringify(this.searchData)
      StandardBroadApi.getList(requestData).then(result => {
        this.standardBroad.standardBroadData = result.data.stdBrdcstList
        this.standardBroad.selected[0] = this.standardBroad.standardBroadData[0]
        result.data.param.totalCount = result.data.totCnt
        this.standardBroad.pageInfo = result.data.param
        this.getBroadItem()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getBroadItem () {
      const requestData = JSON.stringify({
        brdcstSn: this.standardBroad.selected[0].brdcstSn
      })
      StandardBroadApi.getDetail(requestData)
        .then(result => {
          this.standardBroadDetail = result.data
          this.isNewInsert = false
        })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    updateBroadItem () {
      if (this.isNewInsert) {
        this.isNewInsert = false
      }
      const requestData = JSON.stringify(this.standardBroadDetail)
      StandardBroadApi.updateDetail(requestData)
        .then(result => {
          this.$modal.show('dialog', codeGenerator('Y', '저장되었습니다'))
          this.getBroadlist(this.standardBroad.pageInfo.currPage)
        })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    updateWithCheckItem () {
      const requestData = JSON.stringify(this.standardBroadDetail)
      StandardBroadApi.checkDetail(requestData).then(result => {
        if (result.data.vrifyYn !== 'Y') {
          this.$modal.show('check-msg-modal', {
            title: '방송문구확인',
            data: result.data
          })
        } else {
          this.updateBroadItem()
        }
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    checkBroadItem () {
      const requestData = JSON.stringify(this.standardBroadDetail)
      StandardBroadApi.checkDetail(requestData).then(result => {
        this.$modal.show('check-msg-modal', {
          title: '방송문구확인',
          data: result.data
        })
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    createBroadItem (type) {
      if (type === 'new') {
        this.isNewInsert = true
      }
      this.standardBroadDetail = {
        brdcstSn: null,
        brdcstTitle: '',
        brdcstContents: '',
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
      this.standardBroad.selected = []
      if (!itemInfo.selected) {
        this.standardBroad.selected.push(this.standardBroad.standardBroadData[itemInfo.idx])
        this.getBroadItem()
      }
    },
    toggleCheck () {
      this.standardBroadDetail.useYn = this.standardBroadDetail.useYn === 'Y' ? 'N' : 'Y'
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
    insertValueName (event) {
      if (event.target.value === '') {
        this.standardBroadDetail[`userData${event.target.id}`] = ''
        this.standardBroadDetail[`inputParam${event.target.id}`] = ''
      }
      this.paramList.forEach(e => {
        if (e.cmmnCd === event.target.value) {
          this.standardBroadDetail[`inputParam${event.target.id}`] = e.cmmnCdNm
          this.standardBroadDetail[`userData${event.target.id}`] = e.userData1
          if (this.standardBroadDetail.brdcstContents.indexOf(e.cmmnCdNm) < 0) {
            this.standardBroadDetail.brdcstContents = `${this.standardBroadDetail.brdcstContents}\r\n${e.cmmnCdNm}`
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.StandardBroad {
  .sub-wrapper {
    .sub-content > .content {
      height: 100%;
    }
  }
}
.StandardBroad {
  .content.section.section-1 {
    width: 30% !important;
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
