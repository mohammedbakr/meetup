<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h1 class="text-center">Creat a New Meetup</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-form @submit.prevent="onCreateMeetup" v-model="valid">
          <v-row>
            <v-col>
              <v-text-field
                :rules="titleRules"
                label="Title"
                name="title"
                id="title"
                prepend-icon="title"
                v-model="title"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="locationRules"
                label="Location"
                name="location"
                id="location"
                prepend-icon="room"
                v-model="location"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                :rules="imageRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                label="Image"
                @change="onFilePicked"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-img :src="imageUrl" height="150" v-if="image"></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                :rules="descriptionRules"
                label="Description"
                name="description"
                id="description"
                prepend-icon="text_snippet"
                v-model="description"
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
      valid: false,
      title: '',
      titleRules: [
        v => !!v || 'Title is required'
      ],
      location: '',
      locationRules: [
        v => !!v || 'Location is required'
      ],
      image: null,
      imageUrl: '',
      imageRules: [
        v => !!v || 'Image is required',
        v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required'
      ],
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
    },
    onFilePicked (event) {
        if (event) {
          const file = event
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
          });
          fileReader.readAsDataURL(file)
          this.image = file
        } else {
          this.imageUrl = ''
        }
      }
  }
}
</script>

<style>

</style>