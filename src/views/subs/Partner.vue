<template lang="pug">
  div.Partner.sub-container
    modals-container(@upload="uploadFile")
    div.sub-wrapper
      div.sub-header
        div.title 협력업체관리
        SearchComp(v-model="searchData",
        :searchClass="['condition1']",
        :isTextSearch="true",
        @search="searchList")
          template(slot="condition1", slot-scope="props")
            div.ui.form
              select(v-model="searchData.searchCnd")
                option(value="", default) 분류
                option(value="00") 전체
                option(value="01") 팀명
                option(value="02") 이름
        div.btnUpload
          button.ui.button.green(@click="openUploadFile") 파일업로드
          button.ui.button.green(@click="uploadSampleFile") 업로드샘플
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView-wrapper
              div.treeView.list.level-0
                TreeView(
                  v-model="selectTeam",
                  v-for="item in treeviewData",
                  :treeItem="item",
                  :isActive="rootActive",
                  :level="1",
                  @select="getItemInfo")
            div.treeEdit
            div.btnSet
              div.btn-group.left
                button.ui.button.mini(@click="activeTreeView('new')") 등록
              div.btn-wrap.right
                button.ui.button.mini(@click="activeTreeView('edit')") 편집
          div.section.right-section
            h3 {{selectTeam.title}}
            div.partner-person
              DataList(
                v-model="partner.selected",
                :headers="partner.headers",
                :items="partner.partnerData",
                :itemKey="partner.itemkey",
                :isFooter="partner.isFooter"
                :isPagination="partner.isPagination"
                :isListNumber="partner.isListNumber",
                :page="partner.pageInfo"
              )
                <template slot="items" slot-scope="props">
                  .item.lr.listitem(:class="{active:props.selected}", @click="selectedItem(props)" )
                    .ld.center.aligned {{props.item.ccpyNm}}
                    .ld.center.aligned {{props.item.emplNm}}
                    .ld.center.aligned {{props.item.clsfNm}}
                    .ld.center.aligned.ellipse {{props.item.moblphonNo}}
                </template>
            div.btnSet
              button.ui.button.large.blue(@click="createPartner()") 신규등록
              button.ui.button.large.blue(@click="updatePartner()") 편집
        div.footer
          div.btnSet
            div.btn-group.left
            div.btn-wrap.right
              button.ui.button.right.floated.large.blue(@click="downloadFile") 파일다운로드
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import PartnerEditor from '@/components/PartnerEditor.vue'
import TreeModalPartner from '@/components/TreeModalPartner.vue'
import FileUpload from '@/components/FileUpload.vue'
import { partnerGroupeHeader } from '@/setting'
import PartnerApi from '@/api/Partner'
import { codeGenerator } from '@/util'

export default {
  name: 'partner',
  data () {
    return {
      partner: {
        selected: [],
        headers: partnerGroupeHeader.headers,
        partnerData: [],
        isFooter: true,
        isPagination: true,
        isListNumber: false,
        itemkey: 'uniqueKey',
        pageInfo: {}
      },
      partnerDetailInfo: {},
      treeviewData: [],
      rootActive: true,
      selectTeam: {},
      searchData: {
        ccpyId: '',
        searchCnd: '',
        searchNm: '',
        currPage: 1
      },
      isEdit: false
    }
  },
  components: {
    DataTable,
    DataList,
    TreeView,
    SearchComp,
    PartnerEditor
  },
  created () {
    this.getPartnerList()
  },
  methods: {
    // initSearch () {
    //   this.searchData = {
    //     searchCnd: '',
    //     searchNm: ''
    //   }
    // },
    getPartnerList () {
      if (this.searchData.searchCnd === '00') { this.searchData.searchCnd = '' }
      const requestData = JSON.stringify(this.searchData)
      PartnerApi.getAllList(requestData).then(result => {
        this.treeviewData = result.data.ccpyTrList
        this.selectTeam = result.data.ccpyTrList[0]
        this.partner.partnerData = result.data.ccpyEmpList
        this.getPartnerItem()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getPartnerItem () {
      if (this.searchData.searchCnd === '00') { this.searchData.searchCnd = '' }
      this.searchData.ccpyId = this.selectTeam.childCcpyId
      const requestData = JSON.stringify(this.searchData)
      PartnerApi.getDetail(requestData).then(result => {
        this.partnerDetailInfo = result.data.ccpyDetailInfo
        this.partner.partnerData = result.data.ccpyEmpList
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem (itemInfo) {
      this.partner.selected = []
      if (!itemInfo.selected) {
        this.partner.selected.push(this.partner.partnerData[itemInfo.idx])
      }
    },
    searchList () {
      this.initSearch('id')
      this.getPartnerItem()
    },
    getItemInfo (item) {
      this.initSearch('search')
      this.selectTeam = item
      this.getPartnerItem()
    },
    initSearch (type) {
      if (type === 'search') {
        this.searchData.searchCnd = ''
        this.searchData.searchNm = ''
      } else {
        this.selectTeam = {}
      }
    },
    createPartner () {
      let partnerdata = {
        title: '협력업체사원',
        type: 'new',
        data: {
          ccpyId: this.selectTeam.childCcpyId,
          ccpyNm: this.selectTeam.childCcpyNm,
          emplNm: '',
          clsfNm: '',
          moblphonNo: ''
        },
        target: this.selectTeam
      }
      this.$modal.show(PartnerEditor, partnerdata, { height: '500px', draggable: true, clickToClose: false }, {
        'before-close': () => {
          this.getPartnerItem()
        } })
    },
    updatePartner () {
      let partnerdata = {
        title: '협력업체사원',
        type: 'edit',
        data: {},
        target: this.selectTeam
      }
      if (this.partner.selected[0] === undefined || this.partner.selected[0] === []) {
        this.$modal.show('dialog', {
          title: '선택오류',
          text: '선택된 데이터가 없습니다'
        })
      } else {
        partnerdata.data = this.partner.selected[0]
        this.$modal.show(PartnerEditor, partnerdata, { height: '500px', draggable: true, clickToClose: false }, {
          'before-close': () => {
            this.getPartnerItem()
          } })
      }
    },
    activeTreeView (editType) {
      this.$modal.show(TreeModalPartner, {
        title: '협력업체',
        data: this.treeviewData,
        target: this.partnerDetailInfo,
        type: editType
      }, {
        width: '50%',
        height: '80%',
        minHeight: '700px',
        clickToClose: false
      }, {
        'before-close': () => {
          this.getPartnerList()
        }
      })
    },
    openUploadFile () {
      this.$modal.show(FileUpload, {
        title: '파일업로드'
      }, {
        width: '300px',
        height: '250px',
        clickToClose: false
      })
    },
    uploadFile (fileData) {
      const requestData = new FormData()
      requestData.append('file', fileData)
      PartnerApi.fileUpload(requestData).then(result => {
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    uploadSampleFile () {
      PartnerApi.fileSampleUpload()
    },
    downloadFile () {
      PartnerApi.fileDownload()
    }
  }
}
</script>

<style lang="less" scoped>
.transition (@type: all, @duration: 250ms, @Function: ease-out) {
  -webkit-transition: @arguments;
  -moz-transition: @arguments;
  -ms-transition: @arguments;
  -o-transition: @arguments;
  transition: @arguments;
}
.Partner {
  .search-comp {
    right: 250px
  }
  .btnUpload {
    position: absolute;
    top:0;
    right:0;
  }
  .right-section {
    .partner-person {
      height: 85%;
    }
  }
  .left-section {
    display: flex;
    flex-direction: column;
    .treeView-wrapper {
      overflow-y: auto;
      height: 90%;
      .transition();
      &.editabled {
        height: 50%;
      }
    }
    .treeEdit {
      flex-grow: 1;
      position: relative;
      // background-color: rgba(0, 0, 0, .5);
      color: #fff;
      .edit-wrapper {
        position:absolute;
        top: 80px;
        width: 100%;
        padding: 10px;
        .ui.form input {
          background-color: rgba(0, 0, 0, 0);
          color:#fff;
        }
      }
    }
  }
}

</style>
