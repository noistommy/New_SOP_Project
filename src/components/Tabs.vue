<template>
    <div class="tabsWrapper">
        <div class="tabMenu">
            <ul class="menuList">
              <template v-for="(tab, index) of menuList.tabList">
                <li class="tabItem"
                    :key="index"
                    :class="{ active: tab.pathName === activeTab }"
                    >
                    <a v-if="tab.pathName=='sop-run'">{{ tab.name }}</a>
                    <a v-else-if="tab.pathName=='sop-edit'">{{ tab.name }}</a>
                    <router-link :to="{ name: tab.pathName }" v-else>{{ tab.name }}</router-link>
                </li>
              </template>
            </ul>
        </div>
        <div class="tabContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    menuList: Object
  },
  data () {
    return {
      activeTab: this.menuList.defaultTab
    }
  },
  created () {
    this.activeTab = this.$route.name
  },
  updated () {
    this.activeTab = this.$route.name
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@tabHeaderHeight: 56px;
.tabsWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .tabMenu {
      height: @tabHeaderHeight;
      z-index: 10;
      ul.menuList {
          margin: 0;
        margin-left: 20px;
        .tabItem {
          float:left;
          width: 13%;
          min-width: 150px;
          margin: 15px 5px 0 5px;
          background-color: #f3f2f2;
          text-align: center;
          border-radius: 5px 5px 0 0;
          margin-bottom: -1px;
          a {

              color:#929090;
          }
          &.active {
            background-color: #ededed;
            border:1px solid #c4c3c3;
            border-bottom: none;
            a {
                color: #727272;
                font-weight: bold;
            }
            // -webkit-box-shadow: 5px 0 5px -5px rgba(100,100,100,.8);
            // box-shadow: 5px 0 5px -5px rgba(100,100,100,.8);
          }
          a {
              display: block;
              padding: .8em 1.2em;
          }
        }
      }
    }
    .tabContent {
        flex-grow: 1;
        border-top:1px solid #c4c3c3;
        width: 100%;
        height:calc(100% - @tabHeaderHeight);
        background-color: #ededed;
    }
  }
</style>
