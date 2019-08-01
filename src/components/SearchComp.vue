<template lang="pug">
    div.search-comp
      template(v-for="item in searchCondition")
        slot(:name="item")
        //- slot(name="condition2")
      template(v-if="isTextSearch")
        div.ui.left.icon.input
          input(v-model="value.searchNm")
          i.icon.search
      button(@click="searchList").ui.button 검색

</template>

<script>

export default {
  name: 'search-comp',
  components: {
  },
  props: {
    searchClass: {
      type: Array,
      default: ['condition1', 'condition2']
    },
    isTextSearch: Boolean,
    isDateSearch: Boolean,
    value: Object

  },
  data () {
    return {
      searchData: this.value,
      searchCondition: []
    }
  },
  created () {
    if (this.searchClass) {
      this.searchCondition = this.searchClass
    }
  },
  mounted () {
    $('.ui.dropdown').dropdown()
  },
  methods: {
    searchList () {
      this.$emit('search')
      // this.searchData.searchNm = ''
    },
    setText () {
      this.value.searchNm = this.searchText
    }
  }
}
</script>

<style lang="less">
.search-comp {
    position:absolute;
    top:0;
    right: 0;
    width: 70%;
    display: flex;
    justify-content: flex-end;
    > div {
      margin-right: 15px !important;
    }
    .button {
      // position: absolute;
      // right: 0;
    }
    .range {
      width: 250px;
      .ui.input {
        width: 100%;
      }
    }
    .condition1 {
      margin-right: 15px !important;
    }
    .condition2 {
      margin-right: 15px !important;
    }
  }
</style>
