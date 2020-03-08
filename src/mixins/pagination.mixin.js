import _ from 'lodash'
export default {
  data () {
    return {
      page: 1,
      pageSize: 5,
      pageTotal: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination (allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageTotal = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    changePage (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  },
  created () {
    this.page = +this.$route.query.page || 1
  }
}
