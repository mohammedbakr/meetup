<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>My Meetup</v-card-title>
          <v-img
            height="400"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-subtitle>17th July 2019 - New york</v-card-subtitle>
          <v-card-text class="black--text">
            <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum vel odit dolor est cumque deleniti earum vero consequuntur quis, provident dolore quia velit optio quae tenetur labore voluptas quisquam minus.</div>
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
  name: "Meetup"
}
</script>

<style>

</style>