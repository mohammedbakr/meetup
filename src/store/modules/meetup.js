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
  createMeetup: ({commit, getters}, payload) => {
    const meetup = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date.toISOString(),
      creator_id: getters.user.id
    }
    let imageUrl;
    let key;
    let ext;
    firebase.database().ref('meetups').push(meetup)
      .then(data => {
        key = data.key;
        return key;
      })
      .then(key => {
        const fileName = payload.image.name;
        ext = fileName.slice(fileName.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      })
      .then(() => {
        return firebase.storage().ref('meetups/' + key + '.' + ext).getDownloadURL()
      })
      .then(url => {
        return firebase.database().ref('meetups').child(key).update({
          imageUrl: url
        })
      })
      .then(() => {
        commit('setMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        });
      })
      .catch(error => console.log(error))
  },
  updateMeetupDetails: ({commit}, payload) => {
    commit('setLoading', true)
    const meetup = {}
    if (payload.title) {
      meetup.title = payload.title
    }
    if (payload.description) {
      meetup.description = payload.description
    }
    if (payload.date) {
      meetup.date = payload.date
    }
    firebase.database().ref('meetups').child(payload.id).update(meetup)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
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
            imageUrl: obj[key].imageUrl,
            location: obj[key].location,
            date: obj[key].date,
            creator_id: obj[key].creator_id
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
  updateMeetup: (state, payload) => {
    const meetup = state.meetups.find(meetup => {
      return meetup.id === payload.id
    });
    if (payload.title) {
      meetup.title = payload.title
    }
    if (payload.description) {
      meetup.description = payload.description
    }
    if (payload.date) {
      meetup.date = payload.date
    }
  },
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