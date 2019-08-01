<template lang="pug">
  modal(name="select-reciever", width='1000', height='800', :clickToClose="false", @before-open="setProps")
    div.modal.selectRecieve
      div.modal-header {{title}}
      div.modal-content.treeSelector
        div.tree-editor-modal
          div.select-part
            h3 부서 선택
            div.treeView-wrapper
              div.treeView.list.level-0
                TreeView(
                  v-model= "selectTeam",
                  @select="getItemInfo",
                  v-for="item in treeviewData",
                  :treeItem="item",
                  :isActive="activeItem",
                  :isSelect ="false"
                  :level="1")
          div.select-person
            div.select-part-name
              div.title {{selectTeam.title ? selectTeam.title : '수신자선택'}}
              button.ui.right.floated.button.mini(@click="unSelectAll") 전체취소
              button.ui.right.floated.button.blue.mini(@click="selectAll") 전체
            div.treeView-wrapper.select-part
              div.treeView.list.level-0
                div.treeitem(v-for="(item, index) in selectTeamList",
                @click="getListInfo(item)",
                :class="{active:item.checked === 'Y'}")
                  div.treecontent
                      div.treeheader()
                        div.item-wrapper
                          div {{item.deptNm}}
                          div {{item.clsfNm}}
                          div {{item.emplNm}}
      div.modal-footer
        div.btnSet
          div.btn-group.left
          div.btn-wrap.right
            button.ui.button.green(@click="sendReciever(recieveList)") 선택
            button.ui.button(@click="initReciever") 취소
      div.modal-close(@click="$emit('close')")
          div.close X
</template>

<script>
import SopManageApi from '@/api/SopManage'
import TreeView from '@/components/TreeView'

let selectedDataList = []

export default {
  name: 'tree-reciever-modal',
  components: {
    TreeView
  },
  data () {
    return {
      title: '',
      text: '',
      stepNo: 0,
      stepSn: 0,
      treeviewData: [],
      selectTeam: {},
      selectTeamInfo: {},
      selectTeamList: [],
      activeItem: true,
      recieveList: [],
      isAllselect: false
    }
  },
  created () {
    this.getTreeList()
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.stepNo = event.params.stepNo
      this.stepSn = event.params.stepSn
      this.recieveList = event.params.recieveData
      this.$nextTick(() => {
        this.checkPartList(this.treeviewData)
      })
      selectedDataList = []
      this.recieveList.forEach(e => {
        const recieveItem = e
        selectedDataList.push(recieveItem)
      })
    },
    initReciever () {
      this.recieveList = []
      this.sendReciever(selectedDataList)
      this.getTreeList()
    },
    getTreeList () {
      const request = JSON.stringify({})
      SopManageApi.getRecieverTree(request).then(result => {
        this.treeviewData = result.data.deptTrList
        this.selectTeam = result.data.deptTrList[0]
        this.selectTeamInfo.deptId = this.selectTeam.childDeptId
      }).then(() => {
        this.getTreeItem(this.selectTeamInfo)
      }).catch(error => {
        const err = error
        console.log(err)
      })
    },
    getTreeItem (request) {
      const requestData = JSON.stringify(request)
      SopManageApi.getRecieverList(requestData).then(result => {
        this.selectTeamList = result.data.empInfoPopupList
      }).then(() => {
        this.selectTeamList.forEach((e) => {
          let isCheck = this.checkItem(e)
          this.$set(e, 'checked', isCheck)
        })
      }).catch(error => {
        const err = error.response
        if (err) {
          alert(err.data.msgValue)
        }
      })
    },
    getItemInfo (item) {
      this.selectTeam = item
      item.selected = this.checkPartItem(item)
      this.selectTeamInfo.deptId = this.selectTeam.childDeptId
      this.getTreeItem(this.selectTeamInfo)
    },
    getListInfo (item) {
      if (item.checked === 'N') {
        this.recieveList.push({
          stepNo: this.stepNo,
          stepSn: this.stepSn,
          deptId: item.deptId,
          deptNm: item.deptNm,
          emplNm: item.emplNm,
          emplNo: item.emplNo,
          state: 'new'
        })
        item.checked = 'Y'
      } else {
        this.recieveList.forEach((e, i) => {
          if (e.emplNo === item.emplNo) {
            this.recieveList.splice(i, 1)
          }
        })
        item.checked = 'N'
      }
      this.checkPartList(this.treeviewData)
    },
    checkPartList (list) {
      list.forEach(e => {
        e.selected = this.checkPartItem(e)
        if (e.children.length > 0) {
          this.checkPartList(e.children)
        }
      })
    },
    checkPartItem (item) {
      let isChecked = 'N'
      if (this.recieveList.length > 0) {
        this.recieveList.forEach((e, i) => {
          if (e.deptId === item.childDeptId) {
            isChecked = 'Y'
          }
        })
      }
      return isChecked
    },
    checkItem (item) {
      let isChecked = 'N'
      if (this.recieveList.length > 0) {
        this.recieveList.forEach((e, i) => {
          if (e.emplNo === item.emplNo && e.deptId === item.deptId) {
            isChecked = 'Y'
          }
        })
      }
      return isChecked
    },
    selectAll () {
      this.selectTeamList.forEach(e => {
        if (this.checkItem(e) === 'Y') {
          e.checked = 'Y'
        } else {
          e.checked = 'Y'
          this.recieveList.push({
            stepNo: this.stepNo,
            stepSn: this.stepSn,
            deptId: e.deptId,
            deptNm: e.deptNm,
            emplNm: e.emplNm,
            emplNo: e.emplNo
          })
        }
      })
      this.checkPartList(this.treeviewData)
    },
    unSelectAll () {
      this.selectTeamList.forEach(e => {
        e.checked = 'N'
        this.recieveList.forEach((el, i) => {
          if (el.emplNo === e.emplNo) {
            this.recieveList.splice(i, 1)
          }
        })
        this.checkPartList(this.treeviewData)
      })
    },
    sendReciever (selectedList) {
      this.$emit('reciever', selectedList)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>

    .treeSelector {
      overflow-y: auto;
      background-color: #454545;
      .treeView-footer {
        padding-top: 20px;
      }
      .list.level-4 {
        display: block;
      }
      .tree-editor-modal {
        display: flex;
        background-color: #454545;
        width: 100%;
        height: 100%;
        > div {
          color:#fff;
          width: 50%;
          height: 100%;
          padding: 10px;
          margin: 0 5px;
          .treeView-wrapper {
            width: 100%;
            height: 95%;
            .treeview {
              height: 90%;
            }
            .level-0 {
              .treeitem:hover {
                background-color: #58666d;
              }
              .treeitem.active {
                background-color: #80b1ca;
                  .treeheader {
                      color: #525252;
                      font-weight: bold;
                      span {
                        display: inline-block;
                        padding-right: 5px;
                      }
                  }
                }
            }
          }
          .editor-wrapper {
            position: relative;
            flex-grow: 1;
            padding: 10px;
            color: #fff;
            .content{
              padding: 10px;
              border: 1px solid rgba(139, 139, 139, 0.493);
            }
            .ui.form input {
              background-color: rgba(0, 0, 0, 0.2);
              color:#fff;
            }
          }
        }
        .select-person {
          .level-0 {
            border: 0;
          }
          .select-part-name {
            font-size: 1.2rem;
            height: 35px;
            .title {
              float: left;
              padding: 5px 0
            }
          }
        }
      }
    }
    .modal-footer {
      background-color: #454545;
    }

</style>
