<template>
  <v-container>
      <v-dialog v-model="dialog" persistent max-width="350px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="primary"
          >
          {{ userIsRegistered ? 'Unregister' : 'Register' }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title v-if="userIsRegistered">Unregister from meetup?</v-card-title>
          <v-card-title v-else>Register for meetup?</v-card-title>
          <v-divider></v-divider>
          <v-card-text>You can always change your decistion later on.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="onAgree">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "RegisterDialog",
  props: ['meetupId'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    userIsRegistered() {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return this.meetupId === meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
      this.dialog = false
    }
  }
}
</script>

<style>

</style>