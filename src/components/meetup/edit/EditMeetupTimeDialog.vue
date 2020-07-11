<template>
  <v-container>
    <v-row>
    <v-dialog v-model="dialog" persistent max-width="350px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
        Edit Time
        </v-btn>
      </template>
      <v-card>
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <v-time-picker dark v-model="editableTime" style="width: 100%;"></v-time-picker>
              </v-col>
            </v-row>
          </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EditMeetupDateDialog",
  props: ['meetup'],
  data() {
    return {
      dialog: false,
      editableTime: null
    }
  },
  methods: {
    onClose() {
      this.dialog = false
      this.editableTime = new Date(this.meetup.date)
    },
    onSave() {
      const newDate = new Date(this.meetup.date);
      const hours = this.editableTime.match(/^(\d+)/)[1];
      const minutes = this.editableTime.match(/:(\d+)/)[1];

      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch('updateMeetupDetails', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date)
  }
}
</script>

<style>

</style>