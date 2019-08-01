<template lang="pug">
  div.modal
    div.modal-header {{title}} {{type === 'new' ? '등록' : '편집'}}
    div.modal-content.treeEditor
      div.tree-editor
        div.treeView-wrapper
          div.treeView.list.level-0
            TreeView(
              v-model= "selectTeam",
              @select="getItemInfo",
              v-for="item in treeviewData",
              :treeItem="item",
              :isActive="activeItem"
              :level="1")
        div.editor-wrapper
          template(v-if="type === 'new'")
            h3 생성
            div.content
              div.ui.form.inverted
                div.field
                  label 상위협력업체명
                  input(type="text", placeholder="상위협력업체명 선택", readonly="", v-model="createTeam.upperCcpyNm").readonly
                div.field
                  label 협력업체명
                  input(type="text", placeholder="협력업체명 입력", v-model="createTeam.ccpyNm")
                div.field
                  label 대표전화번호
                  input(type="text", placeholder="대표전화번호 입력", v-model="createTeam.reprsntTelno")
                div.field
                  div.ui.checkbox
                    input(type="checkbox", true-value="Y", false-value="N", v-model="createTeam.useYn")
                    label 사용여부
          template(v-else)
            h3 편집
            div.content
              div.ui.form.inverted.tiny
                div.field
                  label 상위협력업체명
                  input(type="text", placeholder="상위협력업체명 선택", readonly="", v-model="editTeam.upperCcpyNm").readonly
                div.field
                  label 협력업체명
                  input(type="text", placeholder="협력업체명 입력", v-model="editTeam.ccpyNm")
                div.field
                  label 대표전화번호
                  input(type="text", placeholder="대표전화번호 입력", v-model="editTeam.reprsntTelno")
                div.field
                  div.ui.checkbox
                    input(type="checkbox", true-value="Y", false-value="N", v-model="editTeam.useYn")
                    label 허용
    div.modal-footer.inverted
      div.btnSet.right
        template(v-if="type === 'new'")
          button.ui.button.green(@click="createTreeItem") 등록
          button.ui.button(@click="$emit('close')") 취소
        template(v-else)
          button.ui.button.blue(@click="updateTreeItem") 저장
          button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import PartnerApi from '@/api/Partner'
import TreeView from '@/components/TreeView'
import { codeGenerator } from '@/util'

export default {
  name: 'treeview-modal',
  components: {
    TreeView
  },
  props: {
    type: String,
    title: String,
    text: String,
    data: Array,
    target: Object,
    value: Object,
    isActive: Boolean
  },
  data () {
    return {
      treeviewData: this.data,
      createTeam: {
        ccpyNm: '',
        reprsntTelno: '',
        useYn: 'Y',
        upperCcpyId: '',
        upperCcpyNm: ''
      },
      selectTeam: {},
      editTeam: this.target,
      activeItem: true
    }
  },
  created () {
    this.getTreeList()
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  methods: {
    getTreeList () {
      const requestData = JSON.stringify({
        searchCnd: '',
        searchNm: '',
        currPage: 1
      })
      PartnerApi.getAllList(requestData).then(result => {
        this.treeviewData = result.data.ccpyTrList
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    createTreeItem () {
      const requestData = JSON.stringify(this.createTeam)
      PartnerApi.createPartnerInfo(requestData)
        .then(result => {
          this.$emit('close')
          this.showDailog()
        })
        .catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    updateTreeItem () {
      const requestData = JSON.stringify(this.editTeam)
      PartnerApi.updatePartnerInfo(requestData)
        .then(result => {
          this.$emit('close')
          this.showDailog()
        })
        .catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    getItemInfo (item) {
      if (this.type === 'new') {
        this.createTeam.upperCcpyNm = item.childCcpyNm
        this.createTeam.upperCcpyId = item.childCcpyId
      } else {
        this.editTeam.upperCcpyId = item.childCcpyId
        this.editTeam.upperCcpyNm = item.childCcpyNm
      }
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: ''
      }
      if (this.type === 'new') {
        options.text += '등록되었습니다'
      } else {
        options.text += '수정되었습니다'
      }
      this.$modal.show('dialog', options)
    }
  }
}
</script>

<style lang="less" scoped>
.treeEditor {
  overflow-y: auto;
  background-color: #454545;
  .treeView-footer {
    padding-top: 20px;
  }
}
.tree-editor {
  display: flex;
  background-color: #454545;
  height: 100%;
  .treeView-wrapper {
    width: 50%;
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
// .modal {
//     background-color: #fff;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     .modal-header {
//         background-color: #5d5e68;
//         color: #fff;
//         padding: .8em 1.2em;
//         font-weight: 700;
//     }
//     .modal-content {
//       flex-grow: 1;
//       padding: 15px;
//       &.treeEditor {
//         overflow-y: auto;
//         background-color: #454545;
//         .treeView-footer {
//           padding-top: 20px;
//         }
//       }
//       .tree-editor {
//         display: flex;
//         background-color: #454545;
//         height: 100%;
//         .treeView-wrapper {
//           width: 50%;
//         }
//         .editor-wrapper {
//           position: relative;
//           flex-grow: 1;
//           padding: 10px;
//           color: #fff;
//           .content{
//             padding: 10px;

//             border: 1px solid rgba(139, 139, 139, 0.493);
//           }
//           .ui.form input {
//             background-color: rgba(0, 0, 0, 0.2);
//             color:#fff;
//         }
//         }
//       }
//     }
//     // .treeView-footer {
//     //   background-color: #454545;
//     //   height: 15%;
//     //   padding: 10px;

//     // }
// }
</style>
