<template lang="pug">
  div.LocationInfo.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 건물/층 관리
      div.sub-content.column
        div.content.section.section-1
          h3.title 건물관리
          div.contant-wrapper
            DataList(
              v-model="locationInfo.selected"
              :headers="locationInfo.headers",
              :items="locationInfo.locationInfoData",
              :itemKey="locationInfo.itemkey",
              :isListNumber="locationInfo.isListNumber",
            )
              <template slot="items" slot-scope="props">
                div.item.lr.listitem(:class="{active:props.selected}", @click.stop="selectedItem(props)" )
                  .ld.eight {{props.item.buldId}}
                  .ld.eight {{props.item.buldNm}}
              </template>
        div.content.section.section-2
          h3.title 건물상세정보
          div.contant-wrapper
            div.setion_1
              div.ui.form
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 건물ID
                      td
                        input(type="text", readonly, v-model="locationDetail.buldId").readonly
                        label
                    tr
                      td.center.aligned
                        span 건물명
                      td
                        input(type="text", v-model="locationDetail.buldNm")
                        label
                    tr
                      td.center.aligned
                        span 알람허용여부
                      td
                        div.ui.toggle.checkbox(@click="toggleCheck")
                          input(type="checkbox", v-model="locationDetail.alarmPermYn", true-value='Y', false-value='N')
                          label 허용

            div.section_2
              div.wrapper
                DataList(
                  v-model="locationFloor.selected",
                  :headers="locationFloor.headers",
                  :items="locationFloor.locationFloorData",
                  :itemKey="locationFloor.itemkey",
                  :isListNumber="locationFloor.isListNumber"
                )
                  template(slot="items", slot-scope="props")
                    div.item.lr.listitem(@click.stop="toggleItems(props)" )
                      .ld.center {{props.item.buldFloor}}
                      .ld.center
                        div.ui.toggle.checkbox
                          input(v-model="locationFloor.locationFloorData[props.idx].alarmPermYn",
                            true-value="Y",
                            false-value="N",
                            type="checkbox")
                          label 허용
            div.selcion_3
              div.btnSet.right
                div.buttons
                  button.ui.button.blue(@click="updateDetail") 저장
                  button.ui.button(@click="getDetail") 취소
      div.sub-footer
</template>

<script>
import DataList from '@/components/DataList.vue'
import DataTable from '@/components/DataTable.vue'
import SearchComp from '@/components/SearchComp.vue'
import { locationInfoHeader, locationFloorHeader } from '@/setting'
import LocationApi from '@/api/Location'
import { codeGenerator } from '@/util'

export default {
  name: 'location-info',
  data () {
    return {
      locationInfo: {
        selected: [],
        headers: locationInfoHeader.headers,
        locationInfoData: [],
        isListNumber: false,
        itemkey: 'buldId'
      },
      locationDetail: {
        buldId: '',
        buldNm: '',
        alarmPermYn: 'N'
      },
      locationFloor: {
        selected: [],
        headers: locationFloorHeader.headers,
        locationFloorData: [],
        isListNumber: false,
        itemkey: 'buldFloor'
      },
      checkedList: [],
      selectIndex: 0
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp
  },
  created () {
    this.getLocationList()
  },
  mounted () {
  },
  computed: {
    alarmYn () {
      return this.locationDetail.alarmPermYn === 'Y'
    }
  },
  methods: {
    getLocationList () {
      LocationApi.getList().then(result => {
        this.locationInfo.locationInfoData = result.data.buldManageList
        this.locationInfo.selected[0] = this.locationInfo.locationInfoData[this.selectIndex]
        this.getDetail()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getDetail () {
      const requestData = JSON.stringify({
        buldId: this.locationInfo.selected[0].buldId
      })
      LocationApi.getItem(requestData).then(result => {
        this.locationFloor.locationFloorData = result.data.buldFloorInfoList
        this.locationDetail = result.data.buldManageInfo
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateDetail () {
      const requestObj = Object.assign({ buldManageInfo: this.locationDetail }, { buldFloorInfoList: this.locationFloor.locationFloorData })
      const requestData = JSON.stringify(requestObj)
      LocationApi.updateItem(requestData).then(result => {
        this.$modal.show('dialog', codeGenerator('Y', '저장되었습니다'))
        this.getLocationList()
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem (itemInfo) {
      this.locationInfo.selected = []
      if (!itemInfo.selected) {
        this.locationInfo.selected.push(this.locationInfo.locationInfoData[itemInfo.idx])
        this.selectIndex = itemInfo.idx
        this.getLocationList()
      }
    },
    toggleItems (itemInfo) {
      if (this.locationDetail.alarmPermYn === 'N') return
      this.locationFloor.selected[0] = this.locationFloor.locationFloorData[itemInfo.idx]
      this.locationFloor.locationFloorData.forEach((e, i) => {
        if (e[this.locationFloor.itemkey] === this.locationFloor.selected[0][this.locationFloor.itemkey]) {
          if (e.alarmPermYn === 'Y') {
            e.alarmPermYn = 'N'
          } else {
            e.alarmPermYn = 'Y'
          }
        }
      })
      this.locationFloor.selected = []
    },
    toggleCheck () {
      this.locationDetail.alarmPermYn = this.locationDetail.alarmPermYn === 'Y' ? 'N' : 'Y'
    }
  }
}
</script>

<style lang="less">
.LocationInfo {
  .sub-wrapper {
    .sub-content > .section {
      height: 100%;
    }
  }
}
.contant-wrapper {
    height: 95%;
    max-height: auto;
    display: flex;
    flex-direction: column;
    // flex: 1 2 auto;
    > div {
      padding-bottom: 15px
    }
    .section_2{
      height: 64%;
      .wrapper {
        height: 100%;
        .lbody {
          height: 90%;
        }
      }
    }
    .ui.form .ui.table {
      tr {
        td{
          &:nth-child(1) {
            background-color: #f9fafb;
          }
        }
      }
    }
  .content.section.section-1 {
      width: 50% !important;
    }

  // .ld {
  //   width: 50% !important;
  // }
  // .lh {
  //   width: 50% !important;
  // }
  .readonlytext {
    padding: .6em 1em;
  }
}
</style>
