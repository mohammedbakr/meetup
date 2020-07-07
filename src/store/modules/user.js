import * as firebase from 'firebase'

const state = {
  user: null
}

const getters = {
  user: state => state.user
}

const actions = {
  signUp: ({commit}, payload) => {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => {
      const user = {
        id: res.user.uid,
        registeredMeetups: []
      }
      commit('setUser', user)
    })
    .then(err => console.log(err))
  }
}

const mutations = {
  setUser: (state, payload) => state.user = payload
}

export default {
  state,
  getters,
  actions,
  mutations
}