<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $t('home.exchangeRates') }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ $tc('common.currency', 1) }}</th>
            <th>{{ $t('home.rate') }}</th>
            <th>{{ $t('common.date') }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of user.currenciesTracked" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(3) }}</td>
            <td>{{ date | dateFilter('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeCurrency',
  props: {
    rates: {
      type: Object,
      default: null
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  }
}
</script>

<style scoped>

</style>
