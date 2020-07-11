<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Meeetup Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                :rules="titleRules"
                  label="Title"
                  name="title"
                  id="title"
                  prepend-icon="title"
                  v-model="editedTitle"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                :rules="descriptionRules"
                label="Description"
                name="description"
                id="description"
                prepend-icon="text_snippet"
                v-model="editedDescription"
              ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditMeetupDetailsDialog",
  props: ['meetup'],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      titleRules: [
        v => !!v.trim() || 'Title is required'
      ],
      editedDescription: this.meetup.description,
      descriptionRules: [
        v => !!v.trim() || 'Description is required'
      ]
    };
  },
  computed: {
    dialogIsValid() {
      return this.editedTitle.trim() !== '' &&
              this.editedDescription.trim() !== ''
    },
  },
  methods: {
    onClose() {
      this.dialog = false
      this.editedTitle = this.meetup.title
      this.editedDescription = this.meetup.description
    },
    onSave() {
      if (!this.dialogIsValid) {
        return
      }
      const meetup = {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      }

      this.$store.dispatch('updateMeetupDetails', meetup);
      this.dialog = false
    }
  }
};
</script>

<style>
</style>