<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('routes.history') }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!items" class="center">{{ $t('common.noPosts') }}</p>

    <section v-else>
      <div class="history-chart">
        <canvas ref="canvas"/>
      </div>
      <transition name="fade" mode="out-in">
      <history-table :key="page" :posts="items"/>
      </transition>
      <paginate
        key="pagination"
        v-if="pageTotal > 1"
        v-model="page"
        :page-count="pageTotal"
        :click-handler="changePage"
        :prev-class="'material-icons'"
        :prev-text="'chevron_left'"
        :next-class="'material-icons'"
        :next-text="'chevron_right'"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'
import { mapActions } from 'vuex'

export default {
  name: 'History',
  metaInfo () {
    return {
      title: this.$t('routes.history')
    }
  },
  components: {
    HistoryTable
  },
  extends: Pie,
  mixins: [paginationMixin],
  data () {
    return {
      loading: true,
      prevHeight: 0
    }
  },
  methods: {
    ...mapActions({
      fetchPosts: 'posts/fetchPosts',
      fetchCategories: 'categories/fetchCategories'
    }),
    setup () {
      const categories = this.$store.getters['categories/categories']
      const posts = this.$store.getters['posts/posts'].map(post => {
        return {
          ...post,
          categoryName: categories.find(cat => cat.id === post.categoryId).title,
          typeClass: post.type === 'income' ? 'green' : 'red',
          typeText: post.type === 'income' ? this.$t('common.income') : this.$t('common.outcome')
        }
      }).reverse()
      this.setupPagination(posts)

      if (this.items) {
        this.renderChart({
          labels: categories.map(c => [c.title]),
          datasets: [{
            data: categories.map(c => {
              return posts.reduce((total, p) => {
                if (p.categoryId === c.id && p.type === 'outcome') {
                  total += +p.sum
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        })
      }
    }
  },
  async mounted () {
    await this.fetchPosts()
    this.loading = false
    await this.fetchCategories()
    this.setup()
  }
}
</script>
