import * as firebase from 'firebase'

const state = {
  user: null,
  loading: false,
  error: null
}

const getters = {
  user: state => state.user,
  loading: state => state.loading,
  error: state => state.error
}

const actions = {
  signUp: ({commit}, payload) => {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
      commit('setLoading', false)
      const user = {
        id: res.user.uid,
        registeredMeetups: []
      }
      commit('setUser', user)
    })
    .catch(err => {
      commit('setLoading', false)
      commit('setError', err)
      console.log(err)
    })
  },
  signIn: ({commit}, payload) => {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(res => {
      commit('setLoading', false)
      const user = {
        id: res.user.uid,
        registeredMeetups: []
      }
      commit('setUser', user)
    })
    .catch(err => {
      commit('setLoading', false)
      commit('setError', err)
      console.log(err)
    })
  },
  clearError: ({commit}) => commit('clearError')
}

const mutations = {
  setUser: (state, payload) => state.user = payload,
  setLoading: (state, payload) => state.loading = payload,
  setError: (state, payload) => state.error = payload,
  clearError: state => state.error = null
}

export default {
  state,
  getters,
  actions,
  mutations
}