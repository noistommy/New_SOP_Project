<template lang="pug">
  div.broad-onoff-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.green
        thead
          tr
            th.center.aligned.wide.three
              div.type 방송
            th.right.aligned.wide.nine
            th.center.aligned
              div.ui.radio.checkbox
                input(type="checkbox", v-model="broadOnOffData.autoYn", true-value="Y", false-value="N")
                label 자동실행
            th.center.aligned
              button.ui.button.icon.basic.mini(@click="$emit('delete')")
                i.icon.close

</template>

<script>
export default {
  name: 'action-onoff-broad',
  props: {
    idx: Number,
    paramCode: Array,
    value: Object
  },
  data () {
    return {
      broadOnOffData: this.value,
      actionCheck: false
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  methods: {
  }
}
</script>

<style lang="less">
.action
  > div {
    padding: 10px 0;
  }
  .broad-action {
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
