<template lang="pug">
div.modal
    div.modal-header {{title}}
    div.modal-content
      div.content-wrapper
        div.content-header
          h3 {{sopHistoryInfo.sopTitle}}
          div 장소:{{sopHistoryInfo.displayBuldFloor}}
          div 시간:{{sopHistoryInfo.displayExecutBeginDt}}
        div.list-content
          DataList(
            :headers="headers",
            :items="sopHistoryList",
            :isListNumber="isListNumber"
          )
            template(slot="items", slot-scope="props")
              div.item.lr.listitem(:class="{active:props.selected}" )
                .ld.center.one {{props.item.rn}}
                .ld.five {{props.item.stepTitle}}
                .ld.ten {{props.item.displayContents}}
    div.modal-footer
      div.btnSet.right
        button.ui.button.blue(@click="sopHistoryDownload") 파일다운로드
        button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X

</template>

<script>
import DataList from '@/components/DataList.vue'
import HistoryApi from '@/api/History'

export default {
  name: 'sop-history-modal',
  props: {
    data: Object,
    title: String,
    text: String
  },
  data () {
    return {
      headers: [
        { text: 'STEP', align: 'center', value: 'crisisGnfdStepNm', size: 'five' },
        { text: '임무목록', align: 'center', value: 'executYnNm', size: 'ten' }
      ],
      // sopHistoryInfo: {},
      // sopHistoryList: this.data.stepList,
      sopHistoryInfo: this.data.stepInfo,
      sopHistoryList: this.data.stepList,
      isListNumber: true
    }
  },
  components: {
    DataList
  },
  created () {
  },
  methods: {
    sopHistoryDownload () {
      const requestData = {
        sopId: this.sopHistoryInfo.sopId,
        sopExecutSn: this.sopHistoryInfo.sopExecutSn
      }
      HistoryApi.sopHistoryDetailDownload(requestData)
    }
  }
}
</script>

<style lang="less" scoped>

// .modal {
//   background-color: #fff;
//   position: relative;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
  // .modal-header {
  //     background-color: #5d5e68;
  //     color: #fff;
  //     padding: .8em 1.2em;
  //     font-weight: 700;
  //     height: 5vh;
  // }
  // .modal-content {
  //   height:85vh;
  //   padding: 15px;
  //   .content-wrapper {
  //     height: 100%;
  //     padding: 0;
  //     .list-content {
  //       height: 88%;
  //       .ui.list .item {
  //         .lh.title, .ld.title {
  //           width: 80%;
  //         }
  //       }
  //     }
  //   }
  // }
  // .btnSet {
  //   position:absolute;
  //   padding: 15px;
  //   width: 100%;
  //   right: 15px;
  //   bottom: 0;
  //   display: flex;
  //   justify-content: flex-end;
  //   .ui.button {
  //     border-radius: 0 !important;
  //   }
  // }
  // .ui.table {
  //   td:nth-child(odd) {
  //     text-align: center;
  //     min-width: 100px;
  //     background-color: #f9fafb;
  //   }
  // }
// }
</style>
