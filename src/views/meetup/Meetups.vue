<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="10">
        <v-card class="blue-grey lighten-4">
          <v-container>
            <v-row>
              <v-col cols="5" sm="4">
                <v-img
                  height="250"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>
              </v-col>
              <v-col cols="7" sm="8">
                <v-card-title>
                  <div>
                    <h3 class="white--text">My Meetup</h3>
                    <h5>17th July 2019</h5>
                  </div>
                </v-card-title>
                <v-card-actions class="mt-15">
                  <v-btn text class="primary" to="/meetup/1">
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

}
</script>

<style>

</style>