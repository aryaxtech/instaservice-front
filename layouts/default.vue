<template>
  <v-app>
    <v-container fluid class="bckg">
      <TheHeader/>
    </v-container>
    <TheMainHero/>
    <v-main>
      <Nuxt/>
    </v-main>
    <TheFooter/>
    <app-call/>
    <schedule/>
    <payment-notification-listener/>
  </v-app>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue';
import TheHeader from '~/components/TheHeader.vue';
import TheMainHero from '~/components/TheMainHero.vue';
import AppCall from '~/components/calls/AppCall';
import Schedule from '~/components/schedule/Schedule';
import PaymentNotificationListener from "~/components/listeners/PaymentNotificationListener";

export default {
  name: 'DefaultLayout',
  components: {TheHeader, TheMainHero, TheFooter, AppCall, Schedule, PaymentNotificationListener},
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/nullstyle.scss';

.main-header {
  font-weight: 600;
  font-size: 40px;
  text-align: center;
  color: $darkColor;
}

.bckg {
  background-color: $bckgColor;
}

.bckg {
  @include rwdmax(881px) {
    padding: 0 !important;
  }
}
</style>
