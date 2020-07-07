<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSubmit">
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
                      type="password"
                      :rules="passwordRules"
                      prepend-icon="lock"
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field 
                      name="confirmpassword"
                      label="confirm Password"
                      id="confirm_password"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                      prepend-icon="lock"
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn dark type="submit">Sign Up</v-btn>
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
export default {
  name: "Signup",
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? 'Passwords don\'t match' : true
    },
    user() {
      return this.$store.getters.user
    }
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
      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>

</style>