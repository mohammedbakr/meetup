const state = {
  meetups: [
    { id: "1", src: "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDgyNjY5OTc1MjYz/new-york-city.jpg", title: "Meetup in New York", date: new Date(), location: "New York", description: "It's New York"},
    { id: "2", src: "https://content.thriveglobal.com/wp-content/uploads/2019/01/GettyImages-955441104.jpg", title: "Meetup in Paris", date: new Date(), location: "Paris", description: "It's Paris"},
  ],
  user: {
    id: "1",
    registeredMeetups: ["1"]
  }
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
  }
};

const actions = {
  createMeetup: ({commit}, payload) => {
    const meetup = {
      title: payload.title,
      location: payload.location,
      src: payload.image,
      description: payload.description,
      date: payload.date,
      id: '3'
    }

    commit('meetups', meetup);
  }
};

const mutations = {
  meetups: (state, payload) => state.meetups.push(payload)
};

export default {
  state,
  getters,
  actions,
  mutations
}