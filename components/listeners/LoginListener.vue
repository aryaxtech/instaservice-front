<template>
  <div>
    <v-dialog
      v-model="dialog"
      activator="parent"
      width="400"
    >
      <v-card>
        <v-card-text class="text-center">
          <h3>There is a login request, do you agree to be logged in remotely?</h3>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-row justify="center">
            <v-col class="actions">
              <v-btn @click="dialog = false">I disagree</v-btn>
              <v-btn color="primary" @click="login">I agree</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LoginListener",
  data() {
    return {
      socket: null,
      dialog: false,
      user: null,
    };
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getUser',
    }),
  },
  created() {
    this.socket = this.$nuxtSocket({
      channel: '/'
    });
    const cookieId = localStorage.getItem('userID');
    this.socket.on(`login-${cookieId}`, async (data, cb) => {
      if (!this.authUser) {
        this.user = JSON.parse(data);
        this.dialog = true;
      }
    });
  },
  methods: {
    ...mapActions({
      onRemoteLogin: 'auth/onRemoteLogin',
    }),
    login() {
      this.onRemoteLogin(this.user);
      this.dialog = false;
    }
  }
}
</script>

<style scoped>
h3 {
  font-size: 20px !important;
  padding: 20px;
}
.actions {
  padding-bottom: 30px;
}
</style>
