<template lang="pug">
  div.SystemUser.sub-container
    modals-container
    div.sub-wrapper
      div.sub-header
        div.title 운영자 관리
        //- SearchComp(
        //-   v-model="searchData",
        //-   :isTextSearch="true",
        //-   @search="searchUserList")
        //-   template(slot="condition1", slot-scope="props")
        //-     select.ui.dropdown(v-model="searchData")
        //-       option(value="", default) 분류
        //-       option(value="00") 전체
        //-       option(value="01") 운영자명
        //-       option(value="02") 운영자ID
      div.sub-content
        div.content
          DataTable(
            v-model="systemUser.selected"
            :headers="systemUser.headers",
            :items="systemUser.systemUserData",
            :itemKey="systemUser.itemkey"
            :isFooter="systemUser.isfooter",
            :isSelect="systemUser.isSelect",
            :isListNumber="systemUser.isListNumber",
            :isPagination="systemUser.isPagination",
            :page="systemUser.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr(:active="props.selected", @click="selectedItem(props)" )
                td.center.aligned
                  div.ui.checkbox
                    input(type="radio", :checked="props.selected")
                    label
                td(v-if="systemUser.isListNumber").center.aligned {{props.idx+1}}
                td.center.aligned {{props.item.oprtrId}}
                td {{props.item.oprtrNm}}
                td.center.aligned {{props.item.clsfCdNm}}
                td.center.aligned {{props.item.ofcpsCdNm}}
                td {{props.item.moblphonNo}}
                td.center.aligned {{props.item.oprtrFgCdNm}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
              button.ui.button.large(@click="updateUser") 편집
              button.ui.button.large(@click="deleteItem") 삭제
            div.btn-wrap.right
              button.ui.button.large.blue(@click="createUser") 신규등록
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import UserEditor from '@/components/UserEditor.vue'
import SearchComp from '@/components/SearchComp.vue'
import { systemUserHeader } from '@/setting'
import SystemUser from '@/api/Users'
import { codeGenerator } from '@/util'

export default {
  name: 'system-user',
  data () {
    return {
      searchData: {},
      systemUser: {
        selected: [],
        headers: systemUserHeader.headers,
        systemUserData: [],
        isFooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: true,
        itemkey: 'oprtrId',
        pageInfo: {}
      }
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp
  },
  created () {
    this.getUsersList()
  },
  mounted () {
    $('.ui.dropdown').dropdown()
  },
  methods: {
    getUsersList () {
      SystemUser.getList().then(result => {
        this.systemUser.systemUserData = result.data.oprtrInfoList
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    deleteItem () {
      if (this.systemUser.selected.length === 0) {
        this.$modal.show('dialog', {
          title: '선택오류',
          text: '선택 된 운영자가 없습니다.'
        })
      } else {
        const requestData = JSON.stringify({
          oprtrId: this.systemUser.selected[0].oprtrId
        })
        SystemUser.deleteUser(requestData).then(result => {
          this.getUsersList()
        }).catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
      }
    },
    selectedItem (itemInfo) {
      this.systemUser.selected = []
      if (!itemInfo.selected) {
        this.systemUser.selected.push(this.systemUser.systemUserData[itemInfo.idx])
      }
    },
    createUser () {
      this.$modal.show(UserEditor, {
        type: 'new',
        data: {}
      }, {
        width: '700px',
        height: '450px',
        clickToClose: false
      }, {
        'before-close': () => {
          this.getUsersList()
        }
      })
    },
    updateUser () {
      if (this.systemUser.selected.length === 0) {
        this.$modal.show('dialog', {
          title: '선택오류',
          text: '선택 된 운영자가 없습니다.'
        })
      } else {
        this.$modal.show(UserEditor, {
          type: 'edit',
          data: this.systemUser.selected[0]
        }, {
          width: '700px',
          height: '450px',
          clickToClose: false
        }, {
          'before-close': () => {
            this.getUsersList()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
