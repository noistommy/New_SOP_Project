<template lang="pug">
  div.PublicCode.sub-container
    modals-container
    div.sub-wrapper
      div.sub-header
        div.title 공통코드 관리
      div.sub-content.column
        div.content.section.section-1
          h3.title 공통코드정보
          div.contant-wrapper
            div.section_1
              DataList(
                v-model="publicCode.selected"
                :headers="publicCode.headers",
                :items="publicCode.publicCodeData",
                :isListNumber="publicCode.isListNumber",
                :isEditor="publicCode.isEditor",
                :itemKey="publicCode.itemkey"
              )
                <template slot="items" slot-scope="props">
                  div.item.lr.listitem(:class="{active:props.selected}", @click="selectedGroup(props)" )
                    .ld {{props.item.cmmnCd}}
                    .ld {{props.item.cmmnCdNm}}
                    .ld.center.aligned {{props.item.useYn}}
                </template>
            div.btnSet
              div.btn-wrap.right
              div.btn-group.left
                button.ui.button.blue(@click="editCode('group', 'new')") 그룹신규
                button.ui.button.blue.basic(@click="editCode('group', 'edit')") 그룹편집
        div.content.section.section-2
          h3.title 공통코드상세정보
          div.contant-wrapper
            div.section_1
              div.wrapper
                DataTable(
                  :tableType="'celled'"
                    v-model="publicCodeDetail.selected"
                    :headers="publicCodeDetail.headers",
                    :items="publicCodeDetail.publicCodeDetailData",
                    :itemKey="publicCodeDetail.itemkey",
                    :isFooter="publicCodeDetail.isfooter",
                    :isListNumber="publicCodeDetail.isListNumber",
                    :isPagination="publicCodeDetail.isPagination",
                    :page="publicCodeDetail.pageInfo"
                  )
                    template(slot="items", slot-scope="props")
                      tr(:active="props.selected", @click="selectedItem(props)" )
                        td {{props.item.cmmnCd}}
                        td {{props.item.cmmnCdNm}}
                        td {{props.item.indictOrdr}}
                        td {{props.item.useYn}}
                        td {{props.item.userData1}}
                        td {{props.item.userData2}}
                        td {{props.item.userData3}}
                        td {{props.item.userData4}}
                        td {{props.item.userData5}}
          div.btnSet
              div.btn-wrap.right
              div.btn-group.left
                button.ui.button.blue(@click="editCode('code', 'new')") 코드신규
                button.ui.button.basic(@click="editCode('code', 'edit')") 코드편집
      div.sub-footer

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import CodeEditor from '@/components/CodeEditor.vue'
import { publicCodeHeader, publicCodeDetailHeader } from '@/setting'
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'public-code',
  data () {
    return {
      publicCode: {
        selected: [],
        headers: publicCodeHeader.headers,
        publicCodeData: [],
        isListNumber: false,
        isEditor: true,
        itemkey: 'cmmnCd'
      },
      publicCodeInfo: {},
      publicCodeDetail: {
        selected: [],
        headers: publicCodeDetailHeader.headers,
        publicCodeDetailData: [],
        itemkey: 'cmmnCd',
        isfooter: true,
        isPagination: true,
        isListNumber: false,
        pageInfo: {}
      },
      searchData: {},
      selectIndex: 0
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp,
    CodeEditor
  },
  created () {
    this.getCodeList()
  },
  methods: {
    getCodeList () {
      const requestData = JSON.stringify({
        cmmnCd: ''
      })
      PublicCodeApi.getList(requestData).then(result => {
        this.publicCode.publicCodeData = result.data.cmmnCdGroupList
        this.publicCode.selected[0] = this.publicCode.publicCodeData[this.selectIndex]
      }).then(() => {
        this.getCodeItem()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getCodeItem () {
      const requestData = JSON.stringify({
        cmmnCd: this.publicCode.selected[0].cmmnCd
      })
      PublicCodeApi.getItem(requestData).then(result => {
        this.publicCodeDetail.publicCodeDetailData = result.data.cmmnCdDetailInfo
        this.publicCodeDetail.selected[0] = this.publicCodeDetail.publicCodeDetailData[0]
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateCodeGroup () {
      const requestData = JSON.stringify({
        cmmnCd: this.publicCode.selected[0]
      })
      PublicCodeApi.updateCodeGroup(requestData).then(result => {
        this.getCodeList()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateCodeItem () {
      const requestData = JSON.stringify({
        cmmnCd: this.publicCodeDetail.selected[0].cmmnCd,
        cmmnCdNm: this.publicCodeDetail.selected[0].cmmnCdNm,
        indictOrdr: this.publicCodeDetail.selected[0].indictOrdr,
        useYn: this.publicCodeDetail.selected[0].useYn
      })
      PublicCodeApi.updateCodeItem(requestData).then(result => {
        this.getCodeItem()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    editCode (itemType, editType) {
      let editdata = {
        title: '공통코드',
        type: editType,
        item: itemType,
        data: {
          cmmnCd: '',
          cmmnCdNm: '',
          indictOrdr: 0,
          useYn: 'Y',
          upperCmmnCd: ''
        }
      }

      if (editType === 'edit') {
        if (itemType === 'code') {
          editdata.data = this.publicCodeDetail.selected[0]
        } else {
          editdata.data = this.publicCode.selected[0]
        }
      } else {
        editdata.data.upperCmmnCd = this.publicCode.selected[0].cmmnCd
      }
      this.$modal.show(CodeEditor, editdata, {
        height: '400px',
        draggable: true,
        clickToClose: false
      }, {
        'before-close': () => { this.getCodeList() }
      }
      )
    },
    selectedGroup (itemInfo) {
      this.selectIndex = itemInfo.idx
      this.publicCode.selected = []
      if (!itemInfo.selected) {
        this.publicCode.selected.push(this.publicCode.publicCodeData[itemInfo.idx])
      }
      this.getCodeItem()
    },
    selectedItem (itemInfo) {
      this.publicCodeDetail.selected = []
      if (!itemInfo.selected) {
        this.publicCodeDetail.selected.push(this.publicCodeDetail.publicCodeDetailData[itemInfo.idx])
      }
    },
    toggleCheck () {
      this.publicCodeDetail.useYn = this.publicCodeDetail.useYn === 'Y' ? 'N' : 'Y'
    }
  }
}
</script>

<style lang="less">
.PublicCode {
  .contant-wrapper {
    height: 85%;
    max-height: auto;
    display: flex;
    flex-direction: column;
    // flex: 1 2 auto;
    > div {
      padding-bottom: 15px
    }
    .section_1{
      height: 100%;
    }
    .section_2{
    }
    .ui.form .ui.table {
      tr {
        td{
          &:nth-child(1) {
            background-color: #f9fafb;
          }
        }
      }
    }
  }
  .content.section.section-1 {
    width: 15% !important;
  }
  .ld {
    width: 60% !important;
  }
  .lh {
    width: 60% !important;
  }
}
</style>
