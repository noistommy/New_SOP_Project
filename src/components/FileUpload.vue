<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content
      div.content-text
        form.ui.form
          input(type="file", id="file" ref="file", @change="handleUpload")
      div.state-message {{message}}
    div.modal-footer
      div.btnSet.center
        button.ui.floated.right.button.green(@click="upload") 업로드
        button.ui.floated.right.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
export default {
  name: 'file-upload-modal',
  components: {
  },
  props: {
    title: String,
    text: String
  },
  data () {
    return {
      file: '',
      message: ''
    }
  },
  created () {
  },
  methods: {
    handleUpload () {
      this.file = this.$refs.file.files[0]
    },
    upload () {
      this.$emit('upload', this.file)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">

</style>
