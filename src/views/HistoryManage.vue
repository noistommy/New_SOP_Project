<template lang="pug">
  div.historyManage
    Tabs(:menu-list="tabMenuList")
</template>

<script>
import { historyMenuList } from '@/setting'
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'history-manage',
  components: {
    Tabs
  },
  data () {
    return {
      tabMenuList: historyMenuList
    }
  }
}
</script>
