<template lang="pug">
  div.navigation
    div.logo
      a(href="/")
        img(src="../assets/CI_logo.png", alt="vue-logo")
    div#mainNav
        div.item(@click="activeNavigation('sop-list')", :class="{active:isActive == 'sopmanage'}")
            router-link(:to="{ name: 'sop-list' }")
                h6.ui.icon.header
                    i.icon-sop-management
                    .content SOP관리
        div.item(v-if="opratorCode == 'S0400100'",@click="activeNavigation('membergroup')", :class="{active:isActive == 'membermanage'}")
            router-link(:to="{ name: 'membergroup' }")
                h6.ui.icon.header
                    i.icon-sop-crew
                    .content 조직도관리
        div.item(@click="activeNavigation('sophistory')", :class="{active:isActive == 'historymanage'}")
            router-link(:to="{ name: 'sophistory' }")
                h6.ui.icon.header
                    i.icon-sop-history
                    .content 이력관리
        div.item(v-if="opratorCode == 'S0400100'", @click="activeNavigation('location-info')", :class="{active:isActive == 'standardinfomanage'}")
            router-link(:to="{ name: 'location-info' }")
                h6.ui.icon.header
                    i.icon-sop-watch
                    .content 기준정보관리
    div#Simulation
    //-   .modeBtn 훈련모드 실행중
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navigation',
  data () {
    return {
      isActive: '',
      opratorCode: ''
    }
  },
  created () {
    this.isActive = this.$route.name
    this.opratorCode = sessionStorage.userInfo
    //   this.opratorCode = localStorage.userInfo
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  watch: {
    isActive () {
      this.isActive = this.$route.path.split('/')[1]
    }
  },
  methods: {
    activeNavigation (menuItem) {
      this.isActive = this.$route.name
    }
  }
}
</script>

<style lang="less" scoped>
  .navigation {
    padding: 0;
    height: 100%;
    background-color: #363847;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #mainNav {
        width: 60%;
        height:100%;
        margin: 0 5px;
        display: flex;
        justify-content: flex-end;
        .item {
            font-size: 1.6rem;
            width: 150px;
            // margin: 0 3px 0 3px;
            border: 0;
            background-color: #2A2A2F;
            &::before {
                content: '';
            }
            a {
                width:100%;
                height:100%;
                padding: 15px 0;
                display: inline-block;
                text-align: center;
                .ui.header{

                    color:#ffffff;
                    margin:0;
                    font-weight: normal;
                    i {
                        font-size: 1.8rem;

                    }
                    .content {
                        display: inline-block;
                        margin-top:.1rem;
                    }
                }
            }
            &.active
            {
                background:#1386bd;
                // border:1px solid rgb(71, 169, 223);
                &:hover {
                    border-bottom:3px solid #fff;
                }
                .content {
                    font-weight: bold;
                }
            }
            &:hover
            {
                // background:#1386bd;
                border-bottom:5px solid #1386bd;
            }
        }
    }
    .logo {
      width: 260px;
      padding: 0 10px;
      a {
          display: block;
            color: #ffffff;
        }
    }
  }
  #Simulation {
    width: 300px;
    text-align: center;

    // .ui.button {
    .modeBtn {
        width: 200px;
        padding: 15px;
        font-size: 1.2rem;
        background-color: #286A85;
        color: rgb(71, 231, 236);
    }
  }
  .logo .title{
    margin-left: 15px;
  }
  .logo img {
    width: 100%;
  }
  .btn-d {
    position: absolute;
    bottom: 0;
  }
</style>
