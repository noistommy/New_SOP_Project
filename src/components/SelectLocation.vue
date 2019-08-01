<template lang="pug">
modal(name="select-location", :width="1000", :height="800", :clickToClose="false", @before-open="setProps")
  div.modal
    div.modal-header {{title}}
    div.modal-content
      div.multi-select-editor
        div.multi-select-wrapper
          template(v-for="(local, index) in locationData")
            div.ui.attached.header(@click="activeAdd(local)")
              span {{local.buldNm}}

            div.ui.attached.segment(:class="{active:local.buldId === activeLocation}")
              div.ui.horizontal.list
                div.item
                  div.ui.label(:class="{blue:local.allchecked}", @click="selectAllFloor(local)") 전체
                div.item(
                  v-for="(floor, index) in local.children",
                  @click="toggleCheck(local, floor)")
                  div.ui.label(:class="{select:floor.checked}") {{floor.buldFloor}} {{floor.buldFloor === '' ? '단일층' : ''}}
    div.modal-footer
      div.btnSet.center
        button.ui.button.blue(@click="sendSetList(sopBuldMapngList)") 확인
        button.ui.button(@click="initSetList") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import LocationApi from '@/api/Location'

let selectedBuildList = []

export default {
  name: 'location-select-modal',
  components: {
  },
  data () {
    return {
      title: '',
      isActive: false,
      locationData: [],
      selectedList: [],
      sopBuldTitle: '',
      sopBuldMapngList: [],
      activeLocation: ''
    }
  },
  created () {
    this.getLocationList()
    this.insertSetList()
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.selectedList = event.params.data
      selectedBuildList = []
      this.selectedList.forEach(e => {
        const selectedItem = e
        selectedBuildList.push(selectedItem)
      })
      this.getLocationList()
    },
    getLocationList () {
      LocationApi.locationList().then(result => {
        this.locationData = result.data.sopBuldFloorList
        this.locationData.forEach((el, i) => {
          this.$set(el, 'allchecked', false)
          el.children.forEach((e, j) => {
            this.$set(e, 'checked', false)
          })
        })
      }).then(() => {
        this.setCheck()
      })
    },
    activeAdd (localItem) {
      this.activeLocation = localItem.buldId
    },
    setCheck () {
      this.locationData.forEach(e => {
        e.children.forEach(el => {
          this.selectedList.forEach(sel => {
            if (el.buldId === sel.buldId && el.buldFloor === sel.buldFloor) {
              this.setCheckItem(e, el)
            }
          })
        })
      })
    },
    selectAllFloor (list) {
      list.allchecked = !list.allchecked
      list.children.forEach(e => {
        e.checked = list.allchecked
      })
      this.insertSetList()
    },
    setCheckItem (list, item) {
      let isAllCheck = true
      list.allchecked = false
      item.checked = true
      list.children.forEach(e => {
        if (!e.checked) {
          isAllCheck = false
        }
      })
      list.allchecked = isAllCheck
      this.insertSetList()
    },
    toggleCheck (list, item) {
      let isAllCheck = true
      list.allchecked = false
      item.checked = !item.checked
      list.children.forEach(e => {
        if (!e.checked) {
          isAllCheck = false
        }
      })
      list.allchecked = isAllCheck
      this.insertSetList()
    },
    insertSetList () {
      this.sopBuldMapngList = []
      this.locationData.forEach(child => {
        child.children.forEach(e => {
          if (e.checked) {
            let localData = {
              buldNm: e.buldNm,
              buldId: e.buldId,
              buldFloor: e.buldFloor
            }
            this.sopBuldMapngList.push(localData)
          }
        })
      })
    },
    initSetList () {
      this.sendSetList(selectedBuildList)
    },
    sendSetList (selectedList) {
      this.$emit('location', selectedList)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.multi-select-editor {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 650px;
  overflow-y: auto;
  overflow-x: hidden;
  .ui.attached.header {
    background-color: rgba(0, 0, 0, 0.02);
  }
  .item {
    .ui.label {
      width: 60px;
      text-align: center;
      &.select {
        border: 1px solid #2185d0 !important;
        color: #2185d0!important;
        background-color: #fff;
      }
    }
    &:nth-child(1) .ui.label {
      margin-left: 1rem;
    }

  }
}
</style>
