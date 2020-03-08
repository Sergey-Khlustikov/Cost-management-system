import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import categories from './categories'
import posts from './posts'
import currencies from './currencies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error (state) {
      return state.error
    }
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {},
  modules: {
    user, categories, posts, currencies
  }
})
