<template>
  <v-app>
    <div class="bckg">
      <TheHeader />
    </div>
    <v-main>
      <Nuxt />
    </v-main>
    <TheFooter />
    <app-call />
  </v-app>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue';
import TheHeader from '~/components/TheHeader.vue';
import AppCall from "~/components/calls/AppCall";

export default {
  components: { TheHeader, TheFooter, AppCall },
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
.bckg {
  background-color: $bckgColor;
}
</style>
