import * as firebase from 'firebase'

const state = {
  meetups: [],
  loading: false,
  error: null
};

const getters = {
  meetups: (state) => {
    return state.meetups.sort((a, b) => a.date > b.date)
  },
  featuredMeetups: (state, getters) => {
    return getters.meetups.slice(0, 5);
  },
  meetup: (state) => {
    return (meetupId) => {
      return state.meetups.find((meetup) => {
        return meetup.id == meetupId;
      })
    }
  },
  loadingMeetups: state => state.loading,
  errorLoadingMeetups: state => state.error
};

const actions = {
  createMeetup: ({commit}, payload) => {
    const meetup = {
      title: payload.title,
      location: payload.location,
      src: payload.image,
      description: payload.description,
      date: payload.date.toISOString()
    }
    firebase.database().ref('meetups').push(meetup)
      .then(data => {
        const key = data.key;
        commit('setMeetup', {
          ...meetup,
          id: key
        });
        console.log(data);
      })
      .catch(error => console.log(error))
  },
  loadMeetups: ({commit}) => {
    commit('setLoading', true)
    firebase.database().ref('meetups').once('value')
      .then(data => {
        commit('setLoading', false)
        const meetups = [];
        const obj = data.val();
        for (const key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            src: obj[key].src,
            location: obj[key].location,
            date: obj[key].date,
          })
        }
        commit('setMeetups', meetups);
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  }
};

const mutations = {
  setMeetup: (state, payload) => state.meetups.push(payload),
  setMeetups: (state, payload) => state.meetups = payload,
  setLoading: (state, payload) => state.loading = payload,
  setError: (state, payload) => state.error = payload,
  clearError: state => state.error = null

};

export default {
  state,
  getters,
  actions,
  mutations
}