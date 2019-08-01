<template lang="pug">
  div.MemberGroup.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 조직도 관리
        SearchComp(v-model="searchData",
        :searchClass="['condition1']",
        :isTextSearch="true",
        @search="searchList")
          template(slot="condition1", slot-scope="props")
            div.ui.form
              select(v-model="searchData.searchCnd")
                option(value="", disabled) 분류
                option(value="00") 전체
                option(value="01") 팀명
                option(value="02") 이름
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView-wrapper
              div.treeView.list.level-0
                TreeView(
                  v-model="selectTeam",
                  @select="getItemInfo",
                  v-for="item in treeviewData",
                  :treeItem="item",
                  :isActive="rootActive",
                  :level="1",
                  @search="getList")
          div.section.right-section
            h3.table-title {{selectTitle}}
            DataTable(
              v-model="selected",
              :tableType="memberGroup.type",
              :headers="memberGroup.headers",
              :items="memberGroup.memberGoupData",
              :isFooter="memberGroup.isFooter"
              :isPagination="memberGroup.isPagination"
              :isListNumber="memberGroup.isListNumber",
              :page="memberGroup.pageInfo",
              @search="getList"
            ).ui.table
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned {{props.item.emplNm}}
                  td.center.aligned {{props.item.ofcpsCdNm}}
                  td.center.aligned.ellipse {{props.item.clsfCdNm}}
                  td.center.aligned {{props.item.deptNm}}
                  td.center.aligned {{props.item.moblphonNo}}
              </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import { memberGroupeHeader } from '@/setting'
import { codeGenerator } from '@/util'

import MemberApi from '@/api/Member'

export default {
  name: 'membergroup',
  components: {
    DataTable,
    TreeView,
    SearchComp
  },
  data () {
    return {
      memberGroup: {
        type: 'celled',
        headers: memberGroupeHeader.headers,
        memberGoupData: [],
        isFooter: true,
        isPagination: true,
        isListNumber: false,
        pageInfo: {}
      },
      selected: [],
      treeviewData: [],
      rootActive: true,
      selectTeam: {},
      searchData: {
        searchCnd: '',
        searchNm: '',
        childDeptId: '',
        upperDeptId: '',
        currPage: 1
      }
    }
  },
  created () {
    this.getTreeList()
  },
  mounted () {
    this.getList(1)
  },
  computed: {
    selectTitle () {
      if (this.selectTeam.title !== undefined) {
        return this.selectTeam.title
      } else if (this.searchData.searchNm !== '') {
        return `검색 : ${this.searchData.searchNm}`
      } else {
        return '사원목록'
      }
    }
  },
  methods: {
    getTreeList () {
      MemberApi.getTree().then(result => {
        this.treeviewData = result.data.trOrgnList
        this.selectTeam = result.data.trOrgnList[0]
        this.getList(1)
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getList (targetNum) {
      if (targetNum === undefined) { targetNum = 1 }
      if (this.searchData.searchCnd === '00') { this.searchData.searchCnd = '' }
      this.searchData.childDeptId = this.selectTeam.childDeptId
      this.searchData.currPage = targetNum
      this.searchData.childDeptId = this.selectTeam.childDeptId
      this.searchData.pagePerCnt = this.memberGroup.pageInfo.pagePerCnt
      const requestData = JSON.stringify(this.searchData)

      MemberApi.getItems(requestData).then(result => {
        this.memberGroup.memberGoupData = result.data.deptEmpInfoList
        result.data.param.totalCount = result.data.totCnt
        this.memberGroup.pageInfo = result.data.param
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    searchList () {
      this.initSearch('id')
      this.getList(1)
    },
    getItemInfo (item) {
      this.initSearch('search')
      this.selectTeam = item
      this.getList(1)
    },
    initSearch (type) {
      if (type === 'search') {
        this.searchData.searchCnd = ''
        this.searchData.searchNm = ''
      } else {
        this.selectTeam = {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position:relative;
}
.treeView-wrapper {
  overflow-y: auto;
  height: 100%;

}
</style>
