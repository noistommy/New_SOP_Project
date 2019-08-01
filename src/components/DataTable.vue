<template lang="pug">
  div.data-table-wrapper(ref="dataTable")
    div.totalCount(v-if = "pageInfo.totalCount >= 0") 총건수 {{pageInfo.totalCount > 0 ? pageInfo.totalCount : 0 }} 건
    table.ui.table.selectable.datatable(:class="tableType")
        thead
            tr
              th(v-if="isSelect").center.aligned.collapsing
              th(v-if="isListNumber", :class="['wide one']").center.aligned NO
              th( v-for="th of headers", :class="[`${th.align} aligned`, `${th.size} wide`]" ) {{th.text}}
        tbody
          tr(v-if="items.length === 0").no-data
            td(:colspan="colspan")
              .nodata-message
                span.header NO DATA
                span 데이터가 없습니다
          <slot name="items" v-for="(item, index) of items" :item="item" :idx="index" :colspan="colspan" :selected="activeItem(item)"></slot>
        //- tfoot(v-if="isFooter")
        //-     tr
        //-         th( :colspan="colspan" )
        //-             template(v-if="isPagination && pageInfo.totalCount > pageInfo.pagePerCnt")
        //-                 Pagination( :totalCount="pageInfo.totalCount",
        //-                 :currentPage="pageInfo.currPage",
        //-                 :recordCountPerPage="pageInfo.pagePerCnt",
        //-                 @currpage="setCurrentPage" )
    div.pagination-wrapper
      template(v-if="isPagination && pageInfo.totalCount > pageInfo.pagePerCnt")
                    Pagination( :totalCount="pageInfo.totalCount",
                    :currentPage="pageInfo.currPage",
                    :recordCountPerPage="pageInfo.pagePerCnt",
                    @currpage="setCurrentPage",
                    :maxLength="5" )
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'data-table',
  components: {
    Pagination
  },
  props: {
    tableType: String,
    headers: Array || Object,
    items: Array,
    itemKey: String,
    isFooter: Boolean,
    isPagination: Boolean,
    isListNumber: Boolean,
    isSelect: Boolean,
    page: Object,
    value: Array
  },
  data () {
    return {
      selItem: false,
      colspan: 0,
      listNumber: 1,
      pageInfo: {},
      pageHeight: 0
    }
  },
  created () {
    this.pageInfo = this.page
    if (this.headers) {
      this.colspan = this.headers.length
      if (this.isListNumber) {
        this.colspan++
      }
      if (this.isSelect) {
        this.colspan++
      }
    }
  },
  mounted () {
    // this.getPageHeight()
  },
  updated () {
    this.pageInfo = this.page
  },
  computed: {
    rowsCount () {
      return Math.floor(this.pageHeight / 42) - 1
    }
  },
  methods: {
    getPageHeight () {
      this.pageHeight = this.$refs.dataTable.clientHeight
    },
    setCurrentPage (pagenum) {
      this.pageInfo.currPage = pagenum
      // this.pageInfo.pagePerCnt = this.rowsCount
      this.$emit('search', pagenum)
    },
    activeItem (data) {
      let isSelected = false
      if (this.value === []) return
      this.value.forEach((e, i) => {
        if (e[this.itemKey] === data[this.itemKey]) {
          isSelected = true
          return isSelected
        }
      })
      return isSelected
    }
  }
}
</script>

<style lang="less">
.ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-title {
  position: relative;
  .total {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1rem;
    font-weight: 100;
  }
}
.data-table-wrapper {
  position: relative;
  width: 100%;
  height: 85%;
  border: 0 !important;
  .pagination-wrapper {
    position: absolute;
    padding: 5px 0;
    top: 100%;
  }
}
.totalCount {
  text-align: right;
}
.datatable {
  width: 100%;
  border: 1px solid rgba(34,36,38,.15);
  .ui.checkbox label {
    padding: 0;
  }
  .no-data {
    // color: rgba(202, 74, 74, 0.7);
    text-align: center;
    // background-color: rgba(202, 74, 74, 0.5);
    .nodata-message {
      display: flex;
      justify-content: center;
      font-size: 1rem;
      span {
        display:inline-block;
        padding: 3px 5px;
        &.header {
          font-size: 1rem;
          background-color: rgba(202, 74, 74, 0.7);
          color: #fff;
          padding: 3px 12px;
          border-radius: 12px;
        }
      }
    }
  }
}

tr[active] {
  // background-color: rgba(145, 229, 250, 0.233);
  background-color: rgba(74, 151, 202, 0.815);
  color:#fff;
  font-weight: 700;
}

 td {
     .ellipse
 }

</style>
