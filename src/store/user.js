import firebase from 'firebase/app'
import router from '@/router'
import i18n from '@/i18n'
export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    clearUser (state) {
      state.user = null
    },
    setLocale (state) {
      i18n.locale = state.user.locale
    }
  },
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('fetchUser')
        commit('setLocale')
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      if (localStorage.locale) {
        localStorage.locale = i18n.locale
      }
      await router.push('/login?message=logout')
      commit('clearUser')
    },
    async register ({ commit, dispatch }, { email, password, name, locale }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
          locale,
          currency: 'UAH',
          currenciesTracked: ['UAH', 'RUB', 'USD', 'EUR']
        })
        await dispatch('fetchUser')
        router.push('/')
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async fetchLocale ({ commit }, payload) {
      if (payload) {
        try {
          const user = (await firebase.database().ref(`/users/${payload.uid}/info`).once('value')).val()
          return user.locale
        } catch (e) {
          commit('setError', e, { root: true })
          throw e
        }
      }
    },
    async fetchUser ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const user = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()

        commit('setUser', user)
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async updateUser ({ commit, dispatch, getters }, payload) {
      try {
        const uid = await dispatch('getUid')
        const updateDate = { ...getters.user, ...payload }

        await firebase.database().ref(`/users/${uid}/info`).update(updateDate)
        commit('setUser', updateDate)
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
  }
}
