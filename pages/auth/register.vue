<template>
  <v-content class='color-bg-wrapper'>
    <section class='lighten-4 py-12'>
      <v-container>
        <v-row justify='center'>
          <v-col cols='10' lg='5'>
            <v-card flat outlined class='color-bg' dark>
              <v-card-text>
                <h1 class='headline font-weight-bold white--text text--darken-3 text-center'>
                  CREATE AN ACCOUNT
                </h1>
              </v-card-text>
              <v-card-text>
                <v-alert type="success" v-if="successMessage">
                  {{ successMessage }}
                </v-alert>
                <v-alert type="warning" v-if="errorMessage">
                  {{ errorMessage }}
                </v-alert>
                <v-form v-model='valid' ref='form' lazy-validation @submit.prevent="register">
                  <v-text-field prepend-icon='mdi-label' validate-on-blur clearable dense outlined v-model='form.name'
                                :rules='[rules.nameRequired]' label='Please enter your Name'
                                type='text' required/>
                  <v-text-field prepend-icon='mdi-email' validate-on-blur clearable dense outlined v-model='form.email'
                                :rules='[rules.emailRequired, rules.email]' label='Please enter your Email'
                                type='email' required/>
                  <v-text-field prepend-icon='mdi-phone' validate-on-blur clearable dense outlined v-model='form.phone'
                                :rules='[rules.phoneRequired]' label='Please enter your Phone'
                                type='tel' required/>
                  <v-text-field :append-icon='show1 ? "mdi-eye" : "mdi-eye-off"'
                                :rules='[rules.passwordRequired]' :type='show1 ? "text" : "password"'
                                @click:append='show1 = !show1' prepend-icon='mdi-lock' dense outlined
                                v-model='form.password' label='Please enter your password'
                                required/>
                  <v-text-field :append-icon='show1 ? "mdi-eye" : "mdi-eye-off"'
                                :rules='rules.confirmPasswordRules' :type='show1 ? "text" : "password"'
                                @click:append='show1 = !show1' prepend-icon='mdi-lock' dense outlined
                                v-model='form.passwordAgain' label='Please enter your password again'
                                required/>
                  <v-row justify="center">
                    <v-col class="text-center">
                      <v-checkbox v-mode='form.accept' :rules="[rules.accept()]"
                                  label="Accept Terms and Conditions"></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row align='center' justify='space-around'>
                    <v-btn depressed light color='white darken-3' type="submit">Register</v-btn>
                  </v-row>
                  <v-row align='center' justify='space-around' class='px-8'>
                    <v-divider/>
                    <h1 class='subtitle-2 ma-4'>OR</h1>
                    <v-divider/>
                  </v-row>
                  <v-row pb='5' justify='center'>
                    <v-btn :to='`/${$i18n.locale}/auth/login`'
                           light color='white darken-3' depressed>
                      LOG In
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
      errorMessage: null,
      successMessage: null,
      show1: false,
      valid: false,
      form: {
        email: '',
        name: '',
        phone: '',
        password: '',
        passwordAgain: '',
        accept: 0,
      },
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Your Email should look like user@email.com';
        },
        emailRequired: value => !!value || 'You must enter your Email',
        nameRequired: value => !!value || 'You must enter your Name',
        phoneRequired: value => !!value || 'You must enter your Phone',
        passwordRequired: value => !!value || 'Your password is required',
        accept: value => !value || 'You must to accept terms and conditions',
        confirmPasswordRules: [
          (value) => !!value || 'type confirm password',
          (value) =>
            value === this.form.password || 'The password confirmation does not match.',
        ],
      }
    };
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getUser',
      defaultLanguage: 'language/getDefaultLanguage',
      clientCookie: 'client/getCookieId',
    }),
  },
  methods: {
    ...mapActions({
      onRegister: 'auth/onRegister',
    }),
    async register() {
      this.errorMessage = null;
      this.successMessage = null;
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          await this.onRegister({...this.form, cookie: this.clientCookie});
          this.successMessage = ' You have successfully registered!';
          await this.$router.push(`/${this.defaultLanguage}`);
        } catch (e) {
          this.errorMessage = e.response.data.message;
        }
      }
    }
  }
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
