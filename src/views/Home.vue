<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn large text to="/meetups" >Explore Meetups</v-btn>
      </v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-left">
        <v-btn large text to="/meetup/new">Organize meetup</v-btn>
      </v-col>
    </v-row>

    <!-- circular loader when fetching data from the server -->
    <v-row v-if="loading">
      <v-col cols="12" align="center">
        <v-progress-circular indeterminate width="5" size="60"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col cols="12" sm="8" offset-sm="2" md="10" offset-md="1">
        <v-carousel>
          <v-carousel-item
            v-for="(meetup) in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            style="cursor: pointer;"
            @click="goToMeetup(meetup.id)"
          >
            <div class="title text-center">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center">
        <p>Join our awesome meetups</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  methods: {
    goToMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    }
  },
  computed: {
    ...mapGetters({
      meetups: 'featuredMeetups',
      loading: 'loadingMeetups'
    })
  }
}
</script>

<style scoped>
.title {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
}
</style>