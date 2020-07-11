<template>
  <v-container>
    <v-row>
    <v-dialog v-model="dialog" persistent max-width="350px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
        Edit Date
        </v-btn>
      </template>
      <v-card>
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <v-date-picker dark v-model="editableDate" style="width: 100%;"></v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    onClose() {
      this.dialog = false
      this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10)
    },
    onSave() {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetupDetails', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10)
  }
}
</script>

<style>

</style>