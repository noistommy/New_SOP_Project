<template lang="pug">
    div.form-wrapper
      div.ui.form.tiny
        table.ui.table.celled
          tbody
            tr
              td.center.aligned
                span {{type}}제목
              td
                input(type="text", v-model="detailData.smsTitle")
                label
            tr
              td.center.aligned
                span {{type}}내용
              td
                textarea(rows='3', v-model="detailData.smsContents")
                label
            tr
              td.center.aligned
                span 파라미터1
              td
                div.fields
                  div.field.six.wide
                    label
                    select.ui.dropdown(v-model="detailData.userData1")
                      option(value="")
                  div.field.ten.wide
                    label
                    input(type="text", placeholder='EX.', v-model="detailData.userData1")
            tr
              td.center.aligned
                span 파라미터2
              td
                div.fields
                  div.field.six.wide
                    label
                    select.ui.dropdown
                  div.field.ten.wide
                    label
                    input(type="text", placeholder='EX.', v-model="detailData.userData2")
            tr
              td.center.aligned
                span 파라미터3
              td
                div.fields
                  div.field.six.wide
                    label
                    select.ui.dropdown
                  div.field.ten.wide
                    label
                    input(type="text", placeholder='EX.', v-model="detailData.userData3")
            tr
              td.center.aligned
                span 파라미터4
              td
                div.fields
                  div.field.six.wide
                    label
                    select.ui.dropdown
                  div.field.ten.wide
                    label
                    input(type="text", placeholder='EX.', v-model="detailData.userData4")
            tr
              td.center.aligned
                span 파라미터5
              td
                div.fields
                  div.field.six.wide
                    label
                    select.ui.dropdown
                  div.field.ten.wide
                    label
                    input(type="text", placeholder='EX.', v-model="detailData.userData5")
            tr
              td.center.aligned
                span 사용여부
              td
                //- div.ui.toggle.checkbox(@click="toggleCheck")
                //-   input(type="checkbox", :checked="alarmYn")
                //-   label 허용
      div.btnSet
          div.btn-wrap.right
            button.ui.button.large.blue 신규등록
          div.btn-group.left
            button.ui.button.large.blue 저장
            button.ui.button.large 취소
</template>

<script>
export default {
  name: 'data-form',
  props: {
    type: String,
    items: Object,
    value: Object
  },
  data () {
    return {
      detailData: {}
    }
  },
  created () {
    this.detailData = this.items
  },
  computed: {
  },
  methods: {
    toggleCheck () {
      this.locationDetail.alarmPermYn = this.locationDetail.alarmPermYn === 'Y' ? 'N' : 'Y'
    }
  }
}
</script>

<style lang="less">
</style>
