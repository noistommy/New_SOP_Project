<template lang="pug">
  div.home
    div.home-container
      div.ui.grid
        div.ten.wide.column
          div.main-wrapper
            div.btn-link
              router-link(:to="{ name: 'sophistory' }").ui.button.basic.small 자세히보기
            div.header
              h3 SOP 실행이력
            div.mainContent
              div.content
                DataTable(
                  :tableType="'fixed celled'",
                  v-model="selected"
                  :headers="mainSopHistory.headers",
                  :items="mainSopHistory.sopHistoryData",
                  :isFooter="mainSopHistory.isfooter",
                  :isListNumber="mainSopHistory.isListNumber",
                  :isPagination="mainSopHistory.isPagination",
                  :page="mainSopHistory.pageInfo"
                )
                  <template slot="items" slot-scope="props">
                    tr
                      td.center.aligned(v-if="mainSopHistory.isListNumber") {{props.item.rn}}
                      td {{props.item.executBeginDt}}
                      td.center.aligned {{props.item.msfrtnKndCdNm}}
                      td {{props.item.sopTitle}}
                      td {{props.item.buldNm}}
                  </template>
        div.six.wide.column
          div.main-wrapper
            div.btn-link
              router-link(:to="{ name: 'sensorhistory' }").ui.button.basic.small 자세히보기
            div.header
              h3 센서탐지분석
            div.mainContent
              div.content.chart-wrapper
                PieChart(:chart-data="chartData")
                div.chart-text
                  div.ui.labeled.button.mini.label-text
                    div.ui.button.mini.violet
                      | 정상작동
                    a.ui.basic.left.pointing.label.violet(v-if="chartText.data[0] != undefined") {{chartText.data[0]}}%({{chartText.cnt[0]}}건)
                  div.ui.labeled.button.mini.label-text
                    div.ui.button.mini.blue
                      | 오작동
                    a.ui.basic.left.pointing.label.blue(v-if="chartText.data[1] != undefined") {{chartText.data[1]}}%({{chartText.cnt[1]}}건)
                  div.total-text
                    span 발생건수
                    span.count {{chartText.totCnt}}건

        div.ten.wide.column
          div.main-wrapper
            div.btn-link
              router-link(:to="{ name: 'smshistory' }").ui.button.basic.small 자세히보기
            div.header
              h3 SMS전송이력
            div.mainContent
              div.content
                DataTable(
                  :tableType="'fixed celled'"
                  v-model="selected"
                  :headers="mainSmsHistory.headers",
                  :items="mainSmsHistory.smsHistoryData",
                  :isFooter="mainSmsHistory.isfooter",
                  :isListNumber="mainSmsHistory.isListNumber",
                  :isPagination="mainSmsHistory.isPagination",
                  :page="mainSmsHistory.pageInfo"
                )
                  template(slot="items", slot-scope="props")
                    tr
                      td.center.aligned(v-if="mainSmsHistory.isListNumber") {{props.item.rn}}
                      td {{props.item.regDt}}
                      td {{props.item.buldNm}}
                      td.center.aligned {{props.item.cnt}}
                      td
                        span.text-wrap {{props.item.smsContents}}
        div.six.wide.column
          div.main-wrapper
            div.btn-link
              router-link(:to="{ name: 'notice-manage' }").ui.button.basic.small 자세히보기
            div.header
              h3 공지사항
            div.mainContent
              div.content
                div.ui.list.notice-list
                  div.item(v-for="item in noticeList")
                    div.content.date
                      div {{item.ntceDt}}
                    div.content
                      div {{item.noticeContents}}

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import PieChart from '@/components/PieChart'
import { mainSopHistoryHeader, mainSmsHistoryHeader } from '@/setting'
import MainApi from '@/api/Main'
import { codeGenerator } from '@/util'

export default {
  name: 'home',
  data () {
    return {
      selected: [],
      noticeList: [],
      mainSopHistory: {
        isfooter: false,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: mainSopHistoryHeader.headers,
        sopHistoryData: []
      },
      mainSmsHistory: {
        isfooter: false,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: mainSmsHistoryHeader.headers,
        smsHistoryData: []
      },
      chartData: {
        labels: ['No-Data', ''],
        datasets: [{
          label: 'nodata',
          data: [100, 0],
          backgroundColor: ['#f9f9f9', '#7bbae7'],
          borderColor: [],
          borderWidth: 1
        }]
      },
      chartText: {
        totCnt: 0,
        data: [0, 0],
        cnt: [0, 0]
      }
    }
  },
  components: {
    DataTable,
    PieChart
  },
  created () {
    this.getMainLists()
  },
  mounted () {
    this.getMainLists()
  },
  methods: {
    getMainLists () {
      MainApi.getMainList().then(result => {
        this.mainSopHistory.sopHistoryData = result.data.sopExecutHistList
        this.mainSmsHistory.smsHistoryData = result.data.smsExecutHistList
        this.noticeList = result.data.noticeList
        this.chartText = result.data.sensorAlarmStats
        if (result.data.sensorAlarmStats.totCnt > 0) {
          this.chartData = {
            labels: result.data.sensorAlarmStats.label,
            datasets: [{
              data: result.data.sensorAlarmStats.data,
              backgroundColor: ['#7977c2', '#7bbae7']
            }]
          }
        }
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    }
  }

}

</script>

<style lang="less" scoped>
.home {
  padding: 10px 30px;
  .main-wrapper {
    position: relative;
    width: 100%;

    .btn-link {
      position: absolute;
      top: 9px;
      right: 7px;
    }
    .header {
      padding: 20px 0 20px 0;
    }
    .mainContent {
      min-height: 330px;
      max-height: 330px;
      padding: 20px;
      background-color: #fff;
      position: relative;
      .content {
        width: 100%;
        table {
          width: 100%;
        }
      }
    }
    .chart-wrapper {
        width: 60%;
        max-width: 260px;
        padding: 20px;
        margin: 0 auto;
        .chart-text {
          .total-text {
            width:100%;
            text-align: center;
            padding-top: 10px;
            .count {
              display: inline-block;
              font-size: 1.2rem;
              color: rgb(204, 74, 74);
              font-weight: bold;
            }
          }
          .label-text{
            position: absolute;
            top:20px;

            .ui.violet {
              background-color: #7977c2;
            }
            .ui.blue {
              background-color: #7bbae7;
            }
            &:first-child {
              left: 20px;
            }
            &:nth-child(2) {
              right:20px;
            }
          }
        }
    }
    .notice-list {
      .item {
        background-color: #f9f9f9;
        padding: 10px;
        margin-bottom: 5px;
        .date {
          text-align: right;
          color: #a5a5a5;
          font-size: .8rem;
        }
      }
    }
  }
}
</style>
