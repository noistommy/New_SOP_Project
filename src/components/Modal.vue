<template lang="pug">
div.modal-container(v-if="isVisible")
    div.modal-wrapper
        div.modal-background
        div.modal(:class="type")
            div.modal-header {{headerText}}
            div.modal-content content
            div.modal-close(@click.stop="setModalData")
                i.icon.close

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'modal-system',
  props: {
    type: String,
    isVisible: Boolean,
    headerText: String
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setModalData'
    ])
  }
}
</script>

<style lang="less">
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    .modal-background {
        position: absolute;
        width:100%;
        height:100%;
        background-color: rgba(0, 0, 0, .7);
    }
    .modal-wrapper {
        position: absolute;
        width:100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .modal {
            width: 600px;
            background-color: #fff;
            height: 500px;
            border: 1px solid #5d5e68;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .5);
            display: flex;
            flex-direction: column;
            position: relative;
            .modal-header {
                background-color: #5d5e68;
                color: #fff;
                padding: .8em 1.2em;
            }
            .modal-content {
                flex-grow: 1;
                padding: 15px
            }
            .modal-close {
                position: absolute;
                top: 0;
                right: 0;
                padding: 6px;
                color: #fff;
                font-size: 1.5rem;
            }
            &.small {width: 300px;}
            &.large {width: 600px;}
            &.full {width: 90%;}
        }
    }
}
</style>
