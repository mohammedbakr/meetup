<template>
  <nav class="mb-15">
    <v-app-bar fixed dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-for="item in items" :key="item.title" class="hidden-sm-and-down">
        <v-btn text :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          <span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="authinticatedUser" @click="onLogout" class="hidden-sm-and-down">
        <v-btn text >
          <v-icon left>exit_to_app</v-icon>
          <span>Logout</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer dark app v-model="drawer">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authinticatedUser" @click="onLogout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    items() {
      let navItems = [
        { icon: "face", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sing In", link: "/signin" }
      ]
      if (this.authinticatedUser) {
        navItems = [
          { icon: "supervisor_account", title: "Show Meetups", link: "/meetups" },
          { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
          { icon: "person", title: "Profile", link: "/profile" },
        ]
      }
      return navItems
    },
    authinticatedUser() {
      return this.$store.getters.user !== null &&
             this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      if(this.$route.path !==  '/') {
        this.$router.push('/')
      }
    }
  }
};
</script>

<style>
</style>