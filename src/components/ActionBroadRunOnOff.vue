<template lang="pug">
  div.sms-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.green
        tbody
          tr
            td.center.aligned
              div 방송
            td.wide.eight
            td.center.aligned  완료
            td.center.aligned
              button.ui.button.basic.mini(:class="{blue:actionData.brdcstOnOffFlag}", @click="stepRunning") {{actionData.brdcstOnOffFlag ? 'OFF' : 'ON'}}
            td.center.aligned  시간
            td.center.aligned  {{actionData.executDt}}

</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'

export default {
  name: 'action-broad-onoff-run',
  props: {
    idx: Number,
    nextRun: Number,
    value: Object
  },
  data () {
    return {
      actionCheck: false,
      formType: 'textarea',
      actionData: this.value
    }
  },
  components: {
    CheckTextCount
  },
  created () {
    if (this.actionData.autoYn === 'Y' && this.actionData.stepSn === this.nextRun) {
      this.stepRunning()
    }
  },
  mounted () {
    $('ui.checkbox').checkbox()
  },
  methods: {
    stepRunning () {
      if (this.actionData.brdcstOnOffFlag) {
        this.actionData.brdcstOnOffFlag = 0
      } else {
        this.actionData.brdcstOnOffFlag = 1
      }
      this.$emit('runstep', this.actionData)
    }
  }
}
</script>

<style lang="less">
.action
  > div {
    padding: 10px 0;
  }
  .sms-action {
    position: relative;
    padding-bottom: 15px;
    .parameters {
      display: flex;
      flex-wrap: wrap;
      .parameter {
        width: 50%;
        .fields > div {
          padding: 0 5px;
        }
      }
    }
    .ui.table {
      th:nth-child(1) {
        width: 15%
      }
      td:last-child {
          width: 15%;
        }
      td {
        overflow: visible;
      }
    }
  }
</style>
