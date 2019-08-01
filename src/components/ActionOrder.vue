<template lang="pug">
  div.order-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.yellow
        thead
          tr
            th.center.aligned.wide.three
              div.type 지시사항
            th.right.aligned.wide.nine
            th.center.aligned
              div.ui.radio.checkbox
                input(type="checkbox", v-model="orderData.autoYn", true-value="Y", false-value="N")
                label 자동실행
            th.center.aligned
              button.ui.button.icon.basic.mini(@click="$emit('delete')")
                i.icon.close
        tbody
          tr
            td(colspan="4")
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='500',
                  v-model="orderData.drctContents",
                  @input="returnText")

</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'

export default {
  name: 'action-order',
  props: {
    idx: Number,
    value: Object
  },
  data () {
    return {
      actionCheck: false,
      formType: 'textarea',
      textareaData: '',
      orderData: this.value
    }
  },
  components: {
    CheckTextCount
  },
  created () {
  },
  mounted () {
    $('ui.checkbox').checkbox()
  },
  methods: {
    returnText (text) {
      this.orderData.drctContents = text
    },
    checkAction () {
      this.$emit('actData', { orderId: this.idx, state: this.actionCheck })
    }
  }
}
</script>

<style lang="less">
.action
  > div {
    padding: 10px 0;
  }
  .order-action {
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
      td {
        overflow: visible;
      }
    }
  }
</style>
