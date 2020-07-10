import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import DateFormat from './filters/date'
import Alert from './components/shared/Alert'

Vue.config.productionTip = false

Vue.filter('date', DateFormat);
Vue.component('app-alert', Alert);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyB-yU_STNmvlohVCOl_CM94LBAQcOKoI4U",
      authDomain: "vue-meetup-8efec.firebaseapp.com",
      databaseURL: "https://vue-meetup-8efec.firebaseio.com",
      projectId: "vue-meetup-8efec",
      storageBucket: "gs://vue-meetup-8efec.appspot.com/",
    })
    this.$store.dispatch('loadMeetups')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
