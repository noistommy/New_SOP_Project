<template lang="pug">
  div.SopEdit.sub-container
    SelectLocation(@close="$modal.hide('select-location')", @location="setLocationList", @select="insertData")
    div.sub-wrapper
      div.baseInfo.ui.form
        div.base-info.info-1
          label
          select(v-model="sopNewData.msfrtnKndCd")
            option(disabled, value="") 재난종류
            option(v-for="code in typeCode", :value="code.cmmnCd") {{code.cmmnCdNm}}
        div.base-info.info-2
          select(v-model="sopNewData.crisisGnfdStepCd")
            option(disabled, value="") 위기발령단계
            option(v-for="code in stepCode", :value="code.cmmnCd") {{code.cmmnCdNm}}
        div.base-info.info-3
          div.ui.input(@click="selectLocation")
            input(type="button", placeholder="건물/층 선택", v-model="buldTitle")
        div.base-info.info-4
          div.ui.input.fluid
            input(type="text", placeholder="재난절차제목입력", v-model="sopNewData.sopTitle")
        div.base-info.info-5
          button.ui.button.blue(@click="createSop") 재난절차저장
          button.ui.button(@click="$router.push({ name:'sop-list'})") 취소
      div.sub-content
        div.content
          div.editor-wrapper
            div.preview-view
              div.node-wrapper
                div.node(
                  v-for="(node, index) in sopNewData.sopStepList",
                  :class="{active:node.stepNo === activeStep}",
                  @click="setNodeActive(node)",
                  :id="`step_${index}`"
                  )
                  div.order {{index+1}}
                  div.step-content.ellipse(:data-content="node.stepTitle") {{node.stepTitle}}
            div.editor-view
              div.edit-header
                div.ui.buttons
                  button.ui.button.blue.mini(@click='createStep') 추가
                  button.ui.button.blue.mini(@click='copyStep') 복사
                  button.ui.button.blue.mini(@click='deleteStep') 삭제
                div.ui.buttons.right.floated
                  template(v-for="item in actionItemsList")
                    button.ui.button.olive.mini(@click="addAction(item.actionCode)") {{item.name}}
              div.edit-content
                div.steps-wrapper
                  div.step(
                    v-for="(step, index) in sopNewData.sopStepList",
                    :class="{active:step.stepNo === activeStep}",
                    @click="setActive(step)",
                    :id="`step_${step.stepNo}`"
                    )
                    div.unActive
                    div.step-header
                      div.ui.input.fluid.small.labeled
                        label.ui.label {{index+1}}
                        input(type="text", placeholder="제목을 입력하세요", v-model="step.stepTitle")
                    div.step-content
                      div.action
                        template(v-for="(action, index) in step.actionItem")
                          component(
                            v-model="step.actionItem[index]",
                            :is='action.type',
                            :idx="index",
                            :paramCode="paramCode",
                            :isUpdate = "isupdate"
                            @delete="deleteAction(step, index)"
                            )
                    div.step-editor(v-if="step.stepNo === activeStep")
                      div.btnSet
                        div.btn-group.left
                        div.btn-wrap.right
                          button.ui.icon.button.mini(@click="moveIndex('down', index)")
                            i.icon.angle.down
                          button.ui.icon.button.mini(@click="moveIndex('up', index)")
                            i.icon.angle.up
        div.footer
</template>

<script>
import PublicCodeApi from '@/api/PublicCode'
import SopManageApi from '@/api/SopManage'
import ActionSms from '@/components/ActionSms.vue'
import ActionBroad from '@/components/ActionBroad.vue'
import ActionBroadOnOff from '@/components/ActionBroadOnOff.vue'
import ActionOrder from '@/components/ActionOrder.vue'
import SelectLocation from '@/components/SelectLocation.vue'
import { actionItemsList } from '@/setting'
import { codeGenerator } from '@/util'
import SelectReceiver from '@/components/SelectReceiver'

export default {
  name: 'sop-edit',
  data () {
    return {
      actionItemsList: [],
      sopNewData: {
        sopId: '',
        msfrtnKndCd: '',
        crisisGnfdStepCd: '',
        sopTitle: '',
        sopMapngCd: '',
        sopBuldMapngList: [],
        sopStepList: [
          {
            stepNo: 1,
            stepSn: 1,
            stepTitle: '',
            actionItem: []
          }
        ]
      },
      req: {
        msfrtnKndCd: '',
        crisisGnfdStepCd: '',
        sopTitle: ''
      },
      typeCode: [],
      stepCode: [],
      paramCode: [],
      actions: '',
      formType: 'textarea',
      textareaData: '',
      activeStep: '1',
      selectedStep: [],
      selectActionData: [
      ],
      deleteList: [],
      newStepNo: 1,
      isupdate: true,
      buldTitle: '건물/ 층 선택'
    }
  },
  components: {
    ActionSms,
    ActionBroad,
    ActionOrder,
    ActionBroadOnOff,
    SelectReceiver,
    SelectLocation
  },
  created () {
    this.actionItemsList = actionItemsList
    this.sopNewData.sopId = this.$route.params.sopId
    this.sopNewData.sopMapngCd = this.$route.params.sopMapngCd
    this.getCodeList('S090')
    this.getCodeList('S100')
    this.getCodeList('S080')
    this.setActive(this.sopNewData.sopStepList[0])
    if (this.sopNewData.sopId) {
      this.getSopItem()
    }
  },
  mounted () {
    $('.ui.dropdown').dropdown()
    $('.ui.checkbox').checkbox()
    $('.step-content').popup({
      position: 'bottom left'
    })
  },
  updated () {
    $('.step-content').popup({
      position: 'bottom left'
    })
  },
  computed: {
    newNumber () {
      return this.sopNewData.sopStepList.length
    }
  },
  methods: {
    getCodeList (code) {
      const requestData = JSON.stringify({
        cmmnCd: code
      })
      PublicCodeApi.getUseItem(requestData).then(result => {
        if (code === 'S090') {
          this.typeCode = result.data.cmmnCdDetailList
        }
        if (code === 'S100') {
          this.stepCode = result.data.cmmnCdDetailList
        }
        if (code === 'S080') {
          this.paramCode = result.data.cmmnCdDetailList
        }
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getSopItem () {
      const requestData = JSON.stringify({
        sopId: this.sopNewData.sopId
      })
      SopManageApi.getItem(requestData).then(result => {
        this.sopNewData = result.data
        this.newStepNo = this.sopNewData.sopStepList.length + 1
        this.setLocationList(this.sopNewData.sopBuldMapngList)
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    createSop () {
      const requestData = JSON.stringify(this.sopNewData)
      SopManageApi.createItem(requestData).then(result => {
        this.$modal.show('dialog', {
          title: '실행확인',
          text: '저장되었습니다'
        })
        this.$router.push({ name: 'sop-list' })
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectLocation () {
      this.$modal.show('select-location', {
        title: '건물/층 선택',
        data: this.sopNewData.sopBuldMapngList
      }, {
        height: '80%',
        clickToClose: false
      })
    },
    setLocationList (local) {
      if (local.length > 1) {
        this.buldTitle = `${local[0].buldNm} ${local[0].buldFloor} 외 ${local.length - 1}건`
      } else if (local.length === 1) {
        this.buldTitle = `${local[0].buldNm} ${local[0].buldFloor}`
      } else {
        this.buldTitle = '건물/층선택'
      }
      this.sopNewData.sopBuldMapngList = local
    },
    saveSop () {
      this.$modal.show('dialog', {
        title: '저장확인',
        text: '저장하시겠습니까?'
      })
    },
    setActive (step) {
      this.selectedStep = step
      this.activeStep = step.stepNo
      this.deleteList = []
    },
    setNodeActive (step) {
      this.selectedStep = step
      this.activeStep = step.stepNo
      this.$nextTick(() => {
        this.focusStep(step)
      })
    },
    createStep () {
      this.newStepNo++
      const newStep = {
        stepNo: this.newStepNo,
        stepSn: this.newStepNo,
        stepTitle: '',
        actionItem: []
      }
      this.sopNewData.sopStepList.push(newStep)
      this.setNodeActive(newStep)
    },
    copyStep () {
      const copyStep = {
        stepNo: this.newStepNo + 1,
        stepSn: this.newStepNo + 1,
        stepTitle: '',
        actionItem: []
      }
      copyStep.stepNo = this.selectedStep.stepNo
      copyStep.stepTitle = this.selectedStep.stepTitle
      copyStep.stepNo = this.newStepNo + 1
      this.sopNewData.sopStepList.push(copyStep)
      this.newStepNo++

      this.selectedStep.actionItem.forEach((item, i) => {
        this.copyAction(item)
      })

      this.setNodeActive(copyStep)
    },
    deleteStep () {
      if (this.sopNewData.sopStepList.length === 1) return
      this.sopNewData.sopStepList.forEach((step, i) => {
        if (step.stepNo === this.selectedStep.stepNo) {
          this.sopNewData.sopStepList.splice(i, 1)
        }
      })
    },
    addAction (actionType) {
      const actionItem = {
        type: '',
        itemKnd: '',
        stepNo: this.activeStep,
        stepSn: 0,
        autoYn: 'N',
        ischeck: false
      }
      if (actionType === 'ActionSms') {
        actionItem.type = 'ActionSms'
        actionItem.itemKnd = 'S0500100'
        Object.assign(actionItem, {
          sopStepChrgEmpList: [],
          smsContents: '',
          inputParam1: '',
          inputParam2: '',
          inputParam3: '',
          inputParam4: '',
          inputParam5: '',
          cmmnCd1: '',
          cmmnCd2: '',
          cmmnCd3: '',
          cmmnCd4: '',
          cmmnCd5: '',
          userData1: '',
          userData2: '',
          userData3: '',
          userData4: '',
          userData5: ''
        })
      }
      if (actionType === 'ActionBroad') {
        actionItem.type = 'ActionBroad'
        actionItem.itemKnd = 'S0500200'
        Object.assign(actionItem, {
          brdcstContents: '',
          inputParam1: '',
          inputParam2: '',
          inputParam3: '',
          inputParam4: '',
          inputParam5: '',
          cmmnCd1: '',
          cmmnCd2: '',
          cmmnCd3: '',
          cmmnCd4: '',
          cmmnCd5: '',
          userData1: '',
          userData2: '',
          userData3: '',
          userData4: '',
          userData5: ''
        })
      }
      if (actionType === 'ActionBroadOnOff') {
        actionItem.type = 'ActionBroadOnOff'
        actionItem.itemKnd = 'S0500200'
        Object.assign(actionItem, { brdcstOnOffFlag: 0 })
      }
      if (actionType === 'ActionOrder') {
        actionItem.type = 'ActionOrder'
        actionItem.itemKnd = 'S0500300'
        Object.assign(actionItem, { drctContents: '' })
      }
      this.getCodeList('S080')
      Object.assign(actionItem, this.addItemObject('cmmnCd'))
      this.sopNewData.sopStepList.forEach((step, i) => {
        if (step.stepNo === this.selectedStep.stepNo) {
          this.sopNewData.sopStepList[i].actionItem.push(actionItem)
        }
      })
    },
    copyAction (action) {
      const actionItem = {
        type: '',
        itemKnd: '',
        stepNo: 0,
        stepSn: 0,
        autoYn: 'N',
        ischeck: false
      }
      if (action.type === 'ActionSms') {
        actionItem.type = 'ActionSms'
        actionItem.itemKnd = 'S0500100'
        Object.assign(actionItem, {
          sopStepChrgEmpList: [],
          smsContents: ''
        })
        Object.assign(actionItem, this.addItemObject('cmmnCd'))
        Object.assign(actionItem, this.addItemObject('userData'))
        Object.assign(actionItem, this.addItemObject('inputParam'))
      }
      if (action.type === 'ActionBroad') {
        actionItem.type = 'ActionBroad'
        actionItem.itemKnd = 'S0500200'
        Object.assign(actionItem, {
          brdcstContents: ''
        })
        Object.assign(actionItem, this.addItemObject('cmmnCd'))
        Object.assign(actionItem, this.addItemObject('userData'))
        Object.assign(actionItem, this.addItemObject('inputParam'))
      }
      if (action.type === 'ActionBroadOnOff') {
        actionItem.type = 'ActionBroadOnOff'
        actionItem.itemKnd = 'S0500200'
        Object.assign(actionItem, { brdcstOnOffFlag: 0 })
      }
      if (action.type === 'ActionOrder') {
        actionItem.type = 'ActionOrder'
        actionItem.itemKnd = 'S0500300'
        Object.assign(actionItem, { drctContents: '' })
      }
      for (let key in action) {
        actionItem[key] = action[key]
      }
      this.sopNewData.sopStepList[this.newNumber - 1].actionItem.push(actionItem)
    },
    addItemObject (name) {
      const addItems = {}
      for (let value of [1, 2, 3, 4, 5]) {
        let keyname = `${name}${value}`
        addItems[keyname] = ''
      }
      return addItems
    },
    actionDelete (selectedStep) {
      const items = []
      this.selectedStep.actionItem.forEach((e, i) => {
        if (!e.ischeck) {
          items.push(e)
        }
      })
      this.selectedStep.actionItem = items
    },
    deleteAction (step, index) {
      this.selectedStep.actionItem.splice(index, 1)
    },
    moveIndex (type, index) {
      const moveStep = this.sopNewData.sopStepList.splice(index, 1)
      if (type === 'up') {
        this.sopNewData.sopStepList.splice(index - 1, 0, moveStep[0])
      } else {
        this.sopNewData.sopStepList.splice(index + 1, 0, moveStep[0])
      }
    },
    insertData (insert) {
      this.sopNewData.sopStepList.forEach((step, i) => {
        if (insert.stepNo === step.stepNo) {
          step.actionItem.forEach((act, j) => {
            if (insert.stepNo === act.stepNo) {
              Object.assign(act, insert.action)
              this.isupdate = true
            }
          })
        }
      })
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: '운영자가'
      }
      if (this.type === 'new') {
        options.text += '등록되었습니다'
      } else {
        options.text += '수정되었습니다'
      }
      this.$modal.show('dialog', options)
    },
    focusStep (step) {
      const focusId = `step_${step.stepNo}`
      $(`#${focusId} .step-header input`).focus()
    }
  }
}
</script>

<style lang="less" scoped>

.SopEdit {
  .sub-content {
    .content {
      height: 100%;
    }
  }
  .baseInfo {
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .base-info {
      padding: 0 5px;
    }
    .info-4 {
      flex-grow:1;
    }
  }
  .editor-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    .preview-view {
      width: 40%;
      min-width: 500px;
      background-color: #f3f2f2;
      box-shadow: inset 0 0 15px 5px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
      .node-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        height: 100%;
        .node {
          display: inline-block;
          background-color: #fff;
          width: 50%;
          border: 5px solid rgba(0, 0, 0, 0.3);
          border-radius: 30px;
          position: relative;
          margin: 10px;
          height: 50px;
          min-height: 50px;
          > div {
            display: inline-block;
            padding: .8em;
          }
          .order {
            position: absolute;
            top: -5px;
            width: 50px;
            height: 50px;
            left: -5px;
            text-align: center;
            background-color:#fff;
            border-radius: 30px;
            border: 5px solid rgba(0, 0, 0, 0.3);
          }
          .step-content {
            margin-left: 45px;
            width: 80%;
          }
          .step-content.ellipse {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &::before {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            border: 2px solid rgba(0, 0, 0, 0.1);
            height: 30px;
          }
          &:last-child::before {
            display: none;
          }
          &.active {
            border: 5px solid rgb(255, 138, 42);
            .order {
              border: 5px solid rgb(255, 138, 42);
            }
          }
        }
      }
    }
    .editor-view {
      width:60%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      .edit-header {
        height: 55px;
        background-color: #363847;
        padding: 10px 10px;
      }
      .edit-content {
        flex-grow: 1;
        overflow-y: auto;
        .steps-wrapper {
          width: 100%;
          height: 100%;
          padding: 10px 15px;
          .step {
            position: relative;
            width: 100%;
            height: auto;
            border: 1px solid rgba(0, 0, 0, 0.2);
            padding: 8px 12px;
            margin-bottom: 10px;
            &.active {
              border: 1px solid rgba(1, 120, 199, 0.534);
              box-shadow: 0 0 5px rgba(0, 52, 87, 0.534);
              .unActive {
                display: none;
              }
            }
            .unActive {
              display: block;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-color: #ccc;
              opacity: 0.02;
              z-index: 100;
            }
          }
        }
      }
    }
  }
  .ui.buttons > button {
    margin-right: 3px;
  }
}

</style>
