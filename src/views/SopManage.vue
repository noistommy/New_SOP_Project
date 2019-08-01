<template lang="pug">
  div.sopManage
    Tabs(:menu-list="tabMenuList")
</template>

<script>
import { sopMenuList } from '@/setting'
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'sop-manage',
  components: {
    Tabs
  },
  data () {
    return {
      tabMenuList: sopMenuList
    }
  }
}
</script>
