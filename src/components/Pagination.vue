<template lang="pug">
    div.pagination-wrapper
        div.ui.pagination.menu
            a.item(@click="prev", :class="{disabled: disabledStart}")
                i.icon.left.arrow
            a.item(v-for="page in setPagination", :class="{active: page === current}" @click="getCurrentPage(page)") {{page}}
            a.item(@click="next", :class="{disabled: disabledEnd}")
                i.icon.right.arrow
</template>

<script>
export default {
  name: 'pagination',
  props: {
    totalCount: Number,
    currentPage: Number,
    recordCountPerPage: Number,
    maxLength: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      currentnum: 1,
      pagination: [],
      minCount: 1,
      maxCount: this.maxLength,
      prevDisabled: true,
      nextDisabled: false
    }
  },
  created () {
    this.setPage()
    this.currentnum = this.currentPage
    this.maxCount = this.maxLength
  },
  computed: {
    totalPage () {
      return Math.ceil(this.totalCount / this.recordCountPerPage)
    },
    current () {
      return this.currentPage
    },
    disabledStart () {
      return this.current === 1
    },
    disabledEnd () {
      return this.current === this.totalPage
    },
    setPagination () {
      const pagination = []
      if (this.current === 1) {
        this.minCount = 1
        this.maxCount = this.maxLength
      }
      this.setPage()
      for (let n = this.minCount; n <= this.maxCount; n++) {
        pagination.push(n)
      }
      return pagination
    }
  },
  methods: {
    setPage () {
      if (this.totalPage < this.maxCount) {
        this.maxCount = this.totalPage
      }
    },
    getCurrentPage (page) {
      this.$emit('currpage', page)
    },
    next () {
      if (this.current + 1 > this.totalPage) return
      if (this.current === this.maxCount) {
        this.maxCount++
        this.minCount++
      }
      this.$emit('currpage', this.current + 1)
    },
    prev () {
      if (this.current - 1 < 1) return
      if (this.current === this.minCount) {
        this.maxCount--
        this.minCount--
      }
      this.$emit('currpage', this.current - 1)
    }
  }
}
</script>

<style lang="less">
    .pagination-wrapper {
        WIDTH:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
