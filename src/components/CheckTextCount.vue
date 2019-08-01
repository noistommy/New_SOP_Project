<template lang="pug">
    div.checkText.field
        textarea(v-if="formType ===  'textarea'", :rows="rownum", @input="isChecked", v-model="checkText", ref="textarea")
        input(v-else, v-model="checkText", @input="isChecked", ref="input")
        div.text-counter(v-if="isShow")
            div.check-text 현재
                span.byte {{byteCal}}
                | byte | 최대 {{maxLength}} byte
</template>

<script>
import { codeGenerator } from '@/util'

export default {
  name: 'chack-text-count',
  props: {
    formType: String,
    textData: String,
    rownum: Number,
    value: String,
    maxLength: Number,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentlength: 0,
      codeByte: 0,
      checkText: this.value
    }
  },
  updated () {
    this.checkText = this.value
  },
  computed: {
    byteCal () {
      this.codeByte = 0
      if (this.value === undefined) return 0
      for (let idx = 0; idx < this.value.length; idx++) {
        const oneChar = escape(this.value.charAt(idx))
        if (oneChar.length === 1) {
          this.codeByte++
        } else if (oneChar.indexOf('%u') !== -1) {
          this.codeByte += 2
        } else if (oneChar.indexOf('%') !== -1) {
          this.codeByte++
        } else {
          this.codeByte += 3
        }
        if (this.codeByte > this.maxLength) {
          this.currentlength = idx
          setTimeout(() => {
            this.$modal.show('dialog', codeGenerator('V', `${this.maxLength}byte 이상 작성하실 수 없습니다`))
          }, 100)
          this.isChecked(idx)
          return this.codeByte
        }
      }
      return this.codeByte
    }
  },
  methods: {
    isChecked (currCount) {
      let inputData = ''
      if (this.codeByte > this.maxLength) {
        inputData = this.checkText.substring(0, this.currentlength - 1)
      } else {
        inputData = this.checkText
      }
      this.$emit('input', inputData)
      this.$nextTick(() => {
        if (this.formType === 'textarea') {
          this.$refs.textarea.focus()
        } else {
          this.$refs.input.focus()
        }
      })
    }
  }
}
</script>

<style lang="less">
.text-counter {
  padding-top: 5px;
  color: #787878;
  .check-text {
      span.byte {
        color: #fd5651;
      }
  }
}
</style>
