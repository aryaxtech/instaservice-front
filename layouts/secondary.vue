<template>
  <v-app>
    <div class="bckg">
      <TheHeader />
      <TheSecondaryHero />
    </div>
    <v-main>
      <Nuxt />
    </v-main>
    <TheSubscribe />
    <TheFooter />
    <app-call />
  </v-app>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue';
import TheHeader from '~/components/TheHeader.vue';
import TheSecondaryHero from '~/components/TheSecondaryHero.vue';
import TheSubscribe from '~/components/TheSubscribe.vue';
import AppCall from "~/components/calls/AppCall";

export default {
  components: { TheSecondaryHero, TheHeader, TheSubscribe, TheFooter, AppCall },
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
