import * as firebase from 'firebase'

const state = {
  user: null,
}

const getters = {
  user: state => state.user,
}

const actions = {
  registerUserForMeetup: ({commit, getters}, payload) => { // payload is Id
    commit('setLoading', true)
    const user = getters.user
    firebase.database().ref('users/' + user.id).child('/registrations/').push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('registerUserForMeetup', {id: payload, fbkey: data.key})
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  unregisterUserForMeetup: ({commit, getters}, payload) => {
    commit('setLoading', true)
    const user = getters.user
    if (!user.fbkeys) {
      return
    }
    const fbkey = user.fbkeys[payload]
    firebase.database().ref('users/' + user.id + '/registrations/').child(fbkey)
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterUserForMeetup', payload)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  signUp: ({commit}, payload) => {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        commit('setLoading', false)
        const user = {
          id: res.user.uid,
          registeredMeetups: [],
          fbkeys: {}
        }
        commit('setUser', user)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
      })
  },
  signIn: ({commit}, payload) => {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        commit('setLoading', false)
        const user = {
          id: res.user.uid,
          registeredMeetups: [],
          fbkeys: {}
        }
        commit('setUser', user)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
      })
  },
  autoSignIn: ({commit}, payload) => commit('setUser', {
    id: payload.uid,
    registeredMeetups: [],
    fbkeys: {}
  }),
  fetchUserData: ({commit, getters}) => {
    commit('setLoading', true)
    const user = getters.user
    firebase.database().ref('users/' + user.id + '/registrations/').once('value')
      .then(data => {
        commit('setLoading', false)
        const obj = data.val()
        let registeredMeetups = []
        let swapObj = {}
        for (const key in obj) {
          registeredMeetups.push(obj[key])
          swapObj[obj[key]] = key
        }
        const updatedUser = {
          id: user.id,
          registeredMeetups: registeredMeetups,
          fbkeys: swapObj
        }
        commit('setUser', updatedUser)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  logout: ({commit}) => {
    firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
      })
      .catch(error => console.log(error));
  }
}

const mutations = {
  registerUserForMeetup: (state, payload) => {
    const id = payload.id
    if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
      return
    }
    state.user.registeredMeetups.push(id)
    state.user.fbkeys[id] = payload.fbkey
  },
  unregisterUserForMeetup: (state, payload) => {
    const registeredMeetups = state.user.registeredMeetups
    registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
    Reflect.deleteProperty(state.user.fbkeys, payload)
  },
  setUser: (state, payload) => state.user = payload
}

export default {
  state,
  getters,
  actions,
  mutations
}