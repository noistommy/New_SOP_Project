<template lang="pug">
  div.header
    Navigation
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'sop-header',
  components: {
    Navigation
  }
}
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 50px;
    box-shadow: 0 0 5px 0 #5d5e68;
  }
</style>
