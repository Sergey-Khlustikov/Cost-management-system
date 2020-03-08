<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('routes.planning') }}</h3>
      <h4>{{ user.bill | currencyFilter }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{ $t('common.createCatsFirst') }} <router-link :to="{ name: 'categories' }">{{ $t('common.create') }}</router-link></p>

    <section v-else>
      <transition-group name="fade" mode="out-in">
        <div v-for="cat of categories" :key="cat.id">
          <p>
            <strong>{{ cat.title }}</strong>
            {{ cat.spend | currencyFilter }} {{ $t('common.of') }} {{ cat.limit | currencyFilter }}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent}"
            ></div>
          </div>
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
  name: 'Planning',
  metaInfo () {
    return {
      title: this.$t('routes.planning')
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      posts: 'posts/posts',
      user: 'user/user'
    }),
    categories () {
      const cats = this.$store.getters['categories/categories']
      return cats.map(cat => {
        const spend = this.posts
          .filter(post => cat.id === post.categoryId && post.type === 'outcome')
          .reduce((total, post) => {
            return total + post.sum
          }, 0)

        const percent = 100 * spend / cat.limit
        const progressPercent = (percent > 100 ? 100 : percent) + '%'
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        const tooltipValue = cat.limit - spend
        const tooltip = `${tooltipValue < 0 ? this.$t('tooltip.excess') : this.$t('tooltip.moneyLeft')} ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })
    }
  },
  methods: {
    ...mapActions({
      fetchPosts: 'posts/fetchPosts',
      fetchCategories: 'categories/fetchCategories'
    })
  },
  async mounted () {
    await this.fetchCategories()
    await this.fetchPosts()
    this.loading = false
  }
}
</script>

<style scoped>

</style>
