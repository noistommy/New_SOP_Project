<template lang="pug">
  div.standardInfoManage
    Tabs(:menu-list="tabMenuList")
</template>

<script>
import { standardInfoMenuList1, standardInfoMenuList2 } from '@/setting'
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'sop-manage',
  components: {
    Tabs
  },
  data () {
    return {
      tabMenuList: standardInfoMenuList1,
      opratorCode: ''
    }
  },
  created () {
    // this.opratorCode = localStorage.userInfo
    this.opratorCode = sessionStorage.userInfo
    if (this.opratorCode === 'S0400100') {
      this.tabMenuList = standardInfoMenuList1
    } else {
      this.tabMenuList = standardInfoMenuList2
    }
  }
}
</script>
