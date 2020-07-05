<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" class="text-sm-right">
        <v-btn large text to="/meetups" >Explore Meetups</v-btn>
      </v-col>
      <v-col cols="6" class="text-sm-left">
        <v-btn large text to="/meetup/new">Organize meetup</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-carousel>
          <v-carousel-item
            v-for="(meetup) in meetups"
            :key="meetup.id"
            :src="meetup.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
            style="cursor: pointer;"
            @click="goToMeetup(meetup.id)"
          >
            <div class="title ">{{ meetup.title }}</div>
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
export default {
  name: "Home",
  data() {
    return {
      meetups: [
        { id: 1, src: "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDgyNjY5OTc1MjYz/new-york-city.jpg", title: "New York"},
        { id: 2, src: "https://content.thriveglobal.com/wp-content/uploads/2019/01/GettyImages-955441104.jpg", title: "Paris"},
      ]
    }
  },
  methods: {
    goToMeetup(id) {
      this.$router.push(`/meetup/${id}`);
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;
}
</style>