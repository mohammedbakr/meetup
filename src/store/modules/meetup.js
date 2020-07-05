const state = {
  meetups: [
    { id: "1", src: "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDgyNjY5OTc1MjYz/new-york-city.jpg", title: "New York", date: "2019-10-3"},
    { id: "2", src: "https://content.thriveglobal.com/wp-content/uploads/2019/01/GettyImages-955441104.jpg", title: "Paris", date: "2019-10-5"},
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

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}