import firebase from 'firebase'
import { filterObjectByArray } from '@/utils/helpers'

export default {
  state: {
    apiKey: process.env.VUE_APP_CURRENCY
  },
  getters: {},
  mutations: {},
  actions: {
    async fetchCurrency ({ state, dispatch }) {
      const uid = await dispatch('user/getUid')
      let userCurrencies = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val().currenciesTracked
      userCurrencies = userCurrencies.join(',')

      const res = await fetch(`https://prime.exchangerate-api.com/v5/${state.apiKey}/latest/EUR`)
      const data = await res.json()
      data.conversion_rates = filterObjectByArray(data.conversion_rates, userCurrencies)
      data.time_last_update = new Date(data.time_last_update * 1000).toISOString().substring(0, 10)
      return data
    },
    async fetchAllCurrencies ({ state }) {
      const res = await fetch(`https://prime.exchangerate-api.com/v5/${state.apiKey}/latest/EUR`)
      const data = await res.json()
      return data.conversion_rates
    }
  }
}
