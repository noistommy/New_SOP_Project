<template lang="pug">
    div.modal
      div.modal-header {{title}}
      div.modal-content
        div.content-header.date-wrapper
          div 게시기간
          template
            v-date-picker(mode='single', v-model='startDate', :min-date='startDate', show-caps)
              div.ui.input(:type='inputState.type', slot-scope='props')
                input(
                :value='props.inputValue',
                :placeholder='inputState.message',
                @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
                @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })',
                expanded)
            span ~
            v-date-picker(mode='single', v-model='endDate', :min-date='startDate', show-caps)
              div.ui.input(:type='inputState.type', slot-scope='props')
                input(
                :value='props.inputValue',
                :placeholder='inputState.message',
                @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
                @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })',
                expanded)

        div.content-wrapper
            div.ui.form
              table.ui.table.small
                tbody
                  tr(v-if="this.type=='edit'")
                    td 작성자
                    td
                      div.field
                        label
                        input(readonly="", v-model="setData.frstRegNm").readonly
                  tr
                    td 제목
                    td
                      div.field
                        label
                        input(type="text", v-model="setData.noticeTitle")
                  tr
                    td 내용
                    td
                      div.field
                        label
                        textarea(v-model="setData.noticeContents")
      div.modal-footer
        div.btnSet.center
          button.ui.button.blue.large(@click="setNotice") 저장
          button.ui.button.large(@click="$emit('close')") 취소
      div.modal-close(@click="$emit('close')")
          //- i.icon.close
          div.close X
</template>

<script>
import SearchDate from '@/components/SearchDate'
import NoticeApi from '@/api/Notice'
import { convertDateFormat, codeGenerator } from '@/util'

export default {
  name: 'insert-notice',
  components: {
    SearchDate
  },
  props: {
    type: String,
    title: String,
    notice: Object
  },
  data () {
    return {
      setData: this.notice,
      uploadDate: {
        start: new Date(),
        end: new Date()
      },
      startDate: new Date(),
      endDate: new Date()

    }
  },
  created () {
    if (this.type === 'new') {
      this.setdata = {
        noticeTitle: '',
        noticeContents: '',
        ntceBeginDt: '',
        ntceEndDt: ''
      }
    }
  },
  computed: {
    inputState () {
      if (!this.selectedValue) {
        return {
          type: 'is-danger',
          message: 'Date required.'
        }
      }
      return {
        type: 'is-primary',
        message: ''
      }
    }
  },
  methods: {
    setNotice () {
      if (this.type === 'new') {
        this.setdata = {
          noticeTitle: '',
          noticeContents: '',
          ntceBeginDt: '',
          ntceEndDt: ''
        }
      }
      this.setData.ntceBeginDt = convertDateFormat(this.startDate, '')
      this.setData.ntceEndDt = convertDateFormat(this.endDate, '')
      if (this.setData.ntceEndDt === null) { this.setData.ntceEndDt = '99991231' }
      const requestData = JSON.stringify(this.setData)
      NoticeApi.setItem(requestData).then(result => {
        console.log(result)
        this.$emit('close')
        this.$modal.show('dialog', codeGenerator('Y', '저장되었습니다'))
      }).catch(error => {
        const err = error.response
        console.log(err)
        alert(err.data.msgValue)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .date-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 10px;
    > div {
      padding: 0 5px;
    }
  }
  .ui.form {
    td:nth-child(odd) {
      background-color: #f9fafb;
      text-align: center;
    }
    input.readonly {
      border: 0;
    }
  }

</style>
