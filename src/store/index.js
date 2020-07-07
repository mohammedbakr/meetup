import Vue from 'vue'
import Vuex from 'vuex'

import Meetup from './modules/meetup'
import User from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Meetup,
    User
  }
})
