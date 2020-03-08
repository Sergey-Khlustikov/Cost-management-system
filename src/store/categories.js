import firebase from 'firebase/app'
export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    categories (state) {
      return state.categories
    },
    currentCat (state) {
      return state.currentCat
    }
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload
    },
    pushCategory (state, payload) {
      state.categories.push(payload)
    }
  },
  actions: {
    async addCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        commit('pushCategory', { title, limit, id: category.key })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || []
        commit('setCategories', Object.keys(categories).map(key => ({ ...categories[key], id: key })))
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchCategoryById ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
  }
}
