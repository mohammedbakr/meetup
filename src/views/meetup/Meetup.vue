<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" align="center">
        <v-progress-circular indeterminate width="5" size="60"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="8" offset-sm="2" md="10" offset-md="1">
        <v-card>
          <v-card-title>
            {{ meetup.title }}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img
            height="400"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-subtitle>
            {{ meetup.date | date }} - {{ meetup.location }}
            <v-spacer></v-spacer>
            <div v-if="userIsCreator" class="d-inline-flex">
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" class="ml-2"></app-edit-meetup-time-dialog>
            </div>
          </v-card-subtitle>
          <v-card-text class="black--text">
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary pa-3">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditMeetupDetailsDialog from '@/components/meetup/edit/EditMeetupDetailsDialog';
import EditMeetupDateDialog from '@/components/meetup/edit/EditMeetupDateDialog';
import EditMeetupTimeDialog from '@/components/meetup/edit/EditMeetupTimeDialog';

export default {
  name: "Meetup",
  components: {
    AppEditMeetupDetailsDialog: EditMeetupDetailsDialog,
    AppEditMeetupDateDialog: EditMeetupDateDialog,
    AppEditMeetupTimeDialog: EditMeetupTimeDialog
  },
  props: ['id'],
  computed: {
    meetup() {
      return this.$store.getters.meetup(this.id)
    },
    authinticatedUser() {
      return this.$store.getters.user !== null &&
             this.$store.getters.user !== undefined
    },
    userIsCreator() {
      if (!this.authinticatedUser) {
        return false;
      } else {
        return this.$store.getters.user.id === this.meetup.creator_id
      }
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>

</style>