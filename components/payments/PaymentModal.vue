<template>
  <v-card>
    <v-card-text>
      <h3 class="heading-text">Before calling the service must be paid</h3>
    </v-card-text>
    <v-card-actions class="text-center">
      <!--            <v-btn class="all-experts__btn online" @click="paymentDialog = false">Close</v-btn>-->
      <v-btn class="all-experts__btn online" block @click="payNow">Pay now</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PaymentModal",
  props: {expert: {type: Object}},
  computed: {
    ...mapGetters({
      client: 'client/getClient',
      order: 'client/getOrder'
    }),
  },
  methods: {
    ...mapActions({
      setOrder: 'client/setOrder',
    }),
    async payNow() {
      await this.storeOrder();
      window.location.href = `https://payments.instantexpert.online/?token=${this.order.token}`;
    },
    async storeOrder() {
      const date = new Date();
      const callDate = this.$moment(date, 'MM D, YYYY HH:mm:ss').format('Do MMMM YYYY');
      const callTime = this.$moment(date, 'MM D, YYYY HH:mm:ss').format('HH:mm');
      const data = {
        expert_id: this.expert.id,
        user_id: this.client.id,
        type: 'call',
        amount: this.expert.price,
        date: callDate,
        time: callTime,
        duration: '0',
      };
      try {
        await this.setOrder(data);
        localStorage.setItem('order', JSON.stringify(this.order));
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
