<template>
  <v-container>
    <v-row v-if="error">
      <v-col cols="12" sm="6" offset-sm="3">
        <app-alert @dismissed="$store.dispatch('clearError')" :text="error.message" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSubmit" v-model="valid">
                <v-row>
                  <v-col cols="12">
                    <v-text-field 
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="emailRules"
                      prepend-icon="email"
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field 
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      :rules="passwordRules"
                      prepend-icon="lock"
                      :append-icon="value ? 'visibility' : 'visibility_off'"
                      @click:append="() => (value = !value)"
                      :type="value ? 'password' : 'text'"
                      :value="password"
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                      class="black white--text"
                    >
                      Sign In
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      valid: false,
      value: String,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
    }
  },
  computed: {
    ...mapGetters({
      user:'user',
      error: 'error',
      loading: 'loading'
    })
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>