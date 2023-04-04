<template>
  <div>
    <v-dialog
      v-model="dialog"
      activator="parent"
      width="400"
    >
      <v-card v-if="order">
        <v-card-text class="text-center">
          <h3>Request for service payment</h3>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-row justify="center">
            <v-col class="actions">
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="payNow">Pay now</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PaymentNotificationListener",
  data() {
    return {
      socket: null,
      dialog: false,
      order: {},
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
    this.socket.on(`payment-${cookieId}`, async (response, cb) => {
      const data = JSON.parse(response);
      this.order = data.data;
      this.dialog = true;
    });
  },
  methods: {
    payNow() {
      window.location.href = `http://localhost:63342/instantexpert-paypal/?token=${this.order.token}`;
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
