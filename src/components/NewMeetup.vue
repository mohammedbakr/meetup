<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h1 class="text-center">Creat a New Meetup</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col>
              <v-text-field
                label="Title"
                name="title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Location"
                name="location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Image"
                name="image"
                id="image"
                v-model="image"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-img :src="image" height="150" v-if="image"></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="Description"
                name="description"
                id="description"
                v-model="description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>Choose Date & Time</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-date-picker dark v-model="date"></v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-time-picker dark v-model="time"></v-time-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" class="black white--text" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NewMeetup",
  data() {
    return {
      title: '',
      location: '',
      image: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date()
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
              this.location !== '' &&
              this.image !== '' &&
              this.description !== ''
    },
    submitableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];

        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetup = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submitableDateTime
      }

      this.$store.dispatch('createMeetup', meetup);
      this.$router.push('/meetups');
    }
  }
}
</script>

<style>

</style>