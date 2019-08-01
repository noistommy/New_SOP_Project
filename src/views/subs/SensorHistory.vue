<template lang="pug">
  div.SensorHistory.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 센서탐지이력
        SearchDate(
          v-model="searchData",
          :startDate="selectedDateStart",
          :endDate="selectedDateEnd",
          :isDateSearch="true",
          @search="getHistoryList")
        div.divide
      div.sub-content
        div.chart-wrapper()
          BarChart(v-if="isLoaded", :chart-data="chartData")
        div.content
          DataTable(
            :tableType="'fixed celled'",
            v-model="sensorHistory.selected"
            :headers="sensorHistory.headers",
            :items="sensorHistory.sensorHistoryData",
            :isFooter="sensorHistory.isfooter",
            :isListNumber="sensorHistory.isListNumber",
            :isPagination="sensorHistory.isPagination",
            :page="sensorHistory.pageInfo",
            @search="getHistoryList"
          )
            <template slot="items" slot-scope="props">
              tr
                td.center.aligned {{(sensorHistory.pageInfo.currPage - 1) * 10 + props.idx + 1}}
                td {{props.item.prcpDt}}
                td.center.aligned {{props.item.malfuncNm}}
                td.center.aligned {{props.item.sensorNm}}
                td.center.aligned {{props.item.sensorId}}
                td.ellipse {{props.item.buldNm}}
                td {{props.item.aditInfo}}
                td {{props.item.oprtrNm}}
                td.center.aligned {{props.item.processSttus}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
            div.btn-wrap.right
              button.ui.button.large.blue(@click="sensorDownload") 파일다운로드
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchDate from '@/components/SearchDate.vue'
import { sensorHistoryTableHeader } from '@/setting'
import BarChart from '@/components/BarChart'
import { convertDateFormat, codeGenerator } from '@/util'
import HistoryApi from '@/api/History'

export default {
  name: 'sensorhistory',
  components: {
    DataTable,
    SearchDate,
    BarChart
  },
  data () {
    return {
      searchData: {},
      selectedDateStart: new Date(),
      selectedDateEnd: new Date(),
      searchType: 'single',
      sensorHistory: {
        selected: [],
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        pageInfo: {},
        headers: sensorHistoryTableHeader.headers,
        sensorHistoryData: []
      },
      chartData: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          borderColor: [],
          borderWidth: 1,
          pointBackgroundColor: 'white',
          pointBorderColor: null,
          backgroundColor: null,
          hoverBackgroundColor: null,
          fill: false
        }]
      },
      isLoaded: false
    }
  },
  created () {
    this.initDate()
    this.getHistoryList(1)
  },
  mounted () {
    this.getHistoryList(1)
  },
  methods: {
    getHistoryList (targetNum) {
      if (targetNum === undefined) { targetNum = 1 }
      const requestData = JSON.stringify({
        prcpFromDt: this.searchData.start,
        prcpToDt: this.searchData.end,
        currPage: targetNum
      })
      HistoryApi.getSensorList(requestData)
        .then(result => {
          this.sensorHistory.sensorHistoryData = result.data.sensorDetctHistList
          result.data.param.totalCount = result.data.totCnt
          this.sensorHistory.pageInfo = result.data.param
          this.isLoaded = true

          this.chartData = {
            labels: result.data.alarmHistStats.labels,
            datasets: [
              {
                label: '센서 발생 횟수',
                data: result.data.alarmHistStats.data,
                backgroundColor: '#7bbae7'
              }
            ]
          }
        })
        .catch(error => {
          const err = error.response
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        })
    },
    sensorDownload () {
      const requestData = {
        prcpFromDt: this.searchData.start,
        prcpToDt: this.searchData.end
      }
      HistoryApi.sensorHistoryDownload(requestData)
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

<style lang="less" scoped>
  .chart-wrapper {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 32%;
    margin-bottom: 20px;
    > div {
      height: 100%;
    }
  }
</style>
