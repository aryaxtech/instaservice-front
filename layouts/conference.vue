<template>
  <v-app>
    <v-main>
      <Nuxt/>
      <payment-notification-listener/>
    </v-main>
  </v-app>
</template>

<script>
import PaymentNotificationListener from "~/components/listeners/PaymentNotificationListener";

export default {
  name: "conference",
  components: {PaymentNotificationListener},
}
</script>

<style scoped>

</style>
