import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    posts: []
  },
  getters: {
    posts (state) {
      return state.posts
    }
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    },
    pushPost (state, payload) {
      state.posts.push(payload)
    }
  },
  actions: {
    async addPost ({ commit, dispatch }, payload) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        const post = await firebase.database().ref(`/users/${uid}/posts`).push(payload)
        commit('pushPost', {
          type: payload.type,
          desc: payload.desc,
          sum: payload.sum,
          id: post.key,
          date: payload.date
        })
      } catch (e) {
        this.commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchPosts ({ commit, dispatch }) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        const posts = (await firebase.database().ref(`/users/${uid}/posts`).once('value')).val() || []
        commit('setPosts', Object.keys(posts).map(key => ({ ...posts[key], id: key })))
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchPostById ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('user/getUid', null, { root: true })
        const post = (await firebase.database().ref(`/users/${uid}/posts`).child(id).once('value')).val() || {}
        return { ...post, id }
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
  }
}
