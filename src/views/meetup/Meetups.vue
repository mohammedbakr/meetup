<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="10">
        <v-card class="blue-grey lighten-4 ma-3" v-for="meetup in meetups" :key="meetup.id">
          <v-container>
            <v-row>
              <v-col cols="5" sm="4">
                <v-img
                  height="250"
                  :src="meetup.imageUrl"
                ></v-img>
              </v-col>
              <v-col cols="7" sm="8">
                <v-card-title>
                  <div>
                    <h3 class="white--text">{{ meetup.title }}</h3>
                    <h5>{{ meetup.date | date }}</h5>
                  </div>
                </v-card-title>
                <v-card-actions class="mt-15">
                  <v-btn text class="primary" :to="`/meetups/${meetup.id}`">
                    <v-icon left>arrow_forward</v-icon>
                    <span>VIEW MEETUP</span>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Meetups",
  computed: {
    meetups() {
      return this.$store.getters.meetups;
    }
  }
}
</script>

<style>

</style>