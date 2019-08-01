<template lang="pug">
    div.search-comp

      template(v-if="isRange === 'range'")
        v-date-picker(mode='range', v-model='selectedDates', :class="isRange", show-caps)
          div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
            input(
            :value='props.inputValue',
            :placeholder='inputState.message',
            @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
            @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })',
            expanded)
            <i class="calendar alternate outline icon"></i>
      template(v-else)
        v-date-picker(mode='single', v-model.lazy='selectedDateStart', :max-date='limitDay', :update-on-input="true")
          div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
            input(
            :value='props.inputValue',
            :placeholder='inputState.message',
            :input-props='{readonly: true}'
            @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
            @change='props.updateValue(selectedDateStart, { formatInput: true, hidePopover: false })',
            expanded)
            <i class="calendar alternate outline icon"></i>
        span.fromto ~
        v-date-picker(mode='single', v-model='selectedDateEnd', :min-date='selectedDateStart', :max-date='limitDay')
          div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
            input(
            :value='props.inputValue',
            :placeholder='inputState.message',
            :input-props='{readonly: true}'
            @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
            @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })',
            expanded)
            <i class="calendar alternate outline icon"></i>
      select.ui.dropdown(v-model="selectDateCode", @change="setDateCode")
        option(value="0") 기간설정
        option(value="1") 최근일주일
        option(value="2") 최근한달
        option(value="3") 최근일년
      button(@click="searchList").ui.button 검색
</template>

<script>
import { convertDateFormat } from '@/util'

export default {
  name: 'search-date',
  components: {
  },
  props: {
    startDate: Date,
    endDate: Date,
    rangeDate: Object,
    isRange: String,
    isDateSearch: Boolean,
    value: {
    }
  },
  data () {
    return {
      selectedDateStart: this.startDate,
      selectedDateEnd: this.endDate,
      selectedDates: this.rangeDate,
      selectDateCode: '1',
      limitDay: new Date()
    }
  },
  created () {
    this.setDateCode()
    this.setDateValue()
  },
  mounted () {
    $('.ui.dropdown').dropdown()
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
    searchList () {
      this.setDateValue()
      this.$emit('search')
    },
    setDateValue () {
      if (this.isRange === 'range') {
        this.value = this.selectedDates
      } else {
        this.value.start = convertDateFormat(this.selectedDateStart, '')
        this.value.end = convertDateFormat(this.selectedDateEnd, '')
      }
    },
    setDateCode () {
      const today = new Date()
      if (this.selectDateCode === '0') return
      if (this.selectDateCode === '1') {
        const d = today.getDate()
        today.setDate(d - 7)
      }
      if (this.selectDateCode === '2') {
        const m = today.getMonth()
        today.setMonth(m - 1)
      }
      if (this.selectDateCode === '3') {
        const y = this.selectedDateEnd.getFullYear()
        today.setFullYear(y - 1)
      }
      this.selectedDateStart = today
      this.selectedDateEnd = new Date()
    }
  }
}
</script>

<style lang="less">
.search-comp {
    position:absolute;
    top:0;
    right: 0;
    width: 70%;
    display: flex;
    justify-content: flex-end;
    > div {
      margin-right: 15px !important;
    }
    .button {
      // position: absolute;
      // right: 0;
    }
    .range {
      width: 250px;
      .ui.input {
        width: 100%;
      }
    }
    .fromto {
      display: inline-block;
      margin-right: 10px;
      padding-top: .7rem;
      vertical-align: middle;
    }
  }
</style>
