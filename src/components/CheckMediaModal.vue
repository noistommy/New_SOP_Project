<template lang="pug">
   modal(name="check-msg-modal", width='350px', height='350px' :clickToClose="false", @before-open="setProps")
    div.modal
      div.modal-header {{title}}
      div.modal-content
        div.content-text {{contentData}}
        div.state-message {{message}}
      div.modal-footer
        div.btnSet.center
          button.ui.button(@click="$emit('close')", :class="contentYn=='Y'?'green':'orange'") {{contentYn=='Y'?'정상':'오류'}}
      div.modal-close(@click="$emit('close')")
          div.close X
</template>

<script>

export default {
  name: 'check-media-modal',
  data () {
    return {
      title: '',
      text: '',
      contentData: '',
      contentYn: '',
      message: ''
    }
  },
  created () {
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.text = event.params.text
      this.contentData = event.params.data.vrifyContents
      this.contentYn = event.params.data.vrifyYn
      this.message = event.params.data.vrifyMessage
    }
  }
}
</script>

<style lang="less" scoped>
.content-text {
  width: 100%;
  padding: 15px;
  background-color: #f9f9f9;
  height: 180px;
  white-space: normal !important;
  overflow-y: auto;
  word-break:break-all;
}
.state-message {
  padding: 15px;
}

</style>
