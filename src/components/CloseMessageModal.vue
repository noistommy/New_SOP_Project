<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content
      div.content-form
        div.ui.form
          textarea(rows=10, v-model="closeData.endResn")
    div.modal-footer
      div.btnSet.center
        button.ui.button.blue(@click="closeMessage") 작성완료
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import SopManageApi from '@/api/SopManage'
import { EventBus } from '@/util'

export default {
  name: 'close-message-modal',
  components: {
  },
  props: {
    title: String,
    text: String,
    data: Object
  },
  data () {
    return {
      closeData: this.data
    }
  },
  created () {
  },
  methods: {
    closeMessage () {
      const requestData = JSON.stringify(this.closeData)
      SopManageApi.closeSopList(requestData).then(result => {
        this.$emit('close')
        this.$modal.show('dialod', {
          title: '알람',
          text: '종료되었습니다.'
        })
        EventBus.$emit('slide-reload')
        this.$router.push({ name: 'sop-list' })
      }).catch(error => {
        const err = error.response
        alert(err.data.msgValue)
      })
    }
  }
}
</script>

<style lang="less">

</style>
