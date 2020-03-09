<template>
  <Loader v-if="loading"/>
  <div v-else-if="post">
    <div class="breadcrumb-wrap">
      <router-link :to="{ name: 'history' }" class="breadcrumb">{{ $t('routes.history') }}</router-link>
      <a class="breadcrumb">
        {{ $t(`common.${post.type}`) }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="[post.bgColor]">
          <div class="card-content white-text">
            <p>{{ $t('common.description') }}: {{ post.desc }}</p>
            <p>{{ $t('common.amount') }}: {{ post.sum | currencyFilter }}</p>
            <p>{{ $t('common.category') }}: {{ post.categoryName }}</p>

            <small>{{ post.date | dateFilter('date') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p v-else class="center">{{ $t('common.postNotFound') }}</p>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailRecord',
  metaInfo () {
    return {
      title: this.$t('routes.detail')
    }
  },
  data () {
    return {
      post: null,
      loading: true
    }
  },
  methods: {
    ...mapActions({
      getPostById: 'posts/fetchPostById',
      getCategoryById: 'categories/fetchCategoryById'
    })
  },
  async mounted () {
    try {
      const post = await this.getPostById(this.$route.params.id)
      const category = await this.getCategoryById(post.categoryId)

      this.post = {
        ...post,
        categoryName: category.title,
        bgColor: post.type === 'income' ? 'green' : 'red'
      }
    } catch (e) {}
    this.loading = false
  }
}
</script>
