<template>
  <v-content class='color-bg-wrapper'>
    <section class='grey lighten-4 py-12'>
      <v-container>
        <v-row justify='center'>
          <v-col cols='10' lg='5'>
            <v-card flat outlined class='color-bg' dark>
              <v-card-text>
                <h1 class='headline font-weight-bold text--darken-3 text-center'>LOG IN</h1>
              </v-card-text>
              <v-card-text>
                <v-alert type="success" v-if="successMessage">
                  {{ successMessage }}
                </v-alert>
                <v-alert type="warning" v-if="errorMessage">
                  {{ errorMessage }}
                </v-alert>
                <v-form v-model='valid' ref='form' lazy-validation @submit.prevent="login">
                  <v-text-field prepend-icon='mdi-email' validate-on-blur clearable dense outlined v-model='form.email'
                                :rules='[rules.emailRequired, rules.email]' label='Please enter your Email'
                                type='email' required/>
                  <v-text-field :append-icon='show1 ? "mdi-eye" : "mdi-eye-off"'
                                :rules='[rules.passwordRequired]' :type='show1 ? "text" : "password"'
                                @click:append='show1 = !show1' prepend-icon='mdi-lock' dense outlined
                                v-model='form.password' label='Please enter your password'
                                required/>
                  <v-row align='center' justify='space-around'>
                    <v-btn depressed color='white darken-3' light type="submit">Log in</v-btn>
                  </v-row>
                  <v-row align='center' justify='space-around' class='px-8'>
                    <v-divider/>
                    <h1 class='subtitle-2 ma-4'>OR</h1>
                    <v-divider/>
                  </v-row>
                  <v-row pb='5' justify='center'>
                    <v-btn :to='`/${$i18n.locale}/auth/register`'
                           light color='white darken-3' depressed>Create an account
                    </v-btn>
                  </v-row>
                  <br><br>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-content>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  layout: 'emptyhero',
  data() {
    return {
      successMessage: null,
      errorMessage: null,
      show1: false,
      valid: false,
      form: {
        email: null,
        password: null,
      },
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Your Email should look like user@email.com';
        },
        emailRequired: value => !!value || 'You must enter your Email',
        passwordRequired: value => !!value || 'Your password is required',
      },
    };
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getUser',
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin',
    }),
    async login() {
      this.successMessage = null;
      this.errorMessage = null;
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          await this.onLogin(this.form);
          this.successMessage = 'You have successfully logged in';
          await this.$router.push(`/${this.defaultLanguage}`);
        } catch (e) {
          this.errorMessage = e.response.data.message;
        }
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.color-bg-wrapper {
  background-color: #f8f9fd;
}

.color-bg {
  background-color: #5f4bdb;
  border-radius: 15px;
}
</style>

