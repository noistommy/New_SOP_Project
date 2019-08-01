<template lang="pug">
  div.SopList.sub-container
    modals-container
    div.sub-wrapper
      div.sub-header
        div.title 재난 대응 절차 목록
        SearchComp(
          v-model="searchData",
          :searchClass="searchClass",
          :isTextSearch='true'
          :isDateSearch="false",
          @search="getSopList")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown(v-model="req.msfrtnKndCd")
              option(value="") 재난종류
              option(value="00") 전체
              option(v-for="code in typeCode", :value="code.cmmnCd") {{code.cmmnCdNm}}
          template(slot="condition2", slot-scope="props")
            select.ui.dropdown(v-model="req.crisisGnfdStepCd")
              option(value="") 위기발령단계
              option(value="00") 전체
              option(v-for="code in stepCode", :value="code.cmmnCd") {{code.cmmnCdNm}}
      div.sub-content
        div.content
          DataTable(
            v-model="sopList.selected"
            :headers="sopList.headers",
            :items="sopList.sopListData",
            :itemKey="sopList.itemkey",
            :isFooter="sopList.isfooter",
            :isListNumber="sopList.isListNumber",
            :isSelect="sopList.isSelect",
            :isPagination="sopList.isPagination",
            :page="sopList.pageInfo",
            @search="getSopList"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr(:active="props.selected", @click="selectedItem(props)" )
                td.center.aligned
                  div.ui.checkbox
                    input(type="checkbox", :checked="props.selected")
                    label
                td.center.aligned {{props.idx + 1}}
                td.center.aligned {{props.item.sopId}}
                td.center.aligned {{props.item.msfrtnKndCdNm}}
                td.center.aligned {{props.item.crisisGnfdStepNm}}
                td.ellipse {{props.item.sopTitle}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
              template(v-if="opratorCode === 'S0400100'")
                button.ui.button.large(@click="editSop") 편집
                button.ui.button.large(@click="deleteSop") 삭제
              button.ui.button.large.green(@click="selectMode") SOP실행
            div.btn-wrap.right
              template(v-if="opratorCode === 'S0400100'")
                button.ui.button.large.blue(@click="$router.push({name: 'sop-edit'})") 재난절차생성

</template>

<script>
import DataTable from '@/components/DataTable'
import SearchComp from '@/components/SearchComp'
import SelectSopMode from '@/components/SelectSopMode'
import { sopListHeader } from '@/setting'
import SopManageApi from '@/api/SopManage'
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'sop-list',
  data () {
    return {
      searchData: {},
      searchClass: ['condition1', 'condition2'],
      req: {
        msfrtnKndCd: '',
        crisisGnfdStepCd: '',
        sopTitle: ''
      },
      sopList: {
        selected: [],
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: true,
        itemkey: 'sopId',
        pageInfo: {},
        headers: sopListHeader.headers,
        sopListData: []
      },
      typeCode: [],
      stepCode: [],
      buildingInfo: [],
      isSelected: false
    }
  },
  components: {
    DataTable,
    SearchComp,
    SelectSopMode
  },
  created () {
    this.opratorCode = sessionStorage.userInfo
    this.getCodeList('S090')
    this.getCodeList('S100')
    this.getSopList(1)
  },
  methods: {
    getSopList (targetNum) {
      if (this.req.msfrtnKndCd === '00') { this.req.msfrtnKndCd = '' }
      if (this.req.crisisGnfdStepCd === '00') { this.req.crisisGnfdStepCd = '' }
      this.req.currPage = targetNum
      this.req.sopTitle = this.searchData.searchNm
      const requestData = JSON.stringify(this.req)
      SopManageApi.getList(requestData).then(result => {
        this.sopList.sopListData = result.data.sopMgmtList
        result.data.param.totalCount = result.data.totCnt
        this.sopList.pageInfo = result.data.param
      }).catch(error => {
        const err = error.response
        if (err) {
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        }
      })
    },
    getSelectBuilding () {
      const requestData = JSON.stringify({ sopId: this.sopList.selected[0].sopId })
      SopManageApi.selectBuilding(requestData).then(result => {
        this.buildingInfo = result.data.buldList
      }).catch(error => {
        const err = error.response
        if (err) {
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        }
      })
    },
    deleteSop () {
      this.selectCheck()
      if (this.isSelected) {
        const requestData = JSON.stringify({
          sopId: this.sopList.selected[0].sopId
        })
        SopManageApi.deleteItem(requestData).then(result => {
          this.getSopList()
        }).catch(error => {
          const err = error.response
          if (err) {
            this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
          }
        })
      }
    },
    getCodeList (code) {
      const requestData = JSON.stringify({
        cmmnCd: code
      })
      PublicCodeApi.getUseItem(requestData).then(result => {
        if (code === 'S090') {
          this.typeCode = result.data.cmmnCdDetailList
        }
        if (code === 'S100') {
          this.stepCode = result.data.cmmnCdDetailList
        }
      }).catch(error => {
        const err = error.response
        if (err) {
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        }
      })
    },
    selectedItem (itemInfo) {
      this.sopList.selected = []
      if (!itemInfo.selected) {
        this.sopList.selected.push(this.sopList.sopListData[itemInfo.idx])
        this.isSelected = true
      }
      this.getSelectBuilding()
    },
    selectMode () {
      this.selectCheck()
      if (this.isSelected) {
        this.$modal.show(SelectSopMode, {
          title: '실행모드',
          data: this.sopList.selected[0],
          buildings: this.buildingInfo
        }, {
          height: '450px',
          clickToClose: false
        })
      }
    },
    editSop () {
      this.selectCheck()
      if (this.isSelected) {
        this.$router.push({
          name: 'sop-edit',
          params: {
            sopId: this.sopList.selected[0].sopId,
            sopMapngCd: this.sopList.selected[0].sopMapngCd
          }
        })
      }
    },
    selectCheck () {
      if (this.sopList.selected.length === 0) {
        this.isSelected = false
        this.$modal.show('dialog', {
          title: '선택오류',
          text: '선택 된 SOP가 없습니다.'
        })
      } else {
        this.isSelected = true
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
