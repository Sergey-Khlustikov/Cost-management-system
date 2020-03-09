<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ $t('home.curBill') }}</span>

        <p class="currency-line" v-for="cur of user.currenciesTracked" :key="cur">
          <span>{{ getCurrency(cur) | currencyFilter(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeBill',
  props: {
    rates: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    base () {
      return +this.user.bill / (this.rates[this.user.currency] / this.rates.EUR)
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
