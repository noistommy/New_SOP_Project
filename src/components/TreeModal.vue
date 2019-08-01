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
                  label 상위자위소방대명
                  input(type="text", placeholder="상위소방대 선택", readonly="", v-model="createTeam.upperSlfdfnFbrdNm").readonly
                div.field
                  label 자위소방대명
                  input(type="text", placeholder="소방대명 입력", v-model="createTeam.slfdfnFbrdNm")
          template(v-else)
            h3 편집
            div.content
              div.ui.form.inverted.tiny
                div.field
                  label 자위소방대명
                  input(type="text", v-model="editTeam.slfdfnFbrdNm")
                div.field
                  label 소방대장
                  select.inverted(type="text", v-model="editTeam.slfdfnFglEmplNo" , @change="setFireBrigadeBoss")
                    option(v-for="child in children" :value="child.emplNo") {{child.deptNm}} {{child.clsfCdNm}} {{child.emplNm}}
                div.field
                  label 배정인원
                  input(type="text", v-model="editTeam.asignNmpr")
                div.field
                  label 상위자위소방대명
                  input(type="text", v-model="editTeam.upperSlfdfnFbrdNm", readonly="").readonly
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
import FireBrigadeApi from '@/api/FireBrigade'
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
    isActive: Boolean,
    children: Array
  },
  data () {
    return {
      treeviewData: this.data,
      createTeam: {
        slfdfnFbrdNm: '',
        upperSlfdfnFbrdId: '',
        upperSlfdfnFbrdNm: ''
      },
      selectTeam: {},
      editTeam: this.target,
      activeItem: true
    }
  },
  created () {
    this.getTreeList()
  },
  methods: {
    getTreeList () {
      FireBrigadeApi.getTreeList({})
        .then(result => {
          this.treeviewData = result.data.slfdfnFbrdTrList
        })
        .catch(error => {
          this.$emit('close')
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    // getSelectItem () {
    //   const requestData = JSON.stringify({
    //     searchCnd: '02',
    //     searchNm: this.selectTeam.childSlfdfnFbrdNm
    //   })
    //   FireBrigadeApi.getTreeList(requestData)
    //     .then(result => {
    //     })
    //     .catch(error => {
    //       this.$emit('close')
    //       const err = error.response
    //       this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
    //     })
    // },
    createTreeItem () {
      const requestData = JSON.stringify(this.createTeam)
      FireBrigadeApi.createItem(requestData)
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
      FireBrigadeApi.updateItem(requestData)
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
        this.createTeam.upperSlfdfnFbrdId = item.childSlfdfnFbrdId
        this.createTeam.upperSlfdfnFbrdNm = item.childSlfdfnFbrdNm
      } else {
        this.editTeam.upperSlfdfnFbrdNm = item.childSlfdfnFbrdNm
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
    padding: 15px;
    overflow: hidden;
    background-color: #454545;
    .treeView-footer {
      padding-top: 20px;
    }
    .list.level-4 {
      display: none;
    }
  }
  .tree-editor {
    display: flex;
    background-color: #454545;
    height: 100%;
    .treeView-wrapper {
      width: 50%;
      overflow-y: auto;
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
    .ui.form select.inverted {
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      option {
        color: #000;
      }
    }
  }

</style>
