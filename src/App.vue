<template>
  <div id="app">
    <v-dialog/>
    <vue-extend-layouts />
    <div class="loading" :class="{show:loadingVisible}">
      <div class="spinner">
        <span>
          <i class="icon spinner"></i>
        </span>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import VueExtendLayouts from 'vue-extend-layout'
import { EventBus } from './util'

export default {
  name: 'App',
  components: {
    VueExtendLayouts
  },
  data () {
    return {
      loadingVisible: null
    }
  },
  created () {
    EventBus.$on('before-request', this.showLoading)
    EventBus.$on('after-response', this.hideLoading)
  },
  beforeDestroy () {
    EventBus.$off('before-request')
    EventBus.$off('after-response')
  },
  methods: {
    showLoading () {
      this.loadingVisible = true
    },
    hideLoading () {
      this.loadingVisible = false
    }
  }
}
</script>

<style lang="less">
@import './assets/css/modal.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.full {
  width:100%;
  height:100%;
}
.ellips {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
//Loding ...
.loading {
  z-index: 99999;
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  animation: fadein 0.25s;
  &.show{

    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    .spinner {
      font-size: 1.2rem;
      padding: 3px;
      background-color: #fff;

    }
  }
}
@keyframes fadein {
  from { opacity: 0;}
  to { opacity: 1;}
}
// Dialog Style
.vue-dialog {
  .dialog-content {
    padding: 0 !important;
    .dialog-c-title {
      background-color: #5d5e68;
      color: #fff;
      padding: .8em 1.2em;
    }
    .dialog-c-text {
      padding:20px;
    }
    .dialog-c-buttons {

    }
  }
}

</style>
