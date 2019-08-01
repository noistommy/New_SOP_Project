<template lang="pug">
  div.mamberManage
    Tabs(:menu-list="tabMenuList")
</template>

<script>
import { memberMenuList } from '@/setting'
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'member-manage',
  components: {
    Tabs
  },
  data () {
    return {
      tabMenuList: memberMenuList
    }
  }
}
</script>
