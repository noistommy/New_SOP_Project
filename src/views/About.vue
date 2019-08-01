<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content
      | {{text}}
    div.modal-close(@click="$emit('close')")
        //- i.icon.close
        div.close close
</template>

<script>

export default {
  name: 'about',
  components: {
  },
  props: {
    title: String,
    text: String
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style lang="less">
.modal {
    background-color: #fff;
    // border: 1px solid #5d5e68;
    // border-radius: 5px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    position: relative;
    .modal-header {
        background-color: #5d5e68;
        color: #fff;
        padding: .8em 1.2em;
        font-weight: 700;
    }
    .modal-content {
        flex-grow: 1;
        padding: 15px
    }
    .modal-close {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        // background-color: #fff;
        font-size: 1rem;
        i {
          margin:0;
        }
        &:hover {
          background-color: #fff;
          color: #5d5e68;
        }
    }
    &.small {width: 300px;}
    &.large {width: 600px;}
    &.full {width: 90%;}
}
</style>
