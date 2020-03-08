<template>
  <div>
    <div class="page-title">
      <h3>{{ $t('routes.categories') }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <div class="col s12 m6">
          <categories-add />
        </div>
        <div class="col s12 m6">
          <categories-edit v-if="categories.length" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesAdd from '@/components/CategoriesAdd'
import CategoriesEdit from '@/components/CategoriesEdit'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Categories',
  metaInfo () {
    return {
      title: this.$t('routes.categories')
    }
  },
  components: {
    CategoriesAdd, CategoriesEdit
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters('categories', {
      categories: 'categories'
    })
  },
  methods: {
    ...mapActions('categories', {
      fetchCategories: 'fetchCategories'
    })
  },
  async mounted () {
    await this.fetchCategories()
    this.loading = false
  }
}
</script>

<style scoped>

</style>
