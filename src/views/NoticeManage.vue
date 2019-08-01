<template lang="pug">
  div.historyManage.sub-container
    modals-container
    div.sub-wrapper
      div.sub-header
        div.title 공지사항
        SearchDate(
          v-model="searchData",
          :startDate="selectedDateStart",
          :endDate="selectedDateEnd",
          :isRange="searchType",
          @search="searchNoticeList")
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="headers",
            :items="sopNoticData",
            :itemKey="itemkey"
            :isFooter="isfooter",
            :isPagination="isPagination",
            :page="pageInfo"
            :isListNumber="isListNumber",
            @search="getNoticeList"
          ).ui.table.celled
            <template slot="items" slot-scope="props">
              tr(:active="props.selected", @click="selectedItem(props)" )
                td.center.aligned {{props.idx+1}}
                td.ellipse {{props.item.noticeTitle}}
                td.center.aligned {{props.item.ntceDt}}
                td.center.aligned {{props.item.frstRegNm}}
                td.center.aligned {{props.item.frstRegDt}}
              tr.extended(v-if="isExtended", :class="{active:props.selected}", @click.prevent)
                td(:colspan="props.colspan")
                  div.notice-wrapper
                    div.notice-content {{props.item.noticeContents}}

            </template>
        div.footer
          div.btnSet
            div.btn-group.left
              button.ui.button.large(@click="editItem") 수정
              button.ui.button.large(@click="deleteNoticeItem") 삭제
            div.btn-wrap.right
              button.ui.button.large.blue(@click="newItem") 신규등록
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchDate from '@/components/SearchDate.vue'
import InsertNotice from '@/components/InsertNotice.vue'
import { noticeTableHeader } from '@/setting'
import NoticeApi from '@/api/Notice'
import { codeGenerator, convertDateFormat } from '@/util'

export default {
  name: 'notice-manage',
  components: {
    DataTable,
    SearchDate
  },
  data () {
    return {
      selected: [],
      headers: noticeTableHeader.headers,
      sopNoticData: [],
      isfooter: true,
      isPagination: true,
      isListNumber: true,
      pageInfo: {},
      itemkey: 'noticeSn',
      isExtended: true,
      selectedDateStart: new Date(),
      selectedDateEnd: new Date(),
      searchType: 'single',
      searchData: {
        start: '',
        end: ''
      }
    }
  },
  created () {
    this.initDate()
    this.getNoticeList(1)
  },
  methods: {
    getNoticeList (targetNum) {
      if (targetNum === undefined) { targetNum = 1 }
      const requestData = JSON.stringify({
        ntceBeginDt: this.searchData.start,
        ntceEndDt: this.searchData.end,
        currPage: targetNum
      })
      NoticeApi.getList(requestData).then(result => {
        this.sopNoticData = result.data.noticeList
        result.data.param.totalCount = result.data.totCnt
        this.pageInfo = result.data.param
      })
        .catch(error => {
          console.log(error)
        })
    },
    searchNoticeList () {
      this.getNoticeList(this.pageInfo.currPage)
    },
    createNoticeItem () {
      const requestData = JSON.stringify({ noticeSn: this.selected[0].noticeSn })
      NoticeApi.updateItem(requestData).then(result => {
      })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    updateNoticeItem () {
      const requestData = JSON.stringify({ noticeSn: this.selected[0].noticeSn })
      NoticeApi.updateItem(requestData).then(result => {
      })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    deleteNoticeItem () {
      if (this.selected.length === 0) {
        this.$modal.show('dialog', {
          title: '선택오류',
          text: '선택 된 게시물이 없습니다.'
        })
      } else {
        const requestData = JSON.stringify({ noticeSn: this.selected[0].noticeSn })
        NoticeApi.deleteItem(requestData).then(result => {
          this.$modal.show('dialog', codeGenerator('Y', '삭제되었습니다'))
          this.getNoticeList()
        })
          .catch(error => {
            const err = error.response
            this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
          })
      }
    },
    selectedItem (itemInfo) {
      this.selected = []
      if (!itemInfo.selected) {
        this.selected.push(this.sopNoticData[itemInfo.idx])
      }
    },
    editItem () {
      if (this.selected.length === 0) {
        this.$modal.show('dialog', {
          title: '선택오류',
          text: '선택 된 게시물이 없습니다.'
        })
      } else {
        this.$modal.show(InsertNotice, {
          type: 'edit',
          title: '수정하기',
          notice: this.selected[0]
        }, {
          height: '500px',
          clickToClose: false
        }, {
          'before-close': () => {
            this.getNoticeList()
          }
        })
      }
    },
    newItem () {
      this.$modal.show(InsertNotice, {
        type: 'new',
        title: '작성하기',
        notice: {}
      }, {
        height: '450px',
        clickToClose: false
      }, {
        'before-close': () => {
          this.getNoticeList()
        }
      })
    },
    initDate () {
      const today = new Date()
      const d = today.getDate()
      today.setDate(d - 7)
      this.searchData.start = convertDateFormat(today, '')
      this.searchData.end = convertDateFormat(new Date(), '')
    }
  }
}
</script>

<style lang="less">
.transition (@type: all, @duration: 250ms, @Function: ease-out) {
  -webkit-transition: @arguments;
  -moz-transition: @arguments;
  -ms-transition: @arguments;
  -o-transition: @arguments;
  transition: @arguments;
}
.historyManage {
  .content {
    overflow-y: auto;
  }
}
.extended{
  background-color: rgba(173, 173, 173, 0.01);
  td {
    border-top: 0 !important;
    border-bottom: 0 !important;
    padding: 0 !important;
  }
  .notice-wrapper {
    .transition();
    height: 0;
    .notice-content {
      padding: 1rem 5rem;
      max-height: 150px;
      overflow-y: auto;
    }
  }
  &.active {
    .notice-wrapper {
      .transition();
      height: 150px;
    }
  }
}

</style>
