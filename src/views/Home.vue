<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="page-title">
      <h3>{{ $t('home.bill') }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <home-bill :rates="apiCurrencies.conversion_rates" />
      <home-currency
        :rates="apiCurrencies.conversion_rates"
        :date="apiCurrencies.time_last_update" />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill'
import HomeCurrency from '../components/HomeCurrency'
export default {
  name: 'Home',
  metaInfo () {
    return {
      title: this.$t('routes.dashboard')
    }
  },
  components: {
    HomeBill, HomeCurrency
  },
  data () {
    return {
      loading: true,
      apiCurrencies: null
    }
  },
  methods: {
    async refresh () {
      this.loading = true
      await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted () {
    this.apiCurrencies = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  }
}
</script>
