<template lang="pug">
  div.FireBrigade.sub-container
    modals-container(@upload="uploadFile")
    div.sub-wrapper
      div.sub-header
        div.title 자위소방대관리
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
                  @select="getItemInfo",
                  v-for="item in treeviewData",
                  :treeItem="item",
                  :isActive="rootActive",
                  :level="1",
                  @search="getList",
                  :selectedTeam="uniqTeam")
            div.treeEdit
            div.btnSet
              div.btn-group.left
                button.ui.button.mini(@click="activeTreeView('new')") 등록
              div.btn-wrap.right
                button.ui.button.mini(@click="activeTreeView('edit')") 편집
          div.section.right-section
            div.file-movement
              div.files_1
                h3 {{selectTitle}}
                div.data-list-wrap
                  DataList(
                    v-model="fireBrigade.selected"
                    :headers="fireBrigade.headers",
                    :items="fireBrigade.fireBrigadeGroup",
                    :itemKey="fireBrigade.itemkey",
                    :isListNumber="fireBrigade.isListNumber",
                    :isTitle="fireBrigade.isTitle"
                  )
                    template(slot="items", slot-scope="props")
                      div.item.lr.listitem(:class="{active:props.selected}", @click.stop="selectedleftItems(props)" )
                        .ld {{props.item.emplNm}}
                        .ld {{props.item.clsfCdNm}}
                        .ld {{props.item.ofcpsCdNm}}
                        .ld {{props.item.deptNm}}
              div.movement-btn
                div.btn-wrapper
                  button.ui.icon.button(@click="editArray('left')")
                    i.arrow.left.icon
                  button.ui.icon.button(@click="editArray('right')")
                    i.arrow.right.icon
              div.files_2
                h3 미배정목록
                div.data-list-wrap
                  DataList(
                    v-model="offFireBrigade.selected"
                    :headers="offFireBrigade.headers",
                    :items="offFireBrigade.offFireBrigadeGroup",
                    :itemKey="offFireBrigade.itemkey",
                    :isListNumber="offFireBrigade.isListNumber",
                    :isTitle="offFireBrigade.isTitle"
                  )
                    template(slot="items", slot-scope="props")
                      div.item.lr.listitem(:class="{active:props.selected}", @click.stop="selectedrightItems(props)" )
                        .ld {{props.item.emplNm}}
                        .ld {{props.item.clsfCdNm}}
                        .ld {{props.item.ofcpsCdNm}}
                        .ld {{props.item.deptNm}}

            div.btnSet
                div.btn-wrap.right
                div.btn-group.left
                  button.ui.button.blue(@click="updateItems") 저장
                  button.ui.button(@click="getList") 초기화
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
import TreeModal from '@/components/TreeModal.vue'
import FileUpload from '@/components/FileUpload.vue'
import { fireBrigadeGroupHeader } from '@/setting'
import FireBrigadeApi from '@/api/FireBrigade'
import { codeGenerator } from '@/util'

export default {
  name: 'firebrigade',
  data () {
    return {
      fireBrigade: {
        selected: [],
        headers: fireBrigadeGroupHeader.headers,
        fireBrigadeGroup: [],
        isListNumber: false,
        isTitle: false,
        itemkey: 'uniqueKey'
      },
      offFireBrigade: {
        selected: [],
        headers: fireBrigadeGroupHeader.headers,
        offFireBrigadeGroup: [],
        isListNumber: false,
        isTitle: false,
        itemkey: 'uniqueKey'
      },
      FireBrigadeDetail: {},
      treeviewData: [],
      rootActive: true,
      selectTeam: {},
      searchData: {
        searchCnd: '',
        searchNm: ''
      },
      uploadTreeData: {},
      uniqTeam: {}
    }
  },
  components: {
    DataTable,
    DataList,
    TreeView,
    SearchComp
  },
  created () {
    this.getTreeList()
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
      const requestData = JSON.stringify({})
      FireBrigadeApi.getTreeList(requestData)
        .then(result => {
          this.treeviewData = result.data.slfdfnFbrdTrList
          this.selectTeam = result.data.slfdfnFbrdTrList[0]
          this.getList()
        })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    getList () {
      if (this.searchData.searchCnd === '00') { this.searchData.searchCnd = '' }
      this.searchData.childSlfdfnFbrdId = this.selectTeam.childSlfdfnFbrdId
      const requestData = JSON.stringify(this.searchData)
      FireBrigadeApi.getDetail(requestData)
        .then(result => {
          this.fireBrigade.fireBrigadeGroup = result.data.slfdfnFbrdEmpInfoList
          this.offFireBrigade.offFireBrigadeGroup = result.data.fbrdAsignTrgetList
          this.fireBrigadeDetail = result.data.slfdfnFbrdDetailInfo
        })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    searchList () {
      this.initSearch('id')
      this.getList()
    },
    getItemInfo (item) {
      this.initSearch('search')
      this.selectTeam = item
      this.uploadTreeData = item
      this.getList()
      this.initedSelect()
    },
    initSearch (type) {
      if (type === 'search') {
        this.searchData.searchCnd = ''
        this.searchData.searchNm = ''
      } else {
        this.selectTeam = {}
      }
    },
    updateItems () {
      const requestData = JSON.stringify({
        slfdfnFbrdId: this.selectTeam.childSlfdfnFbrdId,
        slfdfnFbrdEmpInfoList: this.fireBrigade.fireBrigadeGroup
      })
      FireBrigadeApi.setFiremanInfo(requestData).then(result => {
        this.$modal.show('dialog', {
          title: '실행확인',
          text: '저장되었습니다'
        })
        this.getList()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedleftItems (itemInfo) {
      if (itemInfo.selected) {
        this.fireBrigade.selected.forEach((e, i) => {
          if (e[this.fireBrigade.itemkey] === itemInfo.item[this.fireBrigade.itemkey]) {
            this.fireBrigade.selected.splice(i, 1)
          }
        })
      } else {
        this.fireBrigade.selected.push(this.fireBrigade.fireBrigadeGroup[itemInfo.idx])
      }
    },
    selectedrightItems (itemInfo) {
      if (itemInfo.selected) {
        this.offFireBrigade.selected.forEach((e, i) => {
          if (e[this.offFireBrigade.itemkey] === itemInfo.item[this.offFireBrigade.itemkey]) {
            this.offFireBrigade.selected.splice(i, 1)
          }
        })
      } else {
        this.offFireBrigade.selected.push(this.offFireBrigade.offFireBrigadeGroup[itemInfo.idx])
      }
    },
    initedSelect () {
      this.fireBrigade.selected = []
      this.offFireBrigade.selected = []
    },
    activeTreeView (editType) {
      this.$modal.show(TreeModal, {
        title: '자위소방대',
        data: this.treeviewData,
        target: this.fireBrigadeDetail,
        type: editType,
        children: this.fireBrigade.fireBrigadeGroup
      }, {
        adaptive: true,
        width: '50%',
        height: '80%',
        minHeight: 700,
        clickToClose: false
      }, {
        'before-close': () => {
          this.getTreeList()
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
      FireBrigadeApi.fileUpload(requestData).then(result => {
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    uploadSampleFile () {
      FireBrigadeApi.fileSampleUpload()
    },
    downloadFile () {
      FireBrigadeApi.fileDownload()
    },
    editArray (type) {
      if (type === 'left') {
        this.fireBrigade.fireBrigadeGroup = this.fireBrigade.fireBrigadeGroup.concat(this.offFireBrigade.selected)
        this.offFireBrigade.selected.forEach((e) => {
          this.offFireBrigade.offFireBrigadeGroup.forEach((el, i) => {
            if (el[this.fireBrigade.itemkey] === e[this.fireBrigade.itemkey]) {
              this.offFireBrigade.offFireBrigadeGroup.splice(i, 1)
            }
          })
        })
        this.offFireBrigade.selected = []
      } else {
        this.offFireBrigade.offFireBrigadeGroup = this.offFireBrigade.offFireBrigadeGroup.concat(this.fireBrigade.selected)
        this.fireBrigade.selected.forEach((e) => {
          this.fireBrigade.fireBrigadeGroup.forEach((el, i) => {
            if (el[this.fireBrigade.itemkey] === e[this.fireBrigade.itemkey]) {
              this.fireBrigade.fireBrigadeGroup.splice(i, 1)
            }
          })
        })
        this.fireBrigade.selected = []
      }
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
.FireBrigade {
  .search-comp {
    right: 250px
  }
  .btnUpload {
    position: absolute;
    top:0;
    right:0;
  }
  .section.left-section {
    display: flex;
    flex-direction: column;
    overflow: hidden !important;
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
.section {
  position:relative;
  .file-movement {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;
    .movement-btn {
      padding: 0 10px;
      width: 10%;
    }
    .files_2{
      width: 45%;
      .data-list-wrap {
        width: 100%;
        height: 90%;
      }
    }
    .files_1 {
      width: 45%;
      .data-list-wrap {
        width: 100%;
        height: 90%;
      }
    }
  }
}
.btn-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  button {
    display: inline-block;
    margin-top: 5px;
  }
}
</style>
