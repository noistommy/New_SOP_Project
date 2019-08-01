<template lang="pug">
    div.datalist(:class="listType").celled
      h3(v-if="isTitle") 제목
      div.lhead.ui.list(:class="listType")
          div.item.lr.listitem
            div.lh(v-if="isListNumber").center.aligned.one NO
            div.lh( v-for="lh of headers", :class="[`${lh.align} aligned ${lh.size}`]") {{lh.text}}
      div.lbody.ui.list(:class="listType")
        .lr(v-if="items.length === 0").no-data
            .ld(:colspan="headers.length")
              .nodata-message
                span.header NO DATA
                span 데이터가 없습니다
        <slot name="items" v-for="(item, index) of items" :item="item" :idx="index" :selected="activeItem(item)"></slot>
      div.ui.form(v-if="isEditor")
        div.lfoot.ui.list(:class="listType")
          div.item.lr.listitem
            div.ld(v-for="lf in headers")
              div.field
                label
                input(typw="text", placeholder="lf.text")
</template>

<script>

export default {
  name: 'data-list',
  components: {
  },
  props: {
    listType: String,
    headers: Array || Object,
    items: Array,
    isListNumber: Boolean,
    isEditor: Boolean,
    itemKey: String,
    value: Array,
    isTitle: Boolean
  },
  data () {
    return {
      selItem: false,
      listNumber: 1
    }
  },
  created () {
  },
  methods: {
    activeItem (data) {
      let isSelected = false
      if (this.value === [] || this.value === undefined) return
      this.value.forEach((e, i) => {
        if (e[this.itemKey] === data[this.itemKey]) {
          isSelected = true
        }
      })
      return isSelected
    }
  }
}
</script>

<style lang="less" scoped>
.ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .datalist {
//   -ms-overflow-style: none;
//   ::-webkit-scrollbar {
//     // display: none !important;
//     position: relative;
//     // width: 0;
//   }
//   ::-webkit-scrollbar-thumb {
//     position: absolute;

//   }
// }

 .ld {
    .ellipse
 }

 .datalist {
    padding:0 !important;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(34,36,38,.15);
    .lhead.list,
    .lbody.list,
    .lfoot.list {
      margin: 0;
      overflow-x: hidden;
      .listitem.item.lr {
        padding: 0 !important;
        background-color: #fff;
        display: flex;
        .ld,.lh {
          padding: .9rem 1.2rem;
          width: 30%;
          flex: 1 1 auto;
          &:last-child {
            border:0;
            // width: auto;
            flex-grow: 1;
          }
          &.center {text-align: center;}
          &.left {text-align: left;}
          &.right {text-align: right;}

        }
        .lh {
          background-color: #f9fafb;
          font-weight: bold;
        }
        &:nth-child(odd) {
          background-color: rgba(0,0,50,.02)
        }
        .one { width: 6.25%;}
        .two { width: 6.25% * 2}
        .three { width: 6.25% * 3}
        .four { width: 6.25% * 4}
        .five { width: 6.25% * 5}
        .six { width: 6.25% * 6}
        .seven { width: 6.25% * 7}
        .eight { width: 6.25% * 8}
        .nine { width: 6.25% * 9}
        .ten { width: 6.25% * 10}
        .eleven { width: 6.25% * 11}
        .twelve { width: 6.25% * 12}
        .thirteen { width: 6.25% * 13}
        .fourteen{ width: 6.25% * 14}
        .fifteen { width: 6.25% * 15}
        .sixteen { width: 6.25% * 16}
      }
    }
    .lfoot.list {
      position: absolute;
      top:0;
    }
    .lhead.list {
      // .border-radius(5px, 0, 5px, 0);
      border-bottom: 0;
      border-bottom: 1px solid rgba(34,36,38,.15);
      .listitem.item.lr {
        // background-color: #ccc !important;
      }
    }
    .lbody.list {
      // .border-radius(0, 5px, 0, 5px);
      overflow-y: auto;
      height: 93%;
      .listitem.item.lr {
        &:hover {
          background-color: #fff;
        }
        &.active {
          background-color: rgba(74, 151, 202, 0.815);
          color: #fff;
        }
      }
    }
    // ::-webkit-scrollbar {
    //   width:0;
    //   position: absolute;
    //   top:0;
    //   right: 0;
    // }
    .ui.form {
      position {

      }
    }
    .totalLength {
      // display: none;
      position: absolute;
      right: 0;
      top: -5px;
    }
    &.celled {
      .lh {
        border-right: 1px solid rgba(34, 36, 38, 0.15);
      }
    }
    .no-data {
      text-align: center;
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
      &.lr {
        padding: 5px;
        .ld {
          width: 100%;
        }
      }
    }
  }

</style>
