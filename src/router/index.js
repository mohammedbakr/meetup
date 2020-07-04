import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Meetups from '@/views/meetup/Meetups'
import NewMeetup from '@/components/NewMeetup'
import Profile from '@/views/user/Profile'
import Signin from '@/views/user/Signin'
import Signup from '@/views/user/Signup'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'NewMeetup',
    component: NewMeetup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
