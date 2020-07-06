<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ meetup.title }}</v-card-title>
          <v-img
            height="400"
            :src="meetup.src"
          ></v-img>
          <v-card-subtitle>{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle>
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
export default {
  name: "Meetup",
  props: ['id'],
  computed: {
    meetup() {
      return this.$store.getters.meetup(this.id)
    }
  }
}
</script>

<style>

</style>